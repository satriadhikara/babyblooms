import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import {
  PlusJakartaSans_200ExtraLight,
  PlusJakartaSans_300Light,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
  PlusJakartaSans_200ExtraLight_Italic,
  PlusJakartaSans_300Light_Italic,
  PlusJakartaSans_400Regular_Italic,
  PlusJakartaSans_500Medium_Italic,
  PlusJakartaSans_600SemiBold_Italic,
  PlusJakartaSans_700Bold_Italic,
  PlusJakartaSans_800ExtraBold_Italic,
} from "@expo-google-fonts/plus-jakarta-sans";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    // Switzer fonts
    "Switzer-Black": require("@/assets/fonts/Switzer-Black.otf"),
    "Switzer-BlackItalic": require("@/assets/fonts/Switzer-BlackItalic.otf"),
    "Switzer-Bold": require("@/assets/fonts/Switzer-Bold.otf"),
    "Switzer-BoldItalic": require("@/assets/fonts/Switzer-BoldItalic.otf"),
    "Switzer-Extrabold": require("@/assets/fonts/Switzer-Extrabold.otf"),
    "Switzer-ExtraboldItalic": require("@/assets/fonts/Switzer-ExtraboldItalic.otf"),
    "Switzer-Extralight": require("@/assets/fonts/Switzer-Extralight.otf"),
    "Switzer-ExtralightItalic": require("@/assets/fonts/Switzer-ExtralightItalic.otf"),
    "Switzer-Italic": require("@/assets/fonts/Switzer-Italic.otf"),
    "Switzer-Light": require("@/assets/fonts/Switzer-Light.otf"),
    "Switzer-LightItalic": require("@/assets/fonts/Switzer-LightItalic.otf"),
    "Switzer-Medium": require("@/assets/fonts/Switzer-Medium.otf"),
    "Switzer-MediumItalic": require("@/assets/fonts/Switzer-MediumItalic.otf"),
    "Switzer-Regular": require("@/assets/fonts/Switzer-Regular.otf"),
    "Switzer-Semibold": require("@/assets/fonts/Switzer-Semibold.otf"),
    "Switzer-SemiboldItalic": require("@/assets/fonts/Switzer-SemiboldItalic.otf"),
    "Switzer-Thin": require("@/assets/fonts/Switzer-Thin.otf"),
    "Switzer-ThinItalic": require("@/assets/fonts/Switzer-ThinItalic.otf"),

    // Plus Jakarta Sans fonts
    PlusJakartaSans_200ExtraLight,
    PlusJakartaSans_300Light,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
    PlusJakartaSans_200ExtraLight_Italic,
    PlusJakartaSans_300Light_Italic,
    PlusJakartaSans_400Regular_Italic,
    PlusJakartaSans_500Medium_Italic,
    PlusJakartaSans_600SemiBold_Italic,
    PlusJakartaSans_700Bold_Italic,
    PlusJakartaSans_800ExtraBold_Italic,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
