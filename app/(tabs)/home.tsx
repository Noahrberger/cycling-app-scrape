import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



type DayItem = {
  id: string;
  labelTop: string;   // f.eks. "10.Juli"
  labelBottom?: string; // f.eks. "I dag"
};

export default function HomeScreen() {
  // Midlertidige “dager” kun for UI
  const days: DayItem[] = useMemo(
    () => [
      { id: "2026-07-10", labelTop: "10.July" },
      { id: "today", labelTop: "", labelBottom: "Today" },
      { id: "2026-07-12", labelTop: "11.July" },
    ],
    []
  );

  const [selectedDayId, setSelectedDayId] = useState(days[1].id); // default: "I dag"

  return (
    <SafeAreaView style={styles.screen}>
      {/* Header / dag-velger */}
      <View style={styles.header}>
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
                style={[
                  styles.dayPill,
                  isSelected && styles.dayPillSelected,
                ]}
              >
                {!!d.labelTop && (
                  <Text style={[styles.dayTop, isSelected && styles.dayTextSelected]}>
                    {d.labelTop}
                  </Text>
                )}
                {!!d.labelBottom && (
                  <Text style={[styles.dayBottom, isSelected && styles.dayTextSelected]}>
                    {d.labelBottom}
                  </Text>
                )}
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Resten av hjem-skjermen (placeholder, vi rører ikke mer nå) */}
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
dayRow: {
  gap: 30,
  paddingVertical: 8,
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
