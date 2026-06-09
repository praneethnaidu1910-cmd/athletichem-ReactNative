import { View, Text, ScrollView } from "react-native";

export default function TrendsScreen() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6">
        <Text className="text-2xl font-bold text-foreground mb-6">Trends</Text>

        {/* Weekly Trend */}
        <View className="bg-card border border-border rounded-xl p-6 mb-4">
          <Text className="text-lg font-semibold text-foreground mb-4">
            Weekly Recovery Trend
          </Text>
          <View className="h-48 bg-muted/20 rounded-lg items-center justify-center">
            <Text className="text-muted-foreground">Chart placeholder</Text>
          </View>
        </View>

        {/* 30-Day Overview */}
        <View className="bg-card border border-border rounded-xl p-6 mb-4">
          <Text className="text-lg font-semibold text-foreground mb-4">
            30-Day Overview
          </Text>
          <View className="h-48 bg-muted/20 rounded-lg items-center justify-center">
            <Text className="text-muted-foreground">Chart placeholder</Text>
          </View>
        </View>

        {/* Metric History */}
        <View className="bg-card border border-border rounded-xl p-6">
          <Text className="text-lg font-semibold text-foreground mb-4">
            Metric History
          </Text>
          <View className="space-y-3">
            <View className="flex-row justify-between">
              <Text className="text-muted-foreground">Avg HRV (7d)</Text>
              <Text className="text-foreground">-- ms</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-muted-foreground">Avg Sleep (7d)</Text>
              <Text className="text-foreground">-- hrs</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-muted-foreground">Avg RHR (7d)</Text>
              <Text className="text-foreground">-- bpm</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
