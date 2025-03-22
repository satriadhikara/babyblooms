import { ThemedText } from "@/components/ui/ThemedText";
import { X, Mars, Venus, CircleHelp } from "lucide-react-native";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { authClient } from "@/utils/auth-client";

// Update the SuccessDialog component props
interface SuccessDialogProps {
  visible: boolean;
  onClose: () => void;
  data?: { week?: number; day?: number };
}

// Custom Success Dialog Component
const SuccessDialog: React.FC<SuccessDialogProps> = ({
  visible,
  onClose,
  data = {},
}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "90%",
            maxWidth: 400,
            backgroundColor: "white",
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              padding: 24,
              position: "relative",
            }}
          >
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 16,
                top: 16,
                zIndex: 1,
              }}
              onPress={onClose}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <X color="#333" size={24} />
            </TouchableOpacity>

            <ThemedText
              type="headlineMedium"
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: "#000",
                textAlign: "center",
                marginTop: 16,
                marginBottom: 16,
              }}
            >
              Yey, selamat Bunda!
            </ThemedText>

            <Text
              style={{
                fontSize: 16,
                color: "#333",
                textAlign: "center",
                marginBottom: 32,
                lineHeight: 24,
                fontFamily: "Switzer-Regular",
              }}
            >
              Kehamilanmu kini sudah di minggu ke-{data?.week || 0}, hari ke-
              {data?.day || 0}. Mari jalani perjalanan luar biasa ini
              bersama-sama!
            </Text>

            <TouchableOpacity
              style={{
                backgroundColor: "#D33995",
                paddingVertical: 16,
                borderRadius: 48,
                alignItems: "center",
                marginTop: 8,
              }}
              onPress={onClose}
            >
              <ThemedText
                type="titleMedium"
                style={{
                  color: "#FFFFFF",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                Lanjutkan
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Define types for gender options
interface GenderOption {
  label: string;
  value: string;
  symbol: React.ComponentType<any>;
  color: string;
}

const nameScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [babyName, setBabyName] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [expectedBirthDate, setExpectedBirthDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false);
  const [pregnancyData, setPregnancyData] = useState<{
    week?: number;
    day?: number;
    connectionCode?: string;
  }>({});

  // Extract the date string to avoid dependency issues
  const birthDateParam = params.expectedBirthDate as string | undefined;

  useEffect(() => {
    if (birthDateParam && typeof birthDateParam === "string") {
      try {
        const parsedDate = new Date(birthDateParam);
        // Verify it's a valid date before setting state
        if (!isNaN(parsedDate.getTime())) {
          setExpectedBirthDate(parsedDate);
        }
      } catch (e) {
        console.error("Error parsing date:", e);
      }
    }
  }, [birthDateParam]);

  const genderOptions: GenderOption[] = [
    { label: "Perempuan", value: "female", symbol: Venus, color: "#DA5AA7" },
    { label: "Laki-laki", value: "male", symbol: Mars, color: "#4697C1" },
    {
      label: "Belum diketahui",
      value: "unknown",
      symbol: CircleHelp,
      color: "#93AF33",
    },
  ];

  const handleGenderSelect = (value: string) => {
    setSelectedGender(value);
  };

  const handleSave = async () => {
    // Validate inputs
    if (!babyName.trim()) {
      Alert.alert("Data tidak lengkap", "Silakan masukkan nama bayi Anda");
      return;
    }

    if (!selectedGender) {
      Alert.alert("Data tidak lengkap", "Silakan pilih jenis kelamin bayi");
      return;
    }

    if (!expectedBirthDate) {
      Alert.alert("Data tidak lengkap", "Tanggal perkiraan lahir tidak valid");
      return;
    }

    try {
      setIsLoading(true);

      // Format request data correctly according to API expectations
      const requestBody = {
        babyName: babyName.trim(),
        hpl: expectedBirthDate.toISOString(),
        gender: selectedGender,
      };

      console.log("Sending data:", requestBody);

      const cookies = authClient.getCookie();
      const headers = {
        Cookie: cookies,
      };

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/user/momUserData`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...headers,
          },
          body: JSON.stringify(requestBody),
        }
      );

      // Check if the response has content before trying to parse it
      const responseText = await response.text();
      console.log("Raw API response:", responseText);

      let data;
      if (responseText) {
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error("Failed to parse response as JSON:", parseError);
          throw new Error("Respons server tidak valid");
        }
      }

      if (!response.ok) {
        let errorMessage = "Gagal menyimpan data bayi";

        // Better error handling for Zod validation errors
        if (data?.error?.issues) {
          const issues = data.error.issues
            .map((issue: any) => `${issue.path}: ${issue.message}`)
            .join(", ");
          errorMessage = `Validasi gagal: ${issues}`;
          console.error("Validation errors:", data.error.issues);
        }

        throw new Error(data?.error?.message || errorMessage);
      }

      // Update pregnancyData with the response data
      setPregnancyData({
        week: data?.week,
        day: data?.day,
        connectionCode: data?.connectionCode, // Save the connection code
      });

      // Show the custom success dialog
      setShowSuccessDialog(true);
    } catch (error) {
      console.error("Error saving baby data:", error);
      Alert.alert(
        "Gagal menyimpan data",
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat menyimpan data bayi. Silakan coba lagi."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
    // Navigate to momConnect page with the connection code
    if (pregnancyData.connectionCode) {
      router.push({
        pathname: "/momConnect",
        params: { connectionCode: pregnancyData.connectionCode },
      });
    } else {
      router.push("/");
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
          Tentang bayi Anda
        </ThemedText>

        <Text
          style={{
            fontSize: 14,
            fontFamily: "Switzer-Medium",
            marginBottom: 8,
          }}
        >
          Nama bayi Anda
        </Text>

        <TextInput
          value={babyName}
          onChangeText={setBabyName}
          placeholder="Masukkan nama bayi Anda"
          placeholderTextColor="#999"
          style={{
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "#CCCCCC",
            borderRadius: 8,
            paddingHorizontal: 16,
            paddingVertical: 12,
            fontSize: 16,
            fontFamily: "Switzer-Regular",
            color: "#373737",
            marginBottom: 24,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 24,
          }}
        >
          {genderOptions.map((option) => {
            const isSelected = selectedGender === option.value;
            return (
              <TouchableOpacity
                key={option.value}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: isSelected
                    ? option.color
                    : "rgba(246, 246, 246, 0.5)",
                  padding: 10,
                  borderRadius: 10,
                  justifyContent: "center",
                  borderWidth: 1,
                  borderColor: isSelected ? option.color : "transparent",
                }}
                onPress={() => handleGenderSelect(option.value)}
              >
                <option.symbol
                  color={isSelected ? "#F8F7F4" : "#0C0C0C"}
                  size={16}
                />
                <ThemedText
                  type="bodySmall"
                  style={{
                    color: isSelected ? "#F8F7F4" : "#0C0C0C",
                    marginLeft: 8,
                  }}
                  numberOfLines={1}
                >
                  {option.label}
                </ThemedText>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          onPress={handleSave}
          disabled={isLoading}
          style={{
            backgroundColor: "#D33995",
            paddingVertical: 16,
            borderRadius: 48,
            alignItems: "center",
            marginTop: 32,
            opacity: isLoading ? 0.7 : 1,
          }}
        >
          {isLoading ? (
            <ActivityIndicator color="#F8F7F4" />
          ) : (
            <ThemedText
              type="titleMedium"
              style={{
                color: "#F8F7F4",
              }}
            >
              Simpan
            </ThemedText>
          )}
        </TouchableOpacity>
      </View>

      {/* Custom Success Dialog */}
      <SuccessDialog
        visible={showSuccessDialog}
        onClose={handleCloseSuccessDialog}
        data={pregnancyData}
      />
    </SafeAreaView>
  );
};

export default nameScreen;
