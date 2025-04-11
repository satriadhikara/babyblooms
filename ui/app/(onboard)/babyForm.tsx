import { ThemedText } from "@/components/ui/ThemedText";
import { X } from "lucide-react-native";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import DatePickerButton from "@/components/ui/DatePickerButton";

const babyForm = () => {
  const router = useRouter();
  const today = new Date();
  // Removed unused 'date' state
  const [hplDate, setHplDate] = useState<Date | null>(null);
  const [haidDate, setHaidDate] = useState<Date | null>(null);
  const [pembuahanDate, setPembuahanDate] = useState<Date | null>(null);

  // Determine if the button should be disabled
  const isButtonDisabled = !hplDate && !haidDate && !pembuahanDate;

  // Function to determine which date to pass
  const getSelectedDate = (): Date | null => {
    if (hplDate) {
      // If HPL is set, use it directly as the expected birth date
      return hplDate;
    } else if (haidDate) {
      // If Haid is set, calculate HPL (Naegele's Rule: +1 year, -3 months, +7 days)
      // Note: This is a basic calculation, more robust libraries might be better
      const calculatedHpl = new Date(haidDate);
      calculatedHpl.setDate(calculatedHpl.getDate() + 7);
      calculatedHpl.setMonth(calculatedHpl.getMonth() - 3);
      calculatedHpl.setFullYear(calculatedHpl.getFullYear() + 1);
      return calculatedHpl;
    } else if (pembuahanDate) {
      // If Pembuahan (conception) is set, calculate HPL (add 266 days / 38 weeks)
      const calculatedHpl = new Date(pembuahanDate);
      calculatedHpl.setDate(calculatedHpl.getDate() + 266);
      return calculatedHpl;
    }
    return null; // Should not happen if button is enabled
  };

  const handleNextPress = () => {
    const finalDate = getSelectedDate();
    if (finalDate) {
      router.push({
        pathname: "/(onboard)/name",
        params: {
          // Pass the determined or calculated expected birth date
          expectedBirthDate: finalDate.toISOString(),
        },
      });
    } else {
      // Optional: Handle case where button was somehow pressed while disabled
      console.warn("Next button pressed but no valid date found.");
    }
  };

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
        {/* --- Top Close Button --- */}
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

        {/* --- HPL Section --- */}
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
          date={hplDate}
          onDateChange={(newDate) => {
            setHplDate(newDate);
            // Optional: Clear other dates if HPL is selected
            setHaidDate(null);
            setPembuahanDate(null);
          }}
          minimumDate={today} // HPL should be in the future
        />

        {/* --- OR Separator --- */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 48,
          }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: "#F8F7F4" }} />
          <ThemedText
            type="overline"
            style={{ marginHorizontal: 14, color: "#F8F7F4" }}
          >
            ATAU
          </ThemedText>
          <View style={{ flex: 1, height: 1, backgroundColor: "#F8F7F4" }} />
        </View>

        {/* --- Calculation Section --- */}
        <ThemedText
          type="headlineSmall"
          style={{
            textAlign: "center",
            color: "#D33995",
            marginBottom: 32,
          }}
        >
          Kalkulasikan Hari Perkiraan Lahir
        </ThemedText>
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Switzer-Medium",
            marginBottom: 5,
          }}
        >
          Berdasarkan hari pertama haid terakhir
        </Text>
        <DatePickerButton
          date={haidDate}
          onDateChange={(newDate) => {
            setHaidDate(newDate);
            // Optional: Clear other dates if Haid is selected
            setHplDate(null);
            setPembuahanDate(null);
          }}
          maximumDate={today} // Haid date must be in the past or today
        />
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Switzer-Medium",
            marginBottom: 5,
            marginTop: 10,
          }}
        >
          Berdasarkan tanggal hari pembuahan
        </Text>
        <DatePickerButton
          date={pembuahanDate}
          onDateChange={(newDate) => {
            setPembuahanDate(newDate);
            // Optional: Clear other dates if Pembuahan is selected
            setHplDate(null);
            setHaidDate(null);
          }}
          maximumDate={today} // Conception date must be in the past or today
        />

        {/* --- Next Button --- */}
        <TouchableOpacity
          disabled={isButtonDisabled} // Use the calculated disabled state
          onPress={handleNextPress} // Use the handler function
          style={[
            // Base styles
            {
              backgroundColor: "#D33995",
              paddingVertical: 16,
              borderRadius: 48,
              alignItems: "center",
              marginTop: 40,
            },
            // Conditional style for disabled state
            isButtonDisabled && { opacity: 0.5 },
          ]}
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
