import { getMockCalendar } from "@/fixtures/calendar";
import type { PCSCalendarResponse } from "@/types/api";

// Mapping fra intern raceId → PCS event_id
const RACE_ID_TO_EVENT_ID: Record<string, number> = {
  "tour-de-france": 58793,
  "santos-tour-down-under": 59817,
  // legg til flere når vi vet event_id fra ekte API
};

export async function getCalendarRecord(): Promise<PCSCalendarResponse> {
  // Bytt ut med fetch() når ekte API er klart:
  // const res = await fetch("https://pcs-api.com/calendar");
  // return res.json();
  return getMockCalendar();
}

export function getEventIdForRace(raceId: string): number | null {
  return RACE_ID_TO_EVENT_ID[raceId] ?? null;
}