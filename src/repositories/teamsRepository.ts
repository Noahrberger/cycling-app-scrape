import { getMockTeam, getMockTeams } from "@/fixtures/teams";
import type { PCSTeam, PCSTeamsResponse } from "@/types/api";

// Mapping fra intern string-id → PCS team number
export const TEAM_ID_TO_PCS_ID: Record<string, number> = {
  "uae": 1253,
  "visma": 1001,
  "soudal": 1328,
  "alpecin": 1100,
  "ineos": 1200,
};

export async function getTeamsRecord(): Promise<PCSTeamsResponse> {
  // Bytt ut når ekte API er klart:
  // const res = await fetch("https://pcs-api.com/teams");
  // return res.json();
  return getMockTeams();
}

export async function getTeamRecord(teamId: string): Promise<PCSTeam | null> {
  // Bytt ut når ekte API er klart:
  // const res = await fetch(`https://pcs-api.com/team/${teamId}`);
  // return res.json();
  const numericId = TEAM_ID_TO_PCS_ID[teamId] ?? Number(teamId);
  if (isNaN(numericId)) return null;
  return getMockTeam(numericId);
}