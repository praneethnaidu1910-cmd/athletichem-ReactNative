import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { Link } from "expo-router";

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>
          Enter your email to receive a reset link
        </Text>

        {sent ? (
          <View style={styles.successBox}>
            <Text style={styles.successText}>
              Check your email for the reset link.
            </Text>
          </View>
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#9ca3af"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <TouchableOpacity style={styles.button} onPress={() => setSent(true)}>
              <Text style={styles.buttonText}>Send Reset Link</Text>
            </TouchableOpacity>
          </>
        )}

        <Link href="/(auth)/auth" asChild>
          <TouchableOpacity>
            <Text style={styles.linkText}>Back to Sign In</Text>
          </TouchableOpacity>
        </Link>
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
    marginBottom: 24,
  },
  button: {
    width: "100%",
    backgroundColor: "#3b82f6",
    borderRadius: 8,
    paddingVertical: 14,
    marginBottom: 16,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  successBox: {
    backgroundColor: "#f0fdf4",
    borderWidth: 1,
    borderColor: "#22c55e",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  successText: {
    color: "#166534",
    textAlign: "center",
  },
  linkText: {
    color: "#3b82f6",
    textAlign: "center",
    fontSize: 16,
  },
});
