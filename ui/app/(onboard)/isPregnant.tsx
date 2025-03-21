import { ThemedText } from "@/components/ui/ThemedText";
import { Pressable, SafeAreaView, TouchableOpacity, View } from "react-native";
import HandSvg from "@/assets/vectors/hand";
import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

const isPregnant = () => {
  const router = useRouter();
  const handleBackPress = () => {
    router.back();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F6F6F6",
      }}
    >
      <View
        style={{
          paddingHorizontal: 24,
        }}
      >
        <View
          style={{
            marginTop: 24,
          }}
        >
          <ChevronLeft
            color="#DA5AA7"
            size={24}
            style={{
              marginLeft: 9,
            }}
            onPress={handleBackPress}
            // Make it behave like a pressable element
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          />
        </View>
        <View style={{ alignItems: "center", marginTop: 70, marginBottom: 48 }}>
          <HandSvg />
        </View>
        <ThemedText
          type="displaySmall"
          style={{
            marginBottom: 56,
          }}
        >
          Apakah Anda sedang hamil?
        </ThemedText>
        <View
          style={{
            gap: 14,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#D33995",
              paddingVertical: 16,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 48,
            }}
            onPress={() => router.push("/(onboard)/babyForm")}
          >
            <ThemedText
              type="titleMedium"
              style={{
                color: "#F8F7F4",
              }}
            >
              Ya
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderColor: "#D33995",
              borderWidth: 1,
              paddingVertical: 16,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 48,
            }}
            onPress={() => router.push("/(auth)/(tabs)/jurnal")}
          >
            <ThemedText
              type="titleMedium"
              style={{
                color: "#D33995",
              }}
            >
              Tidak
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default isPregnant;
