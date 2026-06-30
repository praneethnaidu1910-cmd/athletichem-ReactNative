import { Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { supabase } from "../src/integrations/supabase/client";

export default function RootLayout() {
  useEffect(() => {
    const routeAfterLogin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.replace("/(auth)/auth"); return; }
      const { data: profile } = await supabase
        .from("profiles")
        .select("onboarding_completed")
        .eq("id", session.user.id)
        .maybeSingle();
      if (profile?.onboarding_completed) {
        router.replace("/(athlete)");
      } else {
        router.replace("/(athlete)/onboarding");
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        routeAfterLogin();
      } else {
        router.replace("/(auth)/auth");
      }
    });

    routeAfterLogin();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(athlete)" options={{ headerShown: false }} />
        <Stack.Screen name="(coach)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
