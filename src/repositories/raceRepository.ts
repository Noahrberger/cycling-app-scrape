import { getRaceById, getStagesForRace } from "@/store/raceStore";
import type { RaceDetails, Stage } from "@/types/models";

export function getRaceRecord(raceId: string): RaceDetails | null {
  return getRaceById(raceId);
}

export function getStageRecordsForRace(raceId: string): Stage[] | null {
  const race = getRaceById(raceId);
  if (!race) return null;
  return getStagesForRace(race);
}