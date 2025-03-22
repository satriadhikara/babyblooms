import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ThemedText } from "@/components/ui/ThemedText";
import { ChevronLeft, Share } from "lucide-react-native";

const MomConnect = () => {
  const { connectionCode } = useLocalSearchParams();
  const router = useRouter();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F8DEED",
      }}
    >
      <View style={{ padding: 24 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            position: "relative",
            marginTop: 24,
          }}
        >
          <TouchableOpacity
            onPress={() => router.replace("/(auth)/(tabs)/jurnal")}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={{
              position: "absolute",
              left: 9,
              zIndex: 1,
            }}
          >
            <ChevronLeft color="#DA5AA7" size={24} />
          </TouchableOpacity>

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              flex: 1,
            }}
          >
            <View
              style={{
                height: 6,
                width: 6,
                backgroundColor: "#DA5AA7",
                borderRadius: 46,
                marginRight: 6,
              }}
            />
            <View
              style={{
                height: 6,
                width: 14,
                backgroundColor: "#DA5AA7",
                borderRadius: 46,
              }}
            />
          </View>
        </View>

        <View
          style={{
            height: "100%",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#F8F7F4",
              width: "100%",
              paddingVertical: 72,
              borderRadius: 24,
            }}
          >
            <ThemedText
              type="headlineSmall"
              style={{
                textAlign: "center",
                color: "#0C0C0C",
                marginBottom: 8,
                marginHorizontal: 24,
              }}
            >
              Sambungkan dengan Pendampingmu!
            </ThemedText>
            <ThemedText
              type="bodyMedium"
              style={{
                color: "#626262",
                textAlign: "center",
                marginHorizontal: 24,
                marginBottom: 24,
              }}
            >
              Dukungan dari orang terdekat sangat berarti. Bagikan kode ini
              sekarang!
            </ThemedText>

            <ThemedText
              type="displaySmall"
              style={{
                color: "#BA2980",
                textAlign: "center",
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
            >
              {connectionCode}
            </ThemedText>

            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 24,
                flexDirection: "row",
                gap: 8,
              }}
              onPress={() => {
                Alert.alert("Coming soon!");
              }}
            >
              <Share color="#4C4C4C" />
              <Text
                style={{
                  fontSize: 20,
                  color: "#4C4C4C",
                }}
              >
                Bagikan kode
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#D33995",
              paddingVertical: 16,
              borderRadius: 48,
              alignItems: "center",
              marginHorizontal: 24,
              marginTop: 32,
            }}
            onPress={() => router.push("/(auth)/(tabs)/jurnal")}
          >
            <ThemedText
              type="titleMedium"
              style={{
                color: "#F8F7F4",
              }}
            >
              Mulai sekarang!
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MomConnect;
