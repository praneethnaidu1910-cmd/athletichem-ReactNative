import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Zap, Flame, HeartPulse, Timer, BedDouble } from 'lucide-react-native';
import {
  calculateMetabolicFatigue,
  type MetabolicFatigueResult,
  type FatigueLevel,
} from '../../lib/metabolicFatigueEngine';

const LEVEL_STYLES: Record<FatigueLevel, { border: string; badge: string; badgeText: string; meter: string; insight: string; insightBorder: string }> = {
  low:      { border: '#1D9E7550', badge: '#ECFDF5', badgeText: '#1D9E75', meter: '#1D9E75', insight: '#ECFDF5', insightBorder: '#1D9E7533' },
  moderate: { border: '#EF9F2750', badge: '#FFF7ED', badgeText: '#C2410C', meter: '#EF9F27', insight: '#FFF7ED', insightBorder: '#EF9F2733' },
  high:     { border: '#E24B4A50', badge: '#FEF2F2', badgeText: '#DC2626', meter: '#E24B4A', insight: '#FEF2F2', insightBorder: '#E24B4A33' },
};

// Animated progress bar for breakdown
const BreakdownBar = ({ label, value }: { label: string; value: number }) => {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(anim, { toValue: value, duration: 800, delay: 200, useNativeDriver: false }).start();
  }, [value]);
  return (
    <View style={bbStyles.container}>
      <View style={bbStyles.header}>
        <Text style={bbStyles.label}>{label}</Text>
        <Text style={bbStyles.value}>{value}%</Text>
      </View>
      <View style={bbStyles.track}>
        <Animated.View
          style={[bbStyles.fill, { width: anim.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) }]}
        />
      </View>
    </View>
  );
};

const bbStyles = StyleSheet.create({
  container: { gap: 3 },
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  label: { fontSize: 10, color: '#6B7280' },
  value: { fontSize: 10, fontWeight: '600', color: '#1F2937' },
  track: { height: 6, borderRadius: 3, backgroundColor: '#F3F4F6', overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 3, backgroundColor: '#EF9F27' },
});

// Input slider row
const InputSlider = ({
  icon: Icon,
  label,
  value,
  onChange,
  unit,
  min,
  max,
  step = 1,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  onChange: (v: number) => void;
  unit: string;
  min: number;
  max: number;
  step?: number;
}) => (
  <View style={sliderStyles.container}>
    <View style={sliderStyles.labelRow}>
      <Icon size={12} color="#EF9F27" />
      <Text style={sliderStyles.label}>{label.toUpperCase()}</Text>
    </View>
    <View style={sliderStyles.row}>
      <Slider
        style={sliderStyles.slider}
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={value}
        onValueChange={onChange}
        minimumTrackTintColor="#EF9F27"
        maximumTrackTintColor="#E5E7EB"
        thumbTintColor="#EF9F27"
      />
      <Text style={sliderStyles.valueText}>{value}{unit}</Text>
    </View>
  </View>
);

