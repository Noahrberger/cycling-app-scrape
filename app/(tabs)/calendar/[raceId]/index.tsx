// app/(tabs)/calendar/[raceId]/index.tsx
import { getRaceById, RaceDetails } from "@/store/raceStore";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function RaceOverviewScreen() {
  const { raceId } = useLocalSearchParams<{ raceId: string }>();
  const id = String(raceId ?? "");

  const race = useMemo<RaceDetails | null>(() => getRaceById(id), [id]);

  const rows = useMemo(() => {
    if (!race) return [`No race found for id: ${id}`];
    return [
      "General info about the race",
      "Defending champion",
      "Route summary",
      "Key stages",
      "Jerseys",
    ];
  }, [race, id]);

  return (
  <View style={{ paddingBottom: 40 }}>
    {rows.map((item, idx) => (
      <View key={`overview-${idx}`} style={styles.row}>
        <Text style={styles.rowText}>{item}</Text>
      </View>
    ))}
  </View>
);
}
      

const styles = StyleSheet.create({
  container: { paddingTop: 8, paddingBottom: 40 },
  row: {
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#EFEFEF",
  },
  rowText: { fontSize: 14, fontWeight: "800", color: "#111111" },
});
