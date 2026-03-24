

export type StartlistRider = {
  id: string;
  name: string;
  countryCode?: string; // "NO", "DK" osv (valgfritt)
  role?: "Leader" | "Sprinter" | "Climber" | "Domestique";
};

export type StartlistTeam = {
  id: string;
  name: string;
  riders: StartlistRider[];
};

export type StartlistData = {
  raceId: string;
  teams: StartlistTeam[];
  lastUpdatedISO?: string;
};

// Enkel mock. Senere kommer dette fra API.
const MOCK_STARTLISTS_BY_RACE_ID: Record<string, StartlistData> = {
  "tour-de-france": {
    raceId: "tour-de-france",
    lastUpdatedISO: new Date().toISOString(),
    teams: [
      {
        id: "visma",
        name: "Visma | Lease a Bike",
        riders: [
          { id: "jonas-vingegaard", name: "Jonas Vingegaard", countryCode: "DK", role: "Leader" },
        ],
      },
    ],
  },

  "giro-ditalia": {
    raceId: "giro-ditalia",
    lastUpdatedISO: new Date().toISOString(),
    teams: [
      {
        id: "uae",
        name: "UAE Team Emirates",
        riders: [
          { id: "tadej-pogacar", name: "Tadej Pogačar", countryCode: "SI", role: "Leader" },
        ],
      },
    ],
  },
};

export function getMockStartlist(raceId: string): StartlistData {
  return (
    MOCK_STARTLISTS_BY_RACE_ID[raceId] ?? {
      raceId,
      lastUpdatedISO: new Date().toISOString(),
      teams: [],
    }
  );
}
