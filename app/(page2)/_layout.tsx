import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="tab1" options={{ tabBarIcon: () => null }} />
      <Tabs.Screen name="tab2" options={{ tabBarIcon: () => null }} />
    </Tabs>
  );
}