const sliderStyles = StyleSheet.create({
  container: { gap: 4 },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  label: { fontSize: 9, color: '#6B7280', letterSpacing: 1 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  slider: { flex: 1, height: 30 },
  valueText: { fontSize: 13, fontWeight: '700', color: '#1F2937', minWidth: 52, textAlign: 'right' },
});

interface MetabolicFatigueMonitorProps {
  onLevelChange?: (level: FatigueLevel) => void;
}

export default function MetabolicFatigueMonitor({ onLevelChange }: MetabolicFatigueMonitorProps) {
  const [trainingLoad, setTrainingLoad] = useState(300);
  const [hrZone, setHrZone] = useState(3);
  const [duration, setDuration] = useState(60);
  const [daysSinceRest, setDaysSinceRest] = useState(2);
  const [result, setResult] = useState<MetabolicFatigueResult | null>(null);
  const resultAnim = useRef(new Animated.Value(0)).current;

  // Animated score counter
  const [displayScore, setDisplayScore] = useState(0);
  const scoreAnim = useRef(new Animated.Value(0)).current;

  const handleCalculate = () => {
    const r = calculateMetabolicFatigue({ trainingLoad, hrZone, durationMinutes: duration, daysSinceRest });
    setResult(r);
    onLevelChange?.(r.level);

    resultAnim.setValue(0);
    Animated.timing(resultAnim, { toValue: 1, duration: 350, useNativeDriver: false }).start();

    scoreAnim.setValue(0);
    Animated.timing(scoreAnim, { toValue: r.score, duration: 900, useNativeDriver: false }).start();
    scoreAnim.addListener(({ value }) => setDisplayScore(Math.round(value)));
  };

  const s = result ? LEVEL_STYLES[result.level] : LEVEL_STYLES.low;

  return (
    <View style={[styles.card, result ? { borderColor: s.border } : styles.defaultBorder]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconBox}>
          <Zap size={18} color="#EF9F27" />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>METABOLIC FATIGUE</Text>
          <Text style={styles.subtitle}>Estimate cumulative fatigue from training stress</Text>
        </View>
      </View>

      {/* Inputs */}
      <View style={styles.inputs}>
        <InputSlider icon={Flame}     label="Training Load"   value={trainingLoad}  onChange={setTrainingLoad}  unit=" AU"   min={0}  max={600} step={10} />
        <InputSlider icon={HeartPulse} label="HR Zone"        value={hrZone}        onChange={setHrZone}        unit="/5"    min={1}  max={5} />
        <InputSlider icon={Timer}     label="Duration"        value={duration}      onChange={setDuration}      unit=" min"  min={10} max={180} step={5} />
        <InputSlider icon={BedDouble} label="Days Since Rest" value={daysSinceRest} onChange={setDaysSinceRest} unit=" days" min={0}  max={14} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCalculate} activeOpacity={0.8}>
        <Text style={styles.buttonText}>ASSESS FATIGUE</Text>
      </TouchableOpacity>

      {/* Results */}
      {result && (
        <Animated.View style={[styles.results, { opacity: resultAnim }]}>
          {/* Score + badge */}
          <View style={styles.scoreRow}>
            <View style={styles.scoreGroup}>
              <Text style={styles.scoreValue}>{displayScore}</Text>
              <Text style={styles.scoreMax}> / 100</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: s.badge }]}>
              <Text style={[styles.badgeText, { color: s.badgeText }]}>{result.levelLabel}</Text>
            </View>
          </View>

          {/* Fatigue meter */}
          <View style={styles.meterSection}>
            <Text style={styles.meterLabel}>FATIGUE METER</Text>
            <View style={styles.meterTrack}>
              <Animated.View
                style={[
                  styles.meterFill,
                  {
                    backgroundColor: s.meter,
                    width: resultAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', `${result.score}%`] }),
                  },
                ]}
              />
            </View>
          </View>

          {/* Breakdown */}
          <View style={styles.breakdownSection}>
            <Text style={styles.meterLabel}>BREAKDOWN</Text>
            <View style={styles.breakdownBars}>
              <BreakdownBar label="Training Load"     value={result.breakdown.loadContrib} />
              <BreakdownBar label="HR Zone Intensity" value={result.breakdown.hrZoneContrib} />
              <BreakdownBar label="Session Duration"  value={result.breakdown.durationContrib} />
              <BreakdownBar label="Rest Deficit"      value={result.breakdown.restContrib} />
            </View>
          </View>

          {/* Insight */}
          <View style={[styles.insightBox, { backgroundColor: s.insight, borderColor: s.insightBorder }]}>
            <Text style={styles.insightText}>🧪 {result.insight}</Text>
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 16,
  },
  defaultBorder: { borderColor: '#E5E7EB' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 16,
    paddingBottom: 10,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#EF9F271A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: { flex: 1 },
  title: { fontSize: 11, fontWeight: '700', color: '#1F2937', letterSpacing: 0.5 },
  subtitle: { fontSize: 10, color: '#6B7280', marginTop: 1 },
  inputs: { paddingHorizontal: 16, gap: 10, paddingBottom: 12 },
  button: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#EF9F27',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  results: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    padding: 16,
    gap: 14,
  },
  scoreRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  scoreGroup: { flexDirection: 'row', alignItems: 'baseline' },
  scoreValue: { fontSize: 30, fontWeight: '700', color: '#1F2937' },
  scoreMax: { fontSize: 12, color: '#6B7280' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  badgeText: { fontSize: 11, fontWeight: '600' },
  meterSection: { gap: 6 },
  meterLabel: { fontSize: 9, color: '#6B7280', letterSpacing: 1 },
  meterTrack: { height: 12, borderRadius: 6, backgroundColor: '#F3F4F6', overflow: 'hidden' },
  meterFill: { height: '100%', borderRadius: 6 },
  breakdownSection: { gap: 8 },
  breakdownBars: { gap: 8 },
  insightBox: { borderWidth: 1, borderRadius: 8, padding: 10 },
  insightText: { fontSize: 11, color: '#1F2937', lineHeight: 16 },
});
