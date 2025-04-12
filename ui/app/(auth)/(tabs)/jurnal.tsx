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
import { Audio } from "expo-av";

// Define the baby details data - this should be expanded to include all weeks of pregnancy
// Currently just a sample with fallback values
const babyDetails = {
  // Default values for any week
  default: {
    weight: 0,
    height: 0,
    naration:
      "Bayimu sedang berkembang dengan baik. Setiap minggu membawa perubahan baru yang menakjubkan!",
    tips: "",
  },
  // Week-specific data
  1: {
    weight: undefined,
    height: undefined,
    naration:
      "Aku baru saja berada dalam perjalanan menuju rahimmu, Bunda. Kamu mungkin belum merasakan kehadiranku, tapi tubuhmu sedang mempersiapkan tempat yang nyaman untukku.",
    tips: "",
  },
  2: {
    weight: undefined,
    height: undefined,
    naration:
      "Aku sudah mulai berkembang. Tak lama lagi, perjalanan kita benar-benar dimulai!",
    tips: "",
  },
  3: {
    weight: undefined,
    height: undefined,
    naration:
      "Kini aku mulai berkembang lebih cepat, Bunda! Aku seperti sebuah bola kecil yang tumbuh dengan pesat, dan meski kamu belum merasakannya, aku mulai membentuk diri dengan lebih jelas. Tubuhmu makin menyesuaikan diri untuk menyokongku, sementara aku terus menyerap segala yang aku butuhkan.",
    tips: "Bunda disarankan untuk berhenti merokok & minum alkohol, mengurangi kafein, banyak makan makanan sehat, dan mencukup kebutuhan cairan setidaknya 6-8 gelas sehari.",
  },
  4: {
    weight: undefined,
    height: undefined,
    naration:
      "Saat ini aku sudah menetap di 'rumah baru' yang terhubung ke pembuluh darahmu. Akhirnya aku mulai menyerap oksigen dan nutrisi darimu, sekaligus membuang sisa kotoranku. Ups! Maaf Bunda, kamu menjadi dapur sekaligus toiletku!",
    tips: "Bunda disarankan untuk berhenti merokok & minum alkohol, mengurangi kafein, banyak makan makanan sehat, dan mencukup kebutuhan cairan setidaknya 6-8 gelas sehari.",
  },
  5: {
    weight: undefined,
    height: undefined,
    naration:
      "Penampilanku lucu sekali! sekarang aku memiliki kepala dan ekor yang terlihat seperti kecebong. Sistem sarafku juga sudah mulai berkembang",
    tips: "",
  },
  6: {
    weight: undefined,
    height: 0.5,
    naration:
      "Aku sudah mulai memiliki bentuk tubuh yang lebih jelas. Sekarang aku seperti ikan kecil dengan ekor yang panjang. Semua organ pentingku sedang berkembang, dan aku mulai terlihat sepertiHati-hati dengan makanan dan minumanmu, Bun! Minuman beralkohol, obat-obatan, dan asap rokok bisa membahayakanku.",
    tips: "",
  },
  7: {
    weight: undefined,
    height: 0.64,
    naration:
      "Ginjal, hati, usus, dan paru-paruku mulai terbentuk. Namun, otakku masih terus berkembang sekarang. Jadi, jangan lupa selalu konsumsi makanan atau nutrisi yang mengandung asam folat ya, Bunda!",
    tips: "",
  },
  8: {
    weight: undefined,
    height: 1.5,
    naration:
      "Aku sudah mulai memiliki bentuk tubuh yang lebih jelas. Sekarang aku seperti ikan kecil dengan ekor yang panjang. Semua organ pentingku sedang berkembang, dan aku mulai terlihat seperti",
    tips: "",
  },
  9: {
    weight: 2,
    height: 2.3,
    naration:
      "Sel-sel saraf di otakku mulai membentuk koneksi dan jalur saraf. Bahkan hari ini tulang, sumsum belakang, dan ususku mulai terbentuk juga, lho....",
    tips: "",
  },
  10: {
    weight: 4,
    height: 3.1,
    naration:
      "Yeay, aku mulai bisa menekuk siku. Gerakan kepala, anggota tubuh, dan pinggangku semakin gesit. Aku juga sudah punya otot kecil sekarang. Namun, ,masih terlalu cepat untuk merasakan tendanganku, Bun.",
    tips: "",
  },
  11: {
    weight: 7,
    height: 4.1,
    naration:
      "Aku makin kuat sekarang! Minggu ini tulang rawanku mulai terbentuk. Lutut dan pergelangan kakiku juga mulai berkembang!",
    tips: "",
  },
  12: {
    weight: 14,
    height: 5.4,
    naration:
      "Hitung jari tangan dan kakiku, Bunda! Jariku gak berselaput lagi sekarang. Kuku-kuku jariku juga sudah berkembang, lho...",
    tips: "",
  },
  13: {
    weight: 23,
    height: 7.4,
    naration:
      "Bunda, sumsum tulang belakangku kini sedang kerja ekstra membuat sel darah putih. Supaya aku makin kuat dan kebal dari kuman penyakit saat aku lahir nanti.",
    tips: "",
  },
  14: {
    weight: 43,
    height: 8.7,
    naration:
      "Minggu ini perkembangan ususku semakin sempurna Bunda. Yuk lihat 3D terbaruku di sini, Bun!.",
    tips: "",
  },
  15: {
    weight: 70,
    height: 10.1,
    naration:
      "Wah! Leherku semakin panjang lho. Aku juga sudah bisa menjaga kepalaku tetap tegak.",
    tips: "",
  },
  16: {
    weight: 100,
    height: 11.6,
    naration:
      "Yay! Aku bisa mendengarmu sekarang. Aku bisa mendengar detak jantungmu, bahkan suara gemuruh di perutmu. Jangan lupa ajak aku bicara terus ya, Bun!",
    tips: "",
  },
  17: {
    weight: 140,
    height: 13,
    naration:
      "Yeay! Sistem peredaran darahku sudah berfungsi baik sekarang. Jantungku bahkan sudah mempompa 28 liter darah dalam sehari.",
    tips: "",
  },
  18: {
    weight: 190,
    height: 14.2,
    naration:
      "Sekarang aku sudah lebih gemuk! Lemak ditubuhku mulai menumpuk untuk memberiku energi dan membuatku tetap hangat, Bun.",
    tips: "",
  },
  19: {
    weight: 240,
    height: 15.3,
    naration:
      "Yey! Alat kelaminku semakin jelas sekarang! Bunda bisa mengetahui jenis kelaminku saat USG nanti. Penasaran nggak Bun? hihihihi",
    tips: "",
  },
  20: {
    weight: 300,
    height: 25.6,
    naration:
      "Kulitku masih lembut, Bunda. Otot dan lemakku juga semakin bertambah banyak sekarang.",
    tips: "",
  },
  21: {
    weight: 360,
    height: 27.8,
    naration:
      "Bunda bila aku seorang laki-laki, organ testisku semakin berkembang sekarang. Apakah bunda sudah tahu jenis kelaminku sekarang?",
    tips: "",
  },
  22: {
    weight: 430,
    height: 27.9,
    naration:
      "Berat badanku makin bertambah Bunda. Ususku sekarang sudah cukup berkembang untuk menyerap nutrisi dari cairan ketuban yang aku konsumsi setiap hari",
    tips: "",
  },
  23: {
    weight: 500,
    height: 28.9,
    naration:
      "Bun, tahu nggak sih? Aku mulai menumpuk kotoran di ususku sekarang. Kotoran ini berupa cairan ketuban, lunago (rambut halus), dan sel kulit mati.",
    tips: "",
  },
  24: {
    weight: 600,
    height: 30,
    naration:
      "Yeay! Aku sudah bisa mengenali suaramu, Bunda! Bicaralah padaku lebih sering yah.",
    tips: "",
  },
  25: {
    weight: 660,
    height: 34.26,
    naration:
      "Wuzz! Otak dan paru-paruku tumbuh dengan cepat. bahkan paru-paruku sudah menghasilkan surfaktan atau cairan yang aku perlukan untuk bernapas di luar rahim",
    tips: "",
  },
  26: {
    weight: 760,
    height: 35.6,
    naration:
      "Lemak dalam tubuhku membuat aku terlibat lebih imut. Lemak itu juga akan membantuku beradaptasi dengan suhu di luar rahim yang relatif rendah.",
    tips: "",
  },
  27: {
    weight: 875,
    height: 36.6,
    naration:
      "Bunda, coba minta ayah untuk memegang perutmu. Aku kangen sekali padanya. Biarkan dia merasakan gerakanku dan mendengar detak jantungku",
    tips: "",
  },
  28: {
    weight: 1000,
    height: 37.6,
    naration:
      "Paru-paru, hati, dan sistem kekebalan tubuhku terus berkembang. Aku juga masih berlatih bernapas dengan menghirup dan membuang cairan ketuban",
    tips: "",
  },
  29: {
    weight: 1200,
    height: 38.6,
    naration:
      "Aku semakin pinta lho! Otak kecilku telah mengembangkan miliaran neuron. Aku juga telah mampu berkedip, bermimpi, dan mengendalikan suhu tubuh.",
    tips: "",
  },
  30: {
    weight: 1300,
    height: 39.9,
    naration:
      "Bunda, tahukah kamu bahwa selama 11 minggu terakhir, berat badanku akan naik dua kali lipat?",
    tips: "",
  },
  31: {
    weight: 1500,
    height: 41.1,
    naration:
      "Sumsum tulangku dapat menghasilkan sel darah merah sendiri sekarang. Otakku juga semakin besar dan sel-sel otakku terus terhubung.",
    tips: "",
  },
  32: {
    weight: 1700,
    height: 42.4,
    naration:
      "Apakah Bunda bisa merasakan setidaknya 10 gerakanku dalam 2 jam? ",
    tips: "",
  },
  33: {
    weight: 1900,
    height: 43.7,
    naration:
      "Aku sekarang bisa menggaruk kulitku sendiri lho ketika gagal. Hahahaha aku pintar kan?",
    tips: "",
  },
  34: {
    weight: 2100,
    height: 45,
    naration:
      "Selama di dalam kandungan aku mendapatkan antibodi pelindung dari darahmu lho Bunda. Terima kasih yaa, kamu sangat berarti dalam hidupku.",
    tips: "",
  },
  35: {
    weight: 2400,
    height: 46.2,
    naration:
      "Di tahap ini, tulangku sudah berkembang sepenuhnya lho Bunda! Kekebalan tubuh dan paru-paruku juga semakin kuat.",
    tips: "",
  },
  36: {
    weight: 2600,
    height: 47.4,
    naration:
      "Badanku semakij gendut, kulitku semakin halus, dan mulai berwarna merah muda. Siap-siap ya Bunda, kamu pasti akan gemas sekali melihatku!",
    tips: "",
  },
  37: {
    weight: 2900,
    height: 48.6,
    naration:
      "Yeay! Otot menghisapku semakin berkembang! Aku sudah siap untuk minum ASI nanti setelah lahir.",
    tips: "",
  },
  38: {
    weight: 3100,
    height: 49.8,
    naration:
      "Bunda semalam kamu tidur menghadap mana? Banyak ahli menyarankan tidur miring ke kiri. Karena ketika kamu tidur telentang, aku kekurangan oksigen dan suplai darah. Ini bisa membatasi pertumbuhanku. Tidur telentang juga bisa meningkatkan risiko stillbirth (bayi lahir mati) dan memengaruhi berat lahirku.",
    tips: "",
  },
  39: {
    weight: 3300,
    height: 50.7,
    naration:
      "Katanya kepala bayi akan sedikit runcing atau memanjang saat dilahirkan. Itu benar karena tengkorakku belum cukup keras sekarang. Namun, jangan khawatir ya Bunda, kepalaku akan kembali ke bentuk normal beberapa bulan setelah kelahiranku.",
    tips: "",
  },
  40: {
    weight: 3500,
    height: 51.2,
    naration:
      "Tahukah Bunda? Dokter akan memeriksa detak jantung, pernapasan, tonus otot, refleks, dan bahkan warna kulitku saat aku lahir. Ini penting untuk memastikan aku benar-benar sehat.",
    tips: "",
  },
};

// Define the Entry interface based on API response for Buku Harian
interface BookEntry {
  id: string;
  name: string;
  createdAt: string; // API returns createdAt as string
  content: string;
  imageUrl?: string; // Add imageUrl from API
  userId: string; // Add userId from API
}

const PregnancyTrackerApp = () => {
  const { session, isPending } = useAuth();
  const router = useRouter();
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
  const [recentBookEntry, setRecentBookEntry] = useState<BookEntry | null>(
    null
  );
  const [isBookLoading, setIsBookLoading] = useState(true);
  const [bookError, setBookError] = useState<string | null>(null);

  // Function to format time difference for Buku Harian
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Baru saja";
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m lalu`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}j lalu`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "Kemarin";
    if (diffInDays < 7) return `${diffInDays}h lalu`;
    // For older entries, show the date
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

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
      if (status.isLoaded && status.didJustFinish) {
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

  // Define the type for pregnancy data
  interface PregnancyData {
    week: number;
    day: number;
    hpl: string;
    hpht: string;
    daysLeft: number;
    trimester: number;
    formattedHpl?: string; // Make formattedHpl optional as it's added later
    isLoading: boolean;
    isMom: boolean;
    error: string | null; // Allow error to be string or null
  }

  // Add pregnancy data state with explicit type
  const [pregnancyData, setPregnancyData] = useState<PregnancyData>({
    week: 0,
    day: 0,
    hpl: "",
    hpht: "",
    daysLeft: 0,
    trimester: 1,
    isLoading: true,
    isMom: true,
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

        console.log("Pregnancy data:", data);

        // Calculate days left and trimester
        const hplDate = new Date(data.hpl);
        const today = new Date();
        const daysLeft = Math.floor(
          (hplDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        );

        let trimester = data.trimester || 1;

        // Format HPL (due date)
        const options: Intl.DateTimeFormatOptions = {
          day: "numeric",
          month: "short",
          year: "numeric",
        };
        const formattedHpl = hplDate.toLocaleDateString("id-ID", options);

        setPregnancyData({
          week: data.week,
          day: data.day,
          hpl: data.hpl,
          hpht: data.hpht,
          daysLeft: daysLeft,
          trimester: trimester,
          formattedHpl: formattedHpl,
          isMom: data.isMom,
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

  // Fetch recent book entry
  useEffect(() => {
    const fetchRecentBookEntry = async () => {
      if (!session) {
        setIsBookLoading(false);
        return;
      }

      setIsBookLoading(true);
      setBookError(null);
      try {
        const cookies = authClient.getCookie();
        const headers = { Cookie: cookies };
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL}/api/book?recentOnly=true`,
          {
            method: "GET",
            headers: headers,
          }
        );

        if (!response.ok) {
          if (response.status === 404) {
            setRecentBookEntry(null); // No entries found
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } else {
          const data: BookEntry = await response.json();
          setRecentBookEntry(data);
        }
      } catch (err) {
        console.error("Error fetching recent book entry:", err);
        setBookError("Gagal memuat entri buku harian terbaru.");
      } finally {
        setIsBookLoading(false);
      }
    };

    fetchRecentBookEntry();
  }, [session]);

  // Get baby details for current week with fallback to default
  const getBabyDetails = (week: number) => {
    // Cast week to the expected key type to satisfy TypeScript
    return babyDetails[week as keyof typeof babyDetails] || babyDetails.default;
  };

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

  // Get current baby details
  const currentBabyDetails = getBabyDetails(pregnancyData.week);

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
          <View style={{ flex: 1, marginRight: 20 }}>
            <ThemedText
              type="titleMedium"
              style={{ fontSize: 14, color: "#0C0C0C" }}
            >
              {greeting},
            </ThemedText>
            <ThemedText
              type="headlineSmall"
              style={{
                color: "#0C0C0C",
                marginTop: 5,
                flexWrap: "wrap",
              }}
              numberOfLines={2}
            >
              {session?.user?.name}
            </ThemedText>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "center",
              paddingTop: 35,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <Flame size={28} color="#FF481F" fill="#FFC633" />
              <ThemedText type="titleMedium" style={{ marginLeft: 4 }}>
                1
              </ThemedText>
            </View>

            <TouchableOpacity onPress={() => router.push("/(auth)/menu")}>
              <Image
                source={
                  session?.user.image
                    ? { uri: session.user.image }
                    : require("@/assets/images/ProfPic.png")
                }
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  marginLeft: 15,
                  backgroundColor: "#e0e0e0",
                }}
              />
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
              marginBottom: 20,
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
        {/* Fetus Visualization */}
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
            }}
            onPress={playSound} // Add onPress to play sound
          >
            <Volume2 size={20} color={isPlaying ? "#FFF" : "#8C8C8C"} />
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
          {pregnancyData.isMom && pregnancyData.week >= 28 && (
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
          indicatorStyle="black"
          contentContainerStyle={{ paddingRight: 20 }}
          style={{
            padding: 20,
            marginTop: 20,
          }}
          scrollIndicatorInsets={{
            right: 5,
            bottom: 0,
          }}
        >
          {/* Size Comparison Card */}
          <TouchableOpacity onPress={() => router.push("/(auth)/infoMingguan")}>
            <View
              style={{
                width: 165,
                height: '100%',
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

          {/* Baby Development Card - Fixed to use currentBabyDetails */}
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
                height: "100%",
              }}
            >
              <ThemedText type="titleMedium" style={{ color: "#D43066" }}>
                Si kecil pada minggu ke-{pregnancyData.week}
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
                  {currentBabyDetails.height || "-"} cm
                </ThemedText>
                <ThemedText type="bodyLarge" style={{ color: "#000" }}>
                  {currentBabyDetails.weight || "-"} g
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
                {currentBabyDetails.naration}
              </ThemedText>
            </View>
          </TouchableOpacity>

          {/* Tips Card */}
          <TouchableOpacity>
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
                height: "100%",
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
                    Tips untuk Minggu ke-{pregnancyData.week}
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
                {/* Pada minggu ke-10 kehamilan, tubuh terus beradaptasi dengan
                berbagai perubahan hormon yang dapat menyebabkan kelelahan,
                mual, dan sensitivitas terhadap makanan atau bau tertentu.
                Meskipun ini bisa menjadi masa yang menantang, ada banyak cara
                untuk tetap merasa sehat dan nyaman. Dengan pola makan... */}
                Coming soon!
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
              {pregnancyData.isMom
                ? "Jurnal Kondisimu"
                : "Jurnal Kondisi Pasanganmu"}
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
          {pregnancyData.isMom && (
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
              onPress={() => router.push("/(auth)/infoPraHamil")}
            >
              <Plus size={20} color="#FFF" />
              <ThemedText
                type="labelLarge"
                style={{ color: "#FFF", marginLeft: 8 }}
              >
                Catat kondisi hari ini
              </ThemedText>
            </TouchableOpacity>
          )}
        </View>

        {/* Buku Harian Section */}
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
            {isBookLoading ? (
              <ActivityIndicator style={{ marginTop: 20, width: "100%" }} />
            ) : bookError ? (
              <ThemedText style={{ color: "red", marginTop: 10 }}>
                {bookError}
              </ThemedText>
            ) : recentBookEntry ? (
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
                    fontFamily: "Switzer-Regular",
                    fontSize: 14,
                    lineHeight: 20,
                  }}
                >
                  {recentBookEntry.content}
                </ThemedText>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Image
                    source={
                      recentBookEntry.imageUrl
                        ? { uri: recentBookEntry.imageUrl }
                        : require("@/assets/images/ProfPic.png")
                    }
                    style={{
                      width: 40,
                      height: 40,
                      resizeMode: "contain",
                      borderRadius: 99,
                    }}
                  />
                  <View style={{ gap: 5 }}>
                    <ThemedText type="titleSmall" style={{ color: "#626262" }}>
                      {recentBookEntry.name}
                    </ThemedText>
                    <ThemedText type="labelSmall" style={{ color: "#7E7E7E" }}>
                      {formatTimeAgo(recentBookEntry.createdAt)}
                    </ThemedText>
                  </View>
                </View>
              </View>
            ) : (
              <ThemedText style={{ marginTop: 10, color: "#7E7E7E" }}>
                Belum ada entri buku harian.
              </ThemedText>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PregnancyTrackerApp;
