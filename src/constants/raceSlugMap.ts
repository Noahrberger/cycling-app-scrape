export const RACE_SLUG_MAP: Record<string, string> = {
  "santos-tour-down-under": "santos-tour-down-under",
  "uae-tour": "uae-tour",
  "strade-bianche": "strade-bianche",
  "paris-nice": "paris-nice",
  "tirreno-adriatico": "tirreno-adriatico",
  "milano-sanremo": "milano-sanremo",
  "volta-catalunya": "volta-a-catalunya",
  "e3-saxo-classic": "e3-harelbeke",
  "gent-wevelgem": "gent-wevelgem",
  "dwars-door-vlaanderen": "dwars-door-vlaanderen-a-travers-la-flandre",
  "ronde-van-vlaanderen": "ronde-van-vlaanderen",
  "itzulia-basque-country": "itzulia-basque-country",
  "paris-roubaix": "paris-roubaix",
  "amstel-gold-race": "amstel-gold-race",
  "la-fleche-wallonne": "la-fleche-wallonne",
  "liege-bastogne-liege": "liege-bastogne-liege",
  "tour-de-romandie": "tour-de-romandie",
  "eschborn-frankfurt": "eschborn-frankfurt",
  "giro-ditalia": "giro-d-italia",
  "tour-de-suisse": "tour-de-suisse",
  "tour-de-france": "tour-de-france",
  "san-sebastian": "clasica-de-san-sebastian",
  "tour-de-pologne": "tour-de-pologne",
  "adac-cyclassics": "euroeyes-cyclassics-hamburg",
  "la-vuelta": "vuelta-a-espana",
  "il-lombardia": "il-lombardia",
};

export function getPCSSlug(raceId: string): string {
  return RACE_SLUG_MAP[raceId] ?? raceId;
}