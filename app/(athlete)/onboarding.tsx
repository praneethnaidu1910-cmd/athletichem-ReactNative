import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

export default function OnboardingScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
          <View style={styles.progressEmpty} />
          <View style={styles.progressEmpty} />
        </View>

        <Text style={styles.heading}>Welcome to AthletiChem</Text>
        <Text style={styles.subtitle}>
          Let's set up your profile to personalize your recovery insights.
        </Text>

        <View style={styles.options}>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Football</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Basketball</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Soccer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Other</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  content: { flex: 1, justifyContent: "center", padding: 24 },
  progressBar: { flexDirection: "row", gap: 8, marginBottom: 32 },
  progressFill: { flex: 1, height: 4, backgroundColor: "#3b82f6", borderRadius: 2 },
  progressEmpty: { flex: 1, height: 4, backgroundColor: "#f3f4f6", borderRadius: 2 },
  heading: { fontSize: 30, fontWeight: "bold", color: "#1f2937", textAlign: "center", marginBottom: 16 },
  subtitle: { fontSize: 16, color: "#6b7280", textAlign: "center", marginBottom: 32 },
  options: { gap: 12, marginBottom: 32 },
  option: { backgroundColor: "#f9fafb", borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 12, padding: 16 },
  optionText: { color: "#1f2937", fontWeight: "500", fontSize: 16 },
  button: { backgroundColor: "#3b82f6", borderRadius: 12, paddingVertical: 16 },
  buttonText: { color: "#ffffff", textAlign: "center", fontWeight: "600", fontSize: 18 },
});
