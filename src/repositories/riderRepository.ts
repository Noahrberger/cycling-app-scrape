import { getMockRider } from "@/fixtures/riders";
import { getTeamById } from "@/fixtures/teams";
import type { PCSRiderResponse } from "@/types/api";
import type { Team } from "@/types/models";

export async function getRiderRecord(
  riderId: string
): Promise<PCSRiderResponse | null> {
  // Bytt ut når ekte API er klart:
  // const res = await fetch(`https://pcs-api.com/rider/${riderId}`);
  // return res.json();

  const numericId = Number(riderId);
  if (isNaN(numericId)) return null;
  return getMockRider(numericId);
}

export function getTeamRecord(teamId: string): Team | null {
  return getTeamById(teamId);
}