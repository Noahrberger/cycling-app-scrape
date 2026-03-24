// app/(tabs)/calendar/[raceId]/results.tsx
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import type {
  ResultCategory,
  ResultRow,
  ResultUnit,
  ResultsData,
  StageOption,
} from "@/fixtures/results";
import { getResults } from "@/services/raceService";

export default function ResultsScreen() {
  const router = useRouter();
  const { raceId } = useLocalSearchParams<{ raceId: string }>();
  const id = String(raceId ?? "");

  const [resultsData, setResultsData] = useState<ResultsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] =
    useState<ResultCategory>("gc");

  // null = "Latest"
  const [selectedStageNumber, setSelectedStageNumber] = useState<number | null>(
    null
  );
  const [stageMenuOpen, setStageMenuOpen] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadResults() {
      setLoading(true);
      setError(null);

      const result = await getResults(id);

      if (!mounted) return;

      if (result.ok) {
        setResultsData(result.data);
      } else {
        setError(result.error);
      }

      setLoading(false);
    }

    loadResults();

    return () => {
      mounted = false;
    };
  }, [id]);

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

  const stageOptions: StageOption[] = resultsData?.stageOptions ?? [];
  const resultsByStageAndCategory =
    resultsData?.resultsByStageAndCategory ?? {};

  const stageKey =
    selectedStageNumber == null ? "latest" : String(selectedStageNumber);

  const data = resultsByStageAndCategory[stageKey]?.[selectedCategory] ?? [];
  const selectedUnit = unitByCategory[selectedCategory];

  const stageLabel = useMemo(() => {
    if (selectedStageNumber == null) return "Latest";
    return `Stage ${selectedStageNumber}`;
  }, [selectedStageNumber]);

  const metaText = useMemo(() => {
    const scope =
      selectedStageNumber == null
        ? "latest"
        : `after Stage ${selectedStageNumber}`;

    if (selectedCategory === "stage") {
      return selectedStageNumber == null
        ? "Stage result (latest available)"
        : `Stage result · Stage ${selectedStageNumber}`;
    }

    if (selectedUnit === "time") {
      return `GC-style · Leader total · Others +gap · (${scope})`;
    }

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

    const content = (
      <>
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
      </>
    );

    if (!item.riderId) {
      return <View key={item.id}>{content}</View>;
    }

    return (
      <Pressable
        key={item.id}
        onPress={() =>
          router.push({
            pathname: "/riders/[riderId]",
            params: { riderId: item.riderId! },
          })
        }
      >
        {content}
      </Pressable>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.statusText}>Loading results...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.statusText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.topTitle}>Results</Text>

        <View style={styles.stagePickerWrap}>
          <Pressable
            onPress={() => setStageMenuOpen((v) => !v)}
            style={styles.stagePickerButton}
          >
            <Text style={styles.stagePickerText}>{stageLabel}</Text>
            <Text style={styles.stagePickerChevron}>
              {stageMenuOpen ? "▲" : "▼"}
            </Text>
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

  statusText: {
    paddingHorizontal: 16,
    paddingTop: 16,
    fontSize: 14,
    fontWeight: "600",
    color: "#111111",
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