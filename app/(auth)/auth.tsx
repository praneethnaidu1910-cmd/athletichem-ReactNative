import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Link } from "expo-router";

export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <View className="flex-1 justify-center items-center bg-background p-6">
      <View className="w-full max-w-sm">
        <Text className="text-3xl font-bold text-primary text-center mb-2">
          AthletiChem
        </Text>
        <Text className="text-muted-foreground text-center mb-8">
          {isSignUp ? "Create your account" : "Sign in to your account"}
        </Text>

        <TextInput
          className="w-full bg-card border border-border rounded-lg px-4 py-3 mb-4 text-foreground"
          placeholder="Email"
          placeholderTextColor="#6b7280"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          className="w-full bg-card border border-border rounded-lg px-4 py-3 mb-6 text-foreground"
          placeholder="Password"
          placeholderTextColor="#6b7280"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity className="w-full bg-primary rounded-lg py-3 mb-4">
          <Text className="text-primary-foreground text-center font-semibold">
            {isSignUp ? "Sign Up" : "Sign In"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
          <Text className="text-muted-foreground text-center">
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </Text>
        </TouchableOpacity>

        {!isSignUp && (
          <Link href="/(auth)/reset-password" asChild>
            <TouchableOpacity className="mt-4">
              <Text className="text-primary text-center text-sm">
                Forgot password?
              </Text>
            </TouchableOpacity>
          </Link>
        )}
      </View>
    </View>
  );
}
