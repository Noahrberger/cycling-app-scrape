export type SearchItem =
  | { id: string; type: "rider"; title: string; subtitle: string; riderId: string }
  | { id: string; type: "team";  title: string; subtitle: string; teamId: string }
  | { id: string; type: "race";  title: string; subtitle: string; raceId: string };

export const MOCK_SEARCH_ITEMS: SearchItem[] = [
  { id: "rider-194619", type: "rider", title: "Tadej Pogačar",    subtitle: "Rider • UAE",    riderId: "194619" },
  { id: "rider-196424", type: "rider", title: "Jonas Vingegaard", subtitle: "Rider • Visma",  riderId: "196424" },
  { id: "rider-212377", type: "rider", title: "Remco Evenepoel",  subtitle: "Rider • Soudal", riderId: "212377" },
  { id: "rider-196333", type: "rider", title: "João Almeida",     subtitle: "Rider • UAE",    riderId: "196333" },
  { id: "rider-168961", type: "rider", title: "Wout van Aert",    subtitle: "Rider • Visma",  riderId: "168961" },

  { id: "team-uae",     type: "team", title: "UAE Team Emirates", subtitle: "Team", teamId: "uae" },
  { id: "team-visma",   type: "team", title: "Visma",             subtitle: "Team", teamId: "visma" },
  { id: "team-soudal",  type: "team", title: "Soudal Quick-Step", subtitle: "Team", teamId: "soudal" },
  { id: "team-alpecin", type: "team", title: "Alpecin",           subtitle: "Team", teamId: "alpecin" },
  { id: "team-ineos",   type: "team", title: "Ineos Grenadiers",  subtitle: "Team", teamId: "ineos" },

  { id: "race-tour-de-france",      type: "race", title: "Tour de France",           subtitle: "Race • WorldTour", raceId: "tour-de-france" },
  { id: "race-giro-ditalia",        type: "race", title: "Giro d'Italia",             subtitle: "Race • WorldTour", raceId: "giro-ditalia" },
  { id: "race-la-vuelta",           type: "race", title: "La Vuelta",                 subtitle: "Race • WorldTour", raceId: "la-vuelta" },
  { id: "race-milano-sanremo",      type: "race", title: "Milano–Sanremo",            subtitle: "Race • WorldTour", raceId: "milano-sanremo" },
  { id: "race-ronde-van-vlaanderen",type: "race", title: "Ronde van Vlaanderen",      subtitle: "Race • WorldTour", raceId: "ronde-van-vlaanderen" },
  { id: "race-paris-roubaix",       type: "race", title: "Paris–Roubaix",             subtitle: "Race • WorldTour", raceId: "paris-roubaix" },
  { id: "race-liege-bastogne-liege",type: "race", title: "Liège–Bastogne–Liège",      subtitle: "Race • WorldTour", raceId: "liege-bastogne-liege" },
  { id: "race-il-lombardia",        type: "race", title: "Il Lombardia",              subtitle: "Race • WorldTour", raceId: "il-lombardia" },
  { id: "race-tour-de-suisse",      type: "race", title: "Tour de Suisse",            subtitle: "Race • WorldTour", raceId: "tour-de-suisse" },
  { id: "race-paris-nice",          type: "race", title: "Paris–Nice",                subtitle: "Race • WorldTour", raceId: "paris-nice" },
];