import { getRaceRecord, getStageRecordsForRace } from "@/repositories/raceRepository";
import type { RaceDetails, Stage } from "@/types/models";
import type { ServiceResult } from "@/types/service";

export async function getRace(raceId: string): Promise<ServiceResult<RaceDetails>> {
  const race = getRaceRecord(raceId);
  if (!race) return { ok: false, error: `No race found for id: ${raceId}` };
  return { ok: true, data: race };
}

export async function getStages(raceId: string): Promise<ServiceResult<Stage[]>> {
  const stages = await getStageRecordsForRace(raceId);
  if (!stages) return { ok: false, error: `No race found for id: ${raceId}` };
  return { ok: true, data: stages };
}

export async function getStage(
  raceId: string,
  stageNumber: number
): Promise<ServiceResult<Stage>> {
  const stages = await getStageRecordsForRace(raceId);
  if (!stages) return { ok: false, error: `No race found for id: ${raceId}` };

  const found = stages.find((s) => s.stageNumber === stageNumber);
  if (!found) return { ok: false, error: `No stage ${stageNumber} for race: ${raceId}` };

  return { ok: true, data: found };
}