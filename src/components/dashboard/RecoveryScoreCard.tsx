import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import type { RecoveryResult } from '../../lib/recoveryEngine';

// Matches web recoveryAccent.ts tiers
function getAccentColor(score: number): string {
  if (score >= 80) return '#1D9E75'; // green
  if (score >= 60) return '#F59E0B'; // amber
  if (score >= 40) return '#EF9F27'; // orange
  return '#E24B4A';                  // red
}

function getStatusLabel(score: number): string {
  if (score >= 80) return 'Peak Readiness';
  if (score >= 60) return 'Fully Recovered';
  if (score >= 40) return 'Recovery Needed';
  return 'High Fatigue Risk';
}

// Animated progress bar (matches web ProgressRow)
const ProgressBar = ({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number | null;
  max: number;
  color: string;
}) => {
  const anim = useRef(new Animated.Value(0)).current;
  const pct = value !== null ? Math.min((value / max) * 100, 100) : 0;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: pct,
      duration: 900,
      delay: 400,
      useNativeDriver: false,
    }).start();
  }, [pct]);

  return (
    <View style={styles.progressRow}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressLabel}>{label}</Text>
        <Text style={styles.progressValue}>{value !== null ? value : '—'}</Text>
      </View>
      <View style={styles.progressTrack}>
        <Animated.View
          style={[
            styles.progressFill,
            {
              backgroundColor: color,
              width: anim.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
};

// SVG Score Ring (matches web RecoveryScoreRing)
const ScoreRing = ({ score, color }: { score: number; color: string }) => {
  const size = 120;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: score,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [score]);

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const strokeDashoffset = anim.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  return (
    <View style={styles.ringContainer}>
      <Svg width={size} height={size}>
        {/* Track */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={styles.ringCenter}>
        <Text style={[styles.ringScore, { color }]}>{score}</Text>
        <Text style={styles.ringSubtext}>/100</Text>
      </View>
    </View>
  );
};

interface RecoveryScoreCardProps {
  recovery: RecoveryResult;
  latestHrv: number | null;
  latestSleep: number | null;
  latestLoad: number | null;
}

export default function RecoveryScoreCard({
  recovery,
  latestHrv,
  latestSleep,
  latestLoad,
}: RecoveryScoreCardProps) {
  const color = getAccentColor(recovery.score);

  return (
    <View
      style={[
        styles.card,
        recovery.hasData ? { borderColor: color + '50' } : styles.cardDefault,
      ]}
    >
      {/* Ring */}
      <View style={styles.ringWrapper}>
        <ScoreRing score={recovery.hasData ? recovery.score : 0} color={color} />
        {!recovery.hasData && (
          <Text style={styles.noData}>Log HRV & sleep to see your score</Text>
        )}
        {recovery.hasData && (
          <Text style={[styles.statusLabel, { color }]}>
            {getStatusLabel(recovery.score).toUpperCase()}
          </Text>
        )}
      </View>

      {/* Progress bars */}
      <View style={styles.bars}>
        <ProgressBar label="HRV" value={latestHrv} max={80} color="#1D9E75" />
        <ProgressBar label="Sleep" value={latestSleep} max={9} color="#378ADD" />
        <ProgressBar label="Training Load" value={latestLoad} max={600} color="#EF9F27" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 16,
  },
  cardDefault: {
    borderColor: '#E5E7EB',
  },
  ringWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  ringContainer: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringCenter: {
    position: 'absolute',
    alignItems: 'center',
  },
  ringScore: {
    fontSize: 30,
    fontWeight: '800',
  },
  ringSubtext: {
    fontSize: 11,
    color: '#6B7280',
  },
  noData: {
    marginTop: 8,
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  statusLabel: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  bars: {
    gap: 12,
  },
  progressRow: {
    gap: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  progressValue: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1F2937',
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F3F4F6',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
});
