import type { PCSResultsResponse } from "@/types/api";

export const MOCK_PCS_RESULTS: Record<string, PCSResultsResponse> = {
  "tour-de-france": {
    info: {
      name: "Tour de France",
      stage: "Stage 16",
      race_date: "2025-07-22",
      distance: 171.5,
    },
    results: [
      {
        id: 302813,
        race: 302813,
        name: "Stage",
        entries: [
          {
            id: 1, rnk: 1, rider_id: 196424,
            last_name: "Vingegaard", first_name: "Jonas",
            url: "", nation: "dk", team_id: 1001,
            team: "Visma - Lease a Bike", time: "04:11:32",
            pcs_pnts: 0, uci_pnts: 210,
          },
          {
            id: 2, rnk: 2, rider_id: 194619,
            last_name: "Pogačar", first_name: "Tadej",
            url: "", nation: "si", team_id: 1002,
            team: "UAE Team Emirates", time: "+00:04",
            pcs_pnts: 0, uci_pnts: 150,
          },
          {
            id: 3, rnk: 3, rider_id: 212377,
            last_name: "Evenepoel", first_name: "Remco",
            url: "", nation: "be", team_id: 1003,
            team: "Soudal Quick-Step", time: "+00:09",
            pcs_pnts: 0, uci_pnts: 110,
          },
        ],
      },
      {
        id: 302814,
        race: 302813,
        name: "General",
        entries: [
          {
            id: 4, rnk: 1, rider_id: 194619,
            last_name: "Pogačar", first_name: "Tadej",
            url: "", nation: "si", team_id: 1002,
            team: "UAE Team Emirates", time: "18:42:11",
            pcs_pnts: 0, uci_pnts: 0,
          },
          {
            id: 5, rnk: 2, rider_id: 196424,
            last_name: "Vingegaard", first_name: "Jonas",
            url: "", nation: "dk", team_id: 1001,
            team: "Visma - Lease a Bike", time: "+00:28",
            pcs_pnts: 0, uci_pnts: 0,
          },
        ],
      },
      {
        id: 302815,
        race: 302813,
        name: "Points",
        entries: [
          {
            id: 6, rnk: 1, rider_id: 194622,
            last_name: "Philipsen", first_name: "Jasper",
            url: "", nation: "be", team_id: 1004,
            team: "Alpecin-Deceuninck", time: "",
            pcs_pnts: 112, uci_pnts: 0,
          },
          {
            id: 7, rnk: 2, rider_id: 194623,
            last_name: "Girmay", first_name: "Biniam",
            url: "", nation: "er", team_id: 1005,
            team: "Intermarché-Circus-Wanty", time: "",
            pcs_pnts: 96, uci_pnts: 0,
          },
        ],
      },
      {
        id: 302816,
        race: 302813,
        name: "KOM",
        entries: [
          {
            id: 8, rnk: 1, rider_id: 194624,
            last_name: "Ciccone", first_name: "Giulio",
            url: "", nation: "it", team_id: 1006,
            team: "Lidl-Trek", time: "",
            pcs_pnts: 41, uci_pnts: 0,
          },
        ],
      },
      {
        id: 302817,
        race: 302813,
        name: "Youth",
        entries: [
          {
            id: 9, rnk: 1, rider_id: 212377,
            last_name: "Evenepoel", first_name: "Remco",
            url: "", nation: "be", team_id: 1003,
            team: "Soudal Quick-Step", time: "18:43:55",
            pcs_pnts: 0, uci_pnts: 0,
          },
        ],
      },
      {
        id: 302818,
        race: 302813,
        name: "Teams",
        entries: [
          {
            id: 10, rnk: 1, rider_id: 0,
            last_name: "UAE Team Emirates", first_name: "",
            url: "", nation: "", team_id: 1002,
            team: "UAE Team Emirates", time: "56:12:03",
            pcs_pnts: 0, uci_pnts: 0,
          },
        ],
      },
    ],
  },
};

export function getMockResults(raceId: string): PCSResultsResponse | null {
  return MOCK_PCS_RESULTS[raceId] ?? null;
}