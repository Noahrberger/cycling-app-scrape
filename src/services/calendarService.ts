
export type Race = {
  id: string;
  name: string;
  countryCode: string;
  startDate: string;
  endDate: string;
};

// Denne lista kan etterhvert bygges fra getMockCalendar() når alle ritt har fixture-data
export const ALL_RACES: Race[] = [
  { id: "santos-tour-down-under",  name: "Santos Tour Down Under",       countryCode: "AU", startDate: "2026-01-20", endDate: "2026-01-25" },
  { id: "uae-tour",                name: "UAE Tour",                      countryCode: "AE", startDate: "2026-02-16", endDate: "2026-02-22" },
  { id: "strade-bianche",          name: "Strade Bianche",                countryCode: "IT", startDate: "2026-03-07", endDate: "2026-03-07" },
  { id: "paris-nice",              name: "Paris–Nice",                    countryCode: "FR", startDate: "2026-03-08", endDate: "2026-03-15" },
  { id: "tirreno-adriatico",       name: "Tirreno–Adriatico",             countryCode: "IT", startDate: "2026-03-09", endDate: "2026-03-15" },
  { id: "milano-sanremo",          name: "Milano–Sanremo",                countryCode: "IT", startDate: "2026-03-21", endDate: "2026-03-21" },
  { id: "volta-catalunya",         name: "Volta Ciclista a Catalunya",    countryCode: "ES", startDate: "2026-03-23", endDate: "2026-03-29" },
  { id: "e3-saxo-classic",         name: "E3 Saxo Classic",               countryCode: "BE", startDate: "2026-03-27", endDate: "2026-03-27" },
  { id: "gent-wevelgem",           name: "Gent–Wevelgem",                 countryCode: "BE", startDate: "2026-03-29", endDate: "2026-03-29" },
  { id: "dwars-door-vlaanderen",   name: "Dwars door Vlaanderen",         countryCode: "BE", startDate: "2026-04-01", endDate: "2026-04-01" },
  { id: "ronde-van-vlaanderen",    name: "Ronde van Vlaanderen",          countryCode: "BE", startDate: "2026-04-05", endDate: "2026-04-05" },
  { id: "itzulia-basque-country",  name: "Itzulia Basque Country",        countryCode: "ES", startDate: "2026-04-06", endDate: "2026-04-11" },
  { id: "paris-roubaix",           name: "Paris–Roubaix",                 countryCode: "FR", startDate: "2026-04-12", endDate: "2026-04-12" },
  { id: "amstel-gold-race",        name: "Amstel Gold Race",              countryCode: "NL", startDate: "2026-04-19", endDate: "2026-04-19" },
  { id: "la-fleche-wallonne",      name: "La Flèche Wallonne",            countryCode: "BE", startDate: "2026-04-22", endDate: "2026-04-22" },
  { id: "liege-bastogne-liege",    name: "Liège–Bastogne–Liège",          countryCode: "BE", startDate: "2026-04-26", endDate: "2026-04-26" },
  { id: "tour-de-romandie",        name: "Tour de Romandie",              countryCode: "CH", startDate: "2026-04-28", endDate: "2026-05-03" },
  { id: "eschborn-frankfurt",      name: "Eschborn–Frankfurt",            countryCode: "DE", startDate: "2026-05-01", endDate: "2026-05-01" },
  { id: "giro-ditalia",            name: "Giro d'Italia",                 countryCode: "IT", startDate: "2026-05-08", endDate: "2026-05-31" },
  { id: "tour-de-suisse",          name: "Tour de Suisse",                countryCode: "CH", startDate: "2026-06-17", endDate: "2026-06-21" },
  { id: "tour-de-france",          name: "Tour de France",                countryCode: "FR", startDate: "2026-07-04", endDate: "2026-07-26" },
  { id: "san-sebastian",           name: "Donostia San Sebastian Klasikoa",countryCode: "ES", startDate: "2026-08-01", endDate: "2026-08-01" },
  { id: "tour-de-pologne",         name: "Tour de Pologne",               countryCode: "PL", startDate: "2026-08-03", endDate: "2026-08-09" },
  { id: "adac-cyclassics",         name: "ADAC Cyclassics",               countryCode: "DE", startDate: "2026-08-16", endDate: "2026-08-16" },
  { id: "la-vuelta",               name: "La Vuelta Ciclista a España",   countryCode: "ES", startDate: "2026-08-22", endDate: "2026-09-13" },
  { id: "il-lombardia",            name: "Il Lombardia",                  countryCode: "IT", startDate: "2026-10-10", endDate: "2026-10-10" },
];

function parseDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function getRacesForDate(isoDate: string): Race[] {
  const d = parseDate(isoDate);
  return ALL_RACES.filter((r) => {
    const s = parseDate(r.startDate);
    const e = parseDate(r.endDate);
    return d >= s && d <= e;
  });
}