import { View, Text, Image, ScrollView } from "react-native";
import { ThemedText } from "@/components/ui/ThemedText";
import { Settings, ChevronRight, Plus, Scroll } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { useAuth } from "../_layout";
import LoadingComponent from "@/components/ui/Loading";
import { useRouter } from "expo-router";

export default function Menu() {
  const { session, isPending } = useAuth();

  if (isPending) {
    return <LoadingComponent />;
  }

  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F7F4" }}>
      <ScrollView style={{ flex: 1, backgroundColor: "#F8F7F4" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingVertical: 15,
            backgroundColor: "#F8F7F4",
          }}
        >
          <ThemedText type="headlineSmall">Menu</ThemedText>
          <Settings size={24} color="#000" />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            backgroundColor: "#F8F7F4",
            paddingHorizontal: 20,
            paddingVertical: 15,
          }}
        >
          <Image
            source={
              session?.user.image
                ? { uri: session.user.image }
                : require("@/assets/images/ProfPic.png")
            }
            style={{
              width: 60,
              height: 60,
              resizeMode: "contain",
              borderRadius: 100,
            }}
          />
          <View style={{ gap: 4 }}>
            <ThemedText type="titleMedium">{session?.user.name}</ThemedText>
            <ThemedText type="bodySmall" style={{ color: "#7E7E7E" }}>
              {session?.user.email}
            </ThemedText>
          </View>
        </View>
        <ChevronRight
          size={24}
          color="#000"
          style={{ position: "absolute", right: 20, top: 95 }}
          onPress={() => router.push("/(auth)/profil")}
        />
        <View>
          <ThemedText
            type="titleMedium"
            style={{
              fontSize: 18,
              paddingHorizontal: 20,
              paddingVertical: 15,
              color: "#000",
            }}
          >
            Bayimu & Keluarga
          </ThemedText>
        </View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#F8F7F4",
            paddingTop: 24,
            paddingBottom: 28,
            gap: 50,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
            elevation: 3,
            borderRadius: 16,
            marginHorizontal: 16,
            marginVertical: 8,
          }}
        >
          <View style={{ gap: 16 }}>
            <View style={{ gap: 2 }}>
              <ThemedText
                type="titleLarge"
                style={{ paddingHorizontal: 20, color: "#000" }}
              >
                Seth
              </ThemedText>
              <ThemedText
                type="bodySmall"
                style={{ paddingHorizontal: 20, color: "#000" }}
              >
                4 Minggu 5 Hari
              </ThemedText>
            </View>
            <TouchableOpacity>
              <View
                style={{
                  marginTop: 4,
                  borderRadius: 100,
                  marginHorizontal: 20,
                  paddingHorizontal: 12,
                  backgroundColor: "#DA5AA7",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  paddingTop: 4,
                  paddingBottom: 6,
                }}
              >
                <ThemedText type="labelMedium" style={{ color: "#F8F7F4" }}>
                  Anggota Keluarga 2
                </ThemedText>
                <ChevronRight size={24} color="#F8F7F4" />
              </View>
            </TouchableOpacity>
          </View>
          <Image
            source={require("@/assets/images/babySkinLight.png")}
            style={{
              justifyContent: "center",
              alignContent: "center",
              width: 60,
              height: 60,
              resizeMode: "contain",
            }}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#B6B6B6",
            paddingVertical: 16,
            borderRadius: 48,
            marginHorizontal: 16,
            marginTop: 12,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Plus size={20} color="#F8F7F4" style={{ marginRight: 8 }} />
          <ThemedText
            type="titleMedium"
            style={{
              color: "#F8F7F4",
            }}
          >
            Tambahkan bayi baru
          </ThemedText>
        </TouchableOpacity>
        <View>
          <ThemedText
            type="titleMedium"
            style={{
              fontSize: 18,
              paddingHorizontal: 20,
              paddingVertical: 15,
              color: "#000",
              marginTop: 32,
            }}
          >
            Layanan
          </ThemedText>
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            margin: 20,
            gap: 10,
            justifyContent: "space-between",
          }}
        >
          {[
            { icon: "Box", label: "Visualisasi   3D", bgColor: "#DA5AA7", route: "/jurnal" },
            { icon: "Notebook", label: "Jurnal Kondisimu", bgColor: "#DA5AA7", route: "/(auth)/jurnalKondisimu" },
            { icon: "Info", label: "Informasi Mingguan", bgColor: "#DA5AA7", route: "/(auth)/infoMingguan" },
            { icon: "Book", label: "Buku Harian", bgColor: "#DA5AA7", route: "/(auth)/listBukuHarian" },
            { icon: "SquareCheckBig", label: "Checklist", bgColor: "#AAC843", route: "/(auth)/checkList" },
            { icon: "Calendar", label: "Jadwal Pertemuan", bgColor: "#AAC843", route: "/(auth)/jadwalPertemuan" },
            { icon: "ListTodo", label: "Catatan Pemeriksaan", bgColor: "#AAC843", route: "/(auth)/catatanPemeriksaan" },
            { icon: "Hospital", label: "RS/Klinik Terdekat", bgColor: "#AAC843", route: "/(auth)/RSComingSoon" },
            { icon: "Timer", label: "Contraction Counter", bgColor: "#AAC843", route: "/(auth)/contractionCounter" },
            { icon: "Apple", label: "Makanan/Minuman", bgColor: "#4697C1", route: "/(auth)/makanan" },
            { icon: "Pill", label: "Obat-     obatan", bgColor: "#4697C1", route: "/(auth)/obat" },
            { icon: "Activity", label: "Aktivitas", bgColor: "#4697C1", route: "/(auth)/aktivitas" },
            { icon: "HeartPulse", label: "BloomCare", bgColor: "#5D63A6", route: "/(auth)/bloomCare" },
            { icon: "Baby", label: "NameNest", bgColor: "#5D63A6", route: "/(auth)/nameNest" },
            { icon: "Sparkles", label: "LittleZodiac", bgColor: "#5D63A6", route: "/(auth)/littleZodiac" },
          ].map((item) => {
            const IconComponent = require("lucide-react-native")[item.icon];
            return (
              <TouchableOpacity
                key={item.label}
                onPress={() => item.route && router.push(item.route as any)}
                style={{
                  padding: 10,
                  width: 114,
                  height: 122,
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderRadius: 12,
                }}
              >
                <View
                  style={{
                    width: 64,
                    height: 64,
                    backgroundColor: item.bgColor,
                    borderRadius: 100,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <IconComponent size={32} color="#F8F7F4" />
                </View>
                <ThemedText type="titleSmall" style={{ textAlign: "center" }}>
                  {item.label}
                </ThemedText>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
