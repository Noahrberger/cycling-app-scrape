import RaceHero from "@/components/RaceHero";
import { getRaceById, RaceDetails } from "@/store/raceStore";
import { Slot, useLocalSearchParams, usePathname, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";


type TabKey = "overview" | "stages" | "startlist" | "results";

export default function RaceLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const { raceId } = useLocalSearchParams<{ raceId: string }>();
  const id = String(raceId ?? "");

  const race = useMemo<RaceDetails | null>(() => getRaceById(id), [id]);

  const activeTab: TabKey = useMemo(() => {
    if (pathname.includes("/stages")) return "stages";
    if (pathname.endsWith("/startlist")) return "startlist";
    if (pathname.endsWith("/results")) return "results";
    return "overview";
  }, [pathname]);

  const goTab = (tab: TabKey) => {
    if (tab === "overview") router.push(`/calendar/${id}`);
    if (tab === "stages") router.push(`/calendar/${id}/stages`);
    if (tab === "startlist") router.push(`/calendar/${id}/startlist`);
    if (tab === "results") router.push(`/calendar/${id}/results`);
  };

  return (
    <View style={styles.screen}>
      {/* Sticky top header (always visible) */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.replace("/calendar")}
          style={styles.backButton}
        >
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
      </View>

      {/* ONE scroll container that owns the scroll */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        stickyHeaderIndices={[1]} // 👈 tabs container is child index 1
        keyboardShouldPersistTaps="handled"
      >
        {/* 0: HERO (scrolls away) */}
        {race ? (
          <RaceHero race={race} />
        ) : (
          <View style={styles.notFoundBox}>
            <Text style={styles.notFoundTitle}>No race found</Text>
            <Text style={styles.notFoundText}>id: {id}</Text>
          </View>
        )}

        {/* 1: TABS (sticky) */}
        <View style={styles.tabsSticky}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsRow}
            keyboardShouldPersistTaps="handled"
          >
            <TabButton
              label="Overview"
              isActive={activeTab === "overview"}
              onPress={() => goTab("overview")}
            />
            <TabButton
              label="Stages"
              isActive={activeTab === "stages"}
              onPress={() => goTab("stages")}
            />
            <TabButton
              label="Startlist"
              isActive={activeTab === "startlist"}
              onPress={() => goTab("startlist")}
            />
            <TabButton
              label="Results"
              isActive={activeTab === "results"}
              onPress={() => goTab("results")}
            />
          </ScrollView>
        </View>

        {/* 2: Screen content (from child routes) */}
        <View style={{ paddingTop: 8 }}>
          <Slot />
        </View>
      </ScrollView>
    </View>
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
    paddingTop: 70,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E6E6E6",
    backgroundColor: "#FFFFFF",
  },
  backButton: { paddingVertical: 6, alignSelf: "flex-start" },
  backText: { color: "#111111", fontSize: 16, fontWeight: "800" },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
  },

  tabsSticky: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E6E6E6",
    paddingVertical: 10,
  },

  // Midtsentrert pill-rad. Hvis "gap" ikke funker i din RN-versjon,
  // bytt til marginRight på tabButton.
  tabsRow: {
    flexGrow: 1,
    justifyContent: "center",
    gap: 10,
  },

  tabButton: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
  },
  tabButtonActive: { backgroundColor: "#111111" },

  tabText: { fontSize: 14, fontWeight: "800", color: "#111111" },
  tabTextActive: { color: "#FFFFFF" },

  notFoundBox: {
    padding: 14,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E6E6E6",
    backgroundColor: "#FFF5F5",
    marginBottom: 10,
  },
  notFoundTitle: { fontSize: 16, fontWeight: "900", color: "#111111" },
  notFoundText: { marginTop: 6, fontSize: 13, fontWeight: "800", color: "#666666" },
});
