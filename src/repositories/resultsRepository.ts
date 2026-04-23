import { getPCSSlug } from "@/constants/raceSlugMap";
import type { PCSResultsResponse } from "@/types/api";

export async function getResultsRecord(
  raceId: string,
  stageNumber?: number
): Promise<PCSResultsResponse | null> {
  try {
    const slug = getPCSSlug(raceId);
    let res: Response;

    if (stageNumber) {
      res = await fetch(`http://192.168.0.63:8000/results/${slug}/2026/stage-${stageNumber}`);
    } else {
      // Prøv siste etappe via /result for endagsritt, ellers stage-1
      res = await fetch(`http://192.168.0.63:8000/results/${slug}/2026/result`);
      if (!res.ok) {
        res = await fetch(`http://192.168.0.63:8000/results/${slug}/2026/stage-1`);
      }
    }

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}