// app/(tabs)/calendar/_raceStore.ts

export type Tab = "overview" | "stages" | "startlist" | "results";
export type StageType = "Flat" | "Hill" | "Mountain" | "TT";

export type Stage = {
  stageNumber: number;
  startCity: string;
  finishCity: string;
  distanceKm: number;
  stageType: StageType;
  date: string; // ISO yyyy-mm-dd
  profileImage: string // url 
};

export type RaceDetails = {
  id: string;
  name: string;
  countryCode: string;
  startDate: string;
  endDate: string;
  classCode?: string; // ex: 2.UWT
  category?: "Men" | "Women";
  type?: "Stage race" | "One-day";
  stagesCount?: number;

  // API-friendly stage list
  stages?: Stage[];
};

// === DATA (lim inn listen din her) ===
export const MEN_RACES: RaceDetails[] = [
  { id: "santos-tour-down-under", name: "Santos Tour Down Under", countryCode: "AU", startDate: "2026-01-20", endDate: "2026-01-25", classCode: "2.UWT", category: "Men", type: "Stage race", stagesCount: 6 },
  { id: "cadel-evans-great-ocean-road-race-men", name: "Cadel Evans Great Ocean Road Race - Men", countryCode: "AU", startDate: "2026-02-01", endDate: "2026-02-01", classCode: "1.UWT", category: "Men", type: "One-day", stagesCount: 1 },
  { id: "uae-tour", name: "UAE Tour", countryCode: "AE", startDate: "2026-02-16", endDate: "2026-02-22", classCode: "2.UWT", category: "Men", type: "Stage race" },
  { id: "omloop-nieuwsblad", name: "Omloop Nieuwsblad", countryCode: "BE", startDate: "2026-02-28", endDate: "2026-02-28", classCode: "1.UWT", category: "Men", type: "One-day", stagesCount: 1 },
 { id: "strade-bianche", name: "Strade Bianche", countryCode: "IT", startDate: "2026-03-07", endDate: "2026-03-07", classCode: "1.UWT", category: "Men", type: "One-day", stagesCount: 1 },
  { id: "paris-nice", name: "Paris–Nice", countryCode: "FR", startDate: "2026-03-08", endDate: "2026-03-15", classCode: "2.UWT", category: "Men", type: "Stage race" },
  { id: "tirreno-adriatico", name: "Tirreno–Adriatico", countryCode: "IT", startDate: "2026-03-09", endDate: "2026-03-15", classCode: "2.UWT", category: "Men", type: "Stage race" },
  { id: "milano-sanremo", name: "Milano–Sanremo", countryCode: "IT", startDate: "2026-03-21", endDate: "2026-03-21", classCode: "1.UWT", category: "Men", type: "One-day", stagesCount: 1 },
  { id: "volta-catalunya", name: "Volta Ciclista a Catalunya", countryCode: "ES", startDate: "2026-03-23", endDate: "2026-03-29", classCode: "2.UWT", category: "Men", type: "Stage race" },
  { id: "ronde-van-brugge", name: "Ronde Van Brugge - Tour of Bruges", countryCode: "BE", startDate: "2026-03-25", endDate: "2026-03-25", classCode: "1.UWT", category: "Men", type: "One-day", stagesCount: 1 },
  { id: "e3-saxo-classic", name: "E3 Saxo Classic", countryCode: "BE", startDate: "2026-03-27", endDate: "2026-03-27", classCode: "1.UWT", category: "Men", type: "One-day", stagesCount: 1 },
  { id: "gent-wevelgem", name: "In Flanders Fields - From Middelkerke to Wevelgem", countryCode: "BE", startDate: "2026-03-29", endDate: "2026-03-29", classCode: "1.UWT", category: "Men", type: "One-day", stagesCount: 1 },

  { id: "dwars-door-vlaanderen", name: "Dwars door Vlaanderen - A travers la Flandre", countryCode: "BE", startDate: "2026-04-01", endDate: "2026-04-01", classCode: "1.UWT", category: "Men", type: "One-day", stagesCount: 1 },
  { id: "ronde-van-vlaanderen", name: "Ronde van Vlaanderen", countryCode: "BE", startDate: "2026-04-05", endDate: "2026-04-05", classCode: "1.UWT", category: "Men", type: "One-day", stagesCount: 1 },
  { id: "itzulia-basque-country", name: "Itzulia Basque Country", countryCode: "ES", startDate: "2026-04-06", endDate: "2026-04-11", classCode: "2.UWT", category: "Men", type: "Stage race" },
  { id: "paris-roubaix", name: "Paris–Roubaix Hauts-de-France", countryCode: "FR", startDate: "2026-04-12", endDate: "2026-04-12", classCode: "1.UWT", category: "Men", type: "One-day", stagesCount: 1 },
  { id: "amstel-gold-race", name: "Amstel Gold Race", countryCode: "NL", startDate: "2026-04-19", endDate: "2026-04-19", classCode: "1.UWT", category: "Men", type: "One-day", stagesCount: 1 },
  { id: "la-fleche-wallonne", name: "La Flèche Wallonne", countryCode: "BE", startDate: "2026-04-22", endDate: "2026-04-22", classCode: "1.UWT", category: "Men", type: "One-day", stagesCount: 1 },
  { id: "liege-bastogne-liege", name: "Liège–Bastogne–Liège", countryCode: "BE", startDate: "2026-04-26", endDate: "2026-04-26", classCode: "1.UWT", category: "Men", type: "One-day", stagesCount: 1 },
  { id: "tour-de-romandie", name: "Tour de Romandie", countryCode: "CH", startDate: "2026-04-28", endDate: "2026-05-03", classCode: "2.UWT", category: "Men", type: "Stage race" },
  { id: "eschborn-frankfurt", name: "Eschborn–Frankfurt", countryCode: "DE", startDate: "2026-05-01", endDate: "2026-05-01", classCode: "1.UWT", category: "Men", type: "One-day", stagesCount: 1 },

  { id: "giro-ditalia", name: "Giro d'Italia", countryCode: "IT", startDate: "2026-05-08", endDate: "2026-05-31", classCode: "2.UWT", category: "Men", type: "Stage race", stagesCount: 21 },

  { id: "tour-auvergne-rhone-alpes", name: "Tour Auvergne - Rhône-Alpes", countryCode: "FR", startDate: "2026-06-07", endDate: "2026-06-14", classCode: "2.UWT", category: "Men", type: "Stage race" },
  { id: "copenhagen-sprint", name: "Copenhagen Sprint", countryCode: "DK", startDate: "2026-06-14", endDate: "2026-06-14", classCode: "1.UWT", category: "Men", type: "One-day", stagesCount: 1 },
  { id: "tour-de-suisse", name: "Tour de Suisse", countryCode: "CH", startDate: "2026-06-17", endDate: "2026-06-21", classCode: "2.UWT", category: "Men", type: "Stage race" },

  { id: "tour-de-france", name: "Tour de France", countryCode: "FR", startDate: "2026-07-04", endDate: "2026-07-26", classCode: "2.UWT", category: "Men", type: "Stage race", stagesCount: 21 },

  { id: "san-sebastian", name: "Donostia San Sebastian Klasikoa", countryCode: "ES", startDate: "2026-08-01", endDate: "2026-08-01", classCode: "1.UWT", category: "Men", type: "One-day", stagesCount: 1 },
  { id: "tour-de-pologne", name: "Tour de Pologne", countryCode: "PL", startDate: "2026-08-03", endDate: "2026-08-09", classCode: "2.UWT", category: "Men", type: "Stage race" },
  { id: "adac-cyclassics", name: "ADAC Cyclassics", countryCode: "DE", startDate: "2026-08-16", endDate: "2026-08-16", classCode: "1.UWT", category: "Men", type: "One-day", stagesCount: 1 },
  { id: "renewi-tour", name: "Renewi Tour", countryCode: "BE", startDate: "2026-08-19", endDate: "2026-08-23", classCode: "2.UWT", category: "Men", type: "Stage race" },

  { id: "la-vuelta", name: "La Vuelta Ciclista a España", countryCode: "ES", startDate: "2026-08-22", endDate: "2026-09-13", classCode: "2.UWT", category: "Men", type: "Stage race", stagesCount: 21 },
  { id: "bretagne-classic", name: "Bretagne Classic - CIC", countryCode: "FR", startDate: "2026-08-30", endDate: "2026-08-30", classCode: "1.UWT", category: "Men", type: "One-day", stagesCount: 1 },

  { id: "gp-quebec", name: "Grand Prix Cycliste de Québec", countryCode: "CA", startDate: "2026-09-11", endDate: "2026-09-11", classCode: "1.UWT", category: "Men", type: "One-day", stagesCount: 1 },
  { id: "gp-montreal", name: "Grand Prix Cycliste de Montréal", countryCode: "CA", startDate: "2026-09-13", endDate: "2026-09-13", classCode: "1.UWT", category: "Men", type: "One-day", stagesCount: 1 },

  { id: "il-lombardia", name: "Il Lombardia", countryCode: "IT", startDate: "2026-10-10", endDate: "2026-10-10", classCode: "1.UWT", category: "Men", type: "One-day", stagesCount: 1 },
  { id: "tour-of-guangxi", name: "Tour of Guangxi", countryCode: "CN", startDate: "2026-10-13", endDate: "2026-10-18", classCode: "2.UWT", category: "Men", type: "Stage race" },

];

