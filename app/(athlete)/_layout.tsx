import { Tabs } from "expo-router";
import { Text } from "react-native";

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  return (
    <Text style={{ fontSize: 10, color: focused ? "#3b82f6" : "#6b7280" }}>
      {label}
    </Text>
  );
}

export default function AthleteLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#3b82f6",
        tabBarInactiveTintColor: "#6b7280",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopColor: "#e5e7eb",
        },
        headerStyle: {
          backgroundColor: "#ffffff",
        },
        headerTintColor: "#1f2937",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon label="🏠" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ focused }) => <TabIcon label="📊" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="trends"
        options={{
          title: "Trends",
          tabBarIcon: ({ focused }) => <TabIcon label="📈" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="coach"
        options={{
          title: "Coach",
          tabBarIcon: ({ focused }) => <TabIcon label="👤" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
