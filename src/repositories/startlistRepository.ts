import type { PCSStartlistResponse } from "@/types/api";

// Mapping fra intern raceId → PCS slug
const RACE_ID_TO_SLUG: Record<string, string> = {
  "tour-de-france": "tour-de-france/2026",
  "giro-ditalia": "giro-d-italia/2026",
};

export async function getStartlistRecord(
  raceId: string
): Promise<PCSStartlistResponse | null> {
  try {
    const slug = RACE_ID_TO_SLUG[raceId] ?? raceId;
    const res = await fetch(`http://192.168.0.63:8000/startlist/${slug}`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}