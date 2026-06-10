import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const session = await SecureStore.getItemAsync("supabase-session");
      setIsLoggedIn(!!session);
    } catch {
      setIsLoggedIn(false);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(athlete)" options={{ headerShown: false }} />
        <Stack.Screen name="(coach)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </QueryClientProvider>
  );
}
