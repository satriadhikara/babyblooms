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
import { useAuth } from "../_layout";
import { authClient } from "@/utils/auth-client";
import LoadingComponent from "@/components/ui/Loading";

const PregnancyTrackerApp = () => {
  const { session, isPending } = useAuth();
  const router = useRouter();
  const today = new Date().getDate();
  const daysOfWeek = ["M", "S", "S", "R", "K", "J", "S"];

  // Generate dates for the current week
  const generateDatesForCurrentWeek = () => {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay(); // 0 is Sunday, 1 is Monday, etc.
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Calculate offset to Monday

    const monday = new Date(currentDate);
    monday.setDate(currentDate.getDate() + mondayOffset);

    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      dates.push(date.getDate());
    }
    return dates;
  };

  const dates = generateDatesForCurrentWeek();

  // Add pregnancy data state
  const [pregnancyData, setPregnancyData] = useState({
    week: 0,
    day: 0,
    hpl: "",
    hpht: "",
    daysLeft: 0,
    trimester: 1,
    isLoading: true,
    error: null,
  });

  // Fetch pregnancy data
  useEffect(() => {
    const fetchPregnancyInfo = async () => {
      if (!session) return;

      try {
        const cookies = authClient.getCookie();
        const headers = {
          Cookie: cookies,
        };

        const response = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL}/api/user/pregnantInfo`,
          {
            method: "GET",
            headers: headers,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Calculate days left and trimester
        const hplDate = new Date(data.hpl);
        const today = new Date();
        const daysLeft = Math.floor(
          (hplDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        );

        let trimester = 1;
        if (data.week >= 13 && data.week <= 26) {
          trimester = 2;
        } else if (data.week >= 27) {
          trimester = 3;
        }

        // Format HPL (due date)
        const options = { day: "numeric", month: "short", year: "numeric" };
        const formattedHpl = hplDate.toLocaleDateString("id-ID", options);

        setPregnancyData({
          week: data.week,
          day: data.day,
          hpl: data.hpl,
          hpht: data.hpht,
          daysLeft: daysLeft,
          trimester: trimester,
          formattedHpl: formattedHpl,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error("Error fetching pregnancy info:", error);
        setPregnancyData((prev) => ({
          ...prev,
          isLoading: false,
          error: "Failed to load pregnancy data",
        }));
      }
    };

    fetchPregnancyInfo();
  }, [session]);

  // Use this function to render the trimester-based progress bar
  const renderProgressBar = () => {
    const { trimester } = pregnancyData;

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

  if (isPending) {
    return <ActivityIndicator />;
  }

  if (pregnancyData.isLoading) {
    return <LoadingComponent style={{ marginTop: 200 }} />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#F8DEED", "#FFFFFF"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
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
            paddingTop: 20,
            paddingBottom: 30,
          }}
        >
          <View>
            <ThemedText
              type="titleMedium"
              style={{ fontSize: 14, color: "#0C0C0C" }}
            >
              Selamat pagi,
            </ThemedText>
            <ThemedText
              type="headlineSmall"
              style={{ color: "#0C0C0C", marginTop: 5 }}
            >
              {session?.user?.name && session.user.name.length > 20
                ? `${session.user.name.substring(0, 22)}...`
                : session?.user?.name}
            </ThemedText>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 35,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 20,
              }}
            >
              <Flame size={16} color="#FF481F" fill="#FFC633" />
              <ThemedText type="titleMedium" style={{ marginLeft: 4 }}>
                1
              </ThemedText>
            </View>
            <TouchableOpacity>
              <Bell size={24} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Calendar */}
        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
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
            {dates.map((date, index) => (
              <View
                key={`date-${index}`}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: date === today ? "#FFF" : "transparent",
                }}
              >
                <ThemedText
                  type="titleMedium"
                  style={{ color: date === today ? "#E91E63" : "#000" }}
                >
                  {date}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>

        {/* Fetus Visualization */}
        <View
          style={{ alignItems: "center", marginTop: 20, position: "relative" }}
        >
          <Image
            source={require("@/assets/images/yusril.png")}
            style={{ width: 400, height: 400, resizeMode: "contain" }}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 25,
              bottom: 10,
              backgroundColor: "#FFF",
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
          >
            <Volume2 size={20} color="#8C8C8C" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            alignItems: "flex-start",
            marginVertical: 20,
            paddingHorizontal: 20,
          }}
        >
          <ThemedText type="titleLarge">
            Minggu ke-{pregnancyData.week}, Hari ke-{pregnancyData.day}
          </ThemedText>
        </View>

        <LinearGradient
          colors={["#C85A9D", "#C85A9D"]}
          style={{
            borderRadius: 12,
            padding: 16,
            marginHorizontal: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          {/* Header ThemedText */}
          <ThemedText
            type="titleMedium"
            style={{ fontSize: 20, color: "#FFF" }}
          >
            {pregnancyData.daysLeft} Hari lagi!
          </ThemedText>
          <ThemedText
            type="labelLarge"
            style={{ color: "#FFF", opacity: 0.8, marginTop: 4 }}
          >
            Trimester {pregnancyData.trimester}
          </ThemedText>

          {/* HPL & Edit */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 6,
            }}
          >
            <ThemedText
              type="bodyLarge"
              style={{ color: "#FFF", fontSize: 18 }}
            >
              HPL: {pregnancyData.formattedHpl || "-"}
            </ThemedText>
            <TouchableOpacity>
              <ThemedText
                type="bodyLarge"
                style={{
                  color: "#FFF",
                  fontSize: 18,
                  textDecorationLine: "underline",
                }}
              >
                Edit
              </ThemedText>
            </TouchableOpacity>
          </View>

          {/* Progress Bar - Replace with dynamic version */}
          {renderProgressBar()}

          {/* Button */}
          {pregnancyData.week >= 28 && (
            <TouchableOpacity
              style={{
                marginTop: 14,
                backgroundColor: "#FFF",
                paddingVertical: 12,
                borderRadius: 30,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => router.push("/(auth)/contractionCounter")}
            >
              <Plus size={20} color="#C85A9D" />
              <ThemedText
                type="labelLarge"
                style={{ color: "#C85A9D", marginLeft: 8 }}
              >
                Lacak kontraksimu!
              </ThemedText>
            </TouchableOpacity>
          )}
        </LinearGradient>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          indicatorStyle="black" // Add this to change the color
          contentContainerStyle={{ paddingRight: 20 }} // Add padding for the indicator
          style={{
            padding: 20,
            marginTop: 20,
          }}
          scrollIndicatorInsets={{
            // Add this to customize the indicator position
            right: 5,
            bottom: 0,
          }}
        >
          {/* Size Comparison Card */}
          <TouchableOpacity onPress={() => router.push("/(auth)/infoMingguan")}>
            <View
              style={{
                width: 165,
                height: 204,
                backgroundColor: "#FFF",
                borderRadius: 12,
                padding: 16,
                alignItems: "flex-start",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
                marginRight: 10,
              }}
            >
              <ThemedText
                type="bodyLarge"
                style={{ color: "#000000", marginBottom: 8 }}
              >
                Bayimu seukuran
              </ThemedText>
              <ThemedText
                type="bodyLarge"
                style={{ color: "#000000", fontWeight: "semibold" }}
              >
                Buah Manggis
              </ThemedText>
              <View style={{ width: 135, marginTop: 10, alignItems: "center" }}>
                <Image
                  source={require("@/assets/images/manggis.png")}
                  style={{ width: 80, height: 80, marginTop: 10 }}
                  resizeMode="contain"
                />
              </View>
            </View>
          </TouchableOpacity>

          {/* Baby Development Card */}
          <TouchableOpacity onPress={() => router.push("/(auth)/infoMingguan")}>
            <View
              style={{
                width: 342,
                backgroundColor: "#FFF",
                borderRadius: 12,
                padding: 16,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
                marginRight: 10,
              }}
            >
              <ThemedText type="titleMedium" style={{ color: "#D43066" }}>
                Si kecil pada minggu ke-10
              </ThemedText>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 8,
                }}
              >
                <ThemedText type="labelSmall" style={{ color: "#7E7E7E" }}>
                  Tinggi
                </ThemedText>
                <ThemedText type="labelSmall" style={{ color: "#7E7E7E" }}>
                  Berat
                </ThemedText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <ThemedText type="bodyLarge" style={{ color: "#000" }}>
                  3.1 cm
                </ThemedText>
                <ThemedText type="bodyLarge" style={{ color: "#000" }}>
                  4.0 g
                </ThemedText>
              </View>
              <ThemedText
                style={{
                  color: "#000000",
                  fontWeight: 400,
                  fontFamily: "switzer",
                  fontSize: 14,
                  lineHeight: 20,
                  marginTop: 10,
                }}
              >
                Aku bukan embrio lagi. Sekarang aku sudah menjadi janin!
                Jari-jariku sempurna, dan sikuku bisa menekuk. Aku juga mulai
                menelan dan menendang kecil.
              </ThemedText>
            </View>
          </TouchableOpacity>

          {/* Tips Card */}
          <TouchableOpacity onPress={() => router.push("/(auth)/infoMingguan")}>
            <View
              style={{
                width: 342,
                backgroundColor: "#FFF",
                borderRadius: 12,
                padding: 16,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
                marginRight: 40,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Sparkle size={24} color="#4697C1" />
                  <ThemedText
                    type="titleMedium"
                    style={{
                      color: "#4697C1",
                      marginLeft: 6,
                    }}
                  >
                    Tips untuk Minggu ke-10
                  </ThemedText>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <ArrowUpRight
                    size={24}
                    color="#4697C1"
                    style={{ marginLeft: 6 }}
                  />
                </View>
              </View>
              <ThemedText
                style={{
                  color: "#000000",
                  fontWeight: 400,
                  fontFamily: "switzer",
                  fontSize: 14,
                  lineHeight: 20,
                  marginTop: 10,
                }}
              >
                Pada minggu ke-10 kehamilan, tubuh terus beradaptasi dengan
                berbagai perubahan hormon yang dapat menyebabkan kelelahan,
                mual, dan sensitivitas terhadap makanan atau bau tertentu.
                Meskipun ini bisa menjadi masa yang menantang, ada banyak cara
                untuk tetap merasa sehat dan nyaman. Dengan pola makan...
              </ThemedText>
            </View>
          </TouchableOpacity>
        </ScrollView>

        <View style={{ marginTop: 20, flexDirection: "column" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 30,
              paddingHorizontal: 20,
            }}
          >
            <ThemedText type="titleMedium" style={{ fontSize: 20 }}>
              Jurnal Kondisimu
            </ThemedText>
            <TouchableOpacity
              onPress={() => router.push("/(auth)/jurnalKondisimu")}
            >
              <ThemedText
                type="labelMedium"
                style={{ fontWeight: 500, color: "#4697C1" }}
              >
                Lihat Detail
              </ThemedText>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              marginTop: 10,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Image
                source={require("@/assets/images/SuasanaHati.png")}
                style={{ width: 60, height: 60, resizeMode: "contain" }}
              />
              <View style={{ gap: 5 }}>
                <ThemedText type="titleMedium">Suasana Hati</ThemedText>
                <ThemedText
                  type="bodyMedium"
                  style={{ fontStyle: "italic", color: "#7E7E7E" }}
                >
                  Sangat Baik
                </ThemedText>
              </View>
            </View>
            <View>
              <ThemedText type="titleLarge">4/5</ThemedText>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              marginTop: 20,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Image
                source={require("@/assets/images/BeratBadan.png")}
                style={{ width: 60, height: 60, resizeMode: "contain" }}
              />
              <View style={{ gap: 5 }}>
                <ThemedText type="titleMedium">Berat Badan</ThemedText>
                <ThemedText
                  type="bodyMedium"
                  style={{ fontStyle: "italic", color: "#7E7E7E" }}
                >
                  Di atas kisaran sehat
                </ThemedText>
              </View>
            </View>
            <View>
              <ThemedText type="titleLarge">64kg</ThemedText>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              marginTop: 20,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Image
                source={require("@/assets/images/Gejala.png")}
                style={{ width: 60, height: 60, resizeMode: "contain" }}
              />
              <View style={{ gap: 5 }}>
                <ThemedText type="titleMedium">Gejala</ThemedText>
                <ThemedText
                  type="bodyMedium"
                  style={{ fontStyle: "italic", color: "#7E7E7E" }}
                >
                  4 kali dalam minggu ini{" "}
                </ThemedText>
              </View>
            </View>
          </View>

          {/* Button */}
          <TouchableOpacity
            style={{
              marginTop: 14,
              marginHorizontal: 20,
              backgroundColor: "#4697C1",
              paddingVertical: 20,
              borderRadius: 30,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            // onPress={() => router.push('/(auth)/infoMingguan')}
            onPress={() => router.push("/(auth)/jurnalKondisimu")}
          >
            <Plus size={20} color="#FFF" />
            <ThemedText
              type="labelLarge"
              style={{ color: "#FFF", marginLeft: 8 }}
              onPress={() => router.push("/(auth)/infoPraHamil")}
            >
              Catat kondisi hari ini
            </ThemedText>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 20, flexDirection: "column" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 30,
              paddingHorizontal: 20,
            }}
          >
            <ThemedText type="titleMedium" style={{ fontSize: 20 }}>
              Buku Harian
            </ThemedText>
            <TouchableOpacity
              onPress={() => router.push("/(auth)/listBukuHarian")}
            >
              <ThemedText
                type="labelMedium"
                style={{ fontWeight: 500, color: "#4697C1" }}
              >
                Lihat Detail
              </ThemedText>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 20,
              marginTop: 10,
            }}
          >
            <View
              style={{
                width: "100%",
                gap: 10,
                marginTop: 14,
                backgroundColor: "#FFF",
                borderRadius: 12,
                padding: 16,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <ThemedText
                style={{
                  color: "#000000",
                  fontWeight: 400,
                  fontFamily: "switzer",
                  fontSize: 14,
                  lineHeight: 20,
                }}
              >
                Tiba tiba ngidam apel madura :((
              </ThemedText>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <Image
                  source={require("@/assets/images/ProfPic.png")}
                  style={{ width: 40, height: 40, resizeMode: "contain" }}
                />
                <View style={{ gap: 5 }}>
                  <ThemedText type="titleSmall" style={{ color: "#626262" }}>
                    Fiona Siregar
                  </ThemedText>
                  <ThemedText type="labelSmall" style={{ color: "#7E7E7E" }}>
                    4 menit lalu
                  </ThemedText>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PregnancyTrackerApp;
