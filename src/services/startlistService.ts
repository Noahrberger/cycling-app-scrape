import { getStartlistRecord } from "@/repositories/startlistRepository";
import type { ServiceResult } from "@/types/service";
import type { StartlistViewData } from "@/types/viewModels";

export async function getStartlist(
  raceId: string
): Promise<ServiceResult<StartlistViewData>> {

  const raw = await getStartlistRecord(raceId);

  if (!raw) {
    return { ok: false, error: "No startlist found" };
  }

  const mapped: StartlistViewData = {
    raceId,
    lastUpdatedISO: raw.info.date_start,
    teams: raw.teams.map((team) => ({
      teamId: String(team.team),
      name: team.name,
      riders: team.riders.map((rider) => ({
        id: String(rider.rider_id),
        name: formatRiderName(rider.ridername),
        countryCode: rider.nation.toUpperCase(),
      })),
    })),
  };

  return { ok: true, data: mapped };
}

// PCS leverer navn som "POGAČAR Tadej" — vi snur til "Tadej Pogačar"
function formatRiderName(raw: string): string {
  const parts = raw.split(" ");
  if (parts.length < 2) return raw;
  const lastName = parts[0];
  const firstName = parts.slice(1).join(" ");
  return `${firstName} ${lastName.charAt(0).toUpperCase()}${lastName.slice(1).toLowerCase()}`;
}