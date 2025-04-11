import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from "react-native";
import { ThemedText } from "@/components/ui/ThemedText";
import { useRouter } from "expo-router";
import { authClient } from "@/utils/auth-client";
import LoadingComponent from "@/components/ui/Loading";
import PagerView from "react-native-pager-view";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming
} from 'react-native-reanimated';

const { width, height } = Dimensions.get("window");

interface PageData {
  title: string;
  description: string;
  imageSource: any;
  type: number;
}

const PageIndicator = ({ isActive }: { isActive: boolean }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    width: withSpring(isActive ? 20 : 8, {
      damping: 20,
      stiffness: 200,
    }),
    backgroundColor: withTiming(
      isActive ? '#000' : '#FFF',
      { duration: 300 }
    ),
  }));

  return (
    <Animated.View
      style={[
        {
          height: 8,
          borderRadius: 4,
          marginHorizontal: 6,
        },
        animatedStyle,
      ]}
    />
  );
};

export default function App() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [isCheckingRole, setIsCheckingRole] = useState(false);
  const pagerRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const checkUserRole = async () => {
      console.log("Checking user role...");
      if (!isPending && session) {
        setIsCheckingRole(true);
        const cookies = authClient.getCookie();
        const headers = {
          Cookie: cookies,
        };
        try {
          const response = await fetch(
            "http://babyblooms-api-mhtx1y-ea3f25-91-108-110-101.traefik.me/api/user/role",
            {
              method: "GET",
              headers: headers,
            }
          );

          if (response.status === 200) {
            // Role is set - redirect to main app
            const data = await response.json();
            console.log("User role:", data.role);
            router.replace("/(auth)/(tabs)/jurnal");
          } else if (response.status === 422) {
            // Role not assigned - redirect to role selection
            console.log("User role not assigned");
            router.replace("/(onboard)/role");
          } else {
            // Handle other errors
            console.error("Error fetching role:", await response.text());
            console.log(session);
            // Stay on landing page
          }
        } catch (error) {
          console.error("Failed to check user role:", error);
        } finally {
          setIsCheckingRole(false);
        }
      }
    };

    checkUserRole();
  }, [session, isPending, router]);

  if (isPending || isCheckingRole) {
    return <LoadingComponent />;
  }

  const pages: PageData[] = [
    {
      title: "Temani Perjalanan Kehamilanmu",
      description:
        "Dari trimester pertama hingga persiapan persalinan, BabyBlooms hadir menjadi pendamping setiamu.",
      imageSource: require("@/assets/images/intro-screen.png"),
      type: 1,
    },
    {
      title: "Selalu Terhubung dengan Si Kecil",
      description: "Deskripsi untuk halaman kedua.",
      imageSource: require("@/assets/images/intro-screen-2.png"),
      type: 2,
    },
    {
      title: "Bergabunglah dengan Komunitas Kami",
      description: "Deskripsi untuk halaman ketiga.",
      imageSource: require("@/assets/images/intro-screen-3.png"),
      type: 2,
    },
  ];

  const renderPageIndicators = () => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 64,
        position: "absolute",
        bottom: 64,
        left: 0,
        right: 0,
      }}
    >
      {pages.map((_, index) => (
        <PageIndicator 
          key={index} 
          isActive={index === currentPage} 
        />
      ))}
    </View>
  );

  return (
    <View style={{ flex: 1, height: "100%" }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <PagerView
        style={{ flex: 1 }}
        initialPage={0}
        ref={pagerRef}
        scrollEnabled={true}
        onPageSelected={(e) => {
          setCurrentPage(e.nativeEvent.position);
        }}
      >
        <View id={"0"} style={{ flex: 1, width: width }}>
          <Image
            source={require("@/assets/images/intro-screen.png")}
            style={{
              width: width,
              height: height,
              position: "absolute",
              top: 0,
              left: 0,
            }}
            resizeMode="cover"
          />
          <SafeAreaView
            style={{
              flex: 1,
              justifyContent: "space-between",
              marginVertical: 24,
            }}
          >
            <View
              style={{
                paddingHorizontal: 24,
                paddingBottom: 24,
                paddingTop: 20,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            >
              <ThemedText
                type="displaySmall"
                style={{
                  color: "#D33995",
                  marginBottom: 16,
                  marginTop: 20,
                }}
              >
                Temani Perjalanan Kehamilanmu
              </ThemedText>
              <ThemedText
                type="bodyLarge"
                style={{ marginBottom: 24, color: "#373737" }}
              >
                Dari trimester pertama hingga persiapan persalinan, BabyBlooms
                hadir menjadi pendamping setiamu.
              </ThemedText>
            </View>
          </SafeAreaView>
        </View>

        <View id={"1"} style={{ flex: 1, width: width }}>
          <Image
            source={require("@/assets/images/intro-screen-2.png")}
            style={{
              width: width,
              height: height,
              position: "absolute",
              top: 0,
              left: 0,
            }}
            resizeMode="cover"
          />
          <SafeAreaView
            style={{
              flex: 1,
              justifyContent: "space-between",
              marginVertical: 24,
            }}
          >
            <View
              style={{
                paddingHorizontal: 24,
                paddingBottom: 24,
                paddingTop: 20,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            >
              <ThemedText
                type="displaySmall"
                style={{
                  color: "#fff",
                  marginBottom: 16,
                  marginTop: 80,
                }}
              >
                Selalu Terhubung dengan Si Kecil
              </ThemedText>
            </View>
          </SafeAreaView>
        </View>

        <View id={"2"} style={{ flex: 1, width: width }}>
          <Image
            source={require("@/assets/images/intro-screen-3.png")}
            style={{
              width: width,
              height: height,
              position: "absolute",
              top: 0,
              left: 0,
            }}
            resizeMode="cover"
          />
          <SafeAreaView
            style={{
              flex: 1,
              justifyContent: "space-between",
              marginVertical: 24,
            }}
          >
            <View
              style={{
                paddingHorizontal: 24,
                paddingBottom: 24,
                paddingTop: 20,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            >
              <ThemedText
                type="displaySmall"
                style={{
                  color: "#fff",
                  marginBottom: 16,
                  marginTop: 24,
                  width: "80%",
                }}
              >
                Punya pertanyaan seputar kehamilan?
              </ThemedText>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <ThemedText
                type="bodyLarge"
                style={{
                  color: "#fff",
                  marginBottom: 128,
                  textAlign: "center",
                  width: "80%",
                }}
              >
                Bergabunglah dengan komunitas kami dan temukan jawaban dari para
                ahli!
              </ThemedText>
            </View>
          </SafeAreaView>
        </View>
      </PagerView>
      {renderPageIndicators()}

      <TouchableOpacity
        style={{
          backgroundColor: "black",
          padding: 16,
          flexDirection: "row",
          justifyContent: "center",
          marginHorizontal: 24,
          borderRadius: 37,
          marginBottom: 20,
          position: "absolute",
          bottom: 16,
          left: 0,
          right: 0,
        }}
        onPress={() => {
          router.push("/jurnalBlur");
        }}
      >
        <Text
          style={{
            color: "#F8F7F4",
            fontFamily: "Switzer-Medium",
            fontSize: 16,
          }}
        >
          Mulai Sekarang!
        </Text>
      </TouchableOpacity>
    </View>
  );
}
