import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Dimensions,
} from "react-native";
import { ThemedText } from "@/components/ui/ThemedText";
import GoogleIcon from "@/assets/vectors/google";
import MetaIcon from "@/assets/vectors/meta";

export default function App() {
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
