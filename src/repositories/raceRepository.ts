import { getCalendarRecord } from "@/repositories/calendarRepository";
import { getRaceById, getStagesForRace } from "@/store/raceStore";
import type { PCSStage } from "@/types/api";
import type { RaceDetails, Stage } from "@/types/models";

export function getRaceRecord(raceId: string): RaceDetails | null {
  return getRaceById(raceId);
}

export async function getStageRecordsForRace(raceId: string): Promise<Stage[] | null> {
  try {
    const calendar = await getCalendarRecord(raceId);
    const event = calendar.data[0] ?? null;

    if (event?.stages?.length) {
      return pcsStageToStage(event.stages);
    }
  } catch {
    // fallback under
  }

  // Fallback til raceStore
  const race = getRaceById(raceId);
  if (!race) return null;
  return getStagesForRace(race);
}

function pcsStageToStage(stages: PCSStage[]): Stage[] {
  return stages.map((s, index) => ({
    stageNumber: index + 1,
    startCity: s.city_start,
    finishCity: s.city_finish,
    distanceKm: s.distance,
    stageType: "Unknown",
    date: s.race_date,
    profileImage: "https://via.placeholder.com/1200x360.png?text=Stage+profile",
  }));
}