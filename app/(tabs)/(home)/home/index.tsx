import { IconSymbol } from "@/components/ui/icon-symbol";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type DayItem = {
  id: string;
  labelTop: string;
  labelBottom?: string;
};

type SearchItem =
  | {
      id: string;
      type: "rider";
      title: string;
      subtitle: string;
      riderId: string;
    }
  | {
      id: string;
      type: "team";
      title: string;
      subtitle: string;
      teamId: string;
    }
  | {
      id: string;
      type: "race";
      title: string;
      subtitle: string;
      raceId: string;
    };

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const days: DayItem[] = useMemo(
    () => [
      { id: "2026-07-10", labelTop: "10.July" },
      { id: "today", labelTop: "", labelBottom: "Today" },
      { id: "2026-07-12", labelTop: "11.July" },
    ],
    []
  );

  const [selectedDayId, setSelectedDayId] = useState(days[1].id);

  const searchItems: SearchItem[] = useMemo(
    () => [
      {
        id: "rider-jonas",
        type: "rider",
        title: "Jonas Vingegaard",
        subtitle: "Rider • Visma",
        riderId: "jonas-vingegaard",
      },
      {
        id: "rider-tadej",
        type: "rider",
        title: "Tadej Pogačar",
        subtitle: "Rider • UAE",
        riderId: "tadej-pogacar",
      },
      {
        id: "rider-remco",
        type: "rider",
        title: "Remco Evenepoel",
        subtitle: "Rider • Soudal",
        riderId: "remco-evenepoel",
      },
      {
        id: "team-visma",
        type: "team",
        title: "Visma",
        subtitle: "Team",
        teamId: "visma",
      },
      {
        id: "team-uae",
        type: "team",
        title: "UAE",
        subtitle: "Team",
        teamId: "uae",
      },
      {
        id: "team-soudal",
        type: "team",
        title: "Soudal",
        subtitle: "Team",
        teamId: "soudal",
      },
      {
        id: "race-tour",
        type: "race",
        title: "Tour de France",
        subtitle: "Race • WorldTour",
        raceId: "tour-de-france",
      },
      {
        id: "race-dauphine",
        type: "race",
        title: "Critérium du Dauphiné",
        subtitle: "Race • WorldTour",
        raceId: "criterium-du-dauphine",
      },
      {
        id: "race-suisse",
        type: "race",
        title: "Tour de Suisse",
        subtitle: "Race • WorldTour",
        raceId: "tour-de-suisse",
      },
    ],
    []
  );

  const filteredSearchItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    return searchItems
      .filter((item) => {
        return (
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q)
        );
      })
      .slice(0, 8);
  }, [searchItems, searchQuery]);

  const handleSearchItemPress = (item: SearchItem) => {
    setSearchQuery("");

    if (item.type === "rider") {
      router.push({
        pathname: "/riders/[riderId]",
        params: { riderId: item.riderId },
      });
      return;
    }

    if (item.type === "team") {
      router.push({
        pathname: "/teams-detail/[teamId]",
        params: {
          teamId: item.teamId,
          teamName: item.title,
        },
      });
      return;
    }

    router.push({
      pathname: "/races/[raceId]",
      params: { raceId: item.raceId },
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.searchWrap}>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search"
            placeholderTextColor="#9A9A9A"
            style={styles.searchInput}
          />
          <View style={styles.searchIconWrap}>
            <IconSymbol size={18} name="magnifyingglass" color="#9A9A9A" />
          </View>
        </View>

        {searchQuery.trim().length > 0 && (
          <View style={styles.searchResultsBox}>
            {filteredSearchItems.length === 0 ? (
              <Text style={styles.noResultsText}>No results</Text>
            ) : (
              filteredSearchItems.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => handleSearchItemPress(item)}
                  style={styles.searchResultItem}
                >
                  <View style={styles.searchResultTextWrap}>
                    <Text style={styles.searchResultTitle}>{item.title}</Text>
                    <Text style={styles.searchResultSubtitle}>
                      {item.subtitle}
                    </Text>
                  </View>

                  <Text style={styles.searchResultType}>
                    {item.type === "rider"
                      ? "Rider"
                      : item.type === "team"
                      ? "Team"
                      : "Race"}
                  </Text>
                </Pressable>
              ))
            )}
          </View>
        )}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dayRow}
        >
          {days.map((d) => {
            const isSelected = d.id === selectedDayId;

            return (
              <Pressable
                key={d.id}
                onPress={() => setSelectedDayId(d.id)}
                style={[styles.dayPill, isSelected && styles.dayPillSelected]}
              >
                {!!d.labelTop && (
                  <Text
                    style={[styles.dayTop, isSelected && styles.dayTextSelected]}
                  >
                    {d.labelTop}
                  </Text>
                )}
                {!!d.labelBottom && (
                  <Text
                    style={[
                      styles.dayBottom,
                      isSelected && styles.dayTextSelected,
                    ]}
                  >
                    {d.labelBottom}
                  </Text>
                )}
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Races</Text>
        <Text style={styles.itemText}>Tour de france stage 7</Text>

        <View style={{ height: 24 }} />

        <Text style={styles.sectionTitle}>News</Text>
        <View style={styles.newsBox} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "#F2F2F2",
    paddingLeft: 14,
    paddingRight: 12,
    height: 48,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#111111",
  },
  searchIconWrap: {
    marginLeft: 8,
  },
  searchResultsBox: {
    marginTop: 10,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E6E6E6",
    overflow: "hidden",
  },
  searchResultItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#EFEFEF",
  },
  searchResultTextWrap: {
    flex: 1,
    paddingRight: 10,
  },
  searchResultTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111111",
  },
  searchResultSubtitle: {
    marginTop: 3,
    fontSize: 12,
    color: "#666666",
    fontWeight: "600",
  },
  searchResultType: {
    fontSize: 12,
    color: "#999999",
    fontWeight: "700",
  },
  noResultsText: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#666666",
  },
  dayRow: {
    gap: 30,
    paddingVertical: 12,
    justifyContent: "center",
  },
  dayPill: {
    minWidth: 100,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
  },
  dayPillSelected: {
    backgroundColor: "#111111",
  },
  dayTop: {
    fontSize: 14,
    color: "#111111",
  },
  dayBottom: {
    fontSize: 14,
    color: "#111111",
  },
  dayTextSelected: {
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111111",
    marginBottom: 10,
  },
  itemText: {
    fontSize: 14,
    color: "#111111",
  },
  newsBox: {
    height: 220,
    backgroundColor: "#E5E5E5",
    borderRadius: 12,
  },
});