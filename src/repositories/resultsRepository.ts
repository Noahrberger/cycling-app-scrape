import type { PCSResultsResponse } from "@/types/api";

const RACE_ID_TO_SLUG: Record<string, string> = {
  "tour-de-france": "tour-de-france/2026/stage-1",
  "giro-ditalia": "giro-d-italia/2026/stage-1",
  "paris-roubaix": "paris-roubaix/2026/result",
};

export async function getResultsRecord(
  raceId: string
): Promise<PCSResultsResponse | null> {
  try {
    const slug = RACE_ID_TO_SLUG[raceId] ?? raceId;
    const res = await fetch(`http://192.168.0.63:8000/results/${slug}`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}