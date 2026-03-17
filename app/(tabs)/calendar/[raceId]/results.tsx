// app/(tabs)/calendar/[raceId]/results.tsx
import { useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ResultCategory = "stage" | "gc" | "points" | "kom" | "youth" | "team";
type ResultUnit = "time" | "points";

type StageOption = {
  stageNumber: number;
  label: string;
};

type ResultRow =
  | {
      id: string;
      rank: number;
      riderName: string;
      teamName?: string;
      unit: "time";
      totalTime?: string; // leader only
      gap?: string; // non-leaders only (e.g. "+0:32")
    }
  | {
      id: string;
      rank: number;
      riderName: string;
      teamName?: string;
      unit: "points";
      points: number;
    };

export default function ResultsScreen() {
  const { raceId } = useLocalSearchParams<{ raceId: string }>();
  const id = String(raceId ?? "");

  const [selectedCategory, setSelectedCategory] = useState<ResultCategory>("gc");

  // null = "Latest/Overall (end of race so far)"
  const [selectedStageNumber, setSelectedStageNumber] = useState<number | null>(
    null
  );
  const [stageMenuOpen, setStageMenuOpen] = useState(false);

  const categories: { key: ResultCategory; label: string; unit: ResultUnit }[] =
    [
      { key: "stage", label: "Stage", unit: "time" },
      { key: "gc", label: "GC", unit: "time" },
      { key: "points", label: "Points", unit: "points" },
      { key: "kom", label: "KOM", unit: "points" },
      { key: "youth", label: "Youth", unit: "time" },
      { key: "team", label: "Team", unit: "time" },
    ];

  const unitByCategory = useMemo(() => {
    const m: Record<ResultCategory, ResultUnit> = {
      stage: "time",
      gc: "time",
      points: "points",
      kom: "points",
      youth: "time",
      team: "time",
    };
    return m;
  }, []);

  /**
   * STAGES (mock)
   * Senere: hent fra API: GET /races/:raceId/stages
   */
  const stageOptions: StageOption[] = useMemo(() => {
    // Mock: 10 etapper
    const count = 10;
    return Array.from({ length: count }, (_, i) => ({
      stageNumber: i + 1,
      label: `Stage ${i + 1}`,
    }));
  }, []);

  /**
   * RESULTS (mock)
   * Senere: hent fra API med params:
   * - raceId
   * - stageNumber (null = latest)
   * - category
   *
   * Eksempel:
   * GET /races/:raceId/results?category=gc&stageNumber=4
   */
  const resultsByStageAndCategory = useMemo(() => {
    const latestKey = "latest";

    const stageKeys = stageOptions.map((s) => String(s.stageNumber));
    const keys = [latestKey, ...stageKeys];

    // Basic mock “base riders”
    const riders = [
      { name: "Jonas Vingegaard", team: "Visma" },
      { name: "Tadej Pogačar", team: "UAE" },
      { name: "Remco Evenepoel", team: "Soudal" },
      { name: "Primož Roglič", team: "Bora" },
      { name: "Carlos Rodríguez", team: "Ineos" },
    ];

    // helper: make time classification for a given stage key
    const makeTimeClassification = (prefix: string, leaderTime: string) => {
      const rows: ResultRow[] = [
        {
          id: `${prefix}-1`,
          rank: 1,
          riderName: riders[0].name,
          teamName: riders[0].team,
          unit: "time",
          totalTime: leaderTime,
        },
        {
          id: `${prefix}-2`,
          rank: 2,
          riderName: riders[1].name,
          teamName: riders[1].team,
          unit: "time",
          gap: "+0:32",
        },
        {
          id: `${prefix}-3`,
          rank: 3,
          riderName: riders[2].name,
          teamName: riders[2].team,
          unit: "time",
          gap: "+1:05",
        },
        {
          id: `${prefix}-4`,
          rank: 4,
          riderName: riders[3].name,
          teamName: riders[3].team,
          unit: "time",
          gap: "+1:44",
        },
        {
          id: `${prefix}-5`,
          rank: 5,
          riderName: riders[4].name,
          teamName: riders[4].team,
          unit: "time",
          gap: "+2:10",
        },
      ];
      return rows;
    };

    // helper: points classification
    const makePointsClassification = (prefix: string, base: number) => {
      const rows: ResultRow[] = [
        {
          id: `${prefix}-1`,
          rank: 1,
          riderName: "Sprinter A",
          teamName: "Team P",
          unit: "points",
          points: base + 30,
        },
        {
          id: `${prefix}-2`,
          rank: 2,
          riderName: "Sprinter B",
          teamName: "Team Q",
          unit: "points",
          points: base + 22,
        },
        {
          id: `${prefix}-3`,
          rank: 3,
          riderName: "Sprinter C",
          teamName: "Team R",
          unit: "points",
          points: base + 18,
        },
        {
          id: `${prefix}-4`,
          rank: 4,
          riderName: "Sprinter D",
          teamName: "Team S",
          unit: "points",
          points: base + 12,
        },
        {
          id: `${prefix}-5`,
          rank: 5,
          riderName: "Sprinter E",
          teamName: "Team T",
          unit: "points",
          points: base + 9,
        },
      ];
      return rows;
    };

    // helper: stage result (time) for a stage
    const makeStageResult = (prefix: string) => {
      const rows: ResultRow[] = [
        {
          id: `${prefix}-1`,
          rank: 1,
          riderName: "Stage Winner",
          teamName: "Team X",
          unit: "time",
          totalTime: "4:12:03",
        },
        {
          id: `${prefix}-2`,
          rank: 2,
          riderName: "Second Rider",
          teamName: "Team Y",
          unit: "time",
          gap: "+0:03",
        },
        {
          id: `${prefix}-3`,
          rank: 3,
          riderName: "Third Rider",
          teamName: "Team Z",
          unit: "time",
          gap: "+0:08",
        },
      ];
      return rows;
    };

    const store: Record<
      string,
      Record<ResultCategory, ResultRow[]>
    > = {};

    keys.forEach((k) => {
      const stageN = k === latestKey ? null : Number(k);

      // small variation by stage for demo
      const timeLeader =
        stageN == null
          ? "18:42:11"
          : `0${stageN}:4${stageN}:1${stageN}`; // silly mock

      const pointsBase = stageN == null ? 120 : 40 + stageN * 5;

      store[k] = {
        stage:
          stageN == null
            ? makeStageResult(`stage-${k}`) // latest: show last stage-ish placeholder
            : makeStageResult(`stage-${k}`),

        gc: makeTimeClassification(`gc-${k}`, timeLeader),
        youth: makeTimeClassification(`youth-${k}`, timeLeader),
        team: makeTimeClassification(`team-${k}`, `56:12:${stageN ?? 30}`),

        points: makePointsClassification(`points-${k}`, pointsBase),
        kom: makePointsClassification(`kom-${k}`, Math.floor(pointsBase / 2)),
      };
    });

    return store;
  }, [stageOptions]);

  const stageKey = selectedStageNumber == null ? "latest" : String(selectedStageNumber);
  const data = resultsByStageAndCategory[stageKey][selectedCategory];
  const selectedUnit = unitByCategory[selectedCategory];

  const stageLabel = useMemo(() => {
    if (selectedStageNumber == null) return "Latest";
    return `Stage ${selectedStageNumber}`;
  }, [selectedStageNumber]);

  const metaText = useMemo(() => {
    const scope = selectedStageNumber == null ? "latest" : `after Stage ${selectedStageNumber}`;

    if (selectedCategory === "stage") {
      return selectedStageNumber == null
        ? "Stage result (latest available)"
        : `Stage result · Stage ${selectedStageNumber}`;
    }

    if (selectedUnit === "time") return `GC-style · Leader total · Others +gap · (${scope})`;
    return `Points-style · Everyone points · (${scope})`;
  }, [selectedCategory, selectedStageNumber, selectedUnit]);

  const renderRow = (item: ResultRow) => {
    const rightValue =
      item.unit === "points"
        ? `${item.points}`
        : item.rank === 1
        ? item.totalTime ?? ""
        : item.gap ?? "";

    const rightLabel = item.unit === "points" ? "pts" : "";

    return (
      <View key={item.id}>
        <View style={styles.row}>
          <Text style={styles.rank}>{item.rank}</Text>

          <View style={styles.main}>
            <Text style={styles.name} numberOfLines={1}>
              {item.riderName}
            </Text>
            {!!item.teamName && (
              <Text style={styles.team} numberOfLines={1}>
                {item.teamName}
              </Text>
            )}
          </View>

          <View style={styles.right}>
            <Text style={styles.value} numberOfLines={1}>
              {rightValue}
            </Text>
            {!!rightLabel && <Text style={styles.subValue}>{rightLabel}</Text>}
          </View>
        </View>

        <View style={styles.separator} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Stage dropdown (small) */}
      <View style={styles.topRow}>
        <Text style={styles.topTitle}>Results</Text>

        <View style={styles.stagePickerWrap}>
          <Pressable
            onPress={() => setStageMenuOpen((v) => !v)}
            style={styles.stagePickerButton}
          >
            <Text style={styles.stagePickerText}>{stageLabel}</Text>
            <Text style={styles.stagePickerChevron}>{stageMenuOpen ? "▲" : "▼"}</Text>
          </Pressable>

          {stageMenuOpen && (
            <View style={styles.stageMenu}>
              <Pressable
                onPress={() => {
                  setSelectedStageNumber(null);
                  setStageMenuOpen(false);
                }}
                style={styles.stageMenuItem}
              >
                <Text style={styles.stageMenuItemText}>Latest</Text>
              </Pressable>

              {stageOptions.map((s) => (
                <Pressable
                  key={s.stageNumber}
                  onPress={() => {
                    setSelectedStageNumber(s.stageNumber);
                    setStageMenuOpen(false);
                  }}
                  style={styles.stageMenuItem}
                >
                  <Text style={styles.stageMenuItemText}>{s.label}</Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </View>

      {/* Category bar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.menuContainer}
        keyboardShouldPersistTaps="handled"
      >
        {categories.map((category) => {
          const isActive = selectedCategory === category.key;

          return (
            <TouchableOpacity
              key={category.key}
              onPress={() => setSelectedCategory(category.key)}
              style={[styles.menuButton, isActive && styles.activeButton]}
            >
              <Text style={[styles.menuText, isActive && styles.activeText]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.metaRow}>
        <Text style={styles.metaText}>
          raceId: {id} · {metaText}
        </Text>
      </View>

      <View>{data.map(renderRow)}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },

  topRow: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  topTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#111111",
  },

  stagePickerWrap: {
    position: "relative",
    alignItems: "flex-end",
  },
  stagePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "#F2F2F2",
  },
  stagePickerText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#111111",
  },
  stagePickerChevron: {
    fontSize: 11,
    fontWeight: "900",
    color: "#111111",
  },
  stageMenu: {
    position: "absolute",
    top: 42,
    right: 0,
    width: 170,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E6E6E6",
    overflow: "hidden",
    zIndex: 10,
  },
  stageMenuItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#EFEFEF",
  },
  stageMenuItemText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#111111",
  },

  menuContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
  },
  menuButton: {
    marginRight: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#F3F3F3",
  },
  activeButton: {
    backgroundColor: "#111111",
  },
  menuText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333333",
  },
  activeText: {
    color: "#FFFFFF",
  },

  metaRow: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  metaText: {
    fontSize: 12,
    color: "#666666",
    fontWeight: "600",
  },

  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#EFEFEF",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  rank: {
    width: 26,
    fontSize: 14,
    fontWeight: "900",
    color: "#111111",
  },
  main: {
    flex: 1,
    paddingRight: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111111",
  },
  team: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: "600",
    color: "#666666",
  },
  right: {
    alignItems: "flex-end",
    minWidth: 70,
  },
  value: {
    fontSize: 13,
    fontWeight: "900",
    color: "#111111",
  },
  subValue: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: "700",
    color: "#666666",
  },
});