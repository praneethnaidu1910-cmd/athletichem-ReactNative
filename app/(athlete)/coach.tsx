import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function CoachTabScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Your Coach</Text>

        <View style={styles.coachCard}>
          <View style={styles.avatarRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>C</Text>
            </View>
            <View>
              <Text style={styles.coachName}>Coach Name</Text>
              <Text style={styles.coachRole}>Head Coach</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recent Notes</Text>
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>No recent notes from your coach.</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Current Training Plan</Text>
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>No active training plan.</Text>
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
  coachCard: { backgroundColor: "#f9fafb", borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 12, padding: 24, marginBottom: 16 },
  avatarRow: { flexDirection: "row", alignItems: "center", gap: 16 },
  avatar: { width: 64, height: 64, backgroundColor: "rgba(59,130,246,0.2)", borderRadius: 32, alignItems: "center", justifyContent: "center" },
  avatarText: { color: "#3b82f6", fontSize: 24, fontWeight: "bold" },
  coachName: { fontSize: 18, fontWeight: "600", color: "#1f2937" },
  coachRole: { color: "#6b7280", fontSize: 14 },
  card: { backgroundColor: "#f9fafb", borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 12, padding: 24, marginBottom: 16 },
  cardTitle: { fontSize: 18, fontWeight: "600", color: "#1f2937", marginBottom: 16 },
  emptyBox: { backgroundColor: "rgba(249,250,251,0.5)", borderRadius: 8, padding: 16 },
  emptyText: { color: "#6b7280" },
});
