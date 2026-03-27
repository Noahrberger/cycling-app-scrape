import type { ResultCategory } from "@/types/api";

export type StartlistRiderView = {
  id: string;
  name: string;
  countryCode?: string;
  role?: string;
};

export type StartlistTeamView = {
  teamId: string;
  name: string;
  riders: StartlistRiderView[];
};

export type StartlistViewData = {
  raceId: string;
  teams: StartlistTeamView[];
  lastUpdatedISO?: string;
};

export type ResultRowView =
  | {
      id: string;
      entityType: "rider";
      riderId?: string;
      teamId?: string;
      rank: number;
      riderName: string;
      teamName?: string;
      unit: "time";
      totalTime?: string;
      gap?: string;
    }
  | {
      id: string;
      entityType: "rider";
      riderId?: string;
      teamId?: string;
      rank: number;
      riderName: string;
      teamName?: string;
      unit: "points";
      points: number;
    }
  | {
      id: string;
      entityType: "team";
      teamId?: string;
      rank: number;
      riderName: string;
      teamName?: string;
      unit: "time";
      totalTime?: string;
      gap?: string;
    }
  | {
      id: string;
      entityType: "team";
      teamId?: string;
      rank: number;
      riderName: string;
      teamName?: string;
      unit: "points";
      points: number;
    };

export type ResultsViewData = {
  raceId: string;
  stageOptions: {
    stageNumber: number;
    label: string;
  }[];
  resultsByStageAndCategory: Record<string, Record<ResultCategory, ResultRowView[]>>;
  lastUpdatedISO?: string;
};