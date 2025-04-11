import { ThemedText } from "@/components/ui/ThemedText";
import { View, Image, Dimensions, SafeAreaView } from "react-native";

const { width, height } = Dimensions.get("window");

const KomunitasBlur = () => {
  return (
    <>
      <View style={{ flex: 1 }}>
        <Image
          source={require("@/assets/images/komunitasBlur.png")}
          style={{
            width: width,
            height: height,
            position: "absolute",
            top: 0,
            left: 0,
          }}
          resizeMode="cover"
        />
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingVertical: 15,
            }}
          >
            <ThemedText type="headlineSmall">Komunitas</ThemedText>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};

export default KomunitasBlur;
