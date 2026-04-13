import { getCalendarRecord, getEventIdForRace } from "@/repositories/calendarRepository";
import { getRaceById } from "@/store/raceStore";
import type { PCSStage } from "@/types/api";
import type { RaceDetails, Stage } from "@/types/models";

export function getRaceRecord(raceId: string): RaceDetails | null {
  return getRaceById(raceId);
}

export async function getStageRecordsForRace(raceId: string): Promise<Stage[] | null> {
  const race = getRaceById(raceId);
  if (!race) return null;

  // Prøv å hente stages fra PCS calendar-data
  const eventId = getEventIdForRace(raceId);
  if (eventId) {
    const calendar = await getCalendarRecord();
    const event = calendar.data.find((e) => e.event_id === eventId);

    if (event?.stages?.length) {
      return pcsStageToStage(event.stages);
    }
  }

  // Fallback til raceStore hvis ikke i calendar
  const { getStagesForRace } = await import("@/store/raceStore");
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