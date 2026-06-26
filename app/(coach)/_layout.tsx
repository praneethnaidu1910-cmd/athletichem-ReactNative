import { Stack } from "expo-router";

export default function CoachLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="coach"
        options={{
          title: "Coach Dashboard",
          headerStyle: { backgroundColor: "#ffffff" },
          headerTintColor: "#1f2937",
        }}
      />
    </Stack>
  );
}
