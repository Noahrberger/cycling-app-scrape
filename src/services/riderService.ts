import { getRiderRecord, getTeamRecord } from "@/repositories/riderRepository";
import type { Rider, Team } from "@/types/models";
import type { ServiceResult } from "@/types/service";

export type RiderProfileData = {
  id: string;
  name: string;
  countryCode?: string;
  age?: number;
  teamId: string;
  teamName: string;
  role?: string;
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function mapRiderToProfile(rider: Rider, team: Team | null): RiderProfileData {
  return {
    id: rider.id,
    name: rider.name,
    countryCode: rider.countryCode,
    age: rider.age,
    teamId: rider.teamId,
    teamName: team?.name ?? "Unknown Team",
    role: rider.role,
  };
}

export async function getRiderProfile(
  riderId: string
): Promise<ServiceResult<RiderProfileData>> {
  await delay(120);

  const rider = getRiderRecord(riderId);
  if (!rider) {
    return { ok: false, error: `No rider found for id: ${riderId}` };
  }

  const team = getTeamRecord(rider.teamId);

  return {
    ok: true,
    data: mapRiderToProfile(rider, team),
  };
}