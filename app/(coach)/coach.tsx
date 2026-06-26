import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

export default function CoachDashboardScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Coach Dashboard</Text>

        <View style={styles.overviewCard}>
          <Text style={styles.cardTitle}>Team Overview</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: "#3b82f6" }]}>--</Text>
              <Text style={styles.statLabel}>Athletes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: "#1d4ed8" }]}>--</Text>
              <Text style={styles.statLabel}>Active</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: "#ef4444" }]}>--</Text>
              <Text style={styles.statLabel}>At Risk</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Athlete Roster</Text>
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>No athletes in your roster yet.</Text>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Invite Athlete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>AI Insights</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  content: { padding: 24 },
  heading: { fontSize: 24, fontWeight: "bold", color: "#1f2937", marginBottom: 24 },
  overviewCard: { backgroundColor: "#f9fafb", borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 12, padding: 24, marginBottom: 16 },
  cardTitle: { fontSize: 18, fontWeight: "600", color: "#1f2937", marginBottom: 24 },
  statsRow: { flexDirection: "row", justifyContent: "space-around" },
  statItem: { alignItems: "center" },
  statValue: { fontSize: 30, fontWeight: "bold" },
  statLabel: { color: "#6b7280", fontSize: 13, marginTop: 4 },
  card: { backgroundColor: "#f9fafb", borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 12, padding: 24, marginBottom: 16 },
  emptyBox: { backgroundColor: "rgba(249,250,251,0.5)", borderRadius: 8, padding: 16 },
  emptyText: { color: "#6b7280" },
  row: { flexDirection: "row", gap: 12 },
  primaryButton: { flex: 1, backgroundColor: "#3b82f6", borderRadius: 12, padding: 16 },
  primaryButtonText: { color: "#ffffff", fontWeight: "600", textAlign: "center", fontSize: 16 },
  secondaryButton: { flex: 1, backgroundColor: "#f9fafb", borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 12, padding: 16 },
  secondaryButtonText: { color: "#1f2937", fontWeight: "600", textAlign: "center", fontSize: 16 },
});
