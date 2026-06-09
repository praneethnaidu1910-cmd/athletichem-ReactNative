import { View, Text, ScrollView } from "react-native";

export default function CoachTabScreen() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6">
        <Text className="text-2xl font-bold text-foreground mb-6">
          Your Coach
        </Text>

        {/* Coach Info */}
        <View className="bg-card border border-border rounded-xl p-6 mb-4">
          <View className="flex-row items-center">
            <View className="w-16 h-16 bg-primary/20 rounded-full items-center justify-center mr-4">
              <Text className="text-primary text-2xl font-bold">C</Text>
            </View>
            <View>
              <Text className="text-lg font-semibold text-foreground">
                Coach Name
              </Text>
              <Text className="text-muted-foreground">Head Coach</Text>
            </View>
          </View>
        </View>

        {/* Recent Notes */}
        <View className="bg-card border border-border rounded-xl p-6 mb-4">
          <Text className="text-lg font-semibold text-foreground mb-4">
            Recent Notes
          </Text>
          <View className="bg-muted/30 rounded-lg p-4">
            <Text className="text-muted-foreground">
              No recent notes from your coach.
            </Text>
          </View>
        </View>

        {/* Training Plan */}
        <View className="bg-card border border-border rounded-xl p-6">
          <Text className="text-lg font-semibold text-foreground mb-4">
            Current Training Plan
          </Text>
          <View className="bg-muted/30 rounded-lg p-4">
            <Text className="text-muted-foreground">
              No active training plan.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
