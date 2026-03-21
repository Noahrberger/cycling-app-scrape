export type UpcomingRace = {
  id: string;
  name: string;
  date: string;
  category?: string;
};

const TEAM_UPCOMING_RACES: Record<string, UpcomingRace[]> = {
  visma: [
    {
      id: "tour-de-france",
      name: "Tour de France",
      date: "2026-07-04",
      category: "WorldTour",
    },
    {
      id: "criterium-du-dauphine",
      name: "Critérium du Dauphiné",
      date: "2026-06-07",
      category: "WorldTour",
    },
  ],
  uae: [
    {
      id: "tour-de-france",
      name: "Tour de France",
      date: "2026-07-04",
      category: "WorldTour",
    },
    {
      id: "tour-de-suisse",
      name: "Tour de Suisse",
      date: "2026-06-14",
      category: "WorldTour",
    },
  ],
  soudal: [
    {
      id: "tour-de-france",
      name: "Tour de France",
      date: "2026-07-04",
      category: "WorldTour",
    },
  ],
};

export function getUpcomingRacesForTeam(teamId: string): UpcomingRace[] {
  return TEAM_UPCOMING_RACES[teamId] ?? [];
}