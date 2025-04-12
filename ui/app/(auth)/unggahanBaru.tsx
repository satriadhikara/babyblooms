import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { X, ChevronDown, ChevronUp } from "lucide-react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ui/ThemedText";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "./_layout";
import { authClient } from "@/utils/auth-client";

const PostForm = () => {
  const { session, isPending } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const { selectedTopic: initialTopic } = useLocalSearchParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [selectedTopic, setSelectedTopic] = useState(
    typeof initialTopic === "string" ? initialTopic : "Pregnancy Q&A"
  );

  const topics = ["Pregnancy Q&A", "Tips & Rekomendasi", "Gaya Hidup"];

  // Function to map UI topic name to API category values
  const mapTopicToCategory = (topic: any) => {
    switch (topic) {
      case "Pregnancy Q&A":
        return "pregnancyQNA";
      case "Tips & Rekomendasi":
        return "tipsAndRecommendations";
      case "Gaya Hidup":
        return "lifestyle";
      default:
        return "pregnancyQNA";
    }
  };

  const handleSubmitPost = async () => {
    // Validate inputs
    if (!title.trim()) {
      Alert.alert("Error", "Judul tidak boleh kosong");
      return;
    }

    if (!content.trim()) {
      Alert.alert("Error", "Konten tidak boleh kosong");
      return;
    }

    setIsSubmitting(true);

    try {
      const cookies = authClient.getCookie();
      const headers = {
        Cookie: cookies,
      };
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/post`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          body: JSON.stringify({
            title,
            content,
            category: mapTopicToCategory(selectedTopic),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal mengunggah post");
      }

      // Success
      Alert.alert("Berhasil", "Post berhasil diunggah", [
        {
          text: "OK",
          onPress: () => router.push("/(auth)/(tabs)/komunitas"),
        },
      ]);
    } catch (error: any) {
      console.error("Error submitting post:", error);
      Alert.alert(
        "Error",
        error.message || "Terjadi kesalahan saat mengunggah post"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending) {
    return <ActivityIndicator />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 16,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <X size={24} color="black" />
          </TouchableOpacity>
          <ThemedText type="titleMedium">Unggahan Baru</ThemedText>
          <View style={{ width: 24 }} />
        </View>

        {/* Form Content */}
        <View style={{ padding: 16, marginTop: 30 }}>
          <ThemedText type="bodyMedium" style={{ marginBottom: 8 }}>
            Pilih Topik
          </ThemedText>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#e0e0e0",
              borderRadius: 4,
              padding: 12,
              marginBottom: 16,
            }}
            onPress={() => setModalVisible(true)}
          >
            <ThemedText type="titleSmall" style={{ color: "#626262" }}>
              {selectedTopic}
            </ThemedText>
            <ChevronDown size={24} color="#626262" />
          </TouchableOpacity>

          {/* Title Input */}
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#e0e0e0",
              padding: 12,
              marginBottom: 16,
              fontSize: 18,
              fontWeight: "bold",
              fontFamily: "PlusJakartaSans", // or any other font family you have installed
            }}
            placeholder="Judul Unggahan"
            placeholderTextColor="#E5E5E5"
            value={title}
            onChangeText={setTitle}
          />

          {/* Content Input */}
          <TextInput
            style={{
              lineHeight: 24,
              textAlignVertical: "top",
              padding: 12,
              fontSize: 16,
              fontFamily: "Switzer",
              height: 200,
            }}
            placeholder="Tuliskan isi pikiranmu..."
            placeholderTextColor="#7E7E7E"
            value={content}
            onChangeText={setContent}
            multiline
          />
        </View>

        {/* Anonymous Radio Button */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: 16,
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", padding: 16 }}
          >
            <TouchableOpacity
              style={{
                marginRight: 8,
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
                gap: 8,
              }}
              onPress={() => {
                // setIsAnonymous(!isAnonymous);
                Alert.alert("Coming Soon!");
              }}
            >
              <View
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: isAnonymous ? "#D33995" : "#aaa",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isAnonymous && (
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: "#D33995",
                    }}
                  />
                )}
              </View>

              <ThemedText
                type="labelLarge"
                style={{
                  fontWeight: "400",
                  color: "#373737",
                  fontFamily: "Switzer-Regular",
                }}
              >
                Unggah secara Anonim
              </ThemedText>
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={{
              backgroundColor: "#D33995",
              borderRadius: 25,
              padding: 14,
              margin: 16,
              alignItems: "center",
              opacity: isSubmitting ? 0.7 : 1,
            }}
            onPress={handleSubmitPost}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={{ color: "white", fontWeight: "bold" }}>Unggah</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Dropdown Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                padding: 16,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: "#e0e0e0",
                  paddingBottom: 8,
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Pilih Topik</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <ChevronUp size={24} color="black" />
                </TouchableOpacity>
              </View>
              {topics.map((topic, index) => (
                <Pressable
                  key={index}
                  style={{
                    padding: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: "#f0f0f0",
                  }}
                  onPress={() => {
                    setSelectedTopic(topic);
                    setModalVisible(false);
                  }}
                >
                  <Text style={{ fontSize: 16 }}>{topic}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default PostForm;
