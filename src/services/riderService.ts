import { getRiderRecord } from "@/repositories/riderRepository";
import type { ServiceResult } from "@/types/service";

export type RiderProfileData = {
  id: string;
  name: string;
  countryCode?: string;
  age?: number;
  teamId: string;
  teamName: string;
  role?: string;
  height?: number;
  weight?: number;
  imgUrl?: string;
};

export async function getRiderProfile(
  riderId: string
): Promise<ServiceResult<RiderProfileData>> {

  const raw = await getRiderRecord(riderId);

  if (!raw) {
    return { ok: false, error: `No rider found for id: ${riderId}` };
  }

  return {
    ok: true,
    data: {
      id: riderId,
      name: raw.info.ridername,
      countryCode: raw.info.nation.toUpperCase(),
      age: raw.info.age,
      teamId: "",
      teamName: raw.info.teamname,
      role: undefined,
      height: raw.info.height,
      weight: raw.info.weight,
      imgUrl: raw.info.img,
    },
  };
}