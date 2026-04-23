import { getPCSSlug } from "@/constants/raceSlugMap";
import type { PCSStartlistResponse } from "@/types/api";

export async function getStartlistRecord(
  raceId: string
): Promise<PCSStartlistResponse | null> {
  try {
    const slug = getPCSSlug(raceId);
    const res = await fetch(`http://192.168.0.63:8000/startlist/${slug}/2026`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}