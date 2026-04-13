import { getCalendarRecord, getEventIdForRace } from "@/repositories/calendarRepository";
import { getResultsRecord } from "@/repositories/resultsRepository";
import type { ResultCategory } from "@/types/api";
import type { ServiceResult } from "@/types/service";
import type { ResultRowView, ResultsViewData } from "@/types/viewModels";

function toCategory(name: string): ResultCategory | null {
  switch (name) {
    case "Stage":   return "stage";
    case "General": return "gc";
    case "Points":  return "points";
    case "KOM":     return "kom";
    case "Youth":   return "youth";
    case "Teams":   return "team";
    default:        return null;
  }
}

function isGap(time: string): boolean {
  return time.startsWith("+");
}

export async function getResults(
  raceId: string
): Promise<ServiceResult<ResultsViewData>> {

  const [raw, calendar] = await Promise.all([
    getResultsRecord(raceId),
    getCalendarRecord(),
  ]);

  if (!raw) {
    return { ok: false, error: "No results found" };
  }

  // Hent stages for dette rittet fra calendar
  const eventId = getEventIdForRace(raceId);
  const calendarEvent = eventId
    ? calendar.data.find((e) => e.event_id === eventId)
    : null;

  const stageOptions = calendarEvent
    ? calendarEvent.stages.map((s, index) => ({
        stageNumber: index + 1,
        label: s.stagename,
      }))
    : [];

  const resultsByStageAndCategory: ResultsViewData["resultsByStageAndCategory"] = {};
  const categoryMap: Record<ResultCategory, ResultRowView[]> = {
    stage: [], gc: [], points: [], kom: [], youth: [], team: [],
  };

  for (const classification of raw.results) {
    const category = toCategory(classification.name);
    if (!category) continue;

    const isTeam = category === "team";
    const isPoints = category === "points" || category === "kom";

    const rows: ResultRowView[] = classification.entries.map((entry) => {
      const fullName = `${entry.first_name} ${entry.last_name}`.trim();
      const id = String(entry.id);

      if (isTeam) {
        if (isPoints) {
          return {
            id, entityType: "team", teamId: String(entry.team_id),
            rank: entry.rnk, riderName: entry.team,
            teamName: "Team classification",
            unit: "points", points: entry.pcs_pnts,
          };
        }
        return {
          id, entityType: "team", teamId: String(entry.team_id),
          rank: entry.rnk, riderName: entry.team,
          teamName: "Team classification", unit: "time",
          ...(isGap(entry.time) ? { gap: entry.time } : { totalTime: entry.time }),
        };
      }

      if (isPoints) {
        return {
          id, entityType: "rider", riderId: String(entry.rider_id),
          teamId: String(entry.team_id), rank: entry.rnk,
          riderName: fullName, teamName: entry.team,
          unit: "points", points: entry.pcs_pnts,
        };
      }

      return {
        id, entityType: "rider", riderId: String(entry.rider_id),
        teamId: String(entry.team_id), rank: entry.rnk,
        riderName: fullName, teamName: entry.team, unit: "time",
        ...(isGap(entry.time) ? { gap: entry.time } : { totalTime: entry.time }),
      };
    });

    categoryMap[category] = rows;
  }

  resultsByStageAndCategory["latest"] = categoryMap;

  return {
    ok: true,
    data: {
      raceId,
      stageOptions,
      lastUpdatedISO: raw.info.race_date,
      resultsByStageAndCategory,
    },
  };
}