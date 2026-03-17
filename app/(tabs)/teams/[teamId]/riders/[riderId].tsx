import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type RiderTab = "profile" | "achievements" | "career";

type Rider = {
  id: string;
  name: string;
  nationality: string;
  age?: number;
  teamId: string;
  role?: "GC" | "Sprinter" | "Climber" | "TT" | "Domestique";
};

function getMockRider(riderId: string): Rider | null {
  const riders: Rider[] = [
    {
      id: "jonas-vingegaard",
      name: "Jonas Vingegaard",
      nationality: "Denmark",
      age: 29,
      teamId: "visma",
      role: "GC",
    },
  ];
  return riders.find((r) => r.id === riderId) ?? null;
}
function getFlagEmoji(countryName: string) {
  const map: Record<string, string> = {
    Denmark: "🇩🇰",
    Norway: "🇳🇴",
    Sweden: "🇸🇪",
    France: "🇫🇷",
    Belgium: "🇧🇪",
    Netherlands: "🇳🇱",
    Spain: "🇪🇸",
    Italy: "🇮🇹",
    Germany: "🇩🇪",
    Switzerland: "🇨🇭",
    UnitedStates: "🇺🇸",
    "United States": "🇺🇸",
    UnitedKingdom: "🇬🇧",
    "United Kingdom": "🇬🇧",
    Australia: "🇦🇺",
    "United Arab Emirates": "🇦🇪",
    Bahrain: "🇧🇭",
    Kazakhstan: "🇰🇿",
  };
  return map[countryName] ?? "🏳️";
}

function getTeamInitials(teamId: string) {
  if (!teamId) return "T";
  // Visma -> V, uae -> UAE, etc
  const clean = teamId.replace(/[^a-zA-Z0-9]/g, " ").trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 3).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function getRoleBadge(role?: string) {
  // Hvis du vil ha flere senere (Sprinter, Climber osv), er det lett.
  if (!role) return { text: "Rider" };
  return { text: role };
}

export default function RiderProfileScreen() {
  const router = useRouter();
const { teamId, riderId } = useLocalSearchParams<{
  teamId: string;
  riderId: string;
}>();



  const [activeTab, setActiveTab] = useState<RiderTab>("profile");
const handleBack = () => {
  router.back();
};


  const rider = useMemo(() => {
    if (!riderId) return null;
    return getMockRider(String(riderId));
  }, [riderId]);

  const nameTitle = useMemo(() => {
    if (!rider) return "Rider";
    return rider.name;
  }, [rider]);

  return (
    <SafeAreaView style={styles.screen}>
      {/* Header */}
     <View style={styles.header}>
<Pressable onPress={handleBack} style={styles.backButton}>
  <Text style={styles.backText}>← Back</Text>
</Pressable>

</View>


    

      {/* Content */}
      <View style={styles.content}>
        {!rider ? (
          <Text style={styles.note}>
            No rider found for id: {String(riderId)}
          </Text>
       ) : (
  <>
    {/* HERO HEADER */}
    <View style={styles.hero}>
      <View style={styles.heroTopRow}>
        {/* Team logo placeholder */}
        <View style={styles.teamLogo}>
          <Text style={styles.teamLogoText}>
            {getTeamInitials(rider.teamId)}
          </Text>
        </View>

        <View style={styles.heroTopText}>
          <Text style={styles.heroName} numberOfLines={1}>
            {rider.name}
          </Text>

          <View style={styles.heroMetaRow}>
            <Text style={styles.heroMeta}>
              {getFlagEmoji(rider.nationality)} {rider.nationality}
            </Text>

            <View style={styles.dot} />
            <Text style={styles.heroMeta}>Age {rider.age ?? "—"}</Text>
          </View>
        </View>
      </View>

      {/* Badges */}
      <View style={styles.badgesRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{getRoleBadge(rider.role).text}</Text>
        </View>
      </View>
    </View>

{/* TABS UNDER HERO */}
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

                  <Row label="Nationality" value={rider.nationality} />
                  <Row label="Age" value={rider.age ? String(rider.age) : "—"} />
                  <Row label="Role" value={rider.role ?? "—"} />
                  <Row label="Team ID" value={rider.teamId} />
                </View>

                <Text style={styles.note}>
                  Neste: bilde, stats (W/KG, resultater), sesong, ritt osv.
                </Text>
              </>
            )}

            {activeTab === "achievements" && (
              <>
                <Text style={styles.sectionTitle}>Achievements</Text>
                <Text style={styles.note}>
                  Placeholder: Her kan vi vise store seiere (Grand Tours, monuments),
                  trøyer, etappeseiere, NM osv.
                </Text>
              </>
            )}

            {activeTab === "career" && (
              <>
                <Text style={styles.sectionTitle}>Career</Text>
                <Text style={styles.note}>
                  Placeholder: Her kan vi vise karriere-tidslinje: lag per år,
                  viktige resultater per sesong, U23 → proff osv.
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

  name: {
    marginTop: 6,
    fontSize: 22,
    fontWeight: "900",
    color: "#111111",
  },

  tabsWrap: {
    flexDirection: "row",
    gap: 8,
  marginTop:12,
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

});
