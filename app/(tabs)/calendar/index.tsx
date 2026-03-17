import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";

import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Category = "men" | "women";

type Race = {
  id: string;
  name: string;
  countryCode: string; // ISO-2, f.eks. "FR", "BE", "NO"
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
};

export default function CalendarScreen() {
  const router = useRouter();

  const [category, setCategory] = useState<Category>("men");

  // Long mock list (UCI WorldTour-ish start) - UI only
  const menRaces: Race[] = [
    { id: "santos-tour-down-under", name: "Santos Tour Down Under", countryCode: "AU", startDate: "2026-01-20", endDate: "2026-01-25" },
    { id: "cadel-evans-great-ocean-road-race-men", name: "Cadel Evans Great Ocean Road Race - Men", countryCode: "AU", startDate: "2026-02-01", endDate: "2026-02-01" },
    { id: "uae-tour", name: "UAE Tour", countryCode: "AE", startDate: "2026-02-16", endDate: "2026-02-22" },
    { id: "omloop-nieuwsblad", name: "Omloop Nieuwsblad", countryCode: "BE", startDate: "2026-02-28", endDate: "2026-02-28" },

    { id: "strade-bianche", name: "Strade Bianche", countryCode: "IT", startDate: "2026-03-07", endDate: "2026-03-07" },
    { id: "paris-nice", name: "Paris–Nice", countryCode: "FR", startDate: "2026-03-08", endDate: "2026-03-15" },
    { id: "tirreno-adriatico", name: "Tirreno–Adriatico", countryCode: "IT", startDate: "2026-03-09", endDate: "2026-03-15" },
    { id: "milano-sanremo", name: "Milano–Sanremo", countryCode: "IT", startDate: "2026-03-21", endDate: "2026-03-21" },
    { id: "volta-catalunya", name: "Volta Ciclista a Catalunya", countryCode: "ES", startDate: "2026-03-23", endDate: "2026-03-29" },
    { id: "ronde-van-brugge", name: "Ronde Van Brugge - Tour of Bruges", countryCode: "BE", startDate: "2026-03-25", endDate: "2026-03-25" },
    { id: "e3-saxo-classic", name: "E3 Saxo Classic", countryCode: "BE", startDate: "2026-03-27", endDate: "2026-03-27" },
    { id: "gent-wevelgem", name: "In Flanders Fields - From Middelkerke to Wevelgem", countryCode: "BE", startDate: "2026-03-29", endDate: "2026-03-29" },

    { id: "dwars-door-vlaanderen", name: "Dwars door Vlaanderen - A travers la Flandre", countryCode: "BE", startDate: "2026-04-01", endDate: "2026-04-01" },
    { id: "ronde-van-vlaanderen", name: "Ronde van Vlaanderen", countryCode: "BE", startDate: "2026-04-05", endDate: "2026-04-05" },
    { id: "itzulia-basque-country", name: "Itzulia Basque Country", countryCode: "ES", startDate: "2026-04-06", endDate: "2026-04-11" },
    { id: "paris-roubaix", name: "Paris–Roubaix Hauts-de-France", countryCode: "FR", startDate: "2026-04-12", endDate: "2026-04-12" },
    { id: "amstel-gold-race", name: "Amstel Gold Race", countryCode: "NL", startDate: "2026-04-19", endDate: "2026-04-19" },
    { id: "la-fleche-wallonne", name: "La Flèche Wallonne", countryCode: "BE", startDate: "2026-04-22", endDate: "2026-04-22" },
    { id: "liege-bastogne-liege", name: "Liège–Bastogne–Liège", countryCode: "BE", startDate: "2026-04-26", endDate: "2026-04-26" },
    { id: "tour-de-romandie", name: "Tour de Romandie", countryCode: "CH", startDate: "2026-04-28", endDate: "2026-05-03" },
    { id: "eschborn-frankfurt", name: "Eschborn–Frankfurt", countryCode: "DE", startDate: "2026-05-01", endDate: "2026-05-01" },

    { id: "giro-ditalia", name: "Giro d'Italia", countryCode: "IT", startDate: "2026-05-08", endDate: "2026-05-31" },

    { id: "tour-auvergne-rhone-alpes", name: "Tour Auvergne - Rhône-Alpes", countryCode: "FR", startDate: "2026-06-07", endDate: "2026-06-14" },
    { id: "copenhagen-sprint", name: "Copenhagen Sprint", countryCode: "DK", startDate: "2026-06-14", endDate: "2026-06-14" },
    { id: "tour-de-suisse", name: "Tour de Suisse", countryCode: "CH", startDate: "2026-06-17", endDate: "2026-06-21" },

    { id: "tour-de-france", name: "Tour de France", countryCode: "FR", startDate: "2026-07-04", endDate: "2026-07-26" },

    { id: "san-sebastian", name: "Donostia San Sebastian Klasikoa", countryCode: "ES", startDate: "2026-08-01", endDate: "2026-08-01" },
    { id: "tour-de-pologne", name: "Tour de Pologne", countryCode: "PL", startDate: "2026-08-03", endDate: "2026-08-09" },
    { id: "adac-cyclassics", name: "ADAC Cyclassics", countryCode: "DE", startDate: "2026-08-16", endDate: "2026-08-16" },
    { id: "renewi-tour", name: "Renewi Tour", countryCode: "BE", startDate: "2026-08-19", endDate: "2026-08-23" },

    { id: "la-vuelta", name: "La Vuelta Ciclista a España", countryCode: "ES", startDate: "2026-08-22", endDate: "2026-09-13" },
    { id: "bretagne-classic", name: "Bretagne Classic - CIC", countryCode: "FR", startDate: "2026-08-30", endDate: "2026-08-30" },

    { id: "gp-quebec", name: "Grand Prix Cycliste de Québec", countryCode: "CA", startDate: "2026-09-11", endDate: "2026-09-11" },
    { id: "gp-montreal", name: "Grand Prix Cycliste de Montréal", countryCode: "CA", startDate: "2026-09-13", endDate: "2026-09-13" },

    { id: "il-lombardia", name: "Il Lombardia", countryCode: "IT", startDate: "2026-10-10", endDate: "2026-10-10" },
    { id: "tour-of-guangxi", name: "Tour of Guangxi", countryCode: "CN", startDate: "2026-10-13", endDate: "2026-10-18" },
  ];

  // Keep women list minimal for now (UI only)
  const womenRaces: Race[] = [
    { id: "strade-w", name: "Strade Bianche Donne", countryCode: "IT", startDate: "2026-03-07", endDate: "2026-03-07" },
    { id: "roubaix-w", name: "Paris–Roubaix Femmes", countryCode: "FR", startDate: "2026-04-11", endDate: "2026-04-11" },
    { id: "tdff", name: "Tour de France Femmes", countryCode: "FR", startDate: "2026-07-26", endDate: "2026-08-02" },
  ];

  const races = useMemo(() => {
    const list = category === "men" ? menRaces : womenRaces;
    return [...list].sort(
      (a, b) => parseDate(a.startDate).getTime() - parseDate(b.startDate).getTime()
    );
  }, [category]);

  const todayRace = useMemo(() => {
    const now = startOfDay(new Date());

    // 1) race running today
    const ongoing = races.find((r) => {
      const s = startOfDay(parseDate(r.startDate));
      const e = startOfDay(parseDate(r.endDate));
      return now.getTime() >= s.getTime() && now.getTime() <= e.getTime();
    });
    if (ongoing) return ongoing;

    // 2) next upcoming
    const next = races.find(
      (r) => startOfDay(parseDate(r.startDate)).getTime() >= now.getTime()
    );
    return next ?? null;
  }, [races]);

  return (
    <View style={styles.screen}>
      <GenderToggleBar value={category} onChange={setCategory} />

      <FlatList
        data={races}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<TodayCard race={todayRace} />}
        renderItem={({ item }) => (
  <RaceRow
    race={item}
    onPress={() => router.push({ pathname: "/(tabs)/calendar/[raceId]", params: { raceId: item.id } })}

  />
)}

        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

function TodayCard({ race }: { race: Race | null }) {
  return (
    <View style={styles.todayWrap}>
      <Text style={styles.sectionTitle}>Today's races</Text>

      {!race ? (
        <View style={styles.todayCard}>
          <Text style={styles.note}>No races found.</Text>
        </View>
      ) : (
        <View style={styles.todayCard}>
          <View style={styles.todayRow}>
            <Text style={styles.flag}>{flagFromISO2(race.countryCode)}</Text>
            <Text style={styles.todayName} numberOfLines={1}>
              {race.name}
            </Text>
            <Text style={styles.todayDate}>
              {formatRange(race.startDate, race.endDate)}
            </Text>
          </View>

          <Text style={styles.note}>
            If there are no races today, we show the nearest upcoming race.
          </Text>
        </View>
      )}

      <Text style={[styles.sectionTitle, { marginTop: 16 }]}>All races</Text>
    </View>
  );
}

function RaceRow({ race, onPress }: { race: Race; onPress?: () => void }) {
  return (
    <Pressable style={styles.raceRow} onPress={onPress}>
      <Text style={styles.flag}>{flagFromISO2(race.countryCode)}</Text>

      <Text style={styles.raceName} numberOfLines={1}>
        {race.name}
      </Text>

      <Text style={styles.raceDate}>
        {formatRange(race.startDate, race.endDate)}
      </Text>
    </Pressable>
  );
}

function GenderToggleBar({
  value,
  onChange,
}: {
  value: Category;
  onChange: (next: Category) => void;
}) {
  return (
    <View style={genderStyles.outer}>
      <View style={genderStyles.container}>
        <Pressable
          onPress={() => onChange("men")}
          style={[
            genderStyles.button,
            value === "men" && genderStyles.buttonActive,
          ]}
        >
          <Text
            style={[
              genderStyles.text,
              value === "men" && genderStyles.textActive,
            ]}
          >
            Men
          </Text>
        </Pressable>

        <Pressable
          onPress={() => onChange("women")}
          style={[
            genderStyles.button,
            value === "women" && genderStyles.buttonActive,
          ]}
        >
          <Text
            style={[
              genderStyles.text,
              value === "women" && genderStyles.textActive,
            ]}
          >
            Women
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

/** Utils */
function parseDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function formatRange(startISO: string, endISO: string) {
  const s = parseDate(startISO);
  const e = parseDate(endISO);

  const start = formatShort(s);
  const end = formatShort(e);

  return startISO === endISO ? start : `${start}–${end}`;
}

function formatShort(d: Date) {
  const day = String(d.getDate()).padStart(2, "0");
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const mon = monthNames[d.getMonth()];
  return `${day} ${mon}`;
}

function flagFromISO2(iso2: string) {
  if (!iso2 || iso2.length !== 2) return "🏳️";
  const codePoints = iso2
    .toUpperCase()
    .split("")
    .map((c) => 127397 + c.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

/** Styles */
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#FFFFFF" },

  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  todayWrap: {
    paddingTop: 10,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#111111",
  },

  todayCard: {
    marginTop: 10,
    padding: 14,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E6E6E6",
    backgroundColor: "#FAFAFA",
  },

  todayRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  todayName: {
    flex: 1,
    fontSize: 15,
    fontWeight: "900",
    color: "#111111",
  },

  todayDate: {
    fontSize: 12,
    fontWeight: "900",
    color: "#666666",
  },

  note: {
    marginTop: 10,
    color: "#666666",
    fontWeight: "700",
    lineHeight: 18,
  },

  raceRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },

  flag: { fontSize: 16, width: 26 },

  raceName: {
    flex: 1,
    fontSize: 14,
    fontWeight: "900",
    color: "#111111",
  },

  raceDate: {
    fontSize: 12,
    fontWeight: "900",
    color: "#666666",
    marginLeft: 12,
  },

  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#EFEFEF",
  },
});

const genderStyles = StyleSheet.create({
  outer: {
    alignItems: "center",
    paddingTop: 70, // iPhone tweak
    paddingBottom: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E6E6E6",
    backgroundColor: "#FFFFFF",
  },
  container: {
    flexDirection: "row",
    backgroundColor: "#F2F2F2",
    borderRadius: 999,
    padding: 4,
    width: 240,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonActive: {
    backgroundColor: "#111111",
  },
  text: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111111",
  },
  textActive: {
    color: "#FFFFFF",
  },
});
