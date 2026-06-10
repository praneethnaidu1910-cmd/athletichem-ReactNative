import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function TrendsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Trends</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Weekly Recovery Trend</Text>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.placeholderText}>Chart coming soon</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>30-Day Overview</Text>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.placeholderText}>Chart coming soon</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Metric History</Text>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Avg HRV (7d)</Text>
            <Text style={styles.metricValue}>-- ms</Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Avg Sleep (7d)</Text>
            <Text style={styles.metricValue}>-- hrs</Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Avg RHR (7d)</Text>
            <Text style={styles.metricValue}>-- bpm</Text>
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
  card: { backgroundColor: "#f9fafb", borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 12, padding: 24, marginBottom: 16 },
  cardTitle: { fontSize: 18, fontWeight: "600", color: "#1f2937", marginBottom: 16 },
  chartPlaceholder: { height: 192, backgroundColor: "rgba(249,250,251,0.5)", borderRadius: 8, alignItems: "center", justifyContent: "center" },
  placeholderText: { color: "#6b7280" },
  metricRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#e5e7eb" },
  metricLabel: { color: "#6b7280", fontSize: 15 },
  metricValue: { color: "#1f2937", fontWeight: "500", fontSize: 15 },
});
