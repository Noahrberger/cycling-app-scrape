export type ApiStartlistTeam = {
  teamId: string;
  riderIds: string[];
};

export type ApiStartlistResponse = {
  raceId: string;
  teams: ApiStartlistTeam[];
  lastUpdatedISO?: string;
};

export type ResultCategory = "stage" | "gc" | "points" | "kom" | "youth" | "team";
export type ResultUnit = "time" | "points";

export type ApiStageOption = {
  stageNumber: number;
  label: string;
};

export type ApiRiderResultRow =
  | {
      id: string;
      entityType: "rider";
      riderId: string;
      rank: number;
      unit: "time";
      totalTime?: string;
      gap?: string;
    }
  | {
      id: string;
      entityType: "rider";
      riderId: string;
      rank: number;
      unit: "points";
      points: number;
    };

export type ApiTeamResultRow =
  | {
      id: string;
      entityType: "team";
      teamId: string;
      rank: number;
      unit: "time";
      totalTime?: string;
      gap?: string;
    }
  | {
      id: string;
      entityType: "team";
      teamId: string;
      rank: number;
      unit: "points";
      points: number;
    };

export type ApiResultRow = ApiRiderResultRow | ApiTeamResultRow;

export type ApiResultsResponse = {
  raceId: string;
  stageOptions: ApiStageOption[];
  resultsByStageAndCategory: Record<string, Record<ResultCategory, ApiResultRow[]>>;
  lastUpdatedISO?: string;
};