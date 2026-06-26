import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";
import { supabase } from "../../src/integrations/supabase/client";

export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const { error } = isSignUp
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        Alert.alert("Error", error.message);
      } else {
        router.replace("/(athlete)");
      }
    } catch {
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>AthletiChem</Text>
        <Text style={styles.subtitle}>
          {isSignUp ? "Create your account" : "Sign in to your account"}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#9ca3af"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#9ca3af"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleAuth}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>
              {isSignUp ? "Sign Up" : "Sign In"}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
          <Text style={styles.linkText}>
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </Text>
        </TouchableOpacity>

        {!isSignUp && (
          <Link href="/(auth)/reset-password" asChild>
            <TouchableOpacity>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
          </Link>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  form: {
    width: "100%",
    maxWidth: 380,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#3b82f6",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 32,
  },
  input: {
    width: "100%",
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#1f2937",
    marginBottom: 16,
  },
  button: {
    width: "100%",
    backgroundColor: "#3b82f6",
    borderRadius: 8,
    paddingVertical: 14,
    marginBottom: 16,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  linkText: {
    color: "#6b7280",
    textAlign: "center",
    fontSize: 14,
  },
  forgotText: {
    color: "#3b82f6",
    textAlign: "center",
    fontSize: 14,
    marginTop: 16,
  },
});
