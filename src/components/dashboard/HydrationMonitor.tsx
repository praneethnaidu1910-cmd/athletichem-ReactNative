import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Slider from '@react-native-community/slider';
import { Droplets, Thermometer, Wind, Weight, Gauge, GlassWater } from 'lucide-react-native';
import { calculateHydration, type HydrationResult, type HydrationStatus } from '../../lib/hydrationEngine';

const STATUS_STYLES: Record<HydrationStatus, { border: string; badge: string; badgeText: string }> = {
  optimal: { border: '#1D9E7550', badge: '#ECFDF5', badgeText: '#1D9E75' },
  mild:    { border: '#F59E0B50', badge: '#FFFBEB', badgeText: '#B45309' },
  high:    { border: '#E24B4A50', badge: '#FEF2F2', badgeText: '#DC2626' },
};

const FluidBar = ({ label, value, max, color }: { label: string; value: number; max: number; color: string }) => {
  const [anim] = useState(() => new Animated.Value(0));
  const pct = Math.min((value / max) * 100, 100);

  useEffect(() => {
    Animated.timing(anim, { toValue: pct, duration: 700, delay: 150, useNativeDriver: false }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pct]);

  return (
    <View style={barStyles.container}>
      <View style={barStyles.header}>
        <Text style={barStyles.label}>{label}</Text>
        <Text style={barStyles.value}>{value.toFixed(1)}L</Text>
      </View>
      <View style={barStyles.track}>
        <Animated.View style={[barStyles.fill, { backgroundColor: color, width: anim.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) }]} />
      </View>
    </View>
  );
};

const barStyles = StyleSheet.create({
  container: { gap: 4 },
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  label: { fontSize: 10, color: '#6B7280' },
  value: { fontSize: 10, fontWeight: '600', color: '#1F2937' },
  track: { height: 8, borderRadius: 4, backgroundColor: '#F3F4F6', overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 4 },
});

const InputSlider = ({
  icon: Icon, label, value, onChange, unit, min, max, step = 1,
}: {
  icon: React.ElementType; label: string; value: number;
  onChange: (v: number) => void; unit: string; min: number; max: number; step?: number;
}) => (
  <View style={sliderStyles.container}>
    <View style={sliderStyles.labelRow}>
      <Icon size={12} color="#378ADD" />
      <Text style={sliderStyles.label}>{label.toUpperCase()}</Text>
    </View>
    <View style={sliderStyles.row}>
      <Slider style={sliderStyles.slider} minimumValue={min} maximumValue={max} step={step}
        value={value} onValueChange={onChange} minimumTrackTintColor="#378ADD"
        maximumTrackTintColor="#E5E7EB" thumbTintColor="#378ADD" />
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

interface HydrationMonitorProps {
  onStatusChange?: (status: HydrationStatus) => void;
}

export default function HydrationMonitor({ onStatusChange }: HydrationMonitorProps) {
  const [duration, setDuration] = useState(60);
  const [temperature, setTemperature] = useState(25);
  const [humidity, setHumidity] = useState(50);
  const [weight, setWeight] = useState(70);
  const [intensity, setIntensity] = useState(6);
  const [result, setResult] = useState<HydrationResult | null>(null);
  const [resultAnim] = useState(() => new Animated.Value(0));

  const handleCalculate = () => {
    const r = calculateHydration({ durationMinutes: duration, temperatureC: temperature, humidityPct: humidity, bodyWeightKg: weight, intensity });
    setResult(r);
    onStatusChange?.(r.status);
    resultAnim.setValue(0);
    Animated.timing(resultAnim, { toValue: 1, duration: 350, useNativeDriver: false }).start();
  };

  const s = result ? STATUS_STYLES[result.status] : STATUS_STYLES.optimal;

  return (
    <View style={[styles.card, result ? { borderColor: s.border } : styles.defaultBorder]}>
      <View style={styles.header}>
        <View style={styles.iconBox}><Droplets size={18} color="#378ADD" /></View>
        <View style={styles.headerText}>
          <Text style={styles.title}>HYDRATION & ELECTROLYTES</Text>
          <Text style={styles.subtitle}>Estimate fluid loss & replenishment needs</Text>
        </View>
      </View>
      <View style={styles.inputs}>
        <InputSlider icon={Gauge}       label="Duration"    value={duration}     onChange={setDuration}     unit=" min" min={10}  max={240} step={5} />
        <InputSlider icon={Thermometer} label="Temperature" value={temperature}  onChange={setTemperature}  unit="°C"   min={5}   max={45} />
        <InputSlider icon={Wind}        label="Humidity"    value={humidity}     onChange={setHumidity}     unit="%"    min={10}  max={100} step={5} />
        <InputSlider icon={Weight}      label="Body Weight" value={weight}       onChange={setWeight}       unit=" kg"  min={40}  max={150} />
        <InputSlider icon={GlassWater}  label="Intensity"   value={intensity}    onChange={setIntensity}    unit="/10"  min={1}   max={10} />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleCalculate} activeOpacity={0.8}>
        <Text style={styles.buttonText}>CALCULATE HYDRATION</Text>
      </TouchableOpacity>
      {result && (
        <Animated.View style={[styles.results, { opacity: resultAnim }]}>
          <View style={styles.statusRow}>
            <Text style={styles.statusKey}>Status</Text>
            <View style={[styles.badge, { backgroundColor: s.badge }]}>
              <Text style={[styles.badgeText, { color: s.badgeText }]}>{result.statusLabel}</Text>
            </View>
          </View>
          <FluidBar label="Fluid Loss"          value={result.fluidLossLiters}        max={4} color="#EF9F27" />
          <FluidBar label="Recommended Intake"  value={result.recommendedIntakeLiters} max={5} color="#378ADD" />
          <View style={styles.insightBox}>
            <Text style={styles.insightText}>{result.recommendation}</Text>
            <Text style={styles.electrolyteText}>{`💧 ${result.electrolyteNote}`}</Text>
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, overflow: 'hidden', marginBottom: 16 },
  defaultBorder: { borderColor: '#E5E7EB' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 16, paddingBottom: 10 },
  iconBox: { width: 36, height: 36, borderRadius: 8, backgroundColor: '#378ADD1A', alignItems: 'center', justifyContent: 'center' },
  headerText: { flex: 1 },
  title: { fontSize: 11, fontWeight: '700', color: '#1F2937', letterSpacing: 0.5 },
  subtitle: { fontSize: 10, color: '#6B7280', marginTop: 1 },
  inputs: { paddingHorizontal: 16, gap: 10, paddingBottom: 12 },
  button: { marginHorizontal: 16, marginBottom: 16, backgroundColor: '#378ADD', borderRadius: 8, paddingVertical: 10, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  results: { borderTopWidth: 1, borderTopColor: '#E5E7EB', padding: 16, gap: 14 },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statusKey: { fontSize: 10, color: '#6B7280', letterSpacing: 1, textTransform: 'uppercase' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  badgeText: { fontSize: 11, fontWeight: '600' },
  insightBox: { backgroundColor: '#378ADD0D', borderWidth: 1, borderColor: '#378ADD33', borderRadius: 8, padding: 10, gap: 6 },
  insightText: { fontSize: 11, color: '#1F2937', lineHeight: 16 },
  electrolyteText: { fontSize: 10, color: '#6B7280', lineHeight: 15 },
});
