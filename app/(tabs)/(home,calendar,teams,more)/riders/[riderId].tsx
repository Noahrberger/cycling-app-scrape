import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  getRiderProfile,
  type RiderProfileData,
} from "@/services/riderService";

type RiderTab = "profile" | "achievements" | "career";

type LoadState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; data: RiderProfileData };

function getFlagEmojiFromISO2(countryCode?: string) {
  if (!countryCode || countryCode.length !== 2) return "🏳️";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function getCountryLabel(countryCode?: string) {
  const map: Record<string, string> = {
    DK: "Denmark",
    NO: "Norway",
    SE: "Sweden",
    FR: "France",
    BE: "Belgium",
    NL: "Netherlands",
    ES: "Spain",
    IT: "Italy",
    DE: "Germany",
    CH: "Switzerland",
    US: "United States",
    GB: "United Kingdom",
    AU: "Australia",
    AE: "United Arab Emirates",
    BH: "Bahrain",
    KZ: "Kazakhstan",
    SI: "Slovenia",
    EC: "Ecuador",
    ER: "Eritrea",
    LV: "Latvia",
  };

  return map[countryCode ?? ""] ?? countryCode ?? "Unknown";
}

function getTeamInitials(teamName: string) {
  if (!teamName) return "T";
  const clean = teamName.replace(/[^a-zA-Z0-9]/g, " ").trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 3).toUpperCase();
  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function getRoleBadge(role?: string) {
  if (!role) return { text: "Rider" };
  return { text: role };
}

export default function RiderProfileScreen() {
  const router = useRouter();
  const { riderId } = useLocalSearchParams<{ riderId: string }>();

  const [activeTab, setActiveTab] = useState<RiderTab>("profile");
  const [state, setState] = useState<LoadState>({ status: "idle" });

  const id = useMemo(() => String(riderId ?? ""), [riderId]);

  useEffect(() => {
    async function load() {
      if (!id) {
        setState({ status: "error", message: "Missing riderId" });
        return;
      }

      setState({ status: "loading" });

      const res = await getRiderProfile(id);

      if (!res.ok) {
        setState({ status: "error", message: res.error });
        return;
      }

      setState({ status: "ready", data: res.data });
    }

    load();
  }, [id]);

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        {(state.status === "idle" || state.status === "loading") && (
          <View style={styles.center}>
            <ActivityIndicator />
            <Text style={styles.note}>Loading rider…</Text>
          </View>
        )}

        {state.status === "error" && (
          <View style={styles.center}>
            <Text style={styles.sectionTitle}>Couldn’t load rider</Text>
            <Text style={styles.note}>{state.message}</Text>
          </View>
        )}

        {state.status === "ready" && (
          <>
            <View style={styles.hero}>
              <View style={styles.heroTopRow}>
                <View style={styles.teamLogo}>
                  <Text style={styles.teamLogoText}>
                    {getTeamInitials(state.data.teamName)}
                  </Text>
                </View>

                <View style={styles.heroTopText}>
                  <Text style={styles.heroName} numberOfLines={1}>
                    {state.data.name}
                  </Text>

                  <View style={styles.heroMetaRow}>
                    <Text style={styles.heroMeta}>
                      {getFlagEmojiFromISO2(state.data.countryCode)}{" "}
                      {getCountryLabel(state.data.countryCode)}
                    </Text>

                    <View style={styles.dot} />
                    <Text style={styles.heroMeta}>
                      Age {state.data.age ?? "—"}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.badgesRow}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {getRoleBadge(state.data.role).text}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.tabsWrap}>
              <TabButton
                label="Profile"
                isActive={activeTab === "profile"}
                onPress={() => setActiveTab("profile")}
              />
              <TabButton
                label="Achievements"
                isActive={activeTab === "achievements"}
                onPress={() => setActiveTab("achievements")}
              />
              <TabButton
                label="Career"
                isActive={activeTab === "career"}
                onPress={() => setActiveTab("career")}
              />
            </View>

            {activeTab === "profile" && (
              <>
                <View style={styles.card}>
                  <Row
                    label="Nationality"
                    value={getCountryLabel(state.data.countryCode)}
                  />
                  <Row
                    label="Age"
                    value={state.data.age ? String(state.data.age) : "—"}
                  />
                  <Row label="Role" value={state.data.role ?? "—"} />
                  <Row label="Team" value={state.data.teamName} />
                  <Row label="Team ID" value={state.data.teamId} />
                  <Row label="Rider ID" value={state.data.id} />
                </View>

                <Text style={styles.note}>
                  Neste: bilde, stats, sesongresultater, tidligere lag og relaterte ritt.
                </Text>
              </>
            )}

            {activeTab === "achievements" && (
              <>
                <Text style={styles.sectionTitle}>Achievements</Text>
                <Text style={styles.note}>
                  Placeholder: Her kan vi vise store seiere, trøyer, etappeseiere og sesonghøydepunkter.
                </Text>
              </>
            )}

            {activeTab === "career" && (
              <>
                <Text style={styles.sectionTitle}>Career</Text>
                <Text style={styles.note}>
                  Placeholder: Her kan vi vise karriere-tidslinje, lag per år og utvikling sesong for sesong.
                </Text>
              </>
            )}
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

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
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

  tabsWrap: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
    marginBottom: 6,
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
    fontWeight: "800",
    color: "#111111",
  },
  tabTextActive: {
    color: "#FFFFFF",
  },

  content: { paddingHorizontal: 16, paddingTop: 14 },

  sectionTitle: { fontSize: 16, fontWeight: "900", color: "#111111" },

  card: {
    marginTop: 6,
    padding: 14,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E6E6E6",
    backgroundColor: "#FAFAFA",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  rowLabel: { color: "#666666", fontSize: 13, fontWeight: "700" },
  rowValue: { color: "#111111", fontSize: 13, fontWeight: "900" },

  note: { marginTop: 12, color: "#666666", lineHeight: 20 },

  hero: {
    marginTop: 6,
    padding: 14,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E6E6E6",
    backgroundColor: "#FAFAFA",
  },

  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  teamLogo: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#111111",
    alignItems: "center",
    justifyContent: "center",
  },
  teamLogoText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 14,
  },

  heroTopText: { flex: 1 },

  heroName: {
    fontSize: 20,
    fontWeight: "900",
    color: "#111111",
  },

  heroMetaRow: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  heroMeta: {
    color: "#666666",
    fontWeight: "700",
    fontSize: 13,
  },

  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#C9C9C9",
  },

  badgesRow: {
    marginTop: 10,
    flexDirection: "row",
    gap: 8,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#111111",
  },
  badgeText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 12,
  },

  center: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
  },
});