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
import { LinearGradient } from "expo-linear-gradient";
import { ThemedText } from "@/components/ui/ThemedText";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require("@/assets/images/image.png")}
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
        <SafeAreaView
          style={{
            height: "50%",
            paddingHorizontal: 24,
          }}
        >
          <ThemedText
            type="displaySmall"
            style={{
              color: "#992269",
              marginTop: 77,
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
              backgroundColor: "#4285F4",
              padding: 12,
              borderRadius: 8,
              marginBottom: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white" }}>Masuk dengan Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#3b5998",
              padding: 12,
              borderRadius: 8,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white" }}>Masuk dengan Facebook</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </View>
  );
}
