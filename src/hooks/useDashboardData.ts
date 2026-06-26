import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../integrations/supabase/client';
import { calculateRecoveryScore, type RecoveryResult } from '../lib/recoveryEngine';
import { getLocalDateKey } from '../lib/dateUtils';

export type HydrationLevel = 'optimal' | 'mild' | 'high';
export type FatigueLevel = 'low' | 'moderate' | 'high';

export interface FatigueAlertData {
  lowRecovery: boolean;
  recoveryScore: number;
  loadSpike: boolean;
  loadSpikePercent: number;
}

export interface DashboardData {
  recovery: RecoveryResult;
  latestHrv: number | null;
  latestSleep: number | null;
  latestLoad: number | null;
  hydrationLevel: HydrationLevel;
  fatigueLevel: FatigueLevel;
  fatigueAlert: FatigueAlertData;
  isLoading: boolean;
  refetch: () => void;
}

export function useDashboardData(): DashboardData {
  const [latestLoad, setLatestLoad] = useState<number | null>(null);
  const [latestHrv, setLatestHrv] = useState<number | null>(null);
  const [latestSleep, setLatestSleep] = useState<number | null>(null);
  const [hydrationLevel, setHydrationLevel] = useState<HydrationLevel>('mild');
  const [fatigueLevel, setFatigueLevel] = useState<FatigueLevel>('low');
  const [recovery, setRecovery] = useState<RecoveryResult>({
    score: 0,
    hrvNorm: null,
    sleepNorm: null,
    loadNorm: null,
    hasData: false,
  });
  const [fatigueAlert, setFatigueAlert] = useState<FatigueAlertData>({
    lowRecovery: false,
    recoveryScore: 0,
    loadSpike: false,
    loadSpikePercent: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Latest workout training load
      const { data: workout } = await supabase
        .from('workouts')
        .select('training_load, workout_type')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      const loadValue = workout?.training_load ?? null;
      setLatestLoad(loadValue);

      // Today's daily log
      const today = getLocalDateKey();
      const { data: log } = await supabase
        .from('daily_logs')
        .select('hrv_ms, sleep_hours')
        .eq('user_id', user.id)
        .eq('log_date', today)
        .maybeSingle();

      const hrvValue = log?.hrv_ms ?? null;
      const sleepValue = log?.sleep_hours ? Number(log.sleep_hours) : null;
      setLatestHrv(hrvValue);
      setLatestSleep(sleepValue);

      // Recovery score
      const result = calculateRecoveryScore({
        hrv: hrvValue,
        sleepHours: sleepValue,
        trainingLoad: loadValue,
      });
      setRecovery(result);

      // Load spike detection (7-day window)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const { data: recentWorkouts } = await supabase
        .from('workouts')
        .select('training_load')
        .eq('user_id', user.id)
        .gte('created_at', sevenDaysAgo.toISOString())
        .order('created_at', { ascending: false });

      let loadSpike = false;
      let loadSpikePercent = 0;
      if (recentWorkouts && recentWorkouts.length > 1 && loadValue !== null) {
        const olderLoads = recentWorkouts.slice(1).map((w) => w.training_load ?? 0);
        const avg7 = olderLoads.reduce((a, b) => a + b, 0) / olderLoads.length;
        if (avg7 > 0) {
          const pctAbove = ((loadValue - avg7) / avg7) * 100;
          if (pctAbove > 30) {
            loadSpike = true;
            loadSpikePercent = Math.round(pctAbove);
          }
        }
      }

      setFatigueAlert({
        lowRecovery: result.hasData && result.score < 50,
        recoveryScore: result.score,
        loadSpike,
        loadSpikePercent,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void fetchData(); }, [fetchData]);

  return {
    recovery,
    latestHrv,
    latestSleep,
    latestLoad,
    hydrationLevel,
    fatigueLevel,
    fatigueAlert,
    isLoading,
    refetch: fetchData,
    // expose setters so monitors can push their status up
    _setHydrationLevel: setHydrationLevel,
    _setFatigueLevel: setFatigueLevel,
  } as DashboardData & {
    _setHydrationLevel: (v: HydrationLevel) => void;
    _setFatigueLevel: (v: FatigueLevel) => void;
  };
}
