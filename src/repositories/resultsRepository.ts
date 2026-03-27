import { getMockResults } from "@/fixtures/results";
import type { ApiResultsResponse } from "@/types/api";

export async function getResultsRecord(
  raceId: string
): Promise<ApiResultsResponse> {
  return getMockResults(raceId);
}