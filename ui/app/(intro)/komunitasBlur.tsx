import React, { useState, useEffect, useRef } from "react"; // Added useEffect
import { ThemedText } from "@/components/ui/ThemedText";
import {
  View,
  Image,
  Dimensions,
  SafeAreaView,
  // ScrollView removed
  TouchableOpacity,
  Animated,
} from "react-native";
import { X } from "lucide-react-native";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");
const DRAWER_HEIGHT = height * 0.65; // Keep drawer height consistent

const KomunitasBlur = () => {
  // --- Drawer State and Animation ---
  const [isDrawerVisible, setIsDrawerVisible] = useState(false); // Start hidden initially
  const animatedDrawerY = useRef(new Animated.Value(DRAWER_HEIGHT)).current;

  const showDrawer = () => {
    // No need to check isDrawerVisible here as useEffect controls the initial show
    setIsDrawerVisible(true); // Set state to true first
    Animated.timing(animatedDrawerY, {
      toValue: 0,
      duration: 400, // Slightly longer duration for initial pop
      useNativeDriver: true,
    }).start();
  };

  const hideDrawer = () => {
    Animated.timing(animatedDrawerY, {
      toValue: DRAWER_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsDrawerVisible(false); // Set state to false after hiding
    });
  };

  // --- Show Drawer on Mount ---
  useEffect(() => {
    // Show the drawer shortly after the component mounts
    const timer = setTimeout(() => {
      showDrawer();
    }, 100); // Small delay to ensure layout is ready (optional)

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []); // Empty dependency array ensures this runs only once on mount
  // --- End Drawer Logic ---

  // handleScroll function removed

  return (
    <>
      {/* Main container View */}
      <View style={{ flex: 1 }}>
        {/* Background Image (Original) */}
        <Image
          source={require("@/assets/images/komunitasBlur.png")}
          style={{
            width: width,
            height: height,
            position: "absolute",
            top: 0,
            left: 0,
          }}
          resizeMode="cover"
        />

        {/* SafeAreaView containing the static content and the Drawer */}
        <SafeAreaView style={{ flex: 1 }}>
          {/* Static Content Area (No ScrollView) */}
          <View style={{ flex: 1 /* Allow content to take space */ }}>
            {/* Header (Original) */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 20,
                paddingVertical: 15,
              }}
            >
              <ThemedText type="headlineSmall">Komunitas</ThemedText>
              {/* Add other header elements here if needed */}
            </View>

            {/* --- Add other static page content here --- */}
            {/* Example placeholder */}
            {/*
            <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
              <ThemedText>Your static community content.</ThemedText>
            </View>
            */}
            {/* --- End other page content --- */}
          </View>
          {/* End Static Content Area */}

          {/* --- Bottom Drawer (Inline Styles) --- */}
          {/* Render drawer based on state, animation handles visibility */}
          {isDrawerVisible && (
            <Animated.View
              style={{
                // Inline styles for drawer container (copied)
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: DRAWER_HEIGHT,
                backgroundColor: "white",
                borderTopLeftRadius: 32,
                borderTopRightRadius: 32,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 10,
                paddingTop: 10,
                zIndex: 10,
                transform: [{ translateY: animatedDrawerY }],
              }}
            >
              {/* --- DRAWER CONTENT (Copied) --- */}
              <View
                style={{
                  // Inline styles for drawer content area (copied)
                  flex: 1,
                  paddingHorizontal: 24,
                  paddingTop: 32,
                  paddingBottom: 20,
                }}
              >
                <ThemedText
                  type="titleLarge"
                  style={{
                    textAlign: "center",
                    paddingHorizontal: 20,
                    color: "#0C0C0C",
                  }}
                >
                  Ingin mengeksplor seluruh fitur BabyBlooms?
                </ThemedText>
                <ThemedText
                  type="bodyLarge"
                  style={{
                    marginTop: 10,
                    color: "#626262",
                    textAlign: "center",
                  }}
                >
                  Mulai dari jurnal harian, informasi mingguan, hingga akses
                  penuh BloomsAI
                </ThemedText>
                <Image
                  source={require("@/assets/images/drawer.png")}
                  style={{
                    width: "100%",
                    height: 300,
                    marginTop: 15,
                  }}
                  resizeMode="contain"
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: "#D33995",
                    paddingVertical: 16,
                    borderRadius: 48,
                    alignItems: "center",
                    marginTop: 20,
                  }}
                  onPress={() => {
                    // Example action on press
                    router.push("/onboard"); // Navigate to login page
                  }}
                >
                  <ThemedText
                    type="titleMedium"
                    style={{
                      color: "#EFEFF0",
                    }}
                  >
                    Login Sekarang!
                  </ThemedText>
                </TouchableOpacity>
              </View>
              {/* --- END DRAWER CONTENT --- */}
            </Animated.View>
          )}
          {/* --- End Bottom Drawer --- */}
        </SafeAreaView>
      </View>
    </>
  );
};

export default KomunitasBlur;
