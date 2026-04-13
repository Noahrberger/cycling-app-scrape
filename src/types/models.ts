export type RaceCategory = "Men" | "Women";
export type RaceType = "Stage race" | "One-day";

export type Tab = "overview" | "stages" | "startlist" | "results";
export type StageType = "Flat" | "Hill" | "Mountain" | "TT" | "Unknown";

export type TeamRole =
  | "Leader"
  | "Sprinter"
  | "Climber"
  | "Domestique"
  | "GC"
  | "TT"
  | "Allrounder";

export type Team = {
  id: string;
  name: string;
  countryCode?: string;
  shortName?: string;
};

export type Rider = {
  id: string;
  name: string;
  countryCode?: string;
  teamId: string;
  role?: TeamRole;
  age?: number;
};

export type Stage = {
  stageNumber: number;
  startCity: string;
  finishCity: string;
  distanceKm: number;
  stageType: StageType;
  date: string; // ISO yyyy-mm-dd
  profileImage: string;
};

export type RaceDetails = {
  id: string;
  name: string;
  countryCode: string;
  startDate: string;
  endDate: string;
  classCode?: string;
  category?: RaceCategory;
  type?: RaceType;
  stagesCount?: number;
  stages?: Stage[];
};