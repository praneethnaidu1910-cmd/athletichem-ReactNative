# AthletiChem — React Native Migration

A React Native (Expo SDK 56) Android app that replicates the AthletiChem web athlete experience — built as a contribution to the [Community Dreams Foundatiion} (https://github.com/Community-Dreams-Foundation/athletichem-native) project.

## About This Work

This repo contains my contribution: migrating the **athlete dashboard** and **onboarding flow** from the React web app to a fully functional React Native mobile app, with live Supabase data, identical business logic, and pixel-accurate UI parity.

**Submitted as a pull request to the organization's private repository.**

---

## What I Built

### Athlete Dashboard (`app/(athlete)/dashboard.tsx`)

| File | What it does |
|------|-------------|
| `src/hooks/useDashboardData.ts` | Fetches live Supabase data (workouts, daily logs), runs recovery calculations, exposes all dashboard state |
| `src/components/dashboard/RecoveryScoreCard.tsx` | Animated SVG ring (0–100 recovery score) with HRV, sleep, and training load progress bars |
| `src/components/dashboard/SixMetricCards.tsx` | 2-column grid of 6 live metric cards with color-coded status (good/moderate/risk) |
| `src/components/dashboard/HydrationMonitor.tsx` | Interactive hydration calculator with slider inputs and animated fluid bars |
| `src/components/dashboard/MetabolicFatigueMonitor.tsx` | Fatigue estimator with animated score counter, fatigue meter, and 4-factor breakdown bars |

**Data flow:**
```
Supabase (workouts + daily_logs)
        ↓
  useDashboardData.ts
  ├── calculateRecoveryScore()   → RecoveryScoreCard
  ├── 7-day load spike detection → Alert banner
  ├── latestHrv / latestSleep    → SixMetricCards
  └── hydrationLevel / fatigue   ← pushed up from monitors
```

### Onboarding Flow (`app/(athlete)/onboarding.tsx`)

3-step onboarding migrated from the web app:

- **Step 1 — Welcome**: AthletiChem logo (SVG), tagline, animated sonar rings
- **Step 2 — Personal Profile**: Name, age, sport, training level, height, weight, goals → saved to Supabase `profiles` table
- **Step 3 — Health Metrics**: HRV, sleep, resting HR, body weight → saved to `recovery_metrics` table, marks `onboarding_completed = true`

Root layout checks `onboarding_completed` after login and routes accordingly.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Expo SDK 56 + React Native |
| Navigation | Expo Router (file-based) |
| Backend | Supabase (PostgreSQL, Auth, RLS) |
| Auth storage | expo-secure-store |
| Animations | React Native Animated API |
| SVG | react-native-svg |
| Icons | lucide-react-native |
| Sliders | @react-native-community/slider |
| Language | TypeScript (strict) |

---

## Setup

**Requires Node 20 LTS** — Node 24 breaks Expo SDK 56.

```bash
git clone https://github.com/praneethnaidu1910-cmd/athletichem-ReactNative.git
cd athletichem-ReactNative
npm install --legacy-peer-deps
```

Create a `.env` file:
```
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Run on Android:
```bash
npm run android
```

---

## Troubleshooting

**Node 24 SyntaxError (`lodash.throttle`)** — switch to Node 20:
```bash
nvm use 20
```

**"Unable to resolve module" after install:**
```bash
rm -rf node_modules
npm install --legacy-peer-deps
```

**Metro cache issues:**
```bash
npx expo start --clear
```

**ADB emulator not connecting:**
```bash
adb kill-server
adb start-server
# Restart emulator from Android Studio Device Manager
```

**`@react-native-community/slider` not found:**
```bash
npm install @react-native-community/slider --legacy-peer-deps
```

---

## Lint

`npm run lint` passes with 0 errors, 0 warnings.

Key patterns used to satisfy strict ESLint rules:
- `useState(() => new Animated.Value(0))` instead of `useRef` — fixes `react-hooks/refs`
- `Animated.createAnimatedComponent()` at module scope — fixes `react-hooks/static-components`
- Sub-components defined outside parent with explicit props — fixes `react-hooks/static-components`
