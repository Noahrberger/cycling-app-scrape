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

// PCS API-typer
export type PCSResultEntry = {
  id: number;
  rnk: number;
  rider_id: number;
  last_name: string;
  first_name: string;
  url: string;
  nation: string;
  team_id: number;
  team: string;
  time: string;
  pcs_pnts: number;
  uci_pnts: number;
};

export type PCSResultClassification = {
  id: number;
  race: number;
  name: string; // "Stage", "General", "Points", "KOM", "Youth", "Teams"
  entries: PCSResultEntry[];
};

export type PCSResultsResponse = {
  info: {
    name: string;
    stage: string;
    race_date: string;
    distance: number;
  };
  results: PCSResultClassification[];
};

export type PCSStage = {
  event_id: number;
  race_date: string;
  stagename: string;
  city_start: string;
  city_finish: string;
  distance: number;
  start_time: string;
};

export type PCSCalendarEvent = {
  event_id: number;
  date_start: string;
  date_end: string;
  nation: string;
  name: string;
  classification: string;
  stages: PCSStage[];
};

export type PCSCalendarResponse = {
  data: PCSCalendarEvent[];
};

export type PCSStartlistRider = {
  team: number;
  bib: number;
  ridername: string;
  rider_id: number;
  url: string;
  nation: string;
  name: string;
};

export type PCSStartlistTeam = {
  team: number;
  nr: number;
  name: string;
  url: string;
  riders: PCSStartlistRider[];
};

export type PCSStartlistResponse = {
  info: {
    name: string;
    date_start: string;
    date_end: string;
    classification: string;
    final_startlist: number;
    url: string;
  };
  teams: PCSStartlistTeam[];
};

export type PCSRiderResponse = {
  info: {
    ridername: string;
    lastname: string;
    firstname: string;
    teamname: string;
    birthdate: string;
    age: number;
    place_of_birth: string;
    height: number;
    weight: number;
    nation: string;
    country: string;
    img: string;
    copyright: string;
  };
};

export type PCSTeamRider = {
  team: number;
  ridername: string;
  nation: string;
  url: string;
};

export type PCSTeam = {
  team: number;
  nation: string;
  name: string;
  abbrev: string;
  classification: string;
  url: string;
  riders: PCSTeamRider[];
};

export type PCSTeamsResponse = {
  data: PCSTeam[];
};
