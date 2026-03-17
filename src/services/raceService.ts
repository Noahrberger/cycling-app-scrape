// app/(tabs)/calendar/services/raceService.ts

import { getRaceById, getStagesForRace, RaceDetails, Stage } from "@/store/raceStore";

import { getMockResults, ResultsData } from "../fixtures/results";
import { getMockStartlist, StartlistData } from "../fixtures/startlist";


type ServiceResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getRace(raceId: string): Promise<ServiceResult<RaceDetails>> {
  await delay(150); // gir deg “loading”-følelse i UI
  const race = getRaceById(raceId);
  if (!race) return { ok: false, error: `No race found for id: ${raceId}` };
  return { ok: true, data: race };
}

export async function getStages(raceId: string): Promise<ServiceResult<Stage[]>> {
  await delay(150);
  const race = getRaceById(raceId);
  if (!race) return { ok: false, error: `No race found for id: ${raceId}` };
  return { ok: true, data: getStagesForRace(race) };
}

export async function getStage(
  raceId: string,
  stageNumber: number
): Promise<ServiceResult<Stage>> {
  await delay(150);
  const race = getRaceById(raceId);
  if (!race) return { ok: false, error: `No race found for id: ${raceId}` };

  const stages = getStagesForRace(race);
  const found = stages.find((s) => s.stageNumber === stageNumber);
  if (!found) return { ok: false, error: `No stage ${stageNumber} for race: ${raceId}` };

  return { ok: true, data: found };
}

export async function getStartlist(raceId: string): Promise<ServiceResult<StartlistData>> {
  await delay(250);
  // i dag: mock
  return { ok: true, data: getMockStartlist(raceId) };
}

export async function getResults(raceId: string): Promise<ServiceResult<ResultsData>> {
  await delay(250);
  // i dag: mock
  return { ok: true, data: getMockResults(raceId) };
}
