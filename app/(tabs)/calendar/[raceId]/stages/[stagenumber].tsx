// app/(tabs)/calendar/[raceId]/stages/[stagenumber].tsx
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
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function StageDetailScreen() {
  const router = useRouter();
  const { raceId, stagenumber } = useLocalSearchParams<{
    raceId: string;
    stagenumber: string;
  }>();

  const id = String(raceId ?? "");
  const num = Number(stagenumber ?? NaN);

  const race = useMemo<RaceDetails | null>(() => getRaceById(id), [id]);

  const stage = useMemo<Stage | null>(() => {
    if (!race || !Number.isFinite(num)) return null;
    const stages = getStagesForRace(race);
    return stages.find((s) => s.stageNumber === num) ?? null;
  }, [race, num]);

  const profileImageUrl = useMemo(() => {
    const url = stage?.profileImage;
    if (url && typeof url === "string" && url.startsWith("http")) return url;
    return "https://via.placeholder.com/1200x360.png?text=Stage+profile";
  }, [stage]);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => router.push(`/calendar/${id}/stages`)}
        style={styles.backButton}
      >
        <Text style={styles.backText}>← Back to stages</Text>
      </Pressable>

      {!race ? (
        <Text style={styles.note}>No race found for id: {id}</Text>
      ) : !stage ? (
        <Text style={styles.note}>No stage found: {String(stagenumber)}</Text>
      ) : (
        <View style={styles.card}>
          <Text style={styles.stageLabel}>Stage {stage.stageNumber}</Text>

          <Text style={styles.title}>
            {stage.startCity} → {stage.finishCity}
          </Text>

          <Text style={styles.meta}>
            {formatShort(parseDate(stage.date))} • {stage.distanceKm} km •{" "}
            {stage.stageType}
          </Text>

          <View style={styles.profileWrap}>
            <Image
              source={{ uri: profileImageUrl }}
              style={styles.profileImage}
              resizeMode="cover"
            />
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Stage info</Text>
          <Text style={styles.note}>• Profile: (API senere)</Text>
          <Text style={styles.note}>• Start time: (API senere)</Text>
          <Text style={styles.note}>• Key climbs / sprints: (API senere)</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 10, paddingBottom: 40 },

  backButton: { paddingVertical: 8, alignSelf: "flex-start" },
  backText: { fontSize: 14, fontWeight: "900", color: "#111111" },

  card: {
    marginTop: 8,
    padding: 14,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E6E6E6",
    backgroundColor: "#FFFFFF",
  },

  stageLabel: {
    fontSize: 12,
    fontWeight: "900",
    color: "#666666",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  title: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: "900",
    color: "#111111",
  },

  meta: { marginTop: 6, fontSize: 12, fontWeight: "800", color: "#666666" },

  profileWrap: {
    marginTop: 12,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E6E6E6",
    backgroundColor: "#F7F7F7",
  },

  profileImage: {
    width: "100%",
    height: 150,
  },

  divider: {
    marginTop: 14,
    marginBottom: 12,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#EFEFEF",
  },

  sectionTitle: { fontSize: 14, fontWeight: "900", color: "#111111" },
  note: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "800",
    color: "#666666",
    lineHeight: 18,
  },
});