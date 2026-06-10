import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Welcome back!</Text>
        <Text style={styles.subheading}>Here's your daily overview</Text>

        <View style={styles.quickActions}>
          <Link href="/(athlete)/dashboard" asChild>
            <TouchableOpacity style={styles.primaryCard}>
              <Text style={styles.primaryCardTitle}>Daily Log</Text>
              <Text style={styles.primaryCardSubtitle}>Log today's metrics</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/(athlete)/dashboard" asChild>
            <TouchableOpacity style={styles.secondaryCard}>
              <Text style={styles.secondaryCardTitle}>Workout</Text>
              <Text style={styles.secondaryCardSubtitle}>Log your session</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.scoreCard}>
          <Text style={styles.cardTitle}>Recovery Score</Text>
          <View style={styles.scoreCenter}>
            <Text style={styles.scoreValue}>--</Text>
            <Text style={styles.scoreLabel}>Complete today's check-in</Text>
          </View>
        </View>

        <View style={styles.metricsCard}>
          <Text style={styles.cardTitle}>Today's Metrics</Text>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>HRV</Text>
            <Text style={styles.metricValue}>-- ms</Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Sleep</Text>
            <Text style={styles.metricValue}>-- hrs</Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Resting HR</Text>
            <Text style={styles.metricValue}>-- bpm</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    padding: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
  },
  subheading: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 24,
  },
  quickActions: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  primaryCard: {
    flex: 1,
    backgroundColor: "#3b82f6",
    borderRadius: 12,
    padding: 16,
  },
  primaryCardTitle: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
  primaryCardSubtitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
    marginTop: 4,
  },
  secondaryCard: {
    flex: 1,
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 16,
  },
  secondaryCardTitle: {
    color: "#1f2937",
    fontWeight: "600",
    fontSize: 16,
  },
  secondaryCardSubtitle: {
    color: "#6b7280",
    fontSize: 13,
    marginTop: 4,
  },
  scoreCard: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 16,
  },
  scoreCenter: {
    alignItems: "center",
    paddingVertical: 16,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#3b82f6",
  },
  scoreLabel: {
    color: "#6b7280",
    marginTop: 8,
  },
  metricsCard: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 24,
  },
  metricRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  metricLabel: {
    color: "#6b7280",
    fontSize: 15,
  },
  metricValue: {
    color: "#1f2937",
    fontWeight: "500",
    fontSize: 15,
  },
});