export const WOMEN_RACES: RaceDetails[] = [
  { id: "strade-w", name: "Strade Bianche Donne", countryCode: "IT", startDate: "2026-03-07", endDate: "2026-03-07", category: "Women", type: "One-day", stagesCount: 1 },
  { id: "roubaix-w", name: "Paris–Roubaix Femmes", countryCode: "FR", startDate: "2026-04-11", endDate: "2026-04-11", category: "Women", type: "One-day", stagesCount: 1 },
  { id: "tdff", name: "Tour de France Femmes", countryCode: "FR", startDate: "2026-07-26", endDate: "2026-08-02", category: "Women", type: "Stage race" },
];

export function getRaceById(raceId: string): RaceDetails | null {
  const found = [...MEN_RACES, ...WOMEN_RACES].find((r) => r.id === raceId);
  return found ?? null;
}

export function getStagesForRace(race: RaceDetails): Stage[] {
  if (race.stages?.length) return race.stages;
  return buildMockStages(race);
}

/** Utils (fra koden din) */
export function parseDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function formatShort(d: Date) {
  const day = String(d.getDate()).padStart(2, "0");
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${day} ${monthNames[d.getMonth()]}`;
}

export function formatRange(startISO: string, endISO: string) {
  const start = formatShort(parseDate(startISO));
  const end = formatShort(parseDate(endISO));
  return startISO === endISO ? start : `${start}–${end}`;
}

export function flagFromISO2(iso2: string) {
  if (!iso2 || iso2.length !== 2) return "🏳️";
  const codePoints = iso2
    .toUpperCase()
    .split("")
    .map((c) => 127397 + c.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export function addDaysISO(startISO: string, daysToAdd: number) {
  const d = parseDate(startISO);
  d.setDate(d.getDate() + daysToAdd);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function buildMockStages(race: RaceDetails): Stage[] {
  const count = race.stagesCount ?? (race.type === "One-day" ? 1 : 0);
  if (!count) return [];

  return Array.from({ length: count }, (_, i) => {
    const stageNumber = i + 1;
 return {
  stageNumber,
  startCity: "Start City",
  finishCity: "Finish City",
  distanceKm: 180,
  stageType: "Flat",
  date: addDaysISO(race.startDate, i),
  profileImage: "https://via.placeholder.com/1200x360.png?text=Stage+profile",
};
  });
}
