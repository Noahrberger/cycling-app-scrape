// app/races/[raceId]/index.tsx
import { getRace } from "@/services/raceService";
import type { RaceDetails } from "@/types/models";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; data: RaceDetails };

export default function RaceOverviewScreen() {
  const { raceId } = useLocalSearchParams<{ raceId: string }>();
  const id = String(raceId ?? "");

  const [state, setState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    let mounted = true;

    async function loadRace() {
      setState({ status: "loading" });
      const res = await getRace(id);

      if (!mounted) return;

      if (!res.ok) {
        setState({ status: "error", message: res.error });
        return;
      }

      setState({ status: "ready", data: res.data });
    }

    loadRace();

    return () => {
      mounted = false;
    };
  }, [id]);

  const rows = useMemo(() => {
    if (state.status !== "ready") return [];

    return [
      "General info about the race",
      "Defending champion",
      "Route summary",
      "Key stages",
      "Jerseys",
    ];
  }, [state]);

  if (state.status === "loading") {
    return (
      <View style={{ paddingBottom: 40 }}>
        <View style={styles.row}>
          <Text style={styles.rowText}>Loading race...</Text>
        </View>
      </View>
    );
  }

  if (state.status === "error") {
    return (
      <View style={{ paddingBottom: 40 }}>
        <View style={styles.row}>
          <Text style={styles.rowText}>{state.message}</Text>
        </View>
      </View>
    );
  }

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