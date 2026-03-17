// app/(tabs)/calendar/fixtures/startlist.ts

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
export function getMockStartlist(raceId: string): StartlistData {
  return {
    raceId,
    lastUpdatedISO: new Date().toISOString(),
    teams: [
      {
        id: "team-1",
        name: "Team Alpha",
        riders: [
          { id: "r1", name: "Rider One", countryCode: "NO", role: "Leader" },
          { id: "r2", name: "Rider Two", countryCode: "DK", role: "Sprinter" },
          { id: "r3", name: "Rider Three", countryCode: "SE", role: "Domestique" },
        ],
      },
      {
        id: "team-2",
        name: "Team Bravo",
        riders: [
          { id: "r4", name: "Rider Four", countryCode: "FR", role: "Climber" },
          { id: "r5", name: "Rider Five", countryCode: "BE", role: "Domestique" },
          { id: "r6", name: "Rider Six", countryCode: "NL", role: "Sprinter" },
        ],
      },
    ],
  };
}
