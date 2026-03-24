// src/fixtures/results.ts

export type ResultCategory = "stage" | "gc" | "points" | "kom" | "youth" | "team";
export type ResultUnit = "time" | "points";

export type StageOption = {
  stageNumber: number;
  label: string;
};

export type ResultRow =
  | {
      id: string;
      riderId?: string;
      rank: number;
      riderName: string;
      teamName?: string;
      unit: "time";
      totalTime?: string;
      gap?: string;
    }
  | {
      id: string;
      riderId?: string;
      rank: number;
      riderName: string;
      teamName?: string;
      unit: "points";
      points: number;
    };

export type ResultsData = {
  raceId: string;
  stageOptions: StageOption[];
  resultsByStageAndCategory: Record<string, Record<ResultCategory, ResultRow[]>>;
  lastUpdatedISO?: string;
};

function makeTimeRows(
  prefix: string,
  riders: { riderId: string; name: string; team: string }[],
  leaderTime: string,
  gaps: string[]
): ResultRow[] {
  return riders.map((rider, index) => {
    if (index === 0) {
      return {
        id: `${prefix}-${index + 1}`,
        riderId: rider.riderId,
        rank: index + 1,
        riderName: rider.name,
        teamName: rider.team,
        unit: "time",
        totalTime: leaderTime,
      };
    }

    return {
      id: `${prefix}-${index + 1}`,
      riderId: rider.riderId,
      rank: index + 1,
      riderName: rider.name,
      teamName: rider.team,
      unit: "time",
      gap: gaps[index - 1] ?? "+0:00",
    };
  });
}

function makePointsRows(
  prefix: string,
  rows: { riderId?: string; riderName: string; teamName: string; points: number }[]
): ResultRow[] {
  return rows.map((row, index) => ({
    id: `${prefix}-${index + 1}`,
    riderId: row.riderId,
    rank: index + 1,
    riderName: row.riderName,
    teamName: row.teamName,
    unit: "points",
    points: row.points,
  }));
}

