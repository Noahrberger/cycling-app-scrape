from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from procyclingstats import Rider, RaceStartlist, Stage
import cloudscraper
from datetime import date

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

scraper = cloudscraper.create_scraper()

def calculate_age(birthdate_str):
    if not birthdate_str:
        return None
    parts = birthdate_str.split("-")
    born = date(int(parts[0]), int(parts[1]), int(parts[2]))
    today = date.today()
    return today.year - born.year - ((today.month, today.day) < (born.month, born.day))

def parse_time_seconds(time_str):
    if not time_str:
        return None
    parts = time_str.strip().split(":")
    try:
        if len(parts) == 3:
            return int(parts[0]) * 3600 + int(parts[1]) * 60 + int(parts[2])
        elif len(parts) == 2:
            return int(parts[0]) * 60 + int(parts[1])
    except:
        return None
    return None

def seconds_to_gap(seconds):
    if seconds == 0:
        return None
    h = seconds // 3600
    m = (seconds % 3600) // 60
    s = seconds % 60
    if h > 0:
        return f"+{h}:{m:02d}:{s:02d}"
    return f"+{m}:{s:02d}"

def map_entries(entries, name, entry_id_offset):
    mapped = []
    winner_seconds = None
    for i, e in enumerate(entries):
        time_str = e.get("time") or e.get("gap") or ""
        time_seconds = parse_time_seconds(time_str)
        if i == 0:
            winner_seconds = time_seconds

        if winner_seconds and time_seconds and time_seconds > winner_seconds:
            display_time = seconds_to_gap(time_seconds - winner_seconds)
        elif i == 0:
            display_time = time_str
        else:
            display_time = time_str

        mapped.append({
            "id": entry_id_offset + i,
            "rnk": e.get("rank") or 0,
            "rider_id": 0,
            "last_name": " ".join(e.get("rider_name", "").split(" ")[:-1]) if e.get("rider_name") else "",
            "first_name": e.get("rider_name", "").split(" ")[-1] if e.get("rider_name") else "",
            "url": e.get("rider_url") or "",
            "nation": e.get("nationality") or "",
            "team_id": 0,
            "team": e.get("team_name") or "",
            "time": display_time,
            "pcs_pnts": e.get("points") or 0,
            "uci_pnts": 0,
        })
    return {"id": entry_id_offset, "race": 0, "name": name, "entries": mapped}

@app.get("/rider/{rider_slug}")
def get_rider(rider_slug: str):
    try:
        url = f"https://www.procyclingstats.com/rider/{rider_slug}"
        html = scraper.get(url).text
        rider = Rider(f"rider/{rider_slug}", html=html, update_html=False)
        data = rider.parse()

        teams = rider.teams_history()
        current_team = teams[0] if teams else {}

        full_name = data.get("name") or ""
        name_parts = full_name.split(" ", 1)
        firstname = name_parts[0] if len(name_parts) > 0 else ""
        lastname = name_parts[1].upper() if len(name_parts) > 1 else ""

        return {
            "info": {
                "ridername": full_name,
                "lastname": lastname,
                "firstname": firstname,
                "teamname": current_team.get("team_name") or "",
                "birthdate": data.get("birthdate") or "",
                "age": calculate_age(data.get("birthdate")),
                "place_of_birth": "",
                "height": data.get("height"),
                "weight": data.get("weight"),
                "nation": (data.get("nationality") or "").lower(),
                "country": "",
                "img": data.get("image_url") or "",
                "copyright": "",
            }
        }
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

@app.get("/startlist/{race_slug:path}")
def get_startlist(race_slug: str):
    try:
        url = f"https://www.procyclingstats.com/race/{race_slug}/startlist"
        html = scraper.get(url).text
        startlist = RaceStartlist(f"race/{race_slug}/startlist", html=html, update_html=False)
        riders = startlist.startlist()

        teams_dict = {}
        team_counter = 1
        for rider in riders:
            team_name = rider.get("team_name") or "Unknown"
            team_url = rider.get("team_url") or ""

            if team_name not in teams_dict:
                teams_dict[team_name] = {
                    "team": team_counter,
                    "nr": team_counter,
                    "name": team_name,
                    "url": team_url,
                    "riders": []
                }
                team_counter += 1

            teams_dict[team_name]["riders"].append({
                "team": teams_dict[team_name]["team"],
                "bib": rider.get("rider_number") or 0,
                "ridername": rider.get("rider_name") or "",
                "rider_id": rider.get("rider_number") or 0,
                "url": rider.get("rider_url") or "",
                "nation": rider.get("nationality") or "",
                "name": rider.get("rider_name") or "",
            })

        return {
            "info": {
                "name": race_slug,
                "date_start": "",
                "date_end": "",
                "classification": "",
                "final_startlist": 1,
                "url": f"race/{race_slug}/startlist",
            },
            "teams": list(teams_dict.values())
        }
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

@app.get("/results/{race_slug:path}")
def get_results(race_slug: str):
    try:
        url = f"https://www.procyclingstats.com/race/{race_slug}"
        html = scraper.get(url).text
        stage = Stage(f"race/{race_slug}", html=html, update_html=False)

        stage_results = stage.results()
        gc_results = stage.gc()
        points_results = stage.points()
        kom_results = stage.kom()
        youth_results = stage.youth()
        teams_results = stage.teams()

        results = []
        if stage_results:
            results.append(map_entries(stage_results, "Stage", 1000))
        if gc_results:
            results.append(map_entries(gc_results, "General", 2000))
        if points_results:
            results.append(map_entries(points_results, "Points", 3000))
        if kom_results:
            results.append(map_entries(kom_results, "KOM", 4000))
        if youth_results:
            results.append(map_entries(youth_results, "Youth", 5000))
        if teams_results:
            results.append(map_entries(teams_results, "Teams", 6000))

        return {
            "info": {
                "name": race_slug,
                "stage": race_slug,
                "race_date": "",
                "distance": 0,
            },
            "results": results
        }
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))