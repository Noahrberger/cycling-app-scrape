import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    Keyboard,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import type { StartlistData, StartlistTeam } from "@/fixtures/startlist";
import { getStartlist } from "@/services/raceService";

type LoadState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; data: StartlistData };

export default function StartlistScreen() {
  const { raceId } = useLocalSearchParams<{ raceId: string }>();
  const id = String(raceId ?? "");

  const [state, setState] = useState<LoadState>({ status: "idle" });
  const [query, setQuery] = useState("");
const [openTeamIds, setOpenTeamIds] = useState<Set<string>>(() => new Set());


  const load = useCallback(async () => {
    setState({ status: "loading" });
    const res = await getStartlist(id);
    if (!res.ok) {
      setState({ status: "error", message: res.error });
      return;
    }
    setState({ status: "ready", data: res.data });
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);
const toggleTeam = useCallback((teamId: string) => {
  setOpenTeamIds((prev) => {
    const next = new Set(prev);
    if (next.has(teamId)) next.delete(teamId);
    else next.add(teamId);
    return next;
  });
}, []);


  const teamsFiltered: StartlistTeam[] = useMemo(() => {
    if (state.status !== "ready") return [];
    const q = query.trim().toLowerCase();
    if (!q) return state.data.teams;


    return state.data.teams
      .map((t) => ({
        ...t,
        riders: t.riders.filter((r) => r.name.toLowerCase().includes(q)),
      }))
      .filter((t) => t.riders.length > 0);
  }, [state, query]);
 useEffect(() => {
  const q = query.trim();

  if (!q) {
    setOpenTeamIds(new Set());
    return;
  }

  if (teamsFiltered.length > 0) {
    setOpenTeamIds((prev) => {
      const next = new Set(prev);
      next.add(teamsFiltered[0].id); // åpner minst ett team med treff
      return next;
    });
  }
}, [query, teamsFiltered]);



  if (state.status === "loading" || state.status === "idle") {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text style={styles.note}>Loading startlist…</Text>
      </View>
    );
  }

  if (state.status === "error") {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Couldn’t load startlist</Text>
        <Text style={styles.note}>{state.message}</Text>

        <Pressable onPress={load} style={styles.retryButton}>
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  const lastUpdated = state.data.lastUpdatedISO
    ? new Date(state.data.lastUpdatedISO).toLocaleString()
    : null;

  return (
    <View>
      <View style={styles.topBar}>
    <View style={styles.searchWrap}>
  <TextInput
    value={query}
    onChangeText={setQuery}
    placeholder="Search rider…"
    placeholderTextColor="#999"
    style={styles.searchInput}
    autoCorrect={false}
    autoCapitalize="none"
    returnKeyType="search"
  />

  {query.trim().length > 0 && (
    <Pressable
      onPress={() => {
        setQuery("");
        Keyboard.dismiss();
      }}
      hitSlop={10}
      style={styles.cancelBtn}
    >
      <Text style={styles.cancelText}>Cancel</Text>
    </Pressable>
  )}
</View>

        <View style={styles.updatedRow}>
          {lastUpdated ? <Text style={styles.updated}>Updated: {lastUpdated}</Text> : <View />}
          <Pressable onPress={load} style={styles.refreshButton}>
            <Text style={styles.refreshText}>Refresh</Text>
          </Pressable>
        </View>
      </View>

      {teamsFiltered.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.note}>No riders match your search.</Text>
        </View>
      ) : (
     teamsFiltered.map((team) => {
 const isOpen = openTeamIds.has(team.id);


  return (
    <View key={team.id} style={styles.teamCard}>
      <Pressable
        onPress={() => toggleTeam(team.id)}
        style={({ pressed }) => [
          styles.teamHeader,
          pressed && { opacity: 0.7 },
        ]}
      >
        <Text style={styles.teamName}>{team.name}</Text>
        <Text style={styles.teamChevron}>{isOpen ? "▾" : "▸"}</Text>
      </Pressable>

      {isOpen && (
        <View style={styles.ridersWrap}>
          {team.riders.map((r) => (
            <View key={r.id} style={styles.riderRow}>
              <Text style={styles.riderName}>{r.name}</Text>
              <Text style={styles.riderMeta}>
                {r.countryCode ?? "—"} {r.role ? `• ${r.role}` : ""}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
})

      )}
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: { gap: 8, marginBottom: 10 },
 searchWrap: {
  position: "relative",
  justifyContent: "center",
},

searchInput: {
  height: 44,
  borderRadius: 12,
  paddingLeft: 12,
  paddingRight: 76, // plass til Cancel
  borderWidth: StyleSheet.hairlineWidth,
  borderColor: "#E6E6E6",
  backgroundColor: "#FFFFFF",
  fontWeight: "800",
  color: "#111111",
},

cancelBtn: {
  position: "absolute",
  right: 10,
  height: 30,
  paddingHorizontal: 10,
  borderRadius: 999,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#F2F2F2",
},

cancelText: {
  fontSize: 12,
  fontWeight: "900",
  color: "#111111",
},


  updatedRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  updated: { fontSize: 12, fontWeight: "800", color: "#666666" },
  refreshButton: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 999, backgroundColor: "#111111" },
  refreshText: { color: "#FFFFFF", fontWeight: "900", fontSize: 12 },

  teamCard: {
    padding: 14,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E6E6E6",
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
  },
  teamName: { fontSize: 14, fontWeight: "900", color: "#111111" },

  riderRow: {
    paddingVertical: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#EFEFEF",
  },
  riderName: { fontSize: 13, fontWeight: "900", color: "#111111" },
  riderMeta: { marginTop: 4, fontSize: 12, fontWeight: "800", color: "#666666" },

  empty: { paddingVertical: 20, alignItems: "center" },

  center: { alignItems: "center", justifyContent: "center", padding: 16, gap: 10 },
  note: { fontSize: 13, fontWeight: "800", color: "#666666", textAlign: "center" },

  errorTitle: { fontSize: 16, fontWeight: "900", color: "#111111", textAlign: "center" },
  retryButton: {
    marginTop: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: "#111111",
  },
  retryText: { color: "#FFFFFF", fontWeight: "900" },
  teamHeader: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingVertical: 2,
},

teamChevron: {
  fontSize: 16,
  fontWeight: "900",
  color: "#111111",
},

ridersWrap: {
  marginTop: 8,
},

});
