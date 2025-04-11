import React, { useState, useEffect, useRef } from "react";
import { ThemedText } from "@/components/ui/ThemedText";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Animated,
  Pressable, // Added Pressable for the overlay
} from "react-native";
import { router } from "expo-router";
import { Volume2, X, ArrowDown } from "lucide-react-native"; // Added ArrowDown
import { Audio } from "expo-av";
import Svg, { Polygon } from "react-native-svg";

const { width, height } = Dimensions.get("window");
const DRAWER_HEIGHT = height * 0.65;
const SCROLL_THRESHOLD = 50;

const JurnalBlur = () => {
  const daysOfWeek = ["S", "S", "R", "K", "J", "S", "M"];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Selamat pagi";
    if (hour >= 12 && hour < 15) return "Selamat siang";
    if (hour >= 15 && hour < 19) return "Selamat sore";
    return "Selamat malam";
  };

  const [greeting, setGreeting] = useState(getGreeting());
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const animatedDrawerY = useRef(new Animated.Value(DRAWER_HEIGHT)).current;
  // --- Spotlight State ---
  const [isSpotlightVisible, setIsSpotlightVisible] = useState(true); // Start with spotlight visible
  // --- End Spotlight State ---

  // --- Audio Playback Logic ---
  async function playSound() {
    // Prevent interaction if spotlight is visible
    if (isSpotlightVisible) return;
    console.log("Loading Sound");
    if (isPlaying) {
      console.log("Sound is already playing.");
      // Optional: Stop sound if playing
      // if (sound) {
      //   await sound.stopAsync();
      //   setIsPlaying(false);
      // }
      return;
    }
    try {
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        require("@/assets/sounds/detakjantung.mp3")
      );
      setSound(newSound);
      console.log("Playing Sound");
      await newSound.playAsync();
      setIsPlaying(true);
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status && status.isLoaded && status.didJustFinish) {
          console.log("Sound Finished Playing");
          setIsPlaying(false);
        } else if (status && !status.isLoaded && status.error) {
          console.error("Playback Error:", status.error);
          setIsPlaying(false);
          newSound.unloadAsync().catch((unloadError) => {
            console.error(
              "Error unloading sound after playback error:",
              unloadError
            );
          });
          setSound(null);
        }
      });
    } catch (error) {
      console.error("Error loading or playing sound:", error);
      setIsPlaying(false);
      if (sound) {
        sound.unloadAsync().catch((unloadError) => {
          console.error("Error unloading sound after catch:", unloadError);
        });
        setSound(null);
      }
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  // --- End Audio Playback Logic ---

  // Update greeting every minute
  useEffect(() => {
    const intervalId = setInterval(() => {
      setGreeting(getGreeting());
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const generateCurrentWeekDates = () => {
    const currentDate = new Date();
    let currentDay = currentDate.getDay();
    if (currentDay === 0) currentDay = 7;
    const result = [];
    const daysToMonday = currentDay - 1;
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() - daysToMonday + i);
      result.push({
        date: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        isToday: date.toDateString() === currentDate.toDateString(),
      });
    }
    return result;
  };

  const currentWeekDates = generateCurrentWeekDates();

  // --- Drawer Animation Logic ---
  const showDrawer = () => {
    // Only show drawer if spotlight is not visible
    if (!isDrawerVisible && !isSpotlightVisible) {
      setIsDrawerVisible(true);
      Animated.timing(animatedDrawerY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const hideDrawer = () => {
    Animated.timing(animatedDrawerY, {
      toValue: DRAWER_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsDrawerVisible(false);
    });
  };
  // --- End Drawer Animation Logic ---

  // --- Scroll Handler ---
  const handleScroll = (event: any) => {
    // Only trigger drawer if spotlight is hidden
    if (!isSpotlightVisible) {
      const scrollY = event.nativeEvent.contentOffset.y;
      if (scrollY > SCROLL_THRESHOLD && !isDrawerVisible) {
        showDrawer();
      }
    }
  };
  // --- End Scroll Handler ---

  // --- Spotlight Dismiss Handler ---
  const dismissSpotlight = () => {
    setIsSpotlightVisible(false);
  };
  // --- End Spotlight Dismiss Handler ---

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      {/* Background Image stays */}
      <Image
        source={require("@/assets/images/jurnalBlur.png")}
        style={{
          width: width,
          height: height,
          position: "absolute",
          top: 0,
          left: 0,
        }}
        resizeMode="cover"
      />

      {/* Scrollable Content */}
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 90 }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        // Disable scroll while spotlight is visible
        scrollEnabled={!isSpotlightVisible}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingBottom: 2,
          }}
        >
          <View>
            <ThemedText
              type="titleMedium"
              style={{ fontSize: 14, color: "#0C0C0C" }}
            >
              {greeting},
            </ThemedText>
            <ThemedText type="headlineSmall" style={{ color: "#0C0C0C" }}>
              Moms!
            </ThemedText>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 35,
            }}
          ></View>
        </View>

        {/* Calendar */}
        <View style={{ marginHorizontal: 20, marginTop: 8 }}>
          {/* Day Labels */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {daysOfWeek.map((day, index) => (
              <ThemedText
                type="labelSmall"
                key={`day-${index}`}
                style={{ width: 36, textAlign: "center", color: "#E91E63" }}
              >
                {day}
              </ThemedText>
            ))}
          </View>
          {/* Dates */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 6,
            }}
          >
            {currentWeekDates.map((dateObj, index) => (
              <View
                key={`date-${index}`}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: dateObj.isToday ? "#FFF" : "transparent",
                }}
              >
                <ThemedText
                  type="titleMedium"
                  style={{ color: dateObj.isToday ? "#E91E63" : "#000" }}
                >
                  {dateObj.date}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>

        {/* Image and Sound Button */}
        <View style={{ alignItems: "center", position: "relative" }}>
          <Image
            source={require("@/assets/images/yusril.png")}
            style={{ width: 400, height: 400, resizeMode: "contain" }}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 25,
              bottom: 10,
              backgroundColor: isPlaying ? "#C85A9D" : "#FFF",
              width: 54,
              height: 54,
              borderRadius: 27,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
              // Make button less prominent when spotlight is visible
              opacity: isSpotlightVisible ? 0.5 : 1,
            }}
            onPress={playSound}
            activeOpacity={0.7}
            // Disable button when spotlight is visible
            disabled={isSpotlightVisible}
          >
            <Volume2 size={20} color={isPlaying ? "#FFF" : "#8C8C8C"} />
          </TouchableOpacity>
        </View>

        {/* Week/Day Info */}
        <View style={{ alignItems: "flex-start", paddingHorizontal: 20 }}>
          <ThemedText type="titleLarge">Minggu ke-10, Hari ke-4</ThemedText>
        </View>
      </ScrollView>
      {/* End Scrollable Content */}

      {/* --- Bottom Drawer (Rendered after ScrollView) --- */}
      {isDrawerVisible && (
        <Animated.View
          style={{
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
            elevation: 10, // Ensure drawer elevation is high
            paddingTop: 10,
            zIndex: 20, // Drawer needs high zIndex
            transform: [{ translateY: animatedDrawerY }],
          }}
        >
          {/* Close Button */}
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 10,
              right: 15,
              padding: 5,
              zIndex: 1, // Above drawer content
            }}
            onPress={hideDrawer}
          >
            <X size={24} color="#666" />
          </TouchableOpacity>

          {/* Drawer Content */}
          <View
            style={{
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
              style={{ marginTop: 10, color: "#626262", textAlign: "center" }}
            >
              Mulai dari jurnal harian, informasi mingguan, hingga akses penuh
              BloomsAI
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
                hideDrawer(); // Hide drawer before navigating
                router.push("/onboard");
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

      {/* --- Spotlight Overlay --- */}
      {isSpotlightVisible && (
        <Pressable // Use Pressable to capture taps anywhere on the overlay
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent black
            justifyContent: "flex-end", // Align spotlight hint to bottom
            alignItems: "center", // Center hint horizontally
            zIndex: 15, // Above content, below drawer
          }}
          onPress={dismissSpotlight} // Dismiss on tap
        >
          {/* Optional: Hint text/icon at the bottom center */}
          <View style={{ marginBottom: 40, alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "#DA5AA7",
                paddingTop: 12,
                paddingHorizontal: 12,
                paddingBottom: 20,
                borderRadius: 8,
                width: "80%",
                alignItems: "center",
              }}
            >
              <ThemedText
                type="titleMedium"
                style={{ color: "#FFF", textAlign: "center", marginBottom: 12 }}
              >
                Coba AI Camera Sekarang!
              </ThemedText>
              <ThemedText
                type="bodyMedium"
                style={{ color: "#FFF", textAlign: "center" }}
              >
                Cukup foto makananmu, dan Blooms AI bantu kasih tahu apakah
                makanan itu aman atau sebaiknya dihindari selama kehamilan.
              </ThemedText>
            </View>
            <Svg
              height="20" // Height of the SVG area
              width="30" // Width of the SVG area
              style={{ marginTop: -1 }}
            >
              <Polygon
                points="0,0 30,0 15,15" // Defines the triangle points (top-left, top-right, bottom-center)
                fill="#DA5AA7" // Match the hint box background color
              />
            </Svg>

            {/* <ArrowDown size={32} color="#DA5AA7" style={{ marginTop: 10 }} /> */}
          </View>
        </Pressable>
      )}
      {/* --- End Spotlight Overlay --- */}
    </SafeAreaView>
  );
};

export default JurnalBlur;
