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
import { authClient } from "@/utils/auth-client";
import { router } from "expo-router";

const Onboard = () => {
  const signInGoogle = async () => {
    console.log("signInGoogle");
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    router.replace("/");
  };

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
            <Text style={{ marginBottom: 24 }}>
              Kehamilan penuh kejutan, dan kami siap menjadi teman setiamu!
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                padding: 12,
                borderRadius: 32,
                marginBottom: 20,
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
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default Onboard;
