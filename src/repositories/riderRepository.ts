import { getTeamById } from "@/fixtures/teams";
import type { PCSRiderResponse } from "@/types/api";
import type { Team } from "@/types/models";

// Mapping fra numerisk ID → PCS slug
const RIDER_ID_TO_SLUG: Record<number, string> = {
  194619: "tadej-pogacar",
  196424: "jonas-vingegaard",
  212377: "remco-evenepoel",
  196333: "joao-almeida",
  168961: "wout-van-aert",
};

export async function getRiderRecord(
  riderId: string
): Promise<PCSRiderResponse | null> {
  try {
    const numericId = Number(riderId);
    const slug = RIDER_ID_TO_SLUG[numericId] ?? riderId;
    console.log("Fetching rider:", slug);
    const res = await fetch(`http://192.168.0.63:8000/rider/${slug}`);
    console.log("Response status:", res.status);
    const data = await res.json();
    console.log("Response data:", JSON.stringify(data));
    if (!res.ok) return null;
    return data;
  } catch (e) {
    console.log("Fetch error:", e);
    return null;
  }
}

export function getTeamRecord(teamId: string): Team | null {
  return getTeamById(teamId);
}