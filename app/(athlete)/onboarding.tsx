import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, Animated, KeyboardAvoidingView, Platform,
  Alert, ActivityIndicator,
} from 'react-native';
import Svg, { Polygon, Circle, Path } from 'react-native-svg';
import { router } from 'expo-router';
import { supabase } from '../../src/integrations/supabase/client';
import { getLocalDateKey } from '../../src/lib/dateUtils';
import { sanitizeName } from '../../src/lib/formValidation';

const BG = '#060b18';
const TEAL = '#00D4A8';
const TEXT_PRI = '#E8F4F0';
const TEXT_SEC = '#5A7A8A';
const TEXT_MID = '#8BA8B8';
const CARD_BORDER = '#1E2D3D';
const SURFACE = '#0D1117';

// ─── Sonar ring (outside all components) ────────────────────────────────────
const SonarRing = ({ size, delay }: { size: number; delay: number }) => {
  const [anim] = useState(() => new Animated.Value(0));
  useEffect(() => {
    const t = setTimeout(() => {
      Animated.loop(
        Animated.timing(anim, { toValue: 1, duration: 6000, useNativeDriver: true })
      ).start();
    }, delay);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Animated.View style={{
      position: 'absolute', width: size, height: size, borderRadius: size / 2,
      borderWidth: 1, borderColor: 'rgba(29,158,117,0.18)',
      opacity: anim.interpolate({ inputRange: [0, 0.7, 1], outputRange: [0.18, 0.04, 0] }),
      transform: [{ scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] }) }],
    }} />
  );
};

// ─── Logo ────────────────────────────────────────────────────────────────────
const Logo = () => (
  <View style={s.logoBox}>
    <Svg viewBox="0 0 72 38" width={48} height={36}>
      <Polygon points="36,2 54,12 54,28 36,38 18,28 18,12" stroke="#1D9E75" strokeWidth={2.5} fill="none" />
      <Polygon points="36,10 44,15 44,25 36,30 28,25 28,15" stroke="#1D9E75" strokeWidth={2} fill="#1D9E7515" />
      <Circle cx={36} cy={2}  r={5} fill="#1D9E75" /><Circle cx={54} cy={12} r={5} fill="#1D9E75" />
      <Circle cx={54} cy={28} r={5} fill="#1D9E75" /><Circle cx={36} cy={38} r={5} fill="#1D9E75" />
      <Circle cx={18} cy={28} r={5} fill="#1D9E75" /><Circle cx={18} cy={12} r={5} fill="#1D9E75" />
      <Circle cx={36} cy={10} r={3} fill="#5DCAA5" /><Circle cx={44} cy={15} r={3} fill="#5DCAA5" />
      <Circle cx={44} cy={25} r={3} fill="#5DCAA5" /><Circle cx={36} cy={30} r={3} fill="#5DCAA5" />
      <Circle cx={28} cy={25} r={3} fill="#5DCAA5" /><Circle cx={28} cy={15} r={3} fill="#5DCAA5" />
      <Circle cx={36} cy={20} r={4} fill="#1D9E75" />
    </Svg>
    <Svg viewBox="0 0 80 20" width={40} height={10} style={{ marginTop: 4 }}>
      <Path d="M0 10 L15 10 L20 3 L26 17 L31 7 L36 13 L40 10 L45 10 L80 10"
        stroke="#1D9E75" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  </View>
);

// ─── Shared field + button helpers ───────────────────────────────────────────
const Field = ({ label, value, onChange, placeholder, keyboardType = 'default', multiline = false }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder: string; keyboardType?: 'default' | 'numeric'; multiline?: boolean;
}) => (
  <View style={s.field}>
    <Text style={s.fieldLabel}>{label.toUpperCase()}</Text>
    <TextInput
      style={[s.input, multiline && { minHeight: 64, textAlignVertical: 'top', paddingTop: 10 }]}
      value={value} onChangeText={onChange} placeholder={placeholder}
      placeholderTextColor={TEXT_SEC} keyboardType={keyboardType}
      multiline={multiline} autoCapitalize="none"
    />
  </View>
);

const LevelBtn = ({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) => (
  <TouchableOpacity style={[s.levelBtn, active && s.levelBtnActive]} onPress={onPress} activeOpacity={0.8}>
    <Text style={[s.levelBtnText, active && s.levelBtnTextActive]}>{label}</Text>
  </TouchableOpacity>
);

const PrimaryBtn = ({ label, onPress, disabled }: { label: string; onPress: () => void; disabled?: boolean }) => (
  <TouchableOpacity style={[s.btnPrimary, { flex: 1 }]} onPress={onPress} disabled={disabled} activeOpacity={0.85}>
    {disabled
      ? <ActivityIndicator color={BG} />
      : <Text style={s.btnPrimaryText}>{label}</Text>}
  </TouchableOpacity>
);

const BackBtn = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity style={s.btnBack} onPress={onPress} activeOpacity={0.8}>
    <Text style={s.btnBackText}>Back</Text>
  </TouchableOpacity>
);

// ─── Progress bar ─────────────────────────────────────────────────────────────
const ProgressBar = ({ step }: { step: number }) => (
  <View style={s.progressWrap}>
    <View style={s.progressMeta}>
      <Text style={s.progressStep}>Step {step} of 3</Text>
      <Text style={s.progressName}>
        {step === 1 ? 'Welcome' : step === 2 ? 'Profile' : 'Health Metrics'}
      </Text>
    </View>
    <View style={s.progressTrack}>
      <View style={[s.progressFill, { width: `${Math.round((step / 3) * 100)}%` as `${number}%` }]} />
    </View>
  </View>
);

// ─── Step 1: Welcome ──────────────────────────────────────────────────────────
const Step1 = ({ onNext }: { onNext: () => void }) => (
  <View style={[s.card, { alignItems: 'center' }]}>
    <Logo />
    <Text style={s.heroTitle}>ATHLETICHEM</Text>
    <Text style={s.heroSub}>Your personal sports science engine</Text>
    <Text style={s.heroDesc}>
      Track recovery, monitor training load, and get AI-powered insights all in one place.
    </Text>
    <TouchableOpacity style={s.btnPrimary} onPress={onNext} activeOpacity={0.85}>
      <Text style={s.btnPrimaryText}>GET STARTED</Text>
    </TouchableOpacity>
  </View>
);

// ─── Step 2: Profile ──────────────────────────────────────────────────────────
interface Step2Props {
  fullName: string; setFullName: (v: string) => void;
  age: string; setAge: (v: string) => void;
  sport: string; setSport: (v: string) => void;
  trainingLevel: string; setTrainingLevel: (v: string) => void;
  heightCm: string; setHeightCm: (v: string) => void;
  weightKg: string; setWeightKg: (v: string) => void;
  trainingGoals: string; setTrainingGoals: (v: string) => void;
  saving: boolean; onBack: () => void; onSave: () => void;
}

const Step2 = ({
  fullName, setFullName, age, setAge, sport, setSport,
  trainingLevel, setTrainingLevel, heightCm, setHeightCm,
  weightKg, setWeightKg, trainingGoals, setTrainingGoals,
  saving, onBack, onSave,
}: Step2Props) => (
  <View style={s.card}>
    <Text style={s.cardTitle}>Personal Profile</Text>
    <Text style={s.cardSub}>Tell us about yourself to personalize your experience</Text>

    <Field label="Full Name" value={fullName} onChange={setFullName} placeholder="Jordan Smith" />
    <View style={s.row}>
      <View style={{ flex: 1 }}>
        <Field label="Age" value={age} onChange={setAge} placeholder="24" keyboardType="numeric" />
      </View>
      <View style={{ width: 12 }} />
      <View style={{ flex: 1 }}>
        <Field label="Sport" value={sport} onChange={setSport} placeholder="Running" />
      </View>
    </View>

    <View style={s.field}>
      <Text style={s.fieldLabel}>TRAINING LEVEL</Text>
      <View style={s.levelRow}>
        {(['beginner', 'intermediate', 'advanced'] as const).map(lvl => (
          <LevelBtn key={lvl} label={lvl[0].toUpperCase() + lvl.slice(1)}
            active={trainingLevel === lvl} onPress={() => setTrainingLevel(lvl)} />
        ))}
      </View>
    </View>

    <View style={s.row}>
      <View style={{ flex: 1 }}>
        <Field label="Height (cm)" value={heightCm} onChange={setHeightCm} placeholder="178" keyboardType="numeric" />
      </View>
      <View style={{ width: 12 }} />
      <View style={{ flex: 1 }}>
        <Field label="Weight (kg)" value={weightKg} onChange={setWeightKg} placeholder="72" keyboardType="numeric" />
      </View>
    </View>

    <Field label="Training Goals" value={trainingGoals} onChange={setTrainingGoals}
      placeholder="Improve 5K time, build endurance..." multiline />

    <View style={s.btnRow}>
      <BackBtn onPress={onBack} />
      <PrimaryBtn label="CONTINUE" onPress={onSave} disabled={saving} />
    </View>
  </View>
);

// ─── Step 3: Health Metrics ────────────────────────────────────────────────────
interface Step3Props {
  hrv: string; setHrv: (v: string) => void;
  sleepHours: string; setSleepHours: (v: string) => void;
  restingHr: string; setRestingHr: (v: string) => void;
  bodyWeight: string; setBodyWeight: (v: string) => void;
  saving: boolean; onBack: () => void; onSave: () => void;
}

const Step3 = ({
  hrv, setHrv, sleepHours, setSleepHours, restingHr, setRestingHr,
  bodyWeight, setBodyWeight, saving, onBack, onSave,
}: Step3Props) => (
  <View style={s.card}>
    <Text style={s.cardTitle}>{"Today's Health Metrics"}</Text>
    <Text style={s.cardSub}>Enter your baseline numbers to kickstart your dashboard</Text>
    <View style={s.infoBadge}>
      <Text style={s.infoBadgeText}>Find these in your Apple Health app</Text>
    </View>

    <View style={s.row}>
      <View style={{ flex: 1 }}>
        <Field label="HRV (ms)" value={hrv} onChange={setHrv} placeholder="62" keyboardType="numeric" />
      </View>
      <View style={{ width: 12 }} />
      <View style={{ flex: 1 }}>
        <Field label="Sleep (hours)" value={sleepHours} onChange={setSleepHours} placeholder="7.5" keyboardType="numeric" />
      </View>
    </View>

    <View style={s.row}>
      <View style={{ flex: 1 }}>
        <Field label="Resting HR (bpm)" value={restingHr} onChange={setRestingHr} placeholder="58" keyboardType="numeric" />
      </View>
      <View style={{ width: 12 }} />
      <View style={{ flex: 1 }}>
        <Field label="Body Weight (kg)" value={bodyWeight} onChange={setBodyWeight} placeholder="72" keyboardType="numeric" />
      </View>
    </View>

    <View style={s.btnRow}>
      <BackBtn onPress={onBack} />
      <PrimaryBtn label="LAUNCH DASHBOARD" onPress={onSave} disabled={saving} />
    </View>
  </View>
);

// ─── Main screen ──────────────────────────────────────────────────────────────
export default function OnboardingScreen() {
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [checking, setChecking] = useState(true);

  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [sport, setSport] = useState('');
  const [trainingLevel, setTrainingLevel] = useState('intermediate');
  const [heightCm, setHeightCm] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [trainingGoals, setTrainingGoals] = useState('');
  const [hrv, setHrv] = useState('');
  const [sleepHours, setSleepHours] = useState('');
  const [restingHr, setRestingHr] = useState('');
  const [bodyWeight, setBodyWeight] = useState('');

  useEffect(() => {
    void (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setChecking(false); return; }
      const { data } = await supabase
        .from('profiles').select('onboarding_completed').eq('id', user.id).maybeSingle();
      if (data?.onboarding_completed) {
        router.replace('/(athlete)');
      } else {
        setChecking(false);
      }
    })();
  }, []);

  const saveProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      full_name: sanitizeName(fullName) || null,
      age: age ? parseInt(age) : null,
      sport: sport || null,
      training_level: trainingLevel,
      height_cm: heightCm ? parseFloat(heightCm) : null,
      weight_kg: weightKg ? parseFloat(weightKg) : null,
      training_goals: trainingGoals || null,
    });
    setSaving(false);
    if (error) { Alert.alert('Error', 'Failed to save profile'); return; }
    setStep(3);
  };

  const saveMetricsAndFinish = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    setSaving(true);
    const today = getLocalDateKey();
    const { error } = await supabase.from('recovery_metrics').upsert(
      { user_id: user.id, metric_date: today,
        hrv_ms: hrv ? parseInt(hrv) : null,
        sleep_hours: sleepHours ? parseFloat(sleepHours) : null,
        resting_hr: restingHr ? parseInt(restingHr) : null,
        body_weight_kg: bodyWeight ? parseFloat(bodyWeight) : null },
      { onConflict: 'user_id,metric_date' }
    );
    await supabase.from('profiles').update({ onboarding_completed: true }).eq('id', user.id);
    setSaving(false);
    if (error) { Alert.alert('Error', 'Failed to save metrics'); return; }
    Alert.alert('Welcome to AthletiChem!', 'Your dashboard is ready.', [
      { text: 'OK', onPress: () => router.replace('/(athlete)') },
    ]);
  };

  if (checking) {
    return (
      <View style={[s.screen, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator color={TEAL} size="large" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={s.screen}>
        <View style={s.rings}>
          {[300, 500, 700, 900].map((size, i) => (
            <SonarRing key={size} size={size} delay={i * 1500} />
          ))}
        </View>
        <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <ProgressBar step={step} />
          {step === 1 && <Step1 onNext={() => setStep(2)} />}
          {step === 2 && (
            <Step2
              fullName={fullName} setFullName={setFullName}
              age={age} setAge={setAge}
              sport={sport} setSport={setSport}
              trainingLevel={trainingLevel} setTrainingLevel={setTrainingLevel}
              heightCm={heightCm} setHeightCm={setHeightCm}
              weightKg={weightKg} setWeightKg={setWeightKg}
              trainingGoals={trainingGoals} setTrainingGoals={setTrainingGoals}
              saving={saving} onBack={() => setStep(1)} onSave={saveProfile}
            />
          )}
          {step === 3 && (
            <Step3
              hrv={hrv} setHrv={setHrv}
              sleepHours={sleepHours} setSleepHours={setSleepHours}
              restingHr={restingHr} setRestingHr={setRestingHr}
              bodyWeight={bodyWeight} setBodyWeight={setBodyWeight}
              saving={saving} onBack={() => setStep(2)} onSave={saveMetricsAndFinish}
            />
          )}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },
  rings: { ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center' },
  scroll: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: 24, paddingVertical: 40 },

  progressWrap: { width: '100%', maxWidth: 440, marginBottom: 20 },
  progressMeta: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressStep: { fontSize: 11, fontWeight: '600', color: TEXT_SEC, textTransform: 'uppercase', letterSpacing: 1 },
  progressName: { fontSize: 11, color: TEXT_SEC },
  progressTrack: { height: 4, borderRadius: 2, backgroundColor: CARD_BORDER, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 2, backgroundColor: TEAL },

  card: {
    width: '100%', maxWidth: 440,
    backgroundColor: 'rgba(17,24,32,0.95)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 20, padding: 28,
  },
  logoBox: { width: 80, height: 80, backgroundColor: '#0d2818', borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  heroTitle: { fontSize: 26, fontWeight: '800', color: TEAL, letterSpacing: 2, marginBottom: 8 },
  heroSub: { fontSize: 14, color: TEXT_MID, marginBottom: 16 },
  heroDesc: { fontSize: 13, color: TEXT_SEC, lineHeight: 20, textAlign: 'center', marginBottom: 28 },

  cardTitle: { fontSize: 18, fontWeight: '700', color: TEXT_PRI, marginBottom: 4 },
  cardSub: { fontSize: 12, color: TEXT_SEC, marginBottom: 20 },

  field: { marginBottom: 14 },
  fieldLabel: { fontSize: 11, fontWeight: '500', color: TEXT_MID, letterSpacing: 1, marginBottom: 6 },
  input: {
    backgroundColor: 'rgba(13,17,23,0.6)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, color: TEXT_PRI, fontSize: 14,
  },
  row: { flexDirection: 'row', marginBottom: 0 },

  levelRow: { flexDirection: 'row', gap: 8 },
  levelBtn: { flex: 1, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(13,17,23,0.6)', alignItems: 'center' },
  levelBtnActive: { borderColor: TEAL, backgroundColor: '#00D4A815' },
  levelBtnText: { fontSize: 12, color: TEXT_SEC, fontWeight: '500' },
  levelBtnTextActive: { color: TEAL, fontWeight: '700' },

  infoBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: '#00D4A825', backgroundColor: '#00D4A812', marginBottom: 20, alignSelf: 'flex-start' },
  infoBadgeText: { fontSize: 11, color: TEAL },

  btnPrimary: { borderRadius: 12, paddingVertical: 13, alignItems: 'center', backgroundColor: TEAL },
  btnPrimaryText: { color: BG, fontSize: 13, fontWeight: '700', letterSpacing: 1 },
  btnRow: { flexDirection: 'row', gap: 10, marginTop: 24 },
  btnBack: { paddingVertical: 13, paddingHorizontal: 20, borderRadius: 12, backgroundColor: SURFACE, borderWidth: 1, borderColor: CARD_BORDER },
  btnBackText: { color: TEXT_MID, fontSize: 13, fontWeight: '600' },
});
