import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Activity,
  Heart,
  Moon,
  Footprints,
  Droplets,
  Zap,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';

type StatusLevel = 'good' | 'moderate' | 'risk';
type HydrationLevel = 'optimal' | 'mild' | 'high';
type FatigueLevel = 'low' | 'moderate' | 'high';

const STATUS_COLORS: Record<StatusLevel, { icon: string; badge: string; badgeText: string }> = {
  good:     { icon: '#1D9E75', badge: '#ECFDF5', badgeText: '#1D9E75' },
  moderate: { icon: '#F59E0B', badge: '#FFFBEB', badgeText: '#B45309' },
  risk:     { icon: '#E24B4A', badge: '#FEF2F2', badgeText: '#DC2626' },
};

const STATUS_LABEL: Record<StatusLevel, string> = {
  good: 'Good',
  moderate: 'Moderate',
  risk: 'High Risk',
};

const ACCENT: Record<string, string> = {
  hrv:       '#1D9E75',
  sleep:     '#378ADD',
  load:      '#EF9F27',
  recovery:  '#1D9E75',
  hydration: '#378ADD',
  fatigue:   '#E24B4A',
};

// Status helpers — exact same logic as web SixMetricCards
function getRecoveryStatus(score: number): StatusLevel {
  if (score >= 60) return 'good';
  if (score >= 40) return 'moderate';
  return 'risk';
}
function getLoadStatus(load: number | null): StatusLevel {
  if (load === null) return 'moderate';
  if (load <= 300) return 'good';
  if (load <= 450) return 'moderate';
  return 'risk';
}
function getHrvStatus(hrv: number | null): StatusLevel {
  if (hrv === null) return 'moderate';
  if (hrv >= 55) return 'good';
  if (hrv >= 35) return 'moderate';
  return 'risk';
}
function getSleepStatus(hours: number | null): StatusLevel {
  if (hours === null) return 'moderate';
  if (hours >= 7) return 'good';
  if (hours >= 5.5) return 'moderate';
  return 'risk';
}

function getHrvNote(hrv: number | null) {
  if (hrv === null) return 'No data yet';
  if (hrv >= 45) return 'Normal range';
  if (hrv >= 35) return 'Slightly suppressed';
  return 'Below baseline';
}
function getSleepNote(hours: number | null) {
  if (hours === null) return 'No data yet';
  if (hours >= 8) return 'Well rested';
  if (hours >= 7) return 'Adequate';
  if (hours >= 5.5) return 'Below target';
  return 'Sleep deprived';
}
function getLoadNote(load: number | null) {
  if (load === null) return 'No data yet';
  if (load <= 200) return 'Light load';
  if (load <= 400) return 'Moderate load';
  if (load <= 500) return 'Heavy load';
  return 'Very high load';
}
function getRecoveryNote(score: number, hasData: boolean) {
  if (!hasData) return 'No data yet';
  if (score >= 80) return 'Peak readiness';
  if (score >= 60) return 'Ready to train';
  if (score >= 40) return 'Recovery needed';
  return 'Rest recommended';
}

const hydrationMap: Record<HydrationLevel, { label: string; status: StatusLevel }> = {
  optimal: { label: 'Optimal',   status: 'good' },
  mild:    { label: 'Mild Risk', status: 'moderate' },
  high:    { label: 'High Risk', status: 'risk' },
};
const fatigueMap: Record<FatigueLevel, { label: string; status: StatusLevel }> = {
  low:      { label: 'Low',      status: 'good' },
  moderate: { label: 'Moderate', status: 'moderate' },
  high:     { label: 'High',     status: 'risk' },
};

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  unit?: string;
  status: StatusLevel;
  accentColor: string;
  statusNote: string;
  trend?: 'up' | 'down' | 'flat';
}

const MetricCard = ({ icon: Icon, label, value, unit, status, accentColor, statusNote, trend }: MetricCardProps) => {
  const s = STATUS_COLORS[status];
  return (
    <View style={[styles.card, { borderLeftColor: accentColor }]}>
      <View style={styles.cardTop}>
        <View style={[styles.iconBox, { backgroundColor: accentColor + '1A' }]}>
          <Icon size={16} color={accentColor} />
        </View>
        <View style={[styles.badge, { backgroundColor: s.badge }]}>
          <Text style={[styles.badgeText, { color: s.badgeText }]}>{STATUS_LABEL[status]}</Text>
        </View>
      </View>

      <Text style={styles.metricLabel}>{label.toUpperCase()}</Text>

      <View style={styles.valueRow}>
        <Text style={styles.metricValue}>{value}</Text>
        {unit ? <Text style={styles.unit}>{unit}</Text> : null}
        {trend === 'up' && <TrendingUp size={13} color="#1D9E75" />}
        {trend === 'down' && <TrendingDown size={13} color="#E24B4A" />}
        {trend === 'flat' && <Minus size={13} color="#6B7280" />}
      </View>

      <Text style={styles.statusNote}>{statusNote}</Text>
    </View>
  );
};

interface SixMetricCardsProps {
  recoveryScore: number;
  hasData: boolean;
  latestLoad: number | null;
  latestHrv: number | null;
  latestSleep: number | null;
  hydrationLevel: HydrationLevel;
  fatigueLevel: FatigueLevel;
}

export default function SixMetricCards({
  recoveryScore,
  hasData,
  latestLoad,
  latestHrv,
  latestSleep,
  hydrationLevel,
  fatigueLevel,
}: SixMetricCardsProps) {
  const hydration = hydrationMap[hydrationLevel];
  const fatigue = fatigueMap[fatigueLevel];

  const cards: MetricCardProps[] = [
    {
      icon: Footprints,
      label: 'Recovery Score',
      value: hasData ? String(recoveryScore) : '—',
      unit: '/ 100',
      status: hasData ? getRecoveryStatus(recoveryScore) : 'moderate',
      accentColor: ACCENT.recovery,
      statusNote: getRecoveryNote(recoveryScore, hasData),
      trend: hasData ? 'flat' : undefined,
    },
    {
      icon: Activity,
      label: 'Training Load',
      value: latestLoad !== null ? String(latestLoad) : '—',
      unit: 'AU',
      status: getLoadStatus(latestLoad),
      accentColor: ACCENT.load,
      statusNote: getLoadNote(latestLoad),
      trend: latestLoad !== null ? 'flat' : undefined,
    },
    {
      icon: Moon,
      label: 'Sleep Hours',
      value: latestSleep !== null ? String(latestSleep) : '—',
      unit: 'hrs',
      status: getSleepStatus(latestSleep),
      accentColor: ACCENT.sleep,
      statusNote: getSleepNote(latestSleep),
      trend: latestSleep !== null ? 'flat' : undefined,
    },
    {
      icon: Heart,
      label: 'HRV',
      value: latestHrv !== null ? String(latestHrv) : '—',
      unit: 'ms',
      status: getHrvStatus(latestHrv),
      accentColor: ACCENT.hrv,
      statusNote: getHrvNote(latestHrv),
      trend: latestHrv !== null ? 'flat' : undefined,
    },
    {
      icon: Droplets,
      label: 'Hydration',
      value: hydration.label,
      status: hydration.status,
      accentColor: ACCENT.hydration,
      statusNote:
        hydrationLevel === 'optimal' ? 'Well hydrated' :
        hydrationLevel === 'mild'    ? 'Monitor intake' : 'Rehydrate now',
    },
    {
      icon: Zap,
      label: 'Metabolic Fatigue',
      value: fatigue.label,
      status: fatigue.status,
      accentColor: ACCENT.fatigue,
      statusNote:
        fatigueLevel === 'low'      ? 'Systems normal' :
        fatigueLevel === 'moderate' ? 'Elevated markers' : 'Rest advised',
    },
  ];

  return (
    <View style={styles.grid}>
      {cards.map((card) => (
        <MetricCard key={card.label} {...card} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  card: {
    width: '47.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderLeftWidth: 3,
    padding: 12,
    gap: 6,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
  },
  metricLabel: {
    fontSize: 9,
    color: '#6B7280',
    letterSpacing: 1,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
    lineHeight: 28,
  },
  unit: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 3,
  },
  statusNote: {
    fontSize: 9,
    color: '#6B7280',
  },
});
