import { ThemedText } from "@/components/ui/ThemedText";
import { X } from "lucide-react-native";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import DatePickerButton from "@/components/ui/DatePickerButton";

const babyForm = () => {
  const router = useRouter();
  const today = new Date();
  const [date, setDate] = useState(today);

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
          flex: 1,
        }}
      >
        <View
          style={{
            marginTop: 24,
            flexDirection: "row",
            justifyContent: "flex-end",
            marginBottom: 50,
          }}
        >
          <X
            color="#D33995"
            size={24}
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

        <Text
          style={{
            fontSize: 14,
            fontFamily: "Switzer-Medium",
            marginBottom: 5,
          }}
        >
          Masukkan Hari Perkiraan Lahir dari dokter
        </Text>

        <DatePickerButton
          date={date}
          onDateChange={setDate}
          minimumDate={today}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 48,
          }}
        >
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: "#F8F7F4", // White line color
            }}
          />
          <ThemedText
            type="overline"
            style={{
              marginHorizontal: 14,
              color: "#F8F7F4",
            }}
          >
            ATAU
          </ThemedText>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: "#F8F7F4", // White line color
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/(onboard)/name",
              params: {
                expectedBirthDate: date.toISOString(),
              },
            })
          }
          style={{
            backgroundColor: "#D33995",
            paddingVertical: 16,
            borderRadius: 48,
            alignItems: "center",
            marginTop: 32,
          }}
        >
          <ThemedText
            type="titleMedium"
            style={{
              color: "#EFEFF0",
            }}
          >
            Selanjutnya
          </ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default babyForm;
