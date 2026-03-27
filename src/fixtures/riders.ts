import type { Rider } from "@/types/models";

export const RIDERS: Rider[] = [
  // GC riders
  { id: "jonas-vingegaard", name: "Jonas Vingegaard", countryCode: "DK", teamId: "visma", role: "Leader" },
  { id: "tadej-pogacar", name: "Tadej Pogačar", countryCode: "SI", teamId: "uae", role: "Leader" },
  { id: "remco-evenepoel", name: "Remco Evenepoel", countryCode: "BE", teamId: "soudal", role: "Leader" },
  { id: "primoz-roglic", name: "Primož Roglič", countryCode: "SI", teamId: "bora", role: "Leader" },
  { id: "carlos-rodriguez", name: "Carlos Rodríguez", countryCode: "ES", teamId: "ineos", role: "Leader" },

  // sprinters / classics
  { id: "wout-van-aert", name: "Wout van Aert", countryCode: "BE", teamId: "visma", role: "Allrounder" },
  { id: "jasper-philipsen", name: "Jasper Philipsen", countryCode: "BE", teamId: "alpecin", role: "Sprinter" },
  { id: "biniam-girmay", name: "Biniam Girmay", countryCode: "ER", teamId: "intermarche", role: "Sprinter" },
  { id: "olav-kooij", name: "Olav Kooij", countryCode: "NL", teamId: "visma", role: "Sprinter" },
  { id: "kaden-groves", name: "Kaden Groves", countryCode: "AU", teamId: "alpecin", role: "Sprinter" },
  { id: "mads-pedersen", name: "Mads Pedersen", countryCode: "DK", teamId: "lidl", role: "Sprinter" },

  // climbers / KOM
  { id: "giulio-ciccone", name: "Giulio Ciccone", countryCode: "IT", teamId: "lidl", role: "Climber" },
  { id: "richard-carapaz", name: "Richard Carapaz", countryCode: "EC", teamId: "ef", role: "Climber" },
  { id: "neilson-powless", name: "Neilson Powless", countryCode: "US", teamId: "ef", role: "Climber" },
  { id: "toms-skujins", name: "Toms Skujins", countryCode: "LV", teamId: "lidl", role: "Allrounder" },
  { id: "magnus-cort", name: "Magnus Cort", countryCode: "DK", teamId: "ef", role: "Allrounder" },

  // giro riders
  { id: "juan-ayuso", name: "Juan Ayuso", countryCode: "ES", teamId: "uae", role: "Leader" },
  { id: "antonio-tiberi", name: "Antonio Tiberi", countryCode: "IT", teamId: "bora", role: "Leader" },
  { id: "cian-uijtdebroeks", name: "Cian Uijtdebroeks", countryCode: "BE", teamId: "visma", role: "Climber" },
  { id: "geraint-thomas", name: "Geraint Thomas", countryCode: "GB", teamId: "ineos", role: "Leader" },

  // extra KOM riders
  { id: "romain-bardet", name: "Romain Bardet", countryCode: "FR", teamId: "dsm", role: "Climber" },
  { id: "davide-formolo", name: "Davide Formolo", countryCode: "IT", teamId: "uae", role: "Climber" },
];

// lookup
export const RIDERS_BY_ID: Record<string, Rider> = Object.fromEntries(
  RIDERS.map((r) => [r.id, r])
);

export function getRiderById(riderId: string): Rider | null {
  return RIDERS_BY_ID[riderId] ?? null;
}