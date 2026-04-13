import type { PCSTeamsResponse } from "@/types/api";

export const MOCK_PCS_TEAMS: PCSTeamsResponse = {
  data: [
    {
      team: 1253, nation: "ae", name: "UAE Team Emirates - XRG",
      abbrev: "UAF", classification: "WT",
      url: "https://www.procyclingstats.com/team/uae-team-emirates-xrg-2026",
      riders: [
        { team: 1253, ridername: "POGAČAR Tadej", nation: "si", url: "" },
        { team: 1253, ridername: "ALMEIDA João", nation: "pt", url: "" },
        { team: 1253, ridername: "NARVÁEZ Jhonatan", nation: "ec", url: "" },
      ],
    },
    {
      team: 1001, nation: "nl", name: "Visma - Lease a Bike",
      abbrev: "VLB", classification: "WT",
      url: "",
      riders: [
        { team: 1001, ridername: "VINGEGAARD Jonas", nation: "dk", url: "" },
        { team: 1001, ridername: "VAN AERT Wout", nation: "be", url: "" },
        { team: 1001, ridername: "LAPORTE Christophe", nation: "fr", url: "" },
      ],
    },
    {
      team: 1328, nation: "be", name: "Soudal Quick-Step",
      abbrev: "SQS", classification: "WT",
      url: "",
      riders: [
        { team: 1328, ridername: "EVENEPOEL Remco", nation: "be", url: "" },
        { team: 1328, ridername: "JAKOBSEN Fabio", nation: "nl", url: "" },
      ],
    },
    {
      team: 1100, nation: "be", name: "Alpecin-Premier Tech",
      abbrev: "APT", classification: "WT",
      url: "",
      riders: [
        { team: 1100, ridername: "VAN DER POEL Mathieu", nation: "nl", url: "" },
        { team: 1100, ridername: "PHILIPSEN Jasper", nation: "be", url: "" },
      ],
    },
    {
      team: 1200, nation: "gb", name: "INEOS Grenadiers",
      abbrev: "IGD", classification: "WT",
      url: "",
      riders: [
        { team: 1200, ridername: "RODRIGUEZ Carlos", nation: "es", url: "" },
        { team: 1200, ridername: "THOMAS Geraint", nation: "gb", url: "" },
      ],
    },
  ],
};

export function getMockTeams(): PCSTeamsResponse {
  return MOCK_PCS_TEAMS;
}

export function getMockTeam(teamId: number): PCSTeamsResponse["data"][0] | null {
  return MOCK_PCS_TEAMS.data.find((t) => t.team === teamId) ?? null;
}
// Legg til nederst i fixtures/teams.ts
export function getTeamById(teamId: string): { id: string; name: string } | null {
  const numericId = Number(teamId);
  if (isNaN(numericId)) return null;
  const team = MOCK_PCS_TEAMS.data.find((t) => t.team === numericId);
  if (!team) return null;
  return {
    id: String(team.team),
    name: team.name,
  };
}