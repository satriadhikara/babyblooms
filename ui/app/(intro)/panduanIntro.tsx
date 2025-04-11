import React, { useState, useEffect, useRef } from "react";
import { ThemedText } from "@/components/ui/ThemedText";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Search } from "lucide-react-native";

const PanduanPage = () => {
  const router = useRouter();
  const [entryText, setEntryText] = useState("");
  const textInputRef = useRef(null);
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = 280;
  const cardMargin = 20;
  const cardViewWidth = cardWidth + cardMargin;

  // Recommendation items data
  const recommendationItems = [
    {
      id: 1,
      image: require("@/assets/images/BgRekomendasiImunisasi.png"),
      title: "",
      description: "",
    },
    {
      id: 2,
      image: require("@/assets/images/BgRekomendasiUSG.png"),
      title: "Kesehatan",
      description: "Mengenal penyebab Hamil Kosong, Apa Saja Gejalanya?",
    },
    {
      id: 3,
      image: require("@/assets/images/BgRekomendasiHamil.png"),
      title: "",
      description: "",
    },
  ];

  interface Article {
    id: number;
    image: any;
    category: string;
    title: string;
    author: string;
    date: string;
  }

  const articles: Article[] = [
    {
      id: 1,
      image: require("@/assets/images/HamilKosong.png"),
      category: "Kesehatan",
      title: "Mengenal penyebab Hamil Kosong, Apa Saja Gejalanya?",
      author: "Citra Maharani",
      date: "28 Feb 2025",
    },
    {
      id: 2,
      image: require("@/assets/images/GulaDarahMelonjak.png"),
      category: "Kesehatan",
      title: "Tips Buka Puasa Aman Khusus Bumil Biar Gula Darah Tak Melonjak",
      author: "Averus Kautsar",
      date: "06 Mar 2025",
    },
    {
      id: 3,
      image: require("@/assets/images/PentingnyaOlahraga.png"),
      category: "Olahraga",
      title: "Pentingnya Olahraga Saat Hamil",
      author: "Ni Komang",
      date: "10 Jan 2025",
    },
    {
      id: 4,
      image: require("@/assets/images/GayaHidupBumil.png"),
      category: "Gaya Hidup",
      title: "Gaya Hidup yang Baik untuk Ibu Hamil",
      author: "Redaksi",
      date: "28 Feb 2025",
    },
  ];

  // Handle scroll event to determine current index
  interface RecommendationItem {
    id: number;
    image: any;
    title: string;
  }

  interface ScrollEvent {
    nativeEvent: {
      contentOffset: {
        x: number;
      };
    };
  }

  const handleScroll = (event: ScrollEvent) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const index =
      Math.round(scrollX / cardViewWidth) % recommendationItems.length;
    setCurrentIndex(index);
  };

  // Scroll to specific index
  const scrollToIndex = (index: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current &&
        scrollViewRef.current.scrollTo({
          x: index * cardViewWidth,
          animated: true,
        });
    }
  };

  // For infinite scroll effect
  useEffect(() => {
    if (scrollViewRef.current) {
      // Set initial position
      scrollViewRef.current &&
        scrollViewRef.current.scrollTo({
          x: currentIndex * cardViewWidth,
          animated: false,
        });
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F7F4" }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 24,
          paddingVertical: 20,
          backgroundColor: "#F8F7F4",
        }}
      >
        <ThemedText type="headlineSmall" style={{ color: "#000000" }}>
          Momspedia
        </ThemedText>
      </View>
      <View
        style={{
          backgroundColor: "#F8F7F4",
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: 40,
            borderWidth: 1,
            borderColor: "#E0E0E0",
            borderRadius: 48,
            marginTop: 20,
            marginLeft: 25,
            marginRight: 15,
            marginBottom: 20,
            backgroundColor: "#EFEFF0",
            paddingHorizontal: 16,
          }}
        >
          <Search size={20} color="#BFBFBF" />
          <TextInput
            ref={textInputRef}
            style={{
              flex: 1,
              marginLeft: 8,
              fontSize: 14,
              color: "#000000",
              fontFamily: "switzer",
              lineHeight: 20,
            }}
            placeholder="Cari topik, artikel, lainnya"
            placeholderTextColor="#BFBFBF"
            value={entryText}
            onChangeText={setEntryText}
          />
        </View>
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              marginTop: 30,
              paddingLeft: 25,
            }}
            scrollIndicatorInsets={{
              // Add this to customize the indicator position
              right: 5,
              bottom: 0,
            }}
          >
            {/* BloomsAI */}
            <TouchableOpacity
              style={{
                width: 148,
                height: 120,
                backgroundColor: "#0C0C0C",
                borderRadius: 12,
                alignItems: "flex-start",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
                marginRight: 12,
              }}
              onPress={() => router.push("/(auth)/bloomsAI")}
            >
              <Image
                source={require("@/assets/images/bg_image_bloomsAI.png")}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 12,
                  position: "absolute",
                  opacity: 0.5,
                }}
              />
              <Image
                source={require("@/assets/images/bloomsAI.png")}
                style={{
                  width: 84,
                  height: 50,
                  marginTop: 21,
                  marginLeft: 16,
                  position: "absolute",
                }}
              />
              <ThemedText
                type="titleMedium"
                style={{ color: "#F8F7F4", top: 80, left: 16 }}
              >
                BloomsAI
              </ThemedText>
            </TouchableOpacity>

            {/* Makanan & Minuman */}
            <TouchableOpacity
              style={{
                width: 148,
                height: 120,
                backgroundColor: "#0C0C0C",
                borderRadius: 12,
                alignItems: "flex-start",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
                marginRight: 12,
              }}
              onPress={() => router.push("/(auth)/makanan")}
            >
              <Image
                source={require("@/assets/images/BgMakanan.png")}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 12,
                  position: "absolute",
                  opacity: 0.5,
                }}
              />
              <ThemedText
                type="titleMedium"
                style={{ color: "#F8F7F4", top: 64, left: 16 }}
              >
                Makanan & Minuman
              </ThemedText>
            </TouchableOpacity>

            {/* Aktivitas */}
            <TouchableOpacity
              style={{
                width: 148,
                height: 120,
                backgroundColor: "#0C0C0C",
                borderRadius: 12,
                alignItems: "flex-start",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
                marginRight: 12,
              }}
              onPress={() => router.push("/(auth)/aktivitas")}
            >
              <Image
                source={require("@/assets/images/BgAktivitas.png")}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 12,
                  position: "absolute",
                  opacity: 0.5,
                }}
              />
              <ThemedText
                type="titleMedium"
                style={{ color: "#F8F7F4", top: 84, left: 16 }}
              >
                Aktivitas
              </ThemedText>
            </TouchableOpacity>

            {/* Obat - obatan */}
            <TouchableOpacity
              style={{
                width: 148,
                height: 120,
                backgroundColor: "#0C0C0C",
                borderRadius: 12,
                alignItems: "flex-start",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
                marginRight: 12,
              }}
              onPress={() => router.push("/(auth)/obat")}
            >
              <Image
                source={require("@/assets/images/BgObat-Obatan.png")}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 12,
                  position: "absolute",
                  opacity: 0.5,
                }}
              />
              <ThemedText
                type="titleMedium"
                style={{ color: "#F8F7F4", top: 84, left: 16 }}
              >
                Obat - obatan
              </ThemedText>
            </TouchableOpacity>
          </ScrollView>

          <ThemedText
            style={{
              color: "#000000",
              fontWeight: "bold",
              fontSize: 20,
              lineHeight: 28,
              marginTop: 30,
              marginLeft: 25,
              fontFamily: "PlusJakartaSans_700Bold",
            }}
          >
            Rekomendasi
          </ThemedText>

          <View style={{ marginTop: 10 }}>
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: (screenWidth - cardWidth) / 2,
                alignItems: "center",
                justifyContent: "center",
              }}
              snapToInterval={cardViewWidth}
              decelerationRate="fast"
              onScroll={handleScroll}
              onScrollEndDrag={(e) => {
                const offsetX = e.nativeEvent.contentOffset.x;

                if (offsetX < 0) {
                  const lastIndex = recommendationItems.length - 1;
                  scrollViewRef.current?.scrollTo({
                    x: lastIndex * cardViewWidth,
                    animated: false,
                  });
                  setCurrentIndex(lastIndex);
                } else if (
                  offsetX >
                  (recommendationItems.length - 1) * cardViewWidth
                ) {
                  scrollViewRef.current?.scrollTo({
                    x: 0,
                    animated: false,
                  });
                  setCurrentIndex(0);
                }
              }}
              scrollEventThrottle={16}
            >
              {recommendationItems.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  style={{
                    width: cardWidth,
                    height: currentIndex === index ? 190 : 180, // Make current item larger
                    backgroundColor: "#000",
                    borderRadius: 24,
                    alignItems: "flex-start",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: currentIndex === index ? 5 : 3, // Higher elevation for current item
                    marginRight: cardMargin,
                    transform: [{ scale: currentIndex === index ? 1.05 : 1 }],
                    marginTop: currentIndex === index ? 0 : 5,
                    marginBottom: currentIndex === index ? 0 : 5,
                  }}
                >
                  <Image
                    source={item.image}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 24,
                      position: "absolute",
                    }}
                  />
                  {item.title && item.description && (
                    <View>
                      <ThemedText
                        type="titleMedium"
                        style={{ color: "#F8F7F4", top: 100, left: 16 }}
                      >
                        {item.title}
                      </ThemedText>
                      <ThemedText
                        style={{
                          color: "#F8F7F4",
                          top: 100,
                          left: 16,
                          fontSize: 16,
                          fontWeight: 500,
                        }}
                      >
                        {item.description}
                      </ThemedText>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Dots Indicator */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 12,
              }}
            >
              {recommendationItems.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => scrollToIndex(index)}
                  style={{
                    width: currentIndex === index ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor:
                      currentIndex === index ? "#4A4F87" : "#CCCCCC",
                    marginHorizontal: 4,
                  }}
                />
              ))}
            </View>
          </View>
          <ThemedText
            style={{
              color: "#000000",
              fontWeight: "bold",
              fontSize: 20,
              lineHeight: 28,
              marginTop: 30,
              marginLeft: 25,
              fontFamily: "PlusJakartaSans_700Bold",
            }}
          >
            Artikel Seputar Kehamilan
          </ThemedText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              marginTop: 10,
              marginLeft: 25,
              marginRight: 5,
            }}
          >
            <TouchableOpacity
              style={{
                width: 80,
                height: 30,
                backgroundColor: "#4A4F87",
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
                marginRight: 6,
              }}
            >
              <ThemedText
                style={{
                  fontSize: 14,
                  color: "#FAFAFA",
                  fontFamily: "switzer",
                  fontWeight: 500,
                }}
              >
                Semua
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 100,
                height: 30,
                backgroundColor: "#4A4F87",
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
                marginRight: 6,
              }}
            >
              <ThemedText
                style={{
                  fontSize: 14,
                  color: "#FAFAFA",
                  fontFamily: "switzer",
                  fontWeight: 500,
                }}
              >
                Kesehatan
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 115,
                height: 30,
                backgroundColor: "#4A4F87",
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
                marginRight: 6,
              }}
            >
              <ThemedText
                style={{
                  fontSize: 14,
                  color: "#FAFAFA",
                  fontFamily: "switzer",
                  fontWeight: 500,
                }}
              >
                Gaya Hidup
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 91,
                height: 30,
                backgroundColor: "#4A4F87",
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <ThemedText
                style={{
                  fontSize: 14,
                  color: "#FAFAFA",
                  fontFamily: "switzer",
                  fontWeight: 500,
                }}
              >
                Olahraga
              </ThemedText>
            </TouchableOpacity>
          </ScrollView>
          {articles.map((article) => (
            <TouchableOpacity
              key={article.id}
              style={{
                height: 108,
                borderRadius: 12,
                alignItems: "flex-start",
                marginTop: 20,
                marginLeft: 25,
                marginRight: 25,
                flexDirection: "row",
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              <View
                style={{
                  width: 146,
                  height: 108,
                  borderRadius: 12,
                  alignItems: "center",
                }}
              >
                <Image
                  source={article.image}
                  style={{
                    width: 146,
                    height: 115,
                    borderRadius: 12,
                    position: "absolute",
                  }}
                />
              </View>
              <View
                style={{
                  width: 200,
                  height: 108,
                  borderRadius: 12,
                  alignItems: "flex-start",
                  backgroundColor: "#F8F7F4",
                }}
              >
                <ThemedText
                  style={{
                    fontSize: 12,
                    color: "#AFB1B6",
                    fontFamily: "switzer",
                    fontWeight: 500,
                  }}
                >
                  {article.category}
                </ThemedText>
                <ThemedText
                  style={{
                    fontSize: 16,
                    color: "#000000",
                    fontFamily: "plusJakartaSans",
                    fontWeight: 700,
                  }}
                >
                  {article.title}
                </ThemedText>
                <ThemedText
                  style={{
                    fontSize: 12,
                    color: "#AFB1B6",
                    fontFamily: "switzer",
                    fontWeight: 500,
                  }}
                >
                  oleh {article.author} - {article.date}
                </ThemedText>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PanduanPage;
