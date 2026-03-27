import { getRaceRecord, getStageRecordsForRace } from "@/repositories/raceRepository";
import type { RaceDetails, Stage } from "@/types/models";
import type { ServiceResult } from "@/types/service";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getRace(raceId: string): Promise<ServiceResult<RaceDetails>> {
  await delay(150);

  const race = getRaceRecord(raceId);
  if (!race) return { ok: false, error: `No race found for id: ${raceId}` };

  return { ok: true, data: race };
}

export async function getStages(raceId: string): Promise<ServiceResult<Stage[]>> {
  await delay(150);

  const stages = getStageRecordsForRace(raceId);
  if (!stages) return { ok: false, error: `No race found for id: ${raceId}` };

  return { ok: true, data: stages };
}

export async function getStage(
  raceId: string,
  stageNumber: number
): Promise<ServiceResult<Stage>> {
  await delay(150);

  const stages = getStageRecordsForRace(raceId);
  if (!stages) return { ok: false, error: `No race found for id: ${raceId}` };

  const found = stages.find((s) => s.stageNumber === stageNumber);
  if (!found) return { ok: false, error: `No stage ${stageNumber} for race: ${raceId}` };

  return { ok: true, data: found };
}