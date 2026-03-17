// app/(tabs)/calendar/_layout.tsx
import { Stack } from "expo-router";
import React from "react";

export default function CalendarLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,          // 🔥 fjerner blå default header
        animation: "slide_from_right",
        animationTypeForReplace: "pop", // 🔥 gjør replace til “tilbake”
      }}
    />
  );
}

