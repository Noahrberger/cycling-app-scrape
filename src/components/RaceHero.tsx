import { flagFromISO2, formatRange, RaceDetails } from "@/store/raceStore";
import React from "react";
import { StyleSheet, Text, View } from "react-native";


export default function RaceHero({ race }: { race: RaceDetails }) {
  return (
    <View style={styles.hero}>
      <View style={styles.heroTopRow}>
        <Text style={styles.flag}>{flagFromISO2(race.countryCode)}</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{race.name}</Text>
          <Text style={styles.subTitle}>
            {race.classCode ?? "—"} • {race.category ?? "—"} • {race.type ?? "—"}
          </Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <Text style={styles.metaLabel}>Dates</Text>
        <Text style={styles.metaValue}>{formatRange(race.startDate, race.endDate)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    padding: 14,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E6E6E6",
    backgroundColor: "#FAFAFA",
    marginBottom: 10,
  },
  heroTopRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  flag: { fontSize: 22, width: 30 },
  title: { fontSize: 20, fontWeight: "900", color: "#111111" },
  subTitle: { marginTop: 4, color: "#666666", fontWeight: "700" },
  metaRow: { marginTop: 10, flexDirection: "row", justifyContent: "space-between" },
  metaLabel: { color: "#666666", fontWeight: "800" },
  metaValue: { color: "#111111", fontWeight: "900" },
});
