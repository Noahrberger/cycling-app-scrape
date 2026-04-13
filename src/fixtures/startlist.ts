import type { PCSStartlistResponse } from "@/types/api";

const MOCK_PCS_STARTLISTS: Record<string, PCSStartlistResponse> = {
  "tour-de-france": {
    info: {
      name: "Tour de France",
      date_start: "2026-07-04",
      date_end: "2026-07-26",
      classification: "2.UWT",
      final_startlist: 1,
      url: "https://www.procyclingstats.com/race/tour-de-france/2026/startlist",
    },
    teams: [
      {
        team: 1253,
        nr: 1,
        name: "UAE Team Emirates - XRG",
        url: "",
        riders: [
          { team: 1253, bib: 1, ridername: "POGAČAR Tadej", rider_id: 194619, url: "", nation: "si", name: "UAE Team Emirates - XRG" },
          { team: 1253, bib: 2, ridername: "ALMEIDA João", rider_id: 196333, url: "", nation: "pt", name: "UAE Team Emirates - XRG" },
          { team: 1253, bib: 3, ridername: "NARVÁEZ Jhonatan", rider_id: 189438, url: "", nation: "ec", name: "UAE Team Emirates - XRG" },
        ],
      },
      {
        team: 1001,
        nr: 11,
        name: "Visma - Lease a Bike",
        url: "",
        riders: [
          { team: 1001, bib: 11, ridername: "VINGEGAARD Jonas", rider_id: 196424, url: "", nation: "dk", name: "Visma - Lease a Bike" },
          { team: 1001, bib: 12, ridername: "VAN AERT Wout", rider_id: 168961, url: "", nation: "be", name: "Visma - Lease a Bike" },
          { team: 1001, bib: 13, ridername: "LAPORTE Christophe", rider_id: 172792, url: "", nation: "fr", name: "Visma - Lease a Bike" },
        ],
      },
      {
        team: 1328,
        nr: 21,
        name: "Soudal Quick-Step",
        url: "",
        riders: [
          { team: 1328, bib: 21, ridername: "EVENEPOEL Remco", rider_id: 212377, url: "", nation: "be", name: "Soudal Quick-Step" },
          { team: 1328, bib: 22, ridername: "JAKOBSEN Fabio", rider_id: 231768, url: "", nation: "nl", name: "Soudal Quick-Step" },
        ],
      },
    ],
  },

  "giro-ditalia": {
    info: {
      name: "Giro d'Italia",
      date_start: "2026-05-08",
      date_end: "2026-05-31",
      classification: "2.UWT",
      final_startlist: 1,
      url: "",
    },
    teams: [
      {
        team: 1002,
        nr: 1,
        name: "UAE Team Emirates - XRG",
        url: "",
        riders: [
          { team: 1002, bib: 1, ridername: "POGAČAR Tadej", rider_id: 194619, url: "", nation: "si", name: "UAE Team Emirates - XRG" },
        ],
      },
    ],
  },
};

export function getMockStartlist(raceId: string): PCSStartlistResponse | null {
  return MOCK_PCS_STARTLISTS[raceId] ?? null;
}