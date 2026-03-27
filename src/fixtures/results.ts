// src/fixtures/results.ts

import type {
  ApiResultRow,
  ApiResultsResponse,
} from "@/types/api";

// ----------------------------
// Helpers (RAW generators)
// ----------------------------

function makeRiderTimeRows(
  prefix: string,
  riderIds: string[],
  leaderTime: string,
  gaps: string[]
): ApiResultRow[] {
  return riderIds.map((riderId, index) => {
    if (index === 0) {
      return {
        id: `${prefix}-${index + 1}`,
        entityType: "rider",
        riderId,
        rank: index + 1,
        unit: "time",
        totalTime: leaderTime,
      };
    }

    return {
      id: `${prefix}-${index + 1}`,
      entityType: "rider",
      riderId,
      rank: index + 1,
      unit: "time",
      gap: gaps[index - 1] ?? "+0:00",
    };
  });
}

function makeRiderPointsRows(
  prefix: string,
  rows: { riderId: string; points: number }[]
): ApiResultRow[] {
  return rows.map((row, index) => ({
    id: `${prefix}-${index + 1}`,
    entityType: "rider",
    riderId: row.riderId,
    rank: index + 1,
    unit: "points",
    points: row.points,
  }));
}

function makeTeamTimeRows(
  prefix: string,
  teamIds: string[],
  leaderTime: string,
  gaps: string[]
): ApiResultRow[] {
  return teamIds.map((teamId, index) => {
    if (index === 0) {
      return {
        id: `${prefix}-${index + 1}`,
        entityType: "team",
        teamId,
        rank: index + 1,
        unit: "time",
        totalTime: leaderTime,
      };
    }

    return {
      id: `${prefix}-${index + 1}`,
      entityType: "team",
      teamId,
      rank: index + 1,
      unit: "time",
      gap: gaps[index - 1] ?? "+0:00",
    };
  });
}

function makeTeamPointsRows(
  prefix: string,
  rows: { teamId: string; points: number }[]
): ApiResultRow[] {
  return rows.map((row, index) => ({
    id: `${prefix}-${index + 1}`,
    entityType: "team",
    teamId: row.teamId,
    rank: index + 1,
    unit: "points",
    points: row.points,
  }));
}

// ----------------------------
// MOCK DATA (API-style)
// ----------------------------

const MOCK_RESULTS_BY_RACE_ID: Record<string, ApiResultsResponse> = {
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
        stage: makeRiderTimeRows(
          "tdf-latest-stage",
          ["jonas-vingegaard", "tadej-pogacar", "remco-evenepoel"],
          "4:11:32",
          ["+0:04", "+0:09"]
        ),
        gc: makeRiderTimeRows(
          "tdf-latest-gc",
          [
            "tadej-pogacar",
            "jonas-vingegaard",
            "remco-evenepoel",
            "primoz-roglic",
            "carlos-rodriguez",
          ],
          "18:42:11",
          ["+0:28", "+1:04", "+1:51", "+2:17"]
        ),
        youth: makeRiderTimeRows(
          "tdf-latest-youth",
          ["remco-evenepoel", "carlos-rodriguez", "juan-ayuso"],
          "18:43:55",
          ["+0:42", "+1:10"]
        ),
        team: makeTeamTimeRows(
          "tdf-latest-team",
          ["uae", "visma", "ineos"],
          "56:12:03",
          ["+0:33", "+1:18"]
        ),
        points: makeRiderPointsRows("tdf-latest-points", [
          { riderId: "jasper-philipsen", points: 112 },
          { riderId: "biniam-girmay", points: 96 },
          { riderId: "wout-van-aert", points: 88 },
        ]),
        kom: makeRiderPointsRows("tdf-latest-kom", [
          { riderId: "giulio-ciccone", points: 41 },
          { riderId: "richard-carapaz", points: 33 },
          { riderId: "tadej-pogacar", points: 27 },
        ]),
      },

      "1": {
        stage: makeRiderTimeRows(
          "tdf-stage-1-stage",
          ["jasper-philipsen", "biniam-girmay", "wout-van-aert"],
          "4:05:14",
          ["+0:00", "+0:00"]
        ),
        gc: makeRiderTimeRows(
          "tdf-stage-1-gc",
          ["jasper-philipsen", "biniam-girmay", "wout-van-aert"],
          "4:05:14",
          ["+0:00", "+0:00"]
        ),
        youth: makeRiderTimeRows(
          "tdf-stage-1-youth",
          ["remco-evenepoel", "juan-ayuso", "carlos-rodriguez"],
          "4:05:14",
          ["+0:00", "+0:00"]
        ),
        team: makeTeamTimeRows(
          "tdf-stage-1-team",
          ["visma", "uae", "soudal"],
          "12:18:45",
          ["+0:07", "+0:19"]
        ),
        points: makeRiderPointsRows("tdf-stage-1-points", [
          { riderId: "jasper-philipsen", points: 50 },
          { riderId: "biniam-girmay", points: 30 },
          { riderId: "wout-van-aert", points: 22 },
        ]),
        kom: makeRiderPointsRows("tdf-stage-1-kom", [
          { riderId: "neilson-powless", points: 8 },
          { riderId: "toms-skujins", points: 5 },
          { riderId: "magnus-cort", points: 3 },
        ]),
      },

      "2": {
        stage: makeRiderTimeRows(
          "tdf-stage-2-stage",
          ["tadej-pogacar", "jonas-vingegaard", "remco-evenepoel"],
          "4:22:48",
          ["+0:06", "+0:17"]
        ),
        gc: makeRiderTimeRows(
          "tdf-stage-2-gc",
          ["tadej-pogacar", "jonas-vingegaard", "remco-evenepoel"],
          "8:28:02",
          ["+0:06", "+0:17"]
        ),
        youth: makeRiderTimeRows(
          "tdf-stage-2-youth",
          ["remco-evenepoel", "juan-ayuso", "carlos-rodriguez"],
          "8:28:19",
          ["+0:35", "+0:51"]
        ),
        team: makeTeamTimeRows(
          "tdf-stage-2-team",
          ["uae", "visma", "ineos"],
          "25:10:22",
          ["+0:24", "+1:02"]
        ),
        points: makeRiderPointsRows("tdf-stage-2-points", [
          { riderId: "tadej-pogacar", points: 25 },
          { riderId: "jonas-vingegaard", points: 20 },
          { riderId: "remco-evenepoel", points: 16 },
        ]),
        kom: makeRiderPointsRows("tdf-stage-2-kom", [
          { riderId: "tadej-pogacar", points: 18 },
          { riderId: "jonas-vingegaard", points: 12 },
          { riderId: "giulio-ciccone", points: 8 },
        ]),
      },

      "3": {
        stage: makeRiderTimeRows(
          "tdf-stage-3-stage",
          ["jonas-vingegaard", "tadej-pogacar", "remco-evenepoel"],
          "4:11:32",
          ["+0:04", "+0:09"]
        ),
        gc: makeRiderTimeRows(
          "tdf-stage-3-gc",
          [
            "tadej-pogacar",
            "jonas-vingegaard",
            "remco-evenepoel",
            "primoz-roglic",
            "carlos-rodriguez",
          ],
          "12:39:34",
          ["+0:10", "+0:26", "+1:13", "+1:49"]
        ),
        youth: makeRiderTimeRows(
          "tdf-stage-3-youth",
          ["remco-evenepoel", "carlos-rodriguez", "juan-ayuso"],
          "12:39:55",
          ["+0:31", "+0:58"]
        ),
        team: makeTeamTimeRows(
          "tdf-stage-3-team",
          ["uae", "visma", "ineos"],
          "38:05:01",
          ["+0:17", "+0:55"]
        ),
        points: makeRiderPointsRows("tdf-stage-3-points", [
          { riderId: "jasper-philipsen", points: 74 },
          { riderId: "wout-van-aert", points: 61 },
          { riderId: "biniam-girmay", points: 56 },
        ]),
        kom: makeRiderPointsRows("tdf-stage-3-kom", [
          { riderId: "giulio-ciccone", points: 26 },
          { riderId: "tadej-pogacar", points: 22 },
          { riderId: "richard-carapaz", points: 19 },
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
        stage: makeRiderTimeRows(
          "giro-latest-stage",
          ["primoz-roglic", "juan-ayuso", "geraint-thomas"],
          "4:33:15",
          ["+0:05", "+0:21"]
        ),
        gc: makeRiderTimeRows(
          "giro-latest-gc",
          ["primoz-roglic", "juan-ayuso", "geraint-thomas", "antonio-tiberi"],
          "9:18:42",
          ["+0:12", "+0:39", "+1:01"]
        ),
        youth: makeRiderTimeRows(
          "giro-latest-youth",
          ["juan-ayuso", "antonio-tiberi", "cian-uijtdebroeks"],
          "9:18:54",
          ["+0:22", "+0:55"]
        ),
        team: makeTeamTimeRows(
          "giro-latest-team",
          ["bora", "uae", "ineos"],
          "28:03:55",
          ["+0:28", "+1:04"]
        ),
        points: makeRiderPointsRows("giro-latest-points", [
          { riderId: "olav-kooij", points: 68 },
          { riderId: "kaden-groves", points: 62 },
          { riderId: "mads-pedersen", points: 57 },
        ]),
        kom: makeRiderPointsRows("giro-latest-kom", [
          { riderId: "romain-bardet", points: 24 },
          { riderId: "antonio-tiberi", points: 19 },
          { riderId: "primoz-roglic", points: 12 },
        ]),
      },

      "1": {
        stage: makeRiderTimeRows(
          "giro-stage-1-stage",
          ["mads-pedersen", "olav-kooij", "kaden-groves"],
          "3:58:11",
          ["+0:00", "+0:00"]
        ),
        gc: makeRiderTimeRows(
          "giro-stage-1-gc",
          ["mads-pedersen", "olav-kooij", "kaden-groves"],
          "3:58:11",
          ["+0:00", "+0:00"]
        ),
        youth: makeRiderTimeRows(
          "giro-stage-1-youth",
          ["juan-ayuso", "antonio-tiberi", "cian-uijtdebroeks"],
          "3:58:11",
          ["+0:00", "+0:00"]
        ),
        team: makeTeamTimeRows(
          "giro-stage-1-team",
          ["lidl", "visma", "uae"],
          "11:57:20",
          ["+0:08", "+0:16"]
        ),
        points: makeRiderPointsRows("giro-stage-1-points", [
          { riderId: "mads-pedersen", points: 50 },
          { riderId: "olav-kooij", points: 30 },
          { riderId: "kaden-groves", points: 22 },
        ]),
        kom: makeRiderPointsRows("giro-stage-1-kom", [
          { riderId: "romain-bardet", points: 10 },
          { riderId: "davide-formolo", points: 6 },
          { riderId: "antonio-tiberi", points: 3 },
        ]),
      },

      "2": {
        stage: makeRiderTimeRows(
          "giro-stage-2-stage",
          ["primoz-roglic", "juan-ayuso", "geraint-thomas"],
          "4:33:15",
          ["+0:05", "+0:21"]
        ),
        gc: makeRiderTimeRows(
          "giro-stage-2-gc",
          ["primoz-roglic", "juan-ayuso", "geraint-thomas", "antonio-tiberi"],
          "8:31:26",
          ["+0:12", "+0:39", "+1:01"]
        ),
        youth: makeRiderTimeRows(
          "giro-stage-2-youth",
          ["juan-ayuso", "antonio-tiberi", "cian-uijtdebroeks"],
          "8:31:38",
          ["+0:22", "+0:55"]
        ),
        team: makeTeamTimeRows(
          "giro-stage-2-team",
          ["bora", "uae", "ineos"],
          "25:40:10",
          ["+0:28", "+1:04"]
        ),
        points: makeRiderPointsRows("giro-stage-2-points", [
          { riderId: "primoz-roglic", points: 25 },
          { riderId: "juan-ayuso", points: 20 },
          { riderId: "geraint-thomas", points: 16 },
        ]),
        kom: makeRiderPointsRows("giro-stage-2-kom", [
          { riderId: "romain-bardet", points: 18 },
          { riderId: "antonio-tiberi", points: 12 },
          { riderId: "primoz-roglic", points: 8 },
        ]),
      },
    },
  },
};

export function getMockResults(raceId: string): ApiResultsResponse {
  return (
    MOCK_RESULTS_BY_RACE_ID[raceId] ?? {
      raceId,
      stageOptions: [],
      resultsByStageAndCategory: {},
      lastUpdatedISO: new Date().toISOString(),
    }
  );
}