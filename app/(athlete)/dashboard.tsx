import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Activity, Droplets, AlertTriangle } from 'lucide-react-native';
import { useDashboardData, type HydrationLevel, type FatigueLevel } from '../../src/hooks/useDashboardData';
import RecoveryScoreCard from '../../src/components/dashboard/RecoveryScoreCard';
import SixMetricCards from '../../src/components/dashboard/SixMetricCards';
import HydrationMonitor from '../../src/components/dashboard/HydrationMonitor';
import MetabolicFatigueMonitor from '../../src/components/dashboard/MetabolicFatigueMonitor';
import type { HydrationStatus } from '../../src/lib/hydrationEngine';
import type { FatigueLevel as FatigueLevelType } from '../../src/lib/metabolicFatigueEngine';

const SectionHeader = ({
  icon: Icon,
  title,
  subtitle,
  iconColor,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  iconColor: string;
}) => (
  <View style={sectionStyles.container}>
    <View style={[sectionStyles.iconBox, { backgroundColor: iconColor + '1A' }]}>
      <Icon size={16} color={iconColor} />
    </View>
    <View>
      <Text style={sectionStyles.title}>{title}</Text>
      <Text style={sectionStyles.subtitle}>{subtitle}</Text>
    </View>
  </View>
);

const sectionStyles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  iconBox: { width: 34, height: 34, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 15, fontWeight: '700', color: '#1F2937' },
  subtitle: { fontSize: 11, color: '#6B7280' },
});

const hydrationStatusMap: Record<HydrationStatus, HydrationLevel> = {
  optimal: 'optimal',
  mild: 'mild',
  high: 'high',
};

const fatigueLevelMap: Record<FatigueLevelType, FatigueLevel> = {
  low: 'low',
  moderate: 'moderate',
  high: 'high',
};

export default function DashboardScreen() {
  const data = useDashboardData() as ReturnType<typeof useDashboardData> & {
    _setHydrationLevel: (v: HydrationLevel) => void;
    _setFatigueLevel: (v: FatigueLevel) => void;
  };

  const {
    recovery,
    latestHrv,
    latestSleep,
    latestLoad,
    hydrationLevel,
    fatigueLevel,
    fatigueAlert,
    isLoading,
    refetch,
    _setHydrationLevel,
    _setFatigueLevel,
  } = data;

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1D9E75" />
        <Text style={styles.loadingText}>Loading your dashboard…</Text>
      </SafeAreaView>
    );
  }

  const showAlert = fatigueAlert.lowRecovery || fatigueAlert.loadSpike;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        <View style={styles.topBar}>
          <Text style={styles.pageTitle}>Dashboard</Text>
          <TouchableOpacity onPress={refetch} style={styles.refreshBtn} activeOpacity={0.7}>
            <Text style={styles.refreshText}>Refresh</Text>
          </TouchableOpacity>
        </View>

        {/* Recovery Overview */}
        <View style={styles.section}>
          <SectionHeader icon={Heart} title="Recovery Overview" subtitle="Your current recovery status" iconColor="#1D9E75" />
          <RecoveryScoreCard recovery={recovery} latestHrv={latestHrv} latestSleep={latestSleep} latestLoad={latestLoad} />
        </View>

        {/* Key Metrics */}
        <View style={styles.section}>
          <SectionHeader icon={Activity} title="Key Metrics" subtitle="Today's performance snapshot" iconColor="#EF9F27" />
          <SixMetricCards
            recoveryScore={recovery.score}
            hasData={recovery.hasData}
            latestLoad={latestLoad}
            latestHrv={latestHrv}
            latestSleep={latestSleep}
            hydrationLevel={hydrationLevel}
            fatigueLevel={fatigueLevel}
          />
        </View>

        {/* Alerts */}
        {showAlert && (
          <View style={styles.section}>
            <SectionHeader icon={AlertTriangle} title="Alerts" subtitle="Items requiring attention" iconColor="#E24B4A" />
            <View style={styles.alertCard}>
              {fatigueAlert.lowRecovery && (
                <View style={styles.alertRow}>
                  <AlertTriangle size={14} color="#E24B4A" />
                  <Text style={styles.alertText}>
                    Low recovery score ({fatigueAlert.recoveryScore}/100) — consider reducing training intensity.
                  </Text>
                </View>
              )}
              {fatigueAlert.loadSpike && (
                <View style={styles.alertRow}>
                  <AlertTriangle size={14} color="#E24B4A" />
                  <Text style={styles.alertText}>
                    Training load spike detected (+{fatigueAlert.loadSpikePercent}% above 7-day average).
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Body Monitors */}
        <View style={styles.section}>
          <SectionHeader icon={Droplets} title="Body Monitors" subtitle="Hydration & metabolic tracking" iconColor="#378ADD" />
          <HydrationMonitor onStatusChange={(s) => _setHydrationLevel(hydrationStatusMap[s])} />
          <MetabolicFatigueMonitor onLevelChange={(l) => _setFatigueLevel(fatigueLevelMap[l])} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F9FAFB' },
  scroll: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  loadingContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, backgroundColor: '#F9FAFB' },
  loadingText: { color: '#6B7280', fontSize: 14 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  pageTitle: { fontSize: 24, fontWeight: '800', color: '#1F2937' },
  refreshBtn: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#F3F4F6', borderRadius: 8 },
  refreshText: { fontSize: 13, color: '#6B7280', fontWeight: '500' },
  section: { marginBottom: 28 },
  alertCard: { backgroundColor: '#FEF2F2', borderWidth: 1, borderColor: '#FECACA', borderRadius: 12, padding: 14, gap: 10 },
  alertRow: { flexDirection: 'row', gap: 8, alignItems: 'flex-start' },
  alertText: { flex: 1, fontSize: 13, color: '#991B1B', lineHeight: 18 },
});
