import { getRace, getStage } from "@/services/raceService";
import type { RaceDetails } from "@/store/raceStore";
import {
  formatShort,
  parseDate,
  type Stage,
} from "@/store/raceStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; race: RaceDetails; stage: Stage };

export default function StageDetailScreen() {
  const router = useRouter();
  const { raceId, stagenumber } = useLocalSearchParams<{
    raceId: string;
    stagenumber: string;
  }>();

  const id = String(raceId ?? "");
  const num = Number(stagenumber ?? NaN);

  const [state, setState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    let mounted = true;

    async function loadStage() {
      setState({ status: "loading" });

      const raceRes = await getRace(id);
      if (!mounted) return;

      if (!raceRes.ok) {
        setState({ status: "error", message: raceRes.error });
        return;
      }

      if (!Number.isFinite(num)) {
        setState({ status: "error", message: `No stage found: ${String(stagenumber)}` });
        return;
      }

      const stageRes = await getStage(id, num);
      if (!mounted) return;

      if (!stageRes.ok) {
        setState({ status: "error", message: stageRes.error });
        return;
      }

      setState({
        status: "ready",
        race: raceRes.data,
        stage: stageRes.data,
      });
    }

    loadStage();

    return () => {
      mounted = false;
    };
  }, [id, num, stagenumber]);

  const profileImageUrl = useMemo(() => {
    if (state.status !== "ready") {
      return "https://via.placeholder.com/1200x360.png?text=Stage+profile";
    }

    const url = state.stage.profileImage;
    if (url && typeof url === "string" && url.startsWith("http")) return url;
    return "https://via.placeholder.com/1200x360.png?text=Stage+profile";
  }, [state]);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/races/[raceId]/stages",
            params: { raceId: id },
          })
        }
        style={styles.backButton}
      >
        <Text style={styles.backText}>← Back to stages</Text>
      </Pressable>

      {state.status === "loading" ? (
        <Text style={styles.note}>Loading stage...</Text>
      ) : state.status === "error" ? (
        <Text style={styles.note}>{state.message}</Text>
      ) : (
        <View style={styles.card}>
          <Text style={styles.stageLabel}>Stage {state.stage.stageNumber}</Text>

          <Text style={styles.title}>
            {state.stage.startCity} → {state.stage.finishCity}
          </Text>

          <Text style={styles.meta}>
            {formatShort(parseDate(state.stage.date))} • {state.stage.distanceKm} km •{" "}
            {state.stage.stageType}
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