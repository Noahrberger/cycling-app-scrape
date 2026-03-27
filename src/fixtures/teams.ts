import type { Team } from "@/types/models";

export const TEAMS: Team[] = [
  { id: "visma", name: "Visma | Lease a Bike", countryCode: "NL", shortName: "Visma" },
  { id: "uae", name: "UAE Team Emirates", countryCode: "AE", shortName: "UAE" },
  { id: "soudal", name: "Soudal Quick-Step", countryCode: "BE", shortName: "Soudal" },
  { id: "ineos", name: "Ineos Grenadiers", countryCode: "GB", shortName: "Ineos" },
  { id: "bora", name: "Bora-Hansgrohe", countryCode: "DE", shortName: "Bora" },

  // ➕ nye
  { id: "alpecin", name: "Alpecin-Deceuninck", countryCode: "BE" },
  { id: "lidl", name: "Lidl-Trek", countryCode: "US" },
  { id: "ef", name: "EF Education-EasyPost", countryCode: "US" },
  { id: "intermarche", name: "Intermarché-Wanty", countryCode: "BE" },
  { id: "dsm", name: "DSM-Firmenich", countryCode: "NL" },
];

// lookup
export const TEAMS_BY_ID: Record<string, Team> = Object.fromEntries(
  TEAMS.map((t) => [t.id, t])
);

export function getTeamById(teamId: string): Team | null {
  return TEAMS_BY_ID[teamId] ?? null;
}