import { getMockStartlist } from "@/fixtures/startlist";
import type { PCSStartlistResponse } from "@/types/api";

export async function getStartlistRecord(
  raceId: string
): Promise<PCSStartlistResponse | null> {
  // Bytt ut når ekte API er klart:
  // const res = await fetch(`https://pcs-api.com/startlist/${raceId}`);
  // return res.json();

  return getMockStartlist(raceId);
}