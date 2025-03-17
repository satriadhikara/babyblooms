import {
  CameraMode,
  CameraType,
  CameraView,
  useCameraPermissions,
  FlashMode,
} from "expo-camera";
import { useRef, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ui/ThemedText";

export default function Food() {
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const [uri, setUri] = useState<string | null>(null);
  const [flashMode, setFlashMode] = useState<string | null>(null);

  const router = useRouter();

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
    const photo = await ref.current?.takePictureAsync();
    setUri(photo?.uri ?? null);
  };

  const renderPicture = () => (
    <View style={styles.resultContainer}>
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
        <ThemedText type='titleMedium'>
          Hasil Pencarian
        </ThemedText>
        <Pressable>
          <Feather name="help-circle" size={24} color="black" />
        </Pressable>
      </View>


      {/* Foto Hasil */}
      <Image source={{ uri }} style={styles.resultImage} />

      {/* Informasi Makanan */}
      <View style={styles.resultInfo}>
        <Image source={{ uri }} style={styles.resultThumb} />
        <Text style={styles.resultText}>Bubur Kacang Hijau</Text>
        <AntDesign name="checkcircle" size={24} color="green" />
      </View>

      {/* Opsi Tambahan */}
      <Text style={styles.alternativeText}>Tidak menemukan nama makanan yang sesuai?</Text>
      <Pressable onPress={() => router.push("/(auth)/bloomsAI")}> 
        <Text style={styles.askAI}>Tanyakan manual ke BloomsAI</Text>
      </Pressable>
    </View>
  );

  const renderCamera = () => (
    <View style={styles.cameraContainer}>
      <CameraView style={styles.camera} ref={ref} mode={"picture"} facing={"back"}>
        
        {/* Black padding untuk framing foto */}
        <View style={styles.blackTop} />
        <View style={styles.blackBottom} />

        {/* Header */}
        <View style={styles.header}>
          <Pressable 
            style={{ backgroundColor: "#E5E5E526", borderRadius: 112, padding: 10 }}
            onPress={() => router.back()}
          >
            <AntDesign name="close" size={24} color="white" />
          </Pressable>
          <Pressable
            style={{ backgroundColor: "#E5E5E526", borderRadius: 112, padding: 10 }}
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

  return <View style={styles.container}>{uri ? renderPicture() : renderCamera()}</View>;
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
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    width: "90%",
    elevation: 5,
    marginBottom: 20,
  },
  resultThumb: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  resultText: { flex: 1, fontSize: 16, fontWeight: "bold" },

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
  askAI: { color: "#007AFF", fontSize: 16, marginTop: 5, textDecorationLine: "underline" },
});
