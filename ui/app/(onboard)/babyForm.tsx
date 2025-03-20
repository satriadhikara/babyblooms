import { ThemedText } from "@/components/ui/ThemedText";
import { X } from "lucide-react-native";
import { SafeAreaView, View } from "react-native";
import { useRouter } from "expo-router";

const babyForm = () => {
  const router = useRouter();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F0BDDC",
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
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
            marginBottom: 50,
          }}
        >
          <X
            color="#D33995"
            size={24}
            style={{
              marginLeft: 9,
            }}
            onPress={() => router.back()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          />
        </View>
        <ThemedText
          type="headlineSmall"
          style={{
            textAlign: "center",
            color: "#D33995",
            marginBottom: 32,
          }}
        >
          Sudah mengetahui Hari Perkiraan Lahir bayi Anda?
        </ThemedText>
      </View>
    </SafeAreaView>
  );
};

export default babyForm;
