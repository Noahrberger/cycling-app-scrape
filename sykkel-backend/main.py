from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from procyclingstats import Rider
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