import { getMockStartlist } from "@/fixtures/startlist";
import type { ApiStartlistResponse } from "@/types/api";

export async function getStartlistRecord(
  raceId: string
): Promise<ApiStartlistResponse> {
  return getMockStartlist(raceId);
}