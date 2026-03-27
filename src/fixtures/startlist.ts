import type { ApiStartlistResponse } from "@/types/api";

const MOCK_STARTLISTS_BY_RACE_ID: Record<string, ApiStartlistResponse> = {
  "tour-de-france": {
    raceId: "tour-de-france",
    lastUpdatedISO: new Date().toISOString(),
    teams: [
      {
        teamId: "visma",
        riderIds: ["jonas-vingegaard"],
      },
    ],
  },

  "giro-ditalia": {
    raceId: "giro-ditalia",
    lastUpdatedISO: new Date().toISOString(),
    teams: [
      {
        teamId: "uae",
        riderIds: ["tadej-pogacar"],
      },
    ],
  },
};

export function getMockStartlist(raceId: string): ApiStartlistResponse {
  return (
    MOCK_STARTLISTS_BY_RACE_ID[raceId] ?? {
      raceId,
      lastUpdatedISO: new Date().toISOString(),
      teams: [],
    }
  );
}