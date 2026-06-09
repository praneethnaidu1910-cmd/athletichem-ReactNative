import { View, Text, ScrollView, TouchableOpacity } from "react-native";

export default function ProfileScreen() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6">
        <Text className="text-2xl font-bold text-foreground mb-6">Profile</Text>

        {/* Avatar */}
        <View className="items-center mb-6">
          <View className="w-24 h-24 bg-primary/20 rounded-full items-center justify-center">
            <Text className="text-primary text-4xl font-bold">A</Text>
          </View>
          <Text className="text-xl font-semibold text-foreground mt-4">
            Athlete Name
          </Text>
          <Text className="text-muted-foreground">athlete@email.com</Text>
        </View>

        {/* Profile Info */}
        <View className="bg-card border border-border rounded-xl p-6 mb-4">
          <Text className="text-lg font-semibold text-foreground mb-4">
            Personal Information
          </Text>
          <View className="space-y-4">
            <View className="flex-row justify-between">
              <Text className="text-muted-foreground">Sport</Text>
              <Text className="text-foreground">--</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-muted-foreground">Team</Text>
              <Text className="text-foreground">--</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-muted-foreground">Position</Text>
              <Text className="text-foreground">--</Text>
            </View>
          </View>
        </View>

        {/* Settings */}
        <View className="bg-card border border-border rounded-xl p-6 mb-4">
          <Text className="text-lg font-semibold text-foreground mb-4">
            Settings
          </Text>
          <View className="space-y-4">
            <TouchableOpacity className="flex-row justify-between items-center">
              <Text className="text-foreground">Notifications</Text>
              <Text className="text-primary">Configure</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row justify-between items-center">
              <Text className="text-foreground">Privacy</Text>
              <Text className="text-primary">Manage</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row justify-between items-center">
              <Text className="text-foreground">Theme</Text>
              <Text className="text-primary">System</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign Out */}
        <TouchableOpacity className="bg-destructive/10 rounded-xl p-4">
          <Text className="text-destructive text-center font-semibold">
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
