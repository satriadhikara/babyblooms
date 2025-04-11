import React, { useState, useEffect } from "react";
import { ThemedText } from "@/components/ui/ThemedText";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Alert,
  Pressable,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Sparkle,
  ArrowUpRight,
  Flame,
  Bell,
  Volume2,
  Plus,
} from "lucide-react-native";
import { authClient } from "@/utils/auth-client";
import LoadingComponent from "@/components/ui/Loading";
import { Audio } from "expo-av";

const JurnalBlur = () => {
  const daysOfWeek = ["S", "S", "R", "K", "J", "S", "M"]; // Indonesian day abbreviations

  // Get current time-based greeting
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

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/sounds/detakjantung.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
    setIsPlaying(true); // Set isPlaying to true when sound starts playing

    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        setIsPlaying(false); // Reset isPlaying when sound finishes
      }
    });
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  // Update greeting every minute
  useEffect(() => {
    const intervalId = setInterval(() => {
      setGreeting(getGreeting());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  // Generate dates for the current week starting with Monday
  const generateCurrentWeekDates = () => {
    const currentDate = new Date();
    // Adjust day calculation to start with Monday (1) instead of Sunday (0)
    let currentDay = currentDate.getDay(); // 0 is Sunday, 1 is Monday, etc.
    if (currentDay === 0) currentDay = 7; // Make Sunday the 7th day instead of 0
    const result = [];

    // Calculate days to go back to Monday
    const daysToMonday = currentDay - 1;

    // Generate the week starting from Monday
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
  const { width, height } = Dimensions.get("window");

  // Use this function to render the trimester-based progress bar
  const renderProgressBar = () => {
    const { trimester } = {
      trimester: 1, // Replace with dynamic trimester calculation
    };

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <View
          style={{
            height: 6,
            flex: 1,
            backgroundColor: trimester >= 1 ? "#4A0D32" : "#E89AC7",
            borderRadius: 3,
            marginRight: 4,
          }}
        />
        <View
          style={{
            height: 6,
            flex: 1,
            backgroundColor: trimester >= 2 ? "#4A0D32" : "#E89AC7",
            borderRadius: 3,
            marginRight: 4,
          }}
        />
        <View
          style={{
            height: 6,
            flex: 1,
            backgroundColor: trimester >= 3 ? "#4A0D32" : "#E89AC7",
            borderRadius: 3,
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 90 }}
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
              backgroundColor: isPlaying ? "#C85A9D" : "#FFF", // Change background color based on isPlaying state
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
            }}
            onPress={playSound} // Add onPress to play sound
          >
            <Volume2 size={20} color={isPlaying ? "#FFF" : "#8C8C8C"} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            alignItems: "flex-start",
            paddingHorizontal: 20,
          }}
        >
          <ThemedText type="titleLarge">Minggu ke-10, Hari ke-4</ThemedText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default JurnalBlur;
