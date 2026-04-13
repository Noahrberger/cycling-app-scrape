import { getTeamRecord, getTeamsRecord } from "@/repositories/teamsRepository";
import type { ServiceResult } from "@/types/service";

export type TeamRiderView = {
  name: string;
  countryCode: string;
};

export type TeamView = {
  id: string;
  pcsId: number;
  name: string;
  countryCode: string;
  classification: string;
  riders: TeamRiderView[];
};

export type TeamsListView = {
  teams: TeamView[];
};

function formatRiderName(raw: string): string {
  const parts = raw.split(" ");
  if (parts.length < 2) return raw;
  const lastName = parts[0];
  const firstName = parts.slice(1).join(" ");
  return `${firstName} ${lastName.charAt(0).toUpperCase()}${lastName.slice(1).toLowerCase()}`;
}

export async function getTeams(): Promise<ServiceResult<TeamsListView>> {
  const raw = await getTeamsRecord();

  if (!raw?.data?.length) {
    return { ok: false, error: "No teams found" };
  }

  const teams: TeamView[] = raw.data.map((team) => ({
    id: String(team.team),
    pcsId: team.team,
    name: team.name,
    countryCode: team.nation.toUpperCase(),
    classification: team.classification,
    riders: team.riders.map((r) => ({
      name: formatRiderName(r.ridername),
      countryCode: r.nation.toUpperCase(),
    })),
  }));

  return { ok: true, data: { teams } };
}

export async function getTeam(teamId: string): Promise<ServiceResult<TeamView>> {
  const raw = await getTeamRecord(teamId);

  if (!raw) {
    return { ok: false, error: `No team found for id: ${teamId}` };
  }

  return {
    ok: true,
    data: {
      id: String(raw.team),
      pcsId: raw.team,
      name: raw.name,
      countryCode: raw.nation.toUpperCase(),
      classification: raw.classification,
      riders: raw.riders.map((r) => ({
        name: formatRiderName(r.ridername),
        countryCode: r.nation.toUpperCase(),
      })),
    },
  };
}