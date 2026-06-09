import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Link } from "expo-router";

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <View className="flex-1 justify-center items-center bg-background p-6">
      <View className="w-full max-w-sm">
        <Text className="text-3xl font-bold text-primary text-center mb-2">
          Reset Password
        </Text>
        <Text className="text-muted-foreground text-center mb-8">
          Enter your email to receive a reset link
        </Text>

        {sent ? (
          <View className="bg-card border border-border rounded-lg p-4 mb-6">
            <Text className="text-foreground text-center">
              Check your email for the reset link.
            </Text>
          </View>
        ) : (
          <>
            <TextInput
              className="w-full bg-card border border-border rounded-lg px-4 py-3 mb-6 text-foreground"
              placeholder="Email"
              placeholderTextColor="#6b7280"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <TouchableOpacity
              className="w-full bg-primary rounded-lg py-3 mb-4"
              onPress={() => setSent(true)}
            >
              <Text className="text-primary-foreground text-center font-semibold">
                Send Reset Link
              </Text>
            </TouchableOpacity>
          </>
        )}

        <Link href="/(auth)/auth" asChild>
          <TouchableOpacity>
            <Text className="text-primary text-center">Back to Sign In</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
