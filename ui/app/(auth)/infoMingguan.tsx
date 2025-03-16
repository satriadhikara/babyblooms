import React from "react";
import {
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ui/ThemedText";
import { useRouter } from "expo-router";

const PregnancyWeekInfo = () => {
  const Router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#faf9f6" }}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: "#fff",
          borderBottomWidth: 1,
          borderBottomColor: "#f0f0f0",
        }}
      >
        <TouchableOpacity style={{ padding: 4 }} onPress={() => Router.push("/(auth)/(tabs)/jurnal")}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
        <ThemedText type="titleMedium">Informasi Minggu ke-4</ThemedText>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 16 }}>
          <ThemedText
            type="titleMedium"
            style={{ fontSize: 20, marginVertical: 16, paddingHorizontal: 20 }}
          >
            Bayimu seukuran Buah Manggi
          </ThemedText>

          {/* Fruit image */}
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 180,
              marginBottom: 20,
            }}
          >
            <Image
              source={require("@/assets/images/manggis.png")}
              style={{ width: 180, height: 180 }}
              resizeMode="contain"
            />
          </View>

          {/* Size measurements */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 20,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <ThemedText
                type='titleSmall'
                style={{ color: "#777", marginBottom: 4 }}
              >
                Tinggi
              </ThemedText>
              <ThemedText type="titleMedium" style={{ fontSize: 20 }}>
                3.1 cm
              </ThemedText>
            </View>
            <View style={{ alignItems: "center" }}>
              <ThemedText
                type='titleSmall'
                style={{ color: "#777", marginBottom: 4 }}
              >
                Berat
              </ThemedText>
              <ThemedText type="titleMedium" style={{ fontSize: 20 }}>
                0.004 kg
              </ThemedText>
            </View>
          </View>

          {/* Description */}
          <ThemedText
            type="bodyLarge"
            style={{
              color: "black",
              marginBottom: 24,
              paddingHorizontal: 16,
            }}
          >
            Aku bukan embrio lagi. Sekarang aku sudah menjadi janin yang utuh.
            Organku seperti paru-paru, hati, limpa dan usus mulai muncul dan
            menyambung baik!
          </ThemedText>

          {/* Weekly tips section */}
          <View style={{ padding: 16, borderRadius: 8 }}>
            <ThemedText
              type="titleMedium"
              style={{
                fontSize: 18,
                marginBottom: 16,
                color: "#3881A8",
              }}
            >
              TIPS KEHAMILAN MINGGU KE-4
            </ThemedText>

            <ThemedText
              type="bodyLarge"
              style={{
                color: "black",
                marginBottom: 16,
              }}
            >
              Memasuki minggu ke-4 kehamilan, tubuh mulai mengalami beberapa
              perubahan. Meskipun belum terlihat secara fisik, namun hormon
              mulai bekerja aktif di dalam tubuh. Berikut tips menjaga kesehatan
              di minggu ke-4 kehamilan ini. Namun, dengan beberapa strategi sederhana, Anda tetap bisa menjaga
              kesehatan dan memastikan perkembangan yang sehat bagi janin serta
              diri sendiri dari perkembangan si kecil. Berikut beberapa tips
              yang bisa membantu menghadapi tantangan di awal kehamilan:
            </ThemedText>


            {/* Tips list */}
            <View style={{ marginBottom: 16 }}>
              <ThemedText
                type="titleMedium"
                style={{
                  marginBottom: 8,
                  color: "black",
                }}
              >
                1. Atasi Mual
              </ThemedText>
              <ThemedText
                type="bodyLarge"
                style={{color: "black" }}
              >
                Jika mulai merasa mual tapi tidak tahan terhadap makanan atau
                tes kehamilan, coba konsumsi makanan kecil tapi sering dengan
                porsi kecil. Minta bantuan pasangan untuk menyiapkan makanan
                agar tidak tercium mual sebelum makan.
              </ThemedText>
            </View>

            <View style={{ marginBottom: 16 }}>
              <ThemedText
                type="titleMedium"
                style={{
                  marginBottom: 8,
                  color: "black",
                }}
              >
                2. Cukupi Konsumsi Vitamin E
              </ThemedText>
              <ThemedText
                type="bodyLarge"
                style={{color: "black" }}
              >
                Jika vitamin prenatal memenuhi mual di awal, Anda bisa jadi
                cobaan mencampur sebelum tidur dengan camilan. Atau tiap pagi
                memulai dari minum jus, kemudian minum vitamin setelah sarapan
                berat.
              </ThemedText>
            </View>

            <View style={{ marginBottom: 16 }}>
              <ThemedText
                type="titleMedium"
                style={{
                  marginBottom: 8,
                  color: "black",
                }}
              >
                3. Penuhi Kebutuhan Vitamin D
              </ThemedText>
              <ThemedText
                type="bodyLarge"
                style={{color: "black" }}
              >
                Vitamin D penting untuk perkembangan tulang, saraf, kekebalan
                gigi dan lainnya. Dapatkan senyawa mineral ini dengan setiap
                hari konsumsi makanan kaya vitamin D seperti susu, telur,
                salmon, atau sereal yang diperkaya.
              </ThemedText>
            </View>

            <View style={{ marginBottom: 16 }}>
              <ThemedText
                type="titleMedium"
                style={{
                  marginBottom: 8,
                  color: "black",
                }}
              >
                4. Susun Pola Makan Sehat
              </ThemedText>
              <ThemedText
                type="bodyLarge"
                style={{color: "black" }}
              >
                Sudah mulai makanan gizi baik, namun perlu coba cara kreatif
                seperti mencampurkan makanan yang enak tapi tidak disukai dengan
                memasukinya di dalam saus, atau mencampurkan makanan yang lezat.
                Tetaplah menjaga nutrisi yang dibutuhkan untuk tumbuh kembang.
              </ThemedText>
            </View>

            {/* Source */}
            <ThemedText
              type="labelLarge"
              style={{
                fontSize: 14,
                marginTop: 16,
                color: "#A1A1A1",
              }}
            >
              Sumber:
            </ThemedText>
            <ThemedText
              type="labelSmall"
              style={{color: "#A1A1A1", marginTop: 2 }}
            >
              https://mamaforkeeps.com/pregnancy-week-by-week/4
            </ThemedText>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PregnancyWeekInfo;
