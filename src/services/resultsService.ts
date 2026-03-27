import { getRiderById } from "@/fixtures/riders";
import { getTeamById } from "@/fixtures/teams";
import { getResultsRecord } from "@/repositories/resultsRepository";
import type {
  ApiResultRow,
  ApiResultsResponse,
  ResultCategory,
} from "@/types/api";
import type { ServiceResult } from "@/types/service";
import type { ResultRowView, ResultsViewData } from "@/types/viewModels";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getResults(
  raceId: string
): Promise<ServiceResult<ResultsViewData>> {
  await delay(250);

  const raw: ApiResultsResponse = await getResultsRecord(raceId);

  const mappedResultsByStageAndCategory = Object.fromEntries(
    Object.entries(raw.resultsByStageAndCategory).map(([stageKey, categoryMap]) => {
      const mappedCategoryMap = Object.fromEntries(
        Object.entries(categoryMap).map(([categoryKey, rows]) => {
          const mappedRows: ResultRowView[] = rows.map((row: ApiResultRow) => {
            if (row.entityType === "rider") {
              const rider = getRiderById(row.riderId);
              const team = rider ? getTeamById(rider.teamId) : null;

              if (row.unit === "time") {
                return {
                  id: row.id,
                  entityType: "rider",
                  riderId: row.riderId,
                  teamId: rider?.teamId,
                  rank: row.rank,
                  riderName: rider?.name ?? "Unknown Rider",
                  teamName: team?.name ?? "Unknown Team",
                  unit: "time" ,
                  totalTime: row.totalTime,
                  gap: row.gap,
                };
              }

              return {
                id: row.id,
                entityType: "rider",
                riderId: row.riderId,
                teamId: rider?.teamId,
                rank: row.rank,
                riderName: rider?.name ?? "Unknown Rider",
                teamName: team?.name ?? "Unknown Team",
                unit: "points" ,
                points: row.points,
              };
            }

            const team = getTeamById(row.teamId);

            if (row.unit === "time") {
              return {
                id: row.id,
                entityType: "team",
                teamId: row.teamId,
                rank: row.rank,
                riderName: team?.name ?? "Unknown Team",
                teamName: "Team classification",
                unit: "time" ,
                totalTime: row.totalTime,
                gap: row.gap,
              };
            }

            return {
              id: row.id,
              entityType: "team",
              teamId: row.teamId,
              rank: row.rank,
              riderName: team?.name ?? "Unknown Team",
              teamName: "Team classification",
              unit: "points" ,
              points: row.points,
            };
          });

          return [categoryKey, mappedRows];
        })
      ) as Record<ResultCategory, ResultRowView[]>;

      return [stageKey, mappedCategoryMap];
    })
  ) as ResultsViewData["resultsByStageAndCategory"];

  const mapped: ResultsViewData = {
    raceId: raw.raceId,
    stageOptions: raw.stageOptions,
    lastUpdatedISO: raw.lastUpdatedISO,
    resultsByStageAndCategory: mappedResultsByStageAndCategory,
  };

  return { ok: true, data: mapped };
}