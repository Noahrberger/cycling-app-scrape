import { IconSymbol } from "@/components/ui/icon-symbol";
import { getRacesForDate } from "@/services/calendarService";
import { searchAll, type SearchItem } from "@/services/searchService";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ── Hjelpere ─────────────────────────────────────────────────────────────────
function parseDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function toIso(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function addDays(date: Date, n: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function flagFromISO2(iso2: string) {
  if (!iso2 || iso2.length !== 2) return "🏳️";
  const cp = iso2.toUpperCase().split("").map((c) => 127397 + c.charCodeAt(0));
  return String.fromCodePoint(...cp);
}

const MONTH_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAY_SHORT   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

// ── Typer ────────────────────────────────────────────────────────────────────
type DayItem = { iso: string; isToday: boolean };

// ── Konstanter ───────────────────────────────────────────────────────────────
const DAYS_BEFORE = 180;
const DAYS_AFTER  = 180;
const PILL_WIDTH  = 64;
const PILL_GAP    = 8;

// ── Komponent ────────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const listRef = useRef<FlatList<DayItem>>(null);

  const today = useMemo(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }, []);

  const days: DayItem[] = useMemo(() => {
    return Array.from({ length: DAYS_BEFORE + DAYS_AFTER + 1 }, (_, i) => {
      const date = addDays(today, i - DAYS_BEFORE);
      return { iso: toIso(date), isToday: i === DAYS_BEFORE };
    });
  }, [today]);

  const todayIndex = DAYS_BEFORE;
  const [selectedIndex, setSelectedIndex] = useState(todayIndex);
  const selectedIso = days[selectedIndex]?.iso ?? toIso(today);

  useEffect(() => {
    setTimeout(() => {
      listRef.current?.scrollToIndex({ index: todayIndex, animated: false, viewPosition: 0.5 });
    }, 100);
  }, []);

  const racesToday = useMemo(() => getRacesForDate(selectedIso), [selectedIso]);

  const filteredSearchItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return searchAll(q).slice(0, 8);
  }, [searchQuery]);

  const handleSearchItemPress = (item: SearchItem) => {
    setSearchQuery("");
    if (item.type === "rider") {
      router.push({ pathname: "/riders/[riderId]", params: { riderId: item.riderId } });
      return;
    }
    if (item.type === "team") {
      router.push({ pathname: "/teams-detail/[teamId]", params: { teamId: item.teamId, teamName: item.title } });
      return;
    }
    router.push({ pathname: "/races/[raceId]", params: { raceId: item.raceId } });
  };

  const renderDay = useCallback(({ item, index }: { item: DayItem; index: number }) => {
    const isSelected = index === selectedIndex;
    const date     = parseDate(item.iso);
    const dayNum   = date.getDate();
    const monthStr = MONTH_SHORT[date.getMonth()];
    const dayStr   = DAY_SHORT[date.getDay()];

    return (
      <Pressable
        onPress={() => setSelectedIndex(index)}
        style={[styles.dayPill, isSelected && styles.dayPillSelected]}
      >
        {item.isToday ? (
          <Text style={[styles.dayLabel, isSelected && styles.dayLabelSelected]}>Today</Text>
        ) : (
          <>
            <Text style={[styles.dayDay, isSelected && styles.dayLabelSelected]}>{dayStr}</Text>
            <Text style={[styles.dayNum, isSelected && styles.dayLabelSelected]}>{dayNum}</Text>
            <Text style={[styles.dayMon, isSelected && styles.dayLabelSelected]}>{monthStr}</Text>
          </>
        )}
      </Pressable>
    );
  }, [selectedIndex]);

  const getItemLayout = useCallback((_: any, index: number) => ({
    length: PILL_WIDTH + PILL_GAP,
    offset: (PILL_WIDTH + PILL_GAP) * index,
    index,
  }), []);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        {/* Søk */}
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
                    <Text style={styles.searchResultSubtitle}>{item.subtitle}</Text>
                  </View>
                  <Text style={styles.searchResultType}>
                    {item.type === "rider" ? "Rider" : item.type === "team" ? "Team" : "Race"}
                  </Text>
                </Pressable>
              ))
            )}
          </View>
        )}

        {/* Dagsvelger */}
        <FlatList
          ref={listRef}
          data={days}
          keyExtractor={(item) => item.iso}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderDay}
          getItemLayout={getItemLayout}
          contentContainerStyle={styles.dayRow}
          style={styles.dayList}
          onScrollToIndexFailed={(info) => {
            setTimeout(() => {
              listRef.current?.scrollToIndex({ index: info.index, animated: false, viewPosition: 0.5 });
            }, 200);
          }}
        />
      </View>

      {/* Innhold */}
      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 32 }}>
        <Text style={styles.sectionTitle}>Races</Text>

        {racesToday.length === 0 ? (
          <Text style={styles.noRaceText}>No races this day</Text>
        ) : (
          racesToday.map((race) => (
            <Pressable
              key={race.id}
              style={styles.raceCard}
              onPress={() => router.push({ pathname: "/races/[raceId]", params: { raceId: race.id } })}
            >
              <Text style={styles.raceFlag}>{flagFromISO2(race.countryCode)}</Text>
              <Text style={styles.raceName} numberOfLines={1}>{race.name}</Text>
            </Pressable>
          ))
        )}

        <View style={{ height: 24 }} />
        <Text style={styles.sectionTitle}>News</Text>
        <View style={styles.newsBox} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#FFFFFF" },
  header: { paddingTop: 12, paddingHorizontal: 16 },

  searchWrap: {
    flexDirection: "row", alignItems: "center",
    borderRadius: 14, backgroundColor: "#F2F2F2",
    paddingLeft: 14, paddingRight: 12, height: 48,
  },
  searchInput:    { flex: 1, fontSize: 15, color: "#111111" },
  searchIconWrap: { marginLeft: 8 },

  searchResultsBox: {
    marginTop: 10, borderRadius: 14, backgroundColor: "#FFFFFF",
    borderWidth: StyleSheet.hairlineWidth, borderColor: "#E6E6E6", overflow: "hidden",
  },
  searchResultItem: {
    paddingVertical: 12, paddingHorizontal: 14,
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "#EFEFEF",
  },
  searchResultTextWrap: { flex: 1, paddingRight: 10 },
  searchResultTitle:    { fontSize: 14, fontWeight: "800", color: "#111111" },
  searchResultSubtitle: { marginTop: 3, fontSize: 12, color: "#666666", fontWeight: "600" },
  searchResultType:     { fontSize: 12, color: "#999999", fontWeight: "700" },
  noResultsText:        { paddingVertical: 14, paddingHorizontal: 14, fontSize: 14, color: "#666666" },

  dayList: { marginTop: 10 },
  dayRow:  { paddingVertical: 6, gap: PILL_GAP },
  dayPill: {
    width: PILL_WIDTH, paddingVertical: 6,
    borderRadius: 12, backgroundColor: "#F2F2F2",
    alignItems: "center", justifyContent: "center",
  },
  dayPillSelected:  { backgroundColor: "#111111" },
  dayDay:           { fontSize: 10, color: "#999999", marginBottom: 1 },
  dayNum:           { fontSize: 15, fontWeight: "700", color: "#111111" },
  dayMon:           { fontSize: 11, color: "#666666", marginTop: 1 },
  dayLabel:         { fontSize: 13, fontWeight: "700", color: "#111111" },
  dayLabelSelected: { color: "#FFFFFF" },

  content:      { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
  sectionTitle: { fontSize: 16, fontWeight: "600", color: "#111111", marginBottom: 10 },
  noRaceText:   { fontSize: 14, color: "#999999", marginBottom: 8 },

  raceCard: {
    flexDirection: "row", alignItems: "center",
    paddingVertical: 12, paddingHorizontal: 14,
    borderRadius: 12, backgroundColor: "#FAFAFA",
    borderWidth: StyleSheet.hairlineWidth, borderColor: "#E6E6E6",
    marginBottom: 8, gap: 10,
  },
  raceFlag: { fontSize: 18 },
  raceName: { flex: 1, fontSize: 14, fontWeight: "700", color: "#111111" },

  newsBox: { height: 220, backgroundColor: "#E5E5E5", borderRadius: 12 },
});