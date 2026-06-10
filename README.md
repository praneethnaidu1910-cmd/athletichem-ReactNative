# AthletiChem Native

React Native (Expo) mobile app for iOS and Android — full athlete + coach parity with the [AthletiChem web app](https://github.com/Community-Dreams-Foundation/athletichem-native).

## Overview

AthletiChem Native is a cross-platform mobile application built with Expo SDK 56 and React Native. It provides athletes and coaches with recovery tracking, daily logging, workout management, and AI-powered insights.

### Features

- **Auth**: Email/password sign-up and sign-in via Supabase
- **Athlete Dashboard**: Recovery score, HRV, sleep, resting heart rate
- **Daily Log**: Log daily metrics with form validation
- **Workout Tracking**: Log and view workout sessions
- **Trends**: Weekly and 30-day recovery trends
- **Coach Dashboard**: Roster management, athlete monitoring, AI insights
- **Profile**: User settings and sign-out

## Prerequisites

Before you begin, ensure you have the following installed:

| Tool | Version | Install |
|------|---------|---------|
| **Node.js** | 20+ | [nodejs.org](https://nodejs.org/) |
| **npm** | 10+ | Comes with Node.js |
| **Expo CLI** | Latest | `npm install -g expo-cli` |
| **Android Studio** | Latest | [developer.android.com](https://developer.android.com/studio) |
| **Java JDK** | 17+ | Comes with Android Studio |

### Android SDK Setup

1. Open Android Studio → **More Actions** → **SDK Manager**
2. Install:
   - Android SDK Platform 34
   - Android SDK Build-Tools 34.0.0
   - Android SDK Platform-Tools
   - Android Emulator
3. Create an AVD (Android Virtual Device):
   - Open **Device Manager** → **Create Device**
   - Select **Pixel 7** or similar
   - System Image: **Android 34** (Google APIs)
   - Finish setup

4. Set environment variables in `~/.bashrc`:
```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator
```

Then run: `source ~/.bashrc`

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/Community-Dreams-Foundation/athletichem-native.git
cd athletichem-native

# 2. Install dependencies
npm install

# 3. Start the Expo dev server
npm start

# 4. Run on Android
# Press 'a' in the terminal to open on Android emulator
# Or scan the QR code with Expo Go on a physical device
```

## Project Structure

```
athletichem-native/
├── app/                          # Expo Router screens
│   ├── _layout.tsx               # Root layout (auth gate, providers)
│   ├── (auth)/                   # Authentication screens
│   │   ├── auth.tsx              # Login / Sign up
│   │   └── reset-password.tsx    # Password reset
│   ├── (athlete)/                # Athlete screens
│   │   ├── _layout.tsx           # Bottom tab navigator
│   │   ├── index.tsx             # Home (daily overview)
│   │   ├── dashboard.tsx         # Dashboard (metrics)
│   │   ├── trends.tsx            # Trends (charts)
│   │   ├── coach.tsx             # Coach tab
│   │   ├── profile.tsx           # Profile & settings
│   │   └── onboarding.tsx        # 3-step onboarding
│   └── (coach)/                  # Coach screens
│       └── coach.tsx             # Coach dashboard
├── src/
│   ├── lib/                      # Business logic (pure functions)
│   │   ├── recoveryEngine.ts
│   │   ├── hydrationEngine.ts
│   │   ├── metabolicFatigueEngine.ts
│   │   ├── readinessEngine.ts
│   │   ├── recoveryAccent.ts
│   │   ├── dateUtils.ts
│   │   ├── formValidation.ts
│   │   └── errorMessages.ts
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts         # Supabase client (SecureStore)
│   │       └── types.ts          # Database types
│   └── hooks/                    # Custom React hooks
├── assets/                       # Images and icons
├── app.json                      # Expo configuration
├── eas.json                      # EAS Build configuration
├── babel.config.js               # Babel configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json
```

## Environment Variables

Create a `.env` file in the project root:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**Never commit `.env` to version control.** It is already in `.gitignore`.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo dev server |
| `npm run android` | Run on Android emulator/device |
| `npm run ios` | Run on iOS simulator (macOS only) |
| `npm run web` | Run in web browser |
| `npm run lint` | Run ESLint |
| `npm test` | Run Jest tests |

## Testing on Emulator

### Start Android Emulator

```bash
# List available emulators
$ANDROID_HOME/emulator/emulator -list-avds

# Start an emulator
$ANDROID_HOME/emulator/emulator -avd Pixel_7_API_34
```

### Run the App

```bash
npm start
# Press 'a' to open on Android
```

### Take Screenshots (for debugging)

```bash
# Capture screenshot from connected device
$ANDROID_HOME/platform-tools/adb shell screencap -p /sdcard/screenshot.png
$ANDROID_HOME/platform-tools/adb pull /sdcard/screenshot.png ./screenshot.png
```

## Building for Production

### EAS Build (Recommended)

1. Install EAS CLI:
```bash
npm install -g eas-cli
```

2. Log in to Expo:
```bash
eas login
```

3. Configure EAS:
```bash
eas build:configure
```

4. Build for Android:
```bash
# Preview build (internal testing)
eas build --platform android --profile preview

# Production build (store release)
eas build --platform android --profile production
```

5. Build for iOS (requires macOS):
```bash
eas build --platform ios --profile preview
```

### Submit to Stores

```bash
# Submit to Google Play
eas submit --platform android

# Submit to App Store
eas submit --platform ios
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Expo SDK 56 |
| UI | React Native StyleSheet |
| Navigation | Expo Router (file-based) |
| State | React Query + Zustand |
| Forms | react-hook-form + Zod |
| Backend | Supabase (PostgreSQL, Auth, RLS) |
| Storage | expo-secure-store (auth tokens) |
| Language | TypeScript (strict) |

## Shared Code with Web App

The following files are copied directly from the web app with **zero changes**:

- `src/lib/recoveryEngine.ts`
- `src/lib/hydrationEngine.ts`
- `src/lib/metabolicFatigueEngine.ts`
- `src/lib/readinessEngine.ts`
- `src/lib/recoveryAccent.ts`
- `src/lib/dateUtils.ts`
- `src/lib/formValidation.ts`
- `src/lib/errorMessages.ts`
- `src/integrations/supabase/types.ts`

These are pure functions with no DOM dependencies.

## Troubleshooting

### "Unable to resolve module" errors
```bash
rm -rf node_modules
npm install
```

### Metro bundler cache issues
```bash
npx expo start --clear
```

### Android SDK not found
```bash
export ANDROID_HOME=$HOME/Android/Sdk
```

### Build fails with peer dependency conflicts
```bash
npm install --legacy-peer-deps
```

### App stuck on splash screen
1. Stop the dev server (`Ctrl+C`)
2. Clear cache: `rm -rf node_modules/.cache .expo`
3. Restart: `npm start`

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Run lint: `npm run lint`
4. Commit: `git commit -m "feat: your feature"`
5. Push: `git push origin feature/your-feature`
6. Open a Pull Request

## License

See [LICENSE](LICENSE) for details.
