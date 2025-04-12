import React, { useState, useEffect, useRef } from "react"; // Added useState, useEffect, useRef
import { ThemedText } from "@/components/ui/ThemedText";
import {
  View,
  Image,
  Dimensions,
  SafeAreaView,
  // ScrollView not needed
  TouchableOpacity, // Added TouchableOpacity
  Animated, // Added Animated
} from "react-native";
import { X } from "lucide-react-native"; // Added X icon
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");
// Define drawer constants (using the same height)
const DRAWER_HEIGHT = height * 0.69;

const MedisBlur = () => {
  // --- Drawer State and Animation ---
  const [isDrawerVisible, setIsDrawerVisible] = useState(false); // Start hidden
  const animatedDrawerY = useRef(new Animated.Value(DRAWER_HEIGHT)).current;

  const showDrawer = () => {
    setIsDrawerVisible(true); // Set state first
    Animated.timing(animatedDrawerY, {
      toValue: 0,
      duration: 400, // Pop-in duration
      useNativeDriver: true,
    }).start();
  };

  const hideDrawer = () => {
    Animated.timing(animatedDrawerY, {
      toValue: DRAWER_HEIGHT,
      duration: 300, // Hide duration
      useNativeDriver: true,
    }).start(() => {
      setIsDrawerVisible(false); // Set state after hiding
    });
  };

  // --- Show Drawer on Mount ---
  useEffect(() => {
    // Show the drawer shortly after the component mounts
    const timer = setTimeout(() => {
      showDrawer();
    }, 100); // Optional small delay

    return () => clearTimeout(timer); // Cleanup timer
  }, []); // Run only once on mount
  // --- End Drawer Logic ---

  return (
    <>
      {/* Main container View */}
      <View style={{ flex: 1 }}>
        {/* Background Image (Original) */}
        <Image
          source={require("@/assets/images/medisBlur.png")} // Correct image source
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
          {/* Static Content Area */}
          <View style={{ flex: 1 }}>
            {/* Header (Original) */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 20,
                paddingVertical: 15, // Original padding
              }}
            >
              <ThemedText type="headlineSmall">Medis</ThemedText>
              {/* Add other header elements here if needed */}
            </View>

            {/* --- Add other static page content here --- */}
            {/* Example placeholder */}
            {/*
            <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
              <ThemedText>Your static medical content.</ThemedText>
            </View>
            */}
            {/* --- End other page content --- */}
          </View>
          {/* End Static Content Area */}

          {/* --- Bottom Drawer (Inline Styles) --- */}
          {/* Render drawer based on state */}
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
                  source={require("@/assets/images/drawer.png")} // Ensure path is correct
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
                  // Add onPress handler if needed
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

export default MedisBlur;
