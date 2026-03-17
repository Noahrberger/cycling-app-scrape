// app/(tabs)/calendar/fixtures/results.ts

export type ResultRow = {
  position: number;
  riderName: string;
  teamName?: string;
  time?: string; // "12:34:56"
  gap?: string;  // "+0:12"
};

export type ResultsData = {
  raceId: string;
  gc: ResultRow[];
  // senere: stages, points, kom osv
  lastUpdatedISO?: string;
};

export function getMockResults(raceId: string): ResultsData {
  return {
    raceId,
    lastUpdatedISO: new Date().toISOString(),
    gc: [
      { position: 1, riderName: "GC Rider One", teamName: "Team Alpha", time: "12:34:56" },
      { position: 2, riderName: "GC Rider Two", teamName: "Team Bravo", gap: "+0:12" },
      { position: 3, riderName: "GC Rider Three", teamName: "Team Alpha", gap: "+0:25" },
    ],
  };
}
