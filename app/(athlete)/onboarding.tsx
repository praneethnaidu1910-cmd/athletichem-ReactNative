import { View, Text, ScrollView, TouchableOpacity } from "react-native";

export default function OnboardingScreen() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="flex-1 justify-center items-center p-6">
        <View className="w-full max-w-sm">
          {/* Progress Bar */}
          <View className="flex-row gap-2 mb-8">
            <View className="flex-1 h-1 bg-primary rounded-full" />
            <View className="flex-1 h-1 bg-muted rounded-full" />
            <View className="flex-1 h-1 bg-muted rounded-full" />
          </View>

          {/* Step 1 */}
          <Text className="text-3xl font-bold text-foreground text-center mb-4">
            Welcome to AthletiChem
          </Text>
          <Text className="text-muted-foreground text-center mb-8">
            Let's set up your profile to personalize your recovery insights.
          </Text>

          {/* Sport Selection */}
          <View className="space-y-3 mb-8">
            <TouchableOpacity className="bg-card border border-border rounded-xl p-4">
              <Text className="text-foreground font-medium">Football</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-card border border-border rounded-xl p-4">
              <Text className="text-foreground font-medium">Basketball</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-card border border-border rounded-xl p-4">
              <Text className="text-foreground font-medium">Soccer</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-card border border-border rounded-xl p-4">
              <Text className="text-foreground font-medium">Other</Text>
            </TouchableOpacity>
          </View>

          {/* Next Button */}
          <TouchableOpacity className="w-full bg-primary rounded-xl py-4">
            <Text className="text-primary-foreground text-center font-semibold text-lg">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
