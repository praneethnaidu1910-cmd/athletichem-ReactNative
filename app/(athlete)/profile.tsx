import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { supabase } from "../../src/integrations/supabase/client";

export default function ProfileScreen() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? "");
    });
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace("/(auth)/auth");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Profile</Text>

        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {email ? email[0].toUpperCase() : "A"}
            </Text>
          </View>
          <Text style={styles.name}>Athlete</Text>
          <Text style={styles.email}>{email}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Personal Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Sport</Text>
            <Text style={styles.infoValue}>--</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Team</Text>
            <Text style={styles.infoValue}>--</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Position</Text>
            <Text style={styles.infoValue}>--</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Settings</Text>
          <TouchableOpacity style={styles.settingsRow}>
            <Text style={styles.settingsLabel}>Notifications</Text>
            <Text style={styles.settingsValue}>Configure</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsRow}>
            <Text style={styles.settingsLabel}>Privacy</Text>
            <Text style={styles.settingsValue}>Manage</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsRow}>
            <Text style={styles.settingsLabel}>Theme</Text>
            <Text style={styles.settingsValue}>System</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  content: { padding: 24 },
  heading: { fontSize: 24, fontWeight: "bold", color: "#1f2937", marginBottom: 24 },
  avatarSection: { alignItems: "center", marginBottom: 24 },
  avatar: { width: 96, height: 96, backgroundColor: "rgba(59,130,246,0.2)", borderRadius: 48, alignItems: "center", justifyContent: "center" },
  avatarText: { color: "#3b82f6", fontSize: 40, fontWeight: "bold" },
  name: { fontSize: 20, fontWeight: "600", color: "#1f2937", marginTop: 16 },
  email: { color: "#6b7280", fontSize: 14 },
  card: { backgroundColor: "#f9fafb", borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 12, padding: 24, marginBottom: 16 },
  cardTitle: { fontSize: 18, fontWeight: "600", color: "#1f2937", marginBottom: 16 },
  infoRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#e5e7eb" },
  infoLabel: { color: "#6b7280", fontSize: 15 },
  infoValue: { color: "#1f2937", fontSize: 15 },
  settingsRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#e5e7eb" },
  settingsLabel: { color: "#1f2937", fontSize: 15 },
  settingsValue: { color: "#3b82f6", fontSize: 15 },
  signOutButton: { backgroundColor: "rgba(239,68,68,0.1)", borderRadius: 12, padding: 16 },
  signOutText: { color: "#ef4444", textAlign: "center", fontWeight: "600", fontSize: 16 },
});
