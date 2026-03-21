import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      {/* Synlige tabs */}
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="teams"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="(teams)"
        options={{
          title: "Teams",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="tshirt.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="calendar"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="(calendar)"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="calendar" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="more"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="(more)"
        options={{
          title: "More",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="ellipsis.circle.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="home"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}