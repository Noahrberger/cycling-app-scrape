import { getRiderById } from "@/fixtures/riders";
import { getTeamById } from "@/fixtures/teams";
import { getStartlistRecord } from "@/repositories/startlistRepository";
import type { ApiStartlistResponse } from "@/types/api";
import type { ServiceResult } from "@/types/service";
import type { StartlistViewData } from "@/types/viewModels";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getStartlist(
  raceId: string
): Promise<ServiceResult<StartlistViewData>> {
  await delay(250);

  const raw: ApiStartlistResponse = await getStartlistRecord(raceId);

  const mapped: StartlistViewData = {
    raceId: raw.raceId,
    lastUpdatedISO: raw.lastUpdatedISO,
    teams: raw.teams.map((team) => {
      const teamData = getTeamById(team.teamId);

      return {
        teamId: team.teamId,
        name: teamData?.name ?? "Unknown Team",
        riders: team.riderIds.map((riderId) => {
          const rider = getRiderById(riderId);

          return {
            id: riderId,
            name: rider?.name ?? "Unknown Rider",
            countryCode: rider?.countryCode,
            role: rider?.role,
          };
        }),
      };
    }),
  };

  return { ok: true, data: mapped };
}