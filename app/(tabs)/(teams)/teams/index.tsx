import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type TeamCategory = "WT" | "PT" | "Women";

type TeamRow = {
  id: string;
  name: string;
  countryName: string;
  countryCode: string; // ISO-2, e.g. "BE", "FR"
};

function flagEmoji(countryCode: string) {
  // Converts "NO" -> 🇳🇴 etc.
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

export default function TeamsScreen() {
  const [selected, setSelected] = useState<TeamCategory>("WT");
const router = useRouter();

  const wtTeams: TeamRow[] = useMemo(
    () => [
      { id: "alpecin", name: "Alpecin–Deceuninck", countryName: "Belgium", countryCode: "BE" },
      { id: "bahrain", name: "Bahrain Victorious", countryName: "Bahrain", countryCode: "BH" },
      { id: "decathlon", name: "Decathlon AG2R La Mondiale Team", countryName: "France", countryCode: "FR" },
      { id: "ef", name: "EF Education–EasyPost", countryName: "United States", countryCode: "US" },
      { id: "groupama", name: "Groupama–FDJ", countryName: "France", countryCode: "FR" },
      { id: "ineos", name: "INEOS Grenadiers", countryName: "United Kingdom", countryCode: "GB" },
      { id: "lidl", name: "Lidl–Trek", countryName: "United States", countryCode: "US" },
      { id: "intermarche", name: "Intermarché–Wanty", countryName: "Belgium", countryCode: "BE" },
      { id: "movistar", name: "Movistar Team", countryName: "Spain", countryCode: "ES" },

      { id: "bora", name: "Red Bull–BORA–hansgrohe", countryName: "Germany", countryCode: "DE" },
      { id: "quickstep", name: "Soudal Quick-Step", countryName: "Belgium", countryCode: "BE" },
      { id: "jayco", name: "Team Jayco AlUla", countryName: "Australia", countryCode: "AU" },
      { id: "picnic", name: "Team Picnic PostNL", countryName: "Netherlands", countryCode: "NL" },
      { id: "visma", name: "Team Visma | Lease a Bike", countryName: "Netherlands", countryCode: "NL" },
      { id: "uae", name: "UAE Team Emirates", countryName: "United Arab Emirates", countryCode: "AE" },
      { id: "unox", name: "Uno-X Mobility", countryName: "Norway", countryCode: "NO" },
      { id: "astana", name: "XDS Astana Team", countryName: "Kazakhstan", countryCode: "KZ" },
    ],
    []
  );

  return (
    <SafeAreaView style={styles.screen}>
      {/* Top menu */}
      <View style={styles.topMenu}>
        <Segment label="WT" active={selected === "WT"} onPress={() => setSelected("WT")} />
        <Segment label="PT" active={selected === "PT"} onPress={() => setSelected("PT")} />
        <Segment label="Women" active={selected === "Women"} onPress={() => setSelected("Women")} />
      </View>

      {/* Content */}
      <View style={styles.body}>
        {selected === "WT" ? (
          <FlatList
            data={wtTeams}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
  <Pressable
 
onPress={() =>
  router.push({
    pathname: "/teams-detail/[teamId]",
    params: {
      teamId: String(item.id),
      teamName: String(item.name),
    },
  })
}


>

  
    <Text style={styles.flag}>{flagEmoji(item.countryCode)}</Text>
    <View style={{ flex: 1 }}>
      <Text style={styles.teamName}>{item.name}</Text>
      <Text style={styles.countryName}>{item.countryName}</Text>
    </View>
  </Pressable>
)}

          />
        ) : (
          <Text style={styles.placeholderText}>
            {selected} list comes later.
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

function Segment({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.segment, active && styles.segmentActive]}>
      <Text style={[styles.segmentText, active && styles.segmentTextActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#FFFFFF" },

  topMenu: {
    marginTop: 8,
    marginHorizontal: 16,
    padding: 6,
    borderRadius: 14,
    backgroundColor: "#E6E6E6",
    flexDirection: "row",
    gap: 12,
  },
  segment: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  segmentActive: { backgroundColor: "#111111" },
  segmentText: { fontSize: 16, color: "#111111" },
  segmentTextActive: { color: "#FFFFFF", fontWeight: "600" },

  body: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
  },
  flag: { fontSize: 20 },
  teamName: { fontSize: 16, color: "#111111", fontWeight: "600" },
  countryName: { fontSize: 13, color: "#666666", marginTop: 2 },
  separator: { height: 1, backgroundColor: "#EEEEEE" },

  placeholderText: { color: "#111111" },
});
