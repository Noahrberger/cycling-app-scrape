import type { PCSRiderResponse } from "@/types/api";

export const MOCK_PCS_RIDERS: Record<number, PCSRiderResponse> = {
  194619: {
    info: {
      ridername: "Tadej Pogačar", lastname: "POGAČAR", firstname: "Tadej",
      teamname: "UAE Team Emirates - XRG", birthdate: "1998-09-21", age: 27,
      place_of_birth: "Klanec", height: 176, weight: 66,
      nation: "si", country: "Slovenia",
      img: "https://www.procyclingstats.com/images/riders/oh/dq/tadej-pogacar-2026-n2.png",
      copyright: "",
    },
  },
  196424: {
    info: {
      ridername: "Jonas Vingegaard", lastname: "VINGEGAARD", firstname: "Jonas",
      teamname: "Visma - Lease a Bike", birthdate: "1996-12-10", age: 28,
      place_of_birth: "Hillerød", height: 175, weight: 60,
      nation: "dk", country: "Denmark",
      img: "",
      copyright: "",
    },
  },
  212377: {
    info: {
      ridername: "Remco Evenepoel", lastname: "EVENEPOEL", firstname: "Remco",
      teamname: "Soudal Quick-Step", birthdate: "2000-01-25", age: 25,
      place_of_birth: "Schepdaal", height: 171, weight: 61,
      nation: "be", country: "Belgium",
      img: "",
      copyright: "",
    },
  },
  196333: {
    info: {
      ridername: "João Almeida", lastname: "ALMEIDA", firstname: "João",
      teamname: "UAE Team Emirates - XRG", birthdate: "1998-08-05", age: 27,
      place_of_birth: "Caldas da Rainha", height: 172, weight: 63,
      nation: "pt", country: "Portugal",
      img: "",
      copyright: "",
    },
  },
  168961: {
    info: {
      ridername: "Wout van Aert", lastname: "VAN AERT", firstname: "Wout",
      teamname: "Visma - Lease a Bike", birthdate: "1994-09-15", age: 30,
      place_of_birth: "Herentals", height: 191, weight: 78,
      nation: "be", country: "Belgium",
      img: "",
      copyright: "",
    },
  },
};

export function getMockRider(riderId: number): PCSRiderResponse | null {
  return MOCK_PCS_RIDERS[riderId] ?? null;
}