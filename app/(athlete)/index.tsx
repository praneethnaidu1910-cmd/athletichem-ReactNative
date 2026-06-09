import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6">
        <Text className="text-2xl font-bold text-foreground mb-2">
          Welcome back!
        </Text>
        <Text className="text-muted-foreground mb-6">
          Here's your daily overview
        </Text>

        {/* Quick Actions */}
        <View className="flex-row gap-3 mb-6">
          <Link href="/(athlete)/dashboard" asChild>
            <TouchableOpacity className="flex-1 bg-primary rounded-xl p-4">
              <Text className="text-primary-foreground font-semibold">
                Daily Log
              </Text>
              <Text className="text-primary-foreground/80 text-sm mt-1">
                Log today's metrics
              </Text>
            </TouchableOpacity>
          </Link>

          <Link href="/(athlete)/dashboard" asChild>
            <TouchableOpacity className="flex-1 bg-card border border-border rounded-xl p-4">
              <Text className="text-foreground font-semibold">Workout</Text>
              <Text className="text-muted-foreground text-sm mt-1">
                Log your session
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Recovery Score Card */}
        <View className="bg-card border border-border rounded-xl p-6 mb-4">
          <Text className="text-lg font-semibold text-foreground mb-2">
            Recovery Score
          </Text>
          <View className="items-center py-4">
            <Text className="text-5xl font-bold text-primary">--</Text>
            <Text className="text-muted-foreground mt-2">
              Complete today's check-in
            </Text>
          </View>
        </View>

        {/* Today's Metrics */}
        <View className="bg-card border border-border rounded-xl p-6">
          <Text className="text-lg font-semibold text-foreground mb-4">
            Today's Metrics
          </Text>
          <View className="space-y-3">
            <View className="flex-row justify-between">
              <Text className="text-muted-foreground">HRV</Text>
              <Text className="text-foreground">-- ms</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-muted-foreground">Sleep</Text>
              <Text className="text-foreground">-- hrs</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-muted-foreground">Resting HR</Text>
              <Text className="text-foreground">-- bpm</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
