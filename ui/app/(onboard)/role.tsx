import type React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { ThemedText } from "@/components/ui/ThemedText";
import { useRouter } from "expo-router";

const RoleSelectionScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F6F6F6",
      }}
    >
      <View
        style={{
          alignItems: "center",
          paddingHorizontal: 20,
          paddingTop: 40,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 4,
            textAlign: "center",
            fontFamily: "PlusJakartaSans_700Bold",
          }}
        >
          Saya adalah...
        </Text>
        <ThemedText type="bodyLarge">
          Pilih peranmu dalam perjalanan ini
        </ThemedText>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
        }}
      >
        <TouchableOpacity
          style={{ marginBottom: 8 }}
          onPress={() => router.push("/(onboard)/isPregnant")}
        >
          <ImageBackground
            source={require("@/assets/images/mother.png")}
            resizeMode="cover"
            style={{ height: 300, width: 300 }}
          >
            <View
              style={{
                height: "100%",
                width: "100%",
                flex: 1,
                justifyContent: "flex-end",
                paddingHorizontal: 32,
                paddingVertical: 24,
              }}
            >
              <ThemedText
                type="titleLarge"
                style={{
                  color: "#F8F7F4",
                }}
              >
                Ibu
              </ThemedText>
              <ThemedText
                type="bodyMedium"
                style={{
                  color: "#F8F7F4",
                }}
              >
                Siapkan diri menyambut si kecil dengan tenang dan bahagia.
              </ThemedText>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(onboard)/guardianForm")}
        >
          <ImageBackground
            source={require("@/assets/images/father.png")}
            resizeMode="cover"
            style={{ height: 300, width: 300 }}
          >
            <View
              style={{
                height: "100%",
                width: "100%",
                flex: 1,
                justifyContent: "flex-end",
                paddingHorizontal: 32,
                paddingVertical: 24,
              }}
            >
              <ThemedText
                type="titleLarge"
                style={{
                  color: "#F8F7F4",
                }}
              >
                Ayah/Pendamping
              </ThemedText>
              <ThemedText
                type="bodyMedium"
                style={{
                  color: "#F8F7F4",
                }}
              >
                Jadi{" "}
                <ThemedText
                  type="bodyMedium"
                  style={{
                    fontStyle: "italic",
                  }}
                >
                  support system
                </ThemedText>{" "}
                terbaik untuk ibu dan bayi!
              </ThemedText>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RoleSelectionScreen;
