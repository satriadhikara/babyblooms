import {
  Camera,
  CameraType,
  CameraView,
  useCameraPermissions,
  FlashMode,
} from "expo-camera";
import { useRef, useState, useEffect } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ui/ThemedText";
import * as FileSystem from "expo-file-system";
import { set } from "better-auth/*";
import { CircleAlert } from "lucide-react-native";
import { CircleCheck } from "lucide-react-native";
import { CircleMinus } from "lucide-react-native";
import { CircleX } from "lucide-react-native";
import { CircleHelp } from "lucide-react-native";

export default function Kamera() {
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const [uri, setUri] = useState<string | null>(null);
  const [flashMode, setFlashMode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [foodName, setFoodName] = useState<string | null>(null);
  const [safeForPregnancy, setSafeForPregnancy] = useState<string | null>(null);

  const router = useRouter();

  const apiKey = "AIzaSyBJkpM9ECF2-F2rc_xY9GsqB9657TnCtaM";

  useEffect(() => {
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not set.");
    }
  }, []);

  if (!permission) return null;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>
          Kami memerlukan izin untuk mengakses kamera.
        </Text>
        <Button onPress={requestPermission} title="Izinkan Kamera" />
      </View>
    );
  }

  const takePicture = async () => {
    setIsLoading(true);
    try {
      const photo = await ref.current?.takePictureAsync();
      if (photo?.uri) {
        setUri(photo.uri);
        await analyzeImage(photo.uri);
      }
    } catch (error) {
      console.error("Error taking picture:", error);
      setFoodName("Maaf, terjadi kesalahan saat mengambil gambar.");
      setSafeForPregnancy("Maaf, terjadi kesalahan saat mengambil gambar.");
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeImage = async (imageUri: string) => {
    setIsLoading(true);
    setFoodName(null);
    setSafeForPregnancy(null);

    try {
      const base64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: "base64",
      });

      const prompt = `Analisis gambar makanan ini dan beri tahu saya:
        1. Apa nama makanan ini?
        2. Apakah aman dikonsumsi oleh wanita hamil? (Aman/Tidak/Hati-Hati/Porsi Kecil)
        Berikan jawaban dalam format JSON: {foodName: string, safeForPregnancy: string}
        nama makanannya tidak perlu menyertakan merk atau brand, hanya nama makanan saja.
        Jangan gunakan simbol ** untuk membuat teks tebal.
        batasi gambar hanya makanan, jika gambar bukan makanan, berikan respons "Gambar bukan makanan".`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: prompt },
                  { inline_data: { mime_type: "image/jpeg", data: base64 } },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      if (data.candidates && data.candidates.length > 0) {
        let responseText = data.candidates[0].content.parts[0].text;
        console.log("Gemini API Response:", responseText);

        // Attempt to extract JSON - simple approach, might need refinement
        const jsonStartIndex = responseText.indexOf("{");
        const jsonEndIndex = responseText.lastIndexOf("}");

        if (
          jsonStartIndex !== -1 &&
          jsonEndIndex !== -1 &&
          jsonStartIndex < jsonEndIndex
        ) {
          responseText = responseText.substring(
            jsonStartIndex,
            jsonEndIndex + 1
          );
        }

        try {
          const parsedResult = JSON.parse(responseText);
          if (parsedResult === "Gambar bukan makanan") {
            setFoodName("Gambar bukan makanan.");
            setSafeForPregnancy("Gambar bukan makanan.");
            return;
          }
          setFoodName(parsedResult.foodName);
          setSafeForPregnancy(parsedResult.safeForPregnancy);
        } catch (parseError) {
          console.error("Error parsing JSON response:", parseError);
          const errorMessage = (parseError as Error).message;
          setFoodName(
            `Maaf, tidak dapat mengurai respons dari AI. Kesalahan: ${errorMessage}`
          );
          setSafeForPregnancy(
            `Maaf, tidak dapat mengurai respons dari AI. Kesalahan: ${errorMessage}`
          );
        }
      } else {
        setFoodName("Maaf, tidak ada respons yang valid dari AI.");
        setSafeForPregnancy("Maaf, tidak ada respons yang valid dari AI.");
      }
    } catch (error) {
      console.error("Error analyzing image:", error);
      setFoodName("Maaf, terjadi kesalahan saat menganalisis gambar.");
      setSafeForPregnancy("Maaf, terjadi kesalahan saat menganalisis gambar.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderPicture = () => (
    <ScrollView contentContainerStyle={styles.resultContainer}>
      {/* Header */}
      <View
        style={{
          height: 72,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          marginBottom: 20,
        }}
      >
        <Pressable onPress={() => setUri(null)}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <ThemedText type="titleMedium">Hasil Pencarian</ThemedText>
        <Pressable>
          <Feather name="help-circle" size={24} color="black" />
        </Pressable>
      </View>

      {/* Foto Hasil */}
      <Image source={{ uri: uri ?? undefined }} style={styles.resultImage} />

      {isLoading && <ActivityIndicator size="large" color="#007AFF" />}

      {/* Informasi Makanan */}
      {foodName && safeForPregnancy ? (
        <View style={styles.resultInfo}>
          <Image
            source={{ uri: uri ?? undefined }}
            style={styles.resultThumb}
          />
          <ThemedText type="titleMedium" style={styles.resultText}>
            {foodName}
          </ThemedText>
          {safeForPregnancy === "Aman" ? (
            <CircleCheck
              size={24}
              color="white"
              fill="green"
              style={{ marginLeft: 10 }}
            />
          ) : safeForPregnancy === "Tidak" ? (
            <CircleX
              size={24}
              color="white"
              fill="red"
              style={{ marginLeft: 10 }}
            />
          ) : safeForPregnancy === "Porsi Kecil" ? (
            <CircleMinus
              size={24}
              color="white"
              fill="orange"
              style={{ marginLeft: 10 }}
            />
          ) : safeForPregnancy == "Hati-Hati" ? (
            <CircleAlert
              size={24}
              color="white"
              fill="yellow"
              style={{ marginLeft: 10 }}
            />
          ) : (
            <CircleHelp
              size={24}
              color="white"
              fill="gray"
              style={{ marginLeft: 10 }}
            />
          )}
        </View>
      ) : (
        <Text>Menganalisis gambar...</Text>
      )}

      {/* Opsi Tambahan */}
      <Text style={styles.alternativeText}>
        Tidak menemukan nama makanan yang sesuai?
      </Text>
      <Pressable onPress={() => router.push("/(auth)/chatMakanan")}>
        <Text style={styles.askAI}>Tanyakan manual ke BloomsAI</Text>
      </Pressable>
    </ScrollView>
  );

  const renderCamera = () => (
    <View style={styles.cameraContainer}>
      <CameraView
        style={styles.camera}
        ref={ref}
        mode={"picture"}
        facing={"back"}
      >
        {/* Black padding untuk framing foto */}
        <View style={styles.blackTop} />
        <View style={styles.blackBottom} />

        {/* Header */}
        <View style={styles.header}>
          <Pressable
            style={{
              backgroundColor: "#E5E5E526",
              borderRadius: 112,
              padding: 10,
            }}
            onPress={() => router.back()}
          >
            <AntDesign name="close" size={24} color="white" />
          </Pressable>
          <Pressable
            style={{
              backgroundColor: "#E5E5E526",
              borderRadius: 112,
              padding: 10,
            }}
            onPress={() => setFlashMode(flashMode === "on" ? "off" : "on")}
          >
            <Feather name="zap" size={24} color="white" />
          </Pressable>
        </View>

        {/* Shutter Button */}
        <View style={styles.shutterContainer}>
          <Pressable onPress={takePicture} style={styles.shutterBtn} />
        </View>
      </CameraView>
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}
      {uri ? renderPicture() : renderCamera()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  cameraContainer: { flex: 1, position: "relative" },
  camera: { flex: 1 },

  blackTop: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 128,
    backgroundColor: "#000",
  },
  blackBottom: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 229,
    backgroundColor: "#000",
  },

  header: {
    position: "absolute",
    top: 60,
    left: 26,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  shutterContainer: {
    position: "absolute",
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  shutterBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "white",
    borderWidth: 4,
    borderColor: "#ccc",
  },

  resultContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
    backgroundColor: "#fff",
  },
  resultImage: {
    width: "90%",
    height: "50%",
    borderRadius: 15,
    resizeMode: "cover",
  },
  resultInfo: {
    width: "90%",
    marginTop: 20,
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    elevation: 5,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  resultThumb: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  resultText: { fontSize: 16 },

  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: "#007AFF",
    borderRadius: 25,
    elevation: 3,
    shadowColor: "#000",
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },

  permissionText: { textAlign: "center", color: "#fff", marginBottom: 10 },

  alternativeText: { marginTop: 15, fontSize: 14, color: "#555" },
  askAI: {
    color: "#007AFF",
    fontSize: 16,
    marginTop: 5,
    textDecorationLine: "underline",
  },

  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
});
