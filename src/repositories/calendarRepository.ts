import { getPCSSlug } from "@/constants/raceSlugMap";
import { getMockCalendar } from "@/fixtures/calendar";
import type { PCSCalendarResponse } from "@/types/api";

const RACE_ID_TO_EVENT_ID: Record<string, number> = {
  "tour-de-france": 58793,
  "santos-tour-down-under": 59817,
};

export async function getCalendarRecord(raceId?: string): Promise<PCSCalendarResponse> {
  try {
    if (!raceId) return getMockCalendar();
    const slug = getPCSSlug(raceId);
    const res = await fetch(`http://192.168.0.63:8000/calendar/${slug}/2026`);
    if (!res.ok) return getMockCalendar();
    const data = await res.json();
    if (!data.data || data.data.length === 0) return getMockCalendar();
    return data;
  } catch {
    return getMockCalendar();
  }
}

export function getEventIdForRace(raceId: string): number | null {
  return RACE_ID_TO_EVENT_ID[raceId] ?? null;
}