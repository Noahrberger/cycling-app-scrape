import { getRiderById } from "@/fixtures/riders";
import { getTeamById } from "@/fixtures/teams";
import type { Rider, Team } from "@/types/models";

export function getRiderRecord(riderId: string): Rider | null {
  return getRiderById(riderId);
}

export function getTeamRecord(teamId: string): Team | null {
  return getTeamById(teamId);
}