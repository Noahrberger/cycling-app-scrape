import { getMockResults } from "@/fixtures/results";
import type { PCSResultsResponse } from "@/types/api";

export async function getResultsRecord(
  raceId: string
): Promise<PCSResultsResponse | null> {

  // Når ekte API er klart, bytt ut disse to linjene:
  // const res = await fetch(`https://pcs-api.com/results/${raceId}`);
  // return res.json();

  return getMockResults(raceId);
}