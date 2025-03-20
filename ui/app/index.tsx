import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { ThemedText } from "@/components/ui/ThemedText";
import GoogleIcon from "@/assets/vectors/google";
import MetaIcon from "@/assets/vectors/meta";
import { useRouter } from "expo-router";
import { authClient } from "@/utils/auth-client";

export default function App() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [isCheckingRole, setIsCheckingRole] = useState(false);

  useEffect(() => {
    const checkUserRole = async () => {
      if (!isPending && session) {
        setIsCheckingRole(true);
        const cookies = authClient.getCookie();
        const headers = {
          Cookie: cookies,
        };
        try {
          const response = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/api/user/role`,
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

  const signInGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  if (isPending || isCheckingRole) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require("@/assets/images/landing-page-bg.png")}
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
          position: "absolute",
          top: 0,
          left: 0,
        }}
        resizeMode="cover"
      />
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <SafeAreaView style={{ flex: 0 }}>
          <View style={styles.container}>
            <ThemedText
              type="displaySmall"
              style={{
                color: "#992269",
                marginBottom: 16,
              }}
            >
              Siap Memulai Perjalananmu?
            </ThemedText>
            <Text style={{ marginBottom: 48 }}>
              Kehamilan penuh kejutan, dan kami siap menjadi teman setiamu!
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                padding: 12,
                borderRadius: 32,
                marginBottom: 10,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                gap: 10,
              }}
              onPress={signInGoogle}
            >
              <GoogleIcon />
              <Text
                style={{
                  color: "#BA2980",
                  fontFamily: "Switzer-Medium",
                  fontWeight: "medium",
                }}
              >
                Masuk dengan Google
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#4A4F87",
                padding: 12,
                borderRadius: 32,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                gap: 10,
              }}
              onPress={() => {
                router.push("/(auth)/(tabs)/jurnal");
              }}
            >
              <MetaIcon />
              <Text
                style={{
                  color: "white",
                  fontFamily: "Switzer-Medium",
                  fontWeight: "medium",
                }}
              >
                Masuk dengan Meta
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