const MOCK_RESULTS_BY_RACE_ID: Record<string, ResultsData> = {
  "tour-de-france": {
    raceId: "tour-de-france",
    lastUpdatedISO: new Date().toISOString(),
    stageOptions: [
      { stageNumber: 1, label: "Stage 1" },
      { stageNumber: 2, label: "Stage 2" },
      { stageNumber: 3, label: "Stage 3" },
    ],
    resultsByStageAndCategory: {
      latest: {
        stage: makeTimeRows(
          "tdf-latest-stage",
          [
            { riderId: "jonas-vingegaard", name: "Jonas Vingegaard", team: "Visma | Lease a Bike" },
            { riderId: "tadej-pogacar", name: "Tadej Pogačar", team: "UAE Team Emirates" },
            { riderId: "remco-evenepoel", name: "Remco Evenepoel", team: "Soudal Quick-Step" },
          ],
          "4:11:32",
          ["+0:04", "+0:09"]
        ),
        gc: makeTimeRows(
          "tdf-latest-gc",
          [
            { riderId: "tadej-pogacar", name: "Tadej Pogačar", team: "UAE Team Emirates" },
            { riderId: "jonas-vingegaard", name: "Jonas Vingegaard", team: "Visma | Lease a Bike" },
            { riderId: "remco-evenepoel", name: "Remco Evenepoel", team: "Soudal Quick-Step" },
            { riderId: "primoz-roglic", name: "Primož Roglič", team: "Bora-Hansgrohe" },
            { riderId: "carlos-rodriguez", name: "Carlos Rodríguez", team: "Ineos Grenadiers" },
          ],
          "18:42:11",
          ["+0:28", "+1:04", "+1:51", "+2:17"]
        ),
        youth: makeTimeRows(
          "tdf-latest-youth",
          [
            { riderId: "remco-evenepoel", name: "Remco Evenepoel", team: "Soudal Quick-Step" },
            { riderId: "carlos-rodriguez", name: "Carlos Rodríguez", team: "Ineos Grenadiers" },
            { riderId: "juan-ayuso", name: "Juan Ayuso", team: "UAE Team Emirates" },
          ],
          "18:43:55",
          ["+0:42", "+1:10"]
        ),
        team: makeTimeRows(
          "tdf-latest-team",
          [
            { riderId: "uae-team", name: "UAE Team Emirates", team: "Team classification" },
            { riderId: "visma-team", name: "Visma | Lease a Bike", team: "Team classification" },
            { riderId: "ineos-team", name: "Ineos Grenadiers", team: "Team classification" },
          ],
          "56:12:03",
          ["+0:33", "+1:18"]
        ),
      points: makePointsRows("tdf-latest-points", [
  {
    riderId: "jasper-philipsen",
    riderName: "Jasper Philipsen",
    teamName: "Alpecin-Deceuninck",
    points: 112,
  },
  {
    riderId: "biniam-girmay",
    riderName: "Biniam Girmay",
    teamName: "Intermarché-Wanty",
    points: 96,
  },
  {
    riderId: "wout-van-aert",
    riderName: "Wout van Aert",
    teamName: "Visma | Lease a Bike",
    points: 88,
  },
]),
        kom: makePointsRows("tdf-latest-kom", [
          { riderName: "Giulio Ciccone", teamName: "Lidl-Trek", points: 41 },
          { riderName: "Richard Carapaz", teamName: "EF Education-EasyPost", points: 33 },
          { riderName: "Tadej Pogačar", teamName: "UAE Team Emirates", points: 27 },
        ]),
      },

      "1": {
        stage: makeTimeRows(
          "tdf-stage-1-stage",
          [
            { riderId: "jasper-philipsen", name: "Jasper Philipsen", team: "Alpecin-Deceuninck" },
            { riderId: "biniam-girmay", name: "Biniam Girmay", team: "Intermarché-Wanty" },
            { riderId: "wout-van-aert", name: "Wout van Aert", team: "Visma | Lease a Bike" },
          ],
          "4:05:14",
          ["+0:00", "+0:00"]
        ),
        gc: makeTimeRows(
          "tdf-stage-1-gc",
          [
            { riderId: "jasper-philipsen", name: "Jasper Philipsen", team: "Alpecin-Deceuninck" },
            { riderId: "biniam-girmay", name: "Biniam Girmay", team: "Intermarché-Wanty" },
            { riderId: "wout-van-aert", name: "Wout van Aert", team: "Visma | Lease a Bike" },
          ],
          "4:05:14",
          ["+0:00", "+0:00"]
        ),
        youth: makeTimeRows(
          "tdf-stage-1-youth",
          [
            { riderId: "remco-evenepoel", name: "Remco Evenepoel", team: "Soudal Quick-Step" },
            { riderId: "juan-ayuso", name: "Juan Ayuso", team: "UAE Team Emirates" },
            { riderId: "carlos-rodriguez", name: "Carlos Rodríguez", team: "Ineos Grenadiers" },
          ],
          "4:05:14",
          ["+0:00", "+0:00"]
        ),
        team: makeTimeRows(
          "tdf-stage-1-team",
          [
            { riderId: "visma-team", name: "Visma | Lease a Bike", team: "Team classification" },
            { riderId: "uae-team", name: "UAE Team Emirates", team: "Team classification" },
            { riderId: "soudal-team", name: "Soudal Quick-Step", team: "Team classification" },
          ],
          "12:18:45",
          ["+0:07", "+0:19"]
        ),
        points: makePointsRows("tdf-stage-1-points", [
          { riderName: "Jasper Philipsen", teamName: "Alpecin-Deceuninck", points: 50 },
          { riderName: "Biniam Girmay", teamName: "Intermarché-Wanty", points: 30 },
          { riderName: "Wout van Aert", teamName: "Visma | Lease a Bike", points: 22 },
        ]),
        kom: makePointsRows("tdf-stage-1-kom", [
          { riderName: "Neilson Powless", teamName: "EF Education-EasyPost", points: 8 },
          { riderName: "Toms Skujins", teamName: "Lidl-Trek", points: 5 },
          { riderName: "Magnus Cort", teamName: "Uno-X Mobility", points: 3 },
        ]),
      },

      "2": {
        stage: makeTimeRows(
          "tdf-stage-2-stage",
          [
            { riderId: "tadej-pogacar", name: "Tadej Pogačar", team: "UAE Team Emirates" },
            { riderId: "jonas-vingegaard", name: "Jonas Vingegaard", team: "Visma | Lease a Bike" },
            { riderId: "remco-evenepoel", name: "Remco Evenepoel", team: "Soudal Quick-Step" },
          ],
          "4:22:48",
          ["+0:06", "+0:17"]
        ),
        gc: makeTimeRows(
          "tdf-stage-2-gc",
          [
            { riderId: "tadej-pogacar", name: "Tadej Pogačar", team: "UAE Team Emirates" },
            { riderId: "jonas-vingegaard", name: "Jonas Vingegaard", team: "Visma | Lease a Bike" },
            { riderId: "remco-evenepoel", name: "Remco Evenepoel", team: "Soudal Quick-Step" },
          ],
          "8:28:02",
          ["+0:06", "+0:17"]
        ),
        youth: makeTimeRows(
          "tdf-stage-2-youth",
          [
            { riderId: "remco-evenepoel", name: "Remco Evenepoel", team: "Soudal Quick-Step" },
            { riderId: "juan-ayuso", name: "Juan Ayuso", team: "UAE Team Emirates" },
            { riderId: "carlos-rodriguez", name: "Carlos Rodríguez", team: "Ineos Grenadiers" },
          ],
          "8:28:19",
          ["+0:35", "+0:51"]
        ),
        team: makeTimeRows(
          "tdf-stage-2-team",
          [
            { riderId: "uae-team", name: "UAE Team Emirates", team: "Team classification" },
            { riderId: "visma-team", name: "Visma | Lease a Bike", team: "Team classification" },
            { riderId: "ineos-team", name: "Ineos Grenadiers", team: "Team classification" },
          ],
          "25:10:22",
          ["+0:24", "+1:02"]
        ),
        points: makePointsRows("tdf-stage-2-points", [
          { riderName: "Tadej Pogačar", teamName: "UAE Team Emirates", points: 25 },
          { riderName: "Jonas Vingegaard", teamName: "Visma | Lease a Bike", points: 20 },
          { riderName: "Remco Evenepoel", teamName: "Soudal Quick-Step", points: 16 },
        ]),
        kom: makePointsRows("tdf-stage-2-kom", [
          { riderName: "Tadej Pogačar", teamName: "UAE Team Emirates", points: 18 },
          { riderName: "Jonas Vingegaard", teamName: "Visma | Lease a Bike", points: 12 },
          { riderName: "Giulio Ciccone", teamName: "Lidl-Trek", points: 8 },
        ]),
      },

      "3": {
        stage: makeTimeRows(
          "tdf-stage-3-stage",
          [
            { riderId: "jonas-vingegaard", name: "Jonas Vingegaard", team: "Visma | Lease a Bike" },
            { riderId: "tadej-pogacar", name: "Tadej Pogačar", team: "UAE Team Emirates" },
            { riderId: "remco-evenepoel", name: "Remco Evenepoel", team: "Soudal Quick-Step" },
          ],
          "4:11:32",
          ["+0:04", "+0:09"]
        ),
        gc: makeTimeRows(
          "tdf-stage-3-gc",
          [
            { riderId: "tadej-pogacar", name: "Tadej Pogačar", team: "UAE Team Emirates" },
            { riderId: "jonas-vingegaard", name: "Jonas Vingegaard", team: "Visma | Lease a Bike" },
            { riderId: "remco-evenepoel", name: "Remco Evenepoel", team: "Soudal Quick-Step" },
            { riderId: "primoz-roglic", name: "Primož Roglič", team: "Bora-Hansgrohe" },
            { riderId: "carlos-rodriguez", name: "Carlos Rodríguez", team: "Ineos Grenadiers" },
          ],
          "12:39:34",
          ["+0:10", "+0:26", "+1:13", "+1:49"]
        ),
        youth: makeTimeRows(
          "tdf-stage-3-youth",
          [
            { riderId: "remco-evenepoel", name: "Remco Evenepoel", team: "Soudal Quick-Step" },
            { riderId: "carlos-rodriguez", name: "Carlos Rodríguez", team: "Ineos Grenadiers" },
            { riderId: "juan-ayuso", name: "Juan Ayuso", team: "UAE Team Emirates" },
          ],
          "12:39:55",
          ["+0:31", "+0:58"]
        ),
        team: makeTimeRows(
          "tdf-stage-3-team",
          [
            { riderId: "uae-team", name: "UAE Team Emirates", team: "Team classification" },
            { riderId: "visma-team", name: "Visma | Lease a Bike", team: "Team classification" },
            { riderId: "ineos-team", name: "Ineos Grenadiers", team: "Team classification" },
          ],
          "38:05:01",
          ["+0:17", "+0:55"]
        ),
        points: makePointsRows("tdf-stage-3-points", [
          { riderName: "Jasper Philipsen", teamName: "Alpecin-Deceuninck", points: 74 },
          { riderName: "Wout van Aert", teamName: "Visma | Lease a Bike", points: 61 },
          { riderName: "Biniam Girmay", teamName: "Intermarché-Wanty", points: 56 },
        ]),
        kom: makePointsRows("tdf-stage-3-kom", [
          { riderName: "Giulio Ciccone", teamName: "Lidl-Trek", points: 26 },
          { riderName: "Tadej Pogačar", teamName: "UAE Team Emirates", points: 22 },
          { riderName: "Richard Carapaz", teamName: "EF Education-EasyPost", points: 19 },
        ]),
      },
    },
  },

  "giro-ditalia": {
    raceId: "giro-ditalia",
    lastUpdatedISO: new Date().toISOString(),
    stageOptions: [
      { stageNumber: 1, label: "Stage 1" },
      { stageNumber: 2, label: "Stage 2" },
    ],
    resultsByStageAndCategory: {
      latest: {
        stage: makeTimeRows(
          "giro-latest-stage",
          [
            { riderId: "primoz-roglic", name: "Primož Roglič", team: "Bora-Hansgrohe" },
            { riderId: "juan-ayuso", name: "Juan Ayuso", team: "UAE Team Emirates" },
            { riderId: "geraint-thomas", name: "Geraint Thomas", team: "Ineos Grenadiers" },
          ],
          "4:33:15",
          ["+0:05", "+0:21"]
        ),
        gc: makeTimeRows(
          "giro-latest-gc",
          [
            { riderId: "primoz-roglic", name: "Primož Roglič", team: "Bora-Hansgrohe" },
            { riderId: "juan-ayuso", name: "Juan Ayuso", team: "UAE Team Emirates" },
            { riderId: "geraint-thomas", name: "Geraint Thomas", team: "Ineos Grenadiers" },
            { riderId: "antonio-tiberi", name: "Antonio Tiberi", team: "Bahrain Victorious" },
          ],
          "9:18:42",
          ["+0:12", "+0:39", "+1:01"]
        ),
        youth: makeTimeRows(
          "giro-latest-youth",
          [
            { riderId: "juan-ayuso", name: "Juan Ayuso", team: "UAE Team Emirates" },
            { riderId: "antonio-tiberi", name: "Antonio Tiberi", team: "Bahrain Victorious" },
            { riderId: "cian-uijtdebroeks", name: "Cian Uijtdebroeks", team: "Visma | Lease a Bike" },
          ],
          "9:18:54",
          ["+0:22", "+0:55"]
        ),
        team: makeTimeRows(
          "giro-latest-team",
          [
            { riderId: "bora-team", name: "Bora-Hansgrohe", team: "Team classification" },
            { riderId: "uae-team", name: "UAE Team Emirates", team: "Team classification" },
            { riderId: "ineos-team", name: "Ineos Grenadiers", team: "Team classification" },
          ],
          "28:03:55",
          ["+0:28", "+1:04"]
        ),
        points: makePointsRows("giro-latest-points", [
          { riderName: "Olav Kooij", teamName: "Visma | Lease a Bike", points: 68 },
          { riderName: "Kaden Groves", teamName: "Alpecin-Deceuninck", points: 62 },
          { riderName: "Mads Pedersen", teamName: "Lidl-Trek", points: 57 },
        ]),
        kom: makePointsRows("giro-latest-kom", [
          { riderName: "Romain Bardet", teamName: "dsm-firmenich", points: 24 },
          { riderName: "Antonio Tiberi", teamName: "Bahrain Victorious", points: 19 },
          { riderName: "Primož Roglič", teamName: "Bora-Hansgrohe", points: 12 },
        ]),
      },

      "1": {
        stage: makeTimeRows(
          "giro-stage-1-stage",
          [
            { riderId: "mads-pedersen", name: "Mads Pedersen", team: "Lidl-Trek" },
            { riderId: "olav-kooij", name: "Olav Kooij", team: "Visma | Lease a Bike" },
            { riderId: "kaden-groves", name: "Kaden Groves", team: "Alpecin-Deceuninck" },
          ],
          "3:58:11",
          ["+0:00", "+0:00"]
        ),
        gc: makeTimeRows(
          "giro-stage-1-gc",
          [
            { riderId: "mads-pedersen", name: "Mads Pedersen", team: "Lidl-Trek" },
            { riderId: "olav-kooij", name: "Olav Kooij", team: "Visma | Lease a Bike" },
            { riderId: "kaden-groves", name: "Kaden Groves", team: "Alpecin-Deceuninck" },
          ],
          "3:58:11",
          ["+0:00", "+0:00"]
        ),
        youth: makeTimeRows(
          "giro-stage-1-youth",
          [
            { riderId: "juan-ayuso", name: "Juan Ayuso", team: "UAE Team Emirates" },
            { riderId: "antonio-tiberi", name: "Antonio Tiberi", team: "Bahrain Victorious" },
            { riderId: "cian-uijtdebroeks", name: "Cian Uijtdebroeks", team: "Visma | Lease a Bike" },
          ],
          "3:58:11",
          ["+0:00", "+0:00"]
        ),
        team: makeTimeRows(
          "giro-stage-1-team",
          [
            { riderId: "lidl-team", name: "Lidl-Trek", team: "Team classification" },
            { riderId: "visma-team", name: "Visma | Lease a Bike", team: "Team classification" },
            { riderId: "uae-team", name: "UAE Team Emirates", team: "Team classification" },
          ],
          "11:57:20",
          ["+0:08", "+0:16"]
        ),
        points: makePointsRows("giro-stage-1-points", [
          { riderName: "Mads Pedersen", teamName: "Lidl-Trek", points: 50 },
          { riderName: "Olav Kooij", teamName: "Visma | Lease a Bike", points: 30 },
          { riderName: "Kaden Groves", teamName: "Alpecin-Deceuninck", points: 22 },
        ]),
        kom: makePointsRows("giro-stage-1-kom", [
          { riderName: "Romain Bardet", teamName: "dsm-firmenich", points: 10 },
          { riderName: "Davide Formolo", teamName: "Movistar Team", points: 6 },
          { riderName: "Antonio Tiberi", teamName: "Bahrain Victorious", points: 3 },
        ]),
      },

      "2": {
        stage: makeTimeRows(
          "giro-stage-2-stage",
          [
            { riderId: "primoz-roglic", name: "Primož Roglič", team: "Bora-Hansgrohe" },
            { riderId: "juan-ayuso", name: "Juan Ayuso", team: "UAE Team Emirates" },
            { riderId: "geraint-thomas", name: "Geraint Thomas", team: "Ineos Grenadiers" },
          ],
          "4:33:15",
          ["+0:05", "+0:21"]
        ),
        gc: makeTimeRows(
          "giro-stage-2-gc",
          [
            { riderId: "primoz-roglic", name: "Primož Roglič", team: "Bora-Hansgrohe" },
            { riderId: "juan-ayuso", name: "Juan Ayuso", team: "UAE Team Emirates" },
            { riderId: "geraint-thomas", name: "Geraint Thomas", team: "Ineos Grenadiers" },
            { riderId: "antonio-tiberi", name: "Antonio Tiberi", team: "Bahrain Victorious" },
          ],
          "8:31:26",
          ["+0:12", "+0:39", "+1:01"]
        ),
        youth: makeTimeRows(
          "giro-stage-2-youth",
          [
            { riderId: "juan-ayuso", name: "Juan Ayuso", team: "UAE Team Emirates" },
            { riderId: "antonio-tiberi", name: "Antonio Tiberi", team: "Bahrain Victorious" },
            { riderId: "cian-uijtdebroeks", name: "Cian Uijtdebroeks", team: "Visma | Lease a Bike" },
          ],
          "8:31:38",
          ["+0:22", "+0:55"]
        ),
        team: makeTimeRows(
          "giro-stage-2-team",
          [
            { riderId: "bora-team", name: "Bora-Hansgrohe", team: "Team classification" },
            { riderId: "uae-team", name: "UAE Team Emirates", team: "Team classification" },
            { riderId: "ineos-team", name: "Ineos Grenadiers", team: "Team classification" },
          ],
          "25:40:10",
          ["+0:28", "+1:04"]
        ),
        points: makePointsRows("giro-stage-2-points", [
          { riderName: "Primož Roglič", teamName: "Bora-Hansgrohe", points: 25 },
          { riderName: "Juan Ayuso", teamName: "UAE Team Emirates", points: 20 },
          { riderName: "Geraint Thomas", teamName: "Ineos Grenadiers", points: 16 },
        ]),
        kom: makePointsRows("giro-stage-2-kom", [
          { riderName: "Romain Bardet", teamName: "dsm-firmenich", points: 18 },
          { riderName: "Antonio Tiberi", teamName: "Bahrain Victorious", points: 12 },
          { riderName: "Primož Roglič", teamName: "Bora-Hansgrohe", points: 8 },
        ]),
      },
    },
  },
};

export function getMockResults(raceId: string): ResultsData {
  return (
    MOCK_RESULTS_BY_RACE_ID[raceId] ?? {
      raceId,
      stageOptions: [],
      resultsByStageAndCategory: {},
      lastUpdatedISO: new Date().toISOString(),
    }
  );
}