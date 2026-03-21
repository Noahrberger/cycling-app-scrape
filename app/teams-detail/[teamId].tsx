import {
  getUpcomingRacesForTeam,
  type UpcomingRace,
} from "@/store/teamUpcomingRaces";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type TeamTab = "riders" | "upcoming" | "history";

export default function TeamDetailScreen() {
  const router = useRouter();

  const { teamId, teamName } = useLocalSearchParams<{
    teamId: string;
    teamName?: string;
  }>();

  const [activeTab, setActiveTab] = useState<TeamTab>("riders");

  const title = useMemo(
    () => (teamName ?? teamId ?? "Team").toString(),
    [teamName, teamId]
  );
  const upcomingRaces = useMemo<UpcomingRace[]>(() => {
    return getUpcomingRacesForTeam(String(teamId ?? ""));
  }, [teamId]);

  return (
    <SafeAreaView style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        <Text style={styles.teamName} numberOfLines={1}>
          {title}
        </Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsWrap}>
        <TabButton
          label="Riders"
          isActive={activeTab === "riders"}
          onPress={() => setActiveTab("riders")}
        />
        <TabButton
          label="Upcoming races"
          isActive={activeTab === "upcoming"}
          onPress={() => setActiveTab("upcoming")}
        />
        <TabButton
          label="History"
          isActive={activeTab === "history"}
          onPress={() => setActiveTab("history")}
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {activeTab === "riders" && (
          <>
            <Text style={styles.sectionTitle}>Riders</Text>

            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/riders/[riderId]",
                  params: {
                    riderId: "jonas-vingegaard",
                  },
                })
              }
              style={{
                marginTop: 12,
                padding: 14,
                borderRadius: 14,
                backgroundColor: "#F2F2F2",
              }}
            >
              <Text style={{ fontWeight: "900", color: "#111111" }}>
                Jonas Vingegaard
              </Text>
              <Text style={{ marginTop: 4, color: "#666666" }}>
                GC • Denmark
              </Text>
            </Pressable>
          </>
        )}

        {activeTab === "upcoming" && (
          <>
            <Text style={styles.sectionTitle}>Upcoming races</Text>

            {upcomingRaces.length === 0 ? (
              <Text style={styles.note}>No upcoming races yet.</Text>
            ) : (
              upcomingRaces.map((race) => (
                <Pressable
                  key={race.id}
                  onPress={() =>
                    router.push({
                      pathname: "/races/[raceId]",
                      params: { raceId: race.id },
                    })
                  }
                  style={styles.raceCard}
                >
                  <Text style={styles.raceName}>{race.name}</Text>
                  <Text style={styles.raceMeta}>{race.date}</Text>
                  {race.category ? (
                    <Text style={styles.raceMeta}>{race.category}</Text>
                  ) : null}
                </Pressable>
              ))
            )}
          </>
        )}

        {activeTab === "history" && (
          <>
            <Text style={styles.sectionTitle}>History</Text>
            <Text style={styles.note}>
              Her kommer historikk. (teamId: {teamId})
            </Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

function TabButton({
  label,
  isActive,
  onPress,
}: {
  label: string;
  isActive: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.tabButton, isActive && styles.tabButtonActive]}
    >
      <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#FFFFFF" },

  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E6E6E6",
  },
  backButton: { paddingVertical: 8, alignSelf: "flex-start" },
  backText: { color: "#111111", fontSize: 16 },

  teamName: {
    marginTop: 6,
    fontSize: 22,
    fontWeight: "800",
    color: "#111111",
  },

  tabsWrap: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 6,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "#F2F2F2",
  },
  tabButtonActive: {
    backgroundColor: "#111111",
  },
  tabText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111111",
  },
  tabTextActive: {
    color: "#FFFFFF",
  },

  content: { paddingHorizontal: 16, paddingTop: 14 },
  sectionTitle: { fontSize: 16, fontWeight: "800", color: "#111111" },
  note: { marginTop: 8, color: "#666666", lineHeight: 20 },

  raceCard: {
    marginTop: 12,
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#F2F2F2",
  },
  raceName: {
    fontWeight: "900",
    fontSize: 16,
    color: "#111111",
  },
  raceMeta: {
    marginTop: 4,
    color: "#666666",
  },
});