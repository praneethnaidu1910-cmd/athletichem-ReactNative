import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Dashboard</Text>

        <View style={styles.scoreCard}>
          <Text style={styles.cardTitle}>Recovery Score</Text>
          <View style={styles.scoreCenter}>
            <Text style={styles.scoreValue}>--</Text>
            <Text style={styles.scoreLabel}>No data yet</Text>
          </View>
        </View>

        <View style={styles.metricsCard}>
          <Text style={styles.cardTitle}>Key Metrics</Text>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Heart Rate Variability</Text>
            <Text style={styles.metricValue}>-- ms</Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Sleep Quality</Text>
            <Text style={styles.metricValue}>-- %</Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Resting Heart Rate</Text>
            <Text style={styles.metricValue}>-- bpm</Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Body Weight</Text>
            <Text style={styles.metricValue}>-- kg</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfCard}>
            <Text style={styles.halfLabel}>Hydration</Text>
            <Text style={[styles.halfValue, { color: "#1e40af" }]}>-- %</Text>
          </View>
          <View style={styles.halfCard}>
            <Text style={styles.halfLabel}>Fatigue</Text>
            <Text style={[styles.halfValue, { color: "#ef4444" }]}>--</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  content: { padding: 24 },
  heading: { fontSize: 24, fontWeight: "bold", color: "#1f2937", marginBottom: 24 },
  scoreCard: { backgroundColor: "#f9fafb", borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 12, padding: 24, marginBottom: 16 },
  cardTitle: { fontSize: 18, fontWeight: "600", color: "#1f2937", marginBottom: 16 },
  scoreCenter: { alignItems: "center", paddingVertical: 16 },
  scoreValue: { fontSize: 56, fontWeight: "bold", color: "#3b82f6" },
  scoreLabel: { color: "#6b7280", marginTop: 8 },
  metricsCard: { backgroundColor: "#f9fafb", borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 12, padding: 24, marginBottom: 16 },
  metricRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#e5e7eb" },
  metricLabel: { color: "#6b7280", fontSize: 15 },
  metricValue: { color: "#1f2937", fontWeight: "500", fontSize: 15 },
  row: { flexDirection: "row", gap: 16 },
  halfCard: { flex: 1, backgroundColor: "#f9fafb", borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 12, padding: 16 },
  halfLabel: { color: "#6b7280", fontSize: 13 },
  halfValue: { fontSize: 24, fontWeight: "bold", marginTop: 4 },
});
