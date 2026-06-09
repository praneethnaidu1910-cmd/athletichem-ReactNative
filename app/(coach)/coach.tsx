import { View, Text, ScrollView, TouchableOpacity } from "react-native";

export default function CoachDashboardScreen() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6">
        <Text className="text-2xl font-bold text-foreground mb-6">
          Coach Dashboard
        </Text>

        {/* Team Overview */}
        <View className="bg-card border border-border rounded-xl p-6 mb-4">
          <Text className="text-lg font-semibold text-foreground mb-4">
            Team Overview
          </Text>
          <View className="flex-row justify-around">
            <View className="items-center">
              <Text className="text-3xl font-bold text-primary">--</Text>
              <Text className="text-muted-foreground text-sm">Athletes</Text>
            </View>
            <View className="items-center">
              <Text className="text-3xl font-bold text-training">--</Text>
              <Text className="text-muted-foreground text-sm">Active</Text>
            </View>
            <View className="items-center">
              <Text className="text-3xl font-bold text-warning">--</Text>
              <Text className="text-muted-foreground text-sm">At Risk</Text>
            </View>
          </View>
        </View>

        {/* Athlete Roster */}
        <View className="bg-card border border-border rounded-xl p-6 mb-4">
          <Text className="text-lg font-semibold text-foreground mb-4">
            Athlete Roster
          </Text>
          <View className="bg-muted/30 rounded-lg p-4">
            <Text className="text-muted-foreground">
              No athletes in your roster yet.
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="flex-row gap-3">
          <TouchableOpacity className="flex-1 bg-primary rounded-xl p-4">
            <Text className="text-primary-foreground font-semibold text-center">
              Invite Athlete
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-card border border-border rounded-xl p-4">
            <Text className="text-foreground font-semibold text-center">
              AI Insights
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
