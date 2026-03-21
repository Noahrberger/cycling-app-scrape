// app/(tabs)/calendar/[raceId]/stages/index.tsx
import {
  formatShort,
  getRaceById,
  getStagesForRace,
  parseDate,
  RaceDetails,
  Stage,
} from "@/store/raceStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function StagesListScreen() {
  const router = useRouter();
  const { raceId } = useLocalSearchParams<{ raceId: string }>();
  const id = String(raceId ?? "");

  const race = useMemo<RaceDetails | null>(() => getRaceById(id), [id]);
  const stages = useMemo<Stage[]>(() => (race ? getStagesForRace(race) : []), [race]);

  if (!race) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No race found for id: {id}</Text>
      </View>
    );
  }

  if (stages.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No stages available yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {stages.map((stage) => (
        <Pressable
          key={`stage-${stage.stageNumber}`}
   onPress={() =>
  router.replace({
    pathname: "/races/[raceId]/stages/[stagenumber]",
    params: {
      raceId: id,
      stagenumber: String(stage.stageNumber),
    },
  })
}
          style={styles.stageRow}
        >
          <View style={styles.stageTopRow}>
            <Text style={styles.stageTitle} numberOfLines={1}>
              {stage.stageNumber}. {stage.startCity} – {stage.finishCity}
            </Text>
            <Text style={styles.stageDate}>{formatShort(parseDate(stage.date))}</Text>
          </View>

          <Text style={styles.stageMeta}>
            {stage.distanceKm} km • {stage.stageType}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 8, paddingBottom: 40 },

  empty: { paddingVertical: 18 },
  emptyText: { fontSize: 14, fontWeight: "800", color: "#666666" },

  stageRow: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#EFEFEF",
    backgroundColor: "#FFFFFF",
  },
  stageTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  stageTitle: { flex: 1, fontSize: 14, fontWeight: "900", color: "#111111" },
  stageDate: { fontSize: 12, fontWeight: "900", color: "#666666" },
  stageMeta: { marginTop: 6, fontSize: 12, fontWeight: "800", color: "#666666" },
});
