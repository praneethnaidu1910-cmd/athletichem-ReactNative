import { View, Text, ScrollView } from "react-native";

export default function DashboardScreen() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6">
        <Text className="text-2xl font-bold text-foreground mb-6">
          Dashboard
        </Text>

        {/* Recovery Score */}
        <View className="bg-card border border-border rounded-xl p-6 mb-4">
          <Text className="text-lg font-semibold text-foreground mb-2">
            Recovery Score
          </Text>
          <View className="items-center py-4">
            <Text className="text-6xl font-bold text-primary">--</Text>
            <Text className="text-muted-foreground mt-2">
              No data yet
            </Text>
          </View>
        </View>

        {/* Key Metrics */}
        <View className="bg-card border border-border rounded-xl p-6 mb-4">
          <Text className="text-lg font-semibold text-foreground mb-4">
            Key Metrics
          </Text>
          <View className="space-y-4">
            <View className="flex-row justify-between items-center">
              <Text className="text-muted-foreground">Heart Rate Variability</Text>
              <Text className="text-foreground font-medium">-- ms</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-muted-foreground">Sleep Quality</Text>
              <Text className="text-foreground font-medium">-- %</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-muted-foreground">Resting Heart Rate</Text>
              <Text className="text-foreground font-medium">-- bpm</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-muted-foreground">Body Weight</Text>
              <Text className="text-foreground font-medium">-- kg</Text>
            </View>
          </View>
        </View>

        {/* Hydration & Fatigue */}
        <View className="flex-row gap-4">
          <View className="flex-1 bg-card border border-border rounded-xl p-4">
            <Text className="text-sm text-muted-foreground">Hydration</Text>
            <Text className="text-2xl font-bold text-hydration mt-1">-- %</Text>
          </View>
          <View className="flex-1 bg-card border border-border rounded-xl p-4">
            <Text className="text-sm text-muted-foreground">Fatigue</Text>
            <Text className="text-2xl font-bold text-fatigue mt-1">--</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
