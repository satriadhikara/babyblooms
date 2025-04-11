import React from "react";
import {
  View,
  Pressable,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { ThemedText } from "@/components/ui/ThemedText";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

interface FeatureItemProps {
  title: string;
  description: string;
  imageSource: ImageSourcePropType;
  backgroundColor: string;
  imageBackgroundColor: string;
  onPress: () => void;
}

const BloomsAI = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      {/* Header */}
      <View
        style={{
          height: 56,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          backgroundColor: "#fff",
        }}
      >
        <Pressable onPress={handleBack}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <ThemedText type="titleMedium">BloomsAI</ThemedText>
        {/* Empty view for spacing */}
        <View style={{ width: 24 }} />
      </View>

      <View style={{ flex: 1, backgroundColor: "#F8F7F4" }}>
        {/* Description */}
        <ThemedText
          type="bodyMedium"
          style={{
            marginTop: 24,
            marginLeft: 20,
            marginRight: 20,
            lineHeight: 20,
            color: "#777777",
            textAlign: "justify",
            fontFamily: "Switzer-Regular",
          }}
        >
          BloomsAI merupakan asisten cerdas yang siap membantumu memahami setiap
          tahap perkembangan bayi, memberikan rekomendasi kesehatan, serta
          menjawab pertanyaan seputar kehamilan kapan saja.
        </ThemedText>

        {/* Features Layout */}
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            marginTop: 24,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              width: "48%",
            }}
          >
            <FeatureItem
              title="BloomCare"
              description="Konsultasikan kondisimu dengan AI"
              imageSource={require("../../assets/images/dokterAI.png")}
              backgroundColor="#B8D1624D"
              imageBackgroundColor="#B8D162"
              onPress={() => router.push("/(auth)/bloomCare")}
            />
            <FeatureItem
              title="LittleZodiac"
              description="Cari tahu ramalan horoskop bayimu!"
              imageSource={require("../../assets/images/CrystalBall.png")}
              backgroundColor="#5D63A64D"
              imageBackgroundColor="#5D63A6"
              onPress={() => router.push("/(auth)/littleZodiac")}
            />
          </View>
          <View
            style={{
              width: "48%",
            }}
          >
            <FeatureItem
              title="NameNest"
              description="Tentukan nama bayimu sekarang"
              imageSource={require("../../assets/images/bayiAI.png")}
              backgroundColor="#81B8D533"
              imageBackgroundColor="#81B8D5"
              onPress={() => router.push("/(auth)/nameNest")}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const FeatureItem: React.FC<FeatureItemProps> = ({
  title,
  description,
  imageSource,
  backgroundColor,
  imageBackgroundColor,
  onPress,
}) => (
  <TouchableOpacity
    style={{
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 20,
      paddingHorizontal: 12,
      borderRadius: 12,
      marginBottom: 16,
      backgroundColor: backgroundColor,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 74,
        height: 74,
        borderRadius: 100,
        marginBottom: 12,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: imageBackgroundColor,
      }}
    >
      <Image source={imageSource} style={{ width: 60, height: 60 }} />
    </View>
    <ThemedText
      type="titleMedium"
      style={{
        marginBottom: 4,
      }}
    >
      {title}
    </ThemedText>
    <ThemedText
      style={{
        fontSize: 14,
        fontFamily: "Switzer-Regular",
        fontWeight: "400",
        textAlign: "center",
        lineHeight: 20,
        color: "#61646B",
      }}
    >
      {description}
    </ThemedText>
  </TouchableOpacity>
);

export default BloomsAI;
