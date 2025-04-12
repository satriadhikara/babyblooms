import React, { useState, useRef, useEffect } from "react";
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import { ThemedText } from "@/components/ui/ThemedText";
import { useRouter } from "expo-router";
import { useAuth } from "./_layout"; // Import useAuth
import { authClient } from "@/utils/auth-client"; // Import authClient
import LoadingComponent from "@/components/ui/Loading"; // Import LoadingComponent

// Define the Entry interface based on API response
interface Entry {
  id: string;
  name: string;
  createdAt: string; // API returns createdAt as string
  content: string;
  imageUrl?: string; // Add imageUrl from API
  userId: string; // Add userId from API
}

export default function JournalScreen() {
  const { session, isPending: isAuthPending } = useAuth(); // Get session and auth loading state
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [entryText, setEntryText] = useState("");
  const textInputRef = useRef(null);
  const router = useRouter();

  // Function to fetch entries
  const fetchEntries = async () => {
    if (!session) return;
    setIsLoading(true);
    setError(null);
    try {
      const cookies = authClient.getCookie();
      const headers = { Cookie: cookies };
      const response = await fetch(
        `http://babyblooms-api-mhtx1y-ea3f25-91-108-110-101.traefik.me/api/book`,
        {
          method: "GET",
          headers: headers,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Entry[] = await response.json();
      // Sort entries by createdAt date, newest first
      data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setEntries(data);
    } catch (err) {
      console.error("Error fetching journal entries:", err);
      setError("Gagal memuat entri buku harian.");
      Alert.alert("Error", "Gagal memuat entri buku harian.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch entries on mount and when session changes
  useEffect(() => {
    if (session) {
      fetchEntries();
    } else if (!isAuthPending) {
      // If no session and auth is not pending, stop loading
      setIsLoading(false);
    }
  }, [session, isAuthPending]);

  // Function to format time difference
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Baru saja";
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m lalu`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}j lalu`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "Kemarin";
    if (diffInDays < 7) return `${diffInDays}h lalu`;
    // For older entries, show the date
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const addNewEntry = async () => {
    if (!entryText.trim() || !session) {
      Keyboard.dismiss();
      setModalVisible(false);
      return;
    }

    Keyboard.dismiss();
    setModalVisible(false);
    // Optimistically add the new entry (optional, for better UX)
    // const optimisticEntry = {
    //   id: Date.now().toString(), // Temporary ID
    //   name: session.user.name || "Anda",
    //   createdAt: new Date().toISOString(),
    //   content: entryText.trim(),
    //   imageUrl: session.user.image,
    //   userId: session.user.id,
    // };
    // setEntries([optimisticEntry, ...entries]);

    try {
      const cookies = authClient.getCookie();
      const headers = {
        "Content-Type": "application/json",
        Cookie: cookies,
      };
      const response = await fetch(
        `http://babyblooms-api-mhtx1y-ea3f25-91-108-110-101.traefik.me/api/book`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ content: entryText.trim() }),
        }
      );

      if (!response.ok) {
        // Revert optimistic update if failed
        // setEntries(entries.filter(entry => entry.id !== optimisticEntry.id));
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // const newEntryData = await response.json();
      // Update list with actual data from server or just refetch
      setEntryText("");
      fetchEntries(); // Refetch the list to get the latest data including the new entry
    } catch (err) {
      console.error("Error adding new entry:", err);
      Alert.alert("Error", "Gagal menambahkan entri baru.");
      // Revert optimistic update if failed
      // setEntries(entries.filter(entry => entry.id !== optimisticEntry.id));
    }
  };

  const handleModalHide = () => {
    Keyboard.dismiss();
  };

  const handleSwipeStart = () => {
    Keyboard.dismiss();
  };

  // Component for Empty State
  const EmptyStateComponent = () => (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Image
        source={require("@/assets/images/emptyState.png")}
        style={{ width: 180, height: 180, marginBottom: 20 }}
        resizeMode="contain"
      />
      <ThemedText
        type="titleMedium"
        style={{
          fontSize: 18,
          fontWeight: "500",
          color: "#666",
          marginBottom: 8,
          textAlign: "center",
        }}
      >
        Belum ada momen terekam
      </ThemedText>
      <ThemedText
        type="bodyMedium"
        style={{
          fontSize: 16,
          color: "#777777",
          textAlign: "center",
        }}
      >
        Mulai tulis kisahmu hari ini!
      </ThemedText>
    </View>
  );

  if (isAuthPending || isLoading) {
    return <LoadingComponent style={{ flex: 1, justifyContent: "center" }} />;
  }

  if (error) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ThemedText style={{ color: "red" }}>{error}</ThemedText>
        <TouchableOpacity onPress={fetchEntries} style={{ marginTop: 10 }}>
          <ThemedText style={{ color: "#C2185B" }}>Coba lagi</ThemedText>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      {/* Header */}
      <View style={{ backgroundColor: "white" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: 56,
            paddingHorizontal: 16,
            backgroundColor: "#fff",
          }}
        >
          <TouchableOpacity
            style={{ padding: 8 }}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <ThemedText type="titleMedium">Buku Harian</ThemedText>
          </View>
          <View style={{ width: 40 }} />
        </View>
      </View>

      {entries.length > 0 ? (
        <FlatList
          data={entries}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View
              style={{
                flexDirection: "row",
                marginBottom: 15,
                paddingHorizontal: 16,
                paddingTop: 16,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  marginRight: 10,
                  position: "relative",
                }}
              >
                {/* Profile Image */}
                <Image
                  source={
                    item.imageUrl
                      ? { uri: item.imageUrl }
                      : require("@/assets/images/ProfPic.png") // Fallback image
                  }
                  style={{ width: 40, height: 40, borderRadius: 15, zIndex: 1 }}
                  resizeMode="cover"
                />

                {/* Vertical line above if not the first item */}
                {index > 0 && (
                  <View
                    style={{
                      position: "absolute",
                      top: -16, // Start from above the image
                      bottom: 40, // End at the top of the image
                      width: 2,
                      backgroundColor: "#E0E0E0",
                      alignSelf: "center",
                    }}
                  />
                )}

                {/* Vertical line below if not the last item */}
                {index < entries.length - 1 && (
                  <View
                    style={{
                      position: "absolute",
                      top: 40, // Start from the bottom of the image
                      bottom: -15, // Extend down to the next item's padding
                      width: 2,
                      backgroundColor: "#E0E0E0",
                      alignSelf: "center",
                    }}
                  />
                )}
              </View>

              <View style={{ flex: 1 }}>
                <ThemedText type="titleMedium">{item.name}</ThemedText>
                <ThemedText
                  type="labelSmall"
                  style={{ color: "gray", fontSize: 12 }}
                >
                  {formatTimeAgo(item.createdAt)}
                </ThemedText>
                <ThemedText
                  style={{
                    fontWeight: "regular",
                    fontSize: 16,
                    fontFamily: "switzer",
                    marginTop: 5,
                  }}
                >
                  {item.content}
                </ThemedText>
              </View>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 100 }} // Add padding to avoid overlap with FAB
        />
      ) : (
        <EmptyStateComponent />
      )}

      {/* Tombol Tambah */}
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 20,
          bottom: 30,
          backgroundColor: "#C2185B",
          width: 56,
          height: 56,
          borderRadius: 28,
          justifyContent: "center",
          alignItems: "center",
          elevation: 4,
          shadowColor: "#000", // iOS shadow
          shadowOffset: { width: 0, height: 2 }, // iOS shadow
          shadowOpacity: 0.2, // iOS shadow
          shadowRadius: 4, // iOS shadow
        }}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="add" size={32} color="white" />
      </TouchableOpacity>

      {/* Bottom Sheet Modal */}
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => {
          Keyboard.dismiss();
          setModalVisible(false);
        }}
        onSwipeStart={handleSwipeStart}
        onSwipeMove={handleSwipeStart}
        onSwipeComplete={() => setModalVisible(false)}
        onModalHide={handleModalHide}
        swipeDirection="down"
        propagateSwipe={true}
        style={{
          justifyContent: "flex-end",
          margin: 0,
        }}
        avoidKeyboard // Add this prop
      >
        {/* Removed KeyboardAvoidingView as avoidKeyboard is used in Modal */}
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            paddingBottom: Platform.OS === "ios" ? 30 : 20, // Add padding for keyboard avoidance on iOS
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            minHeight: 200,
          }}
        >
          <View
            style={{
              width: 80,
              height: 5,
              backgroundColor: "#E0E0E0",
              borderRadius: 3,
              alignSelf: "center",
              marginBottom: 15,
            }}
          />

          <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 15 }}>
            Tulis Momenmu
          </Text>
          <TextInput
            ref={textInputRef}
            style={{
              borderWidth: 1,
              borderColor: "#E0E0E0",
              borderRadius: 5,
              padding: 10,
              minHeight: 50,
              maxHeight: 120,
              textAlignVertical: "top",
              fontSize: 16, // Ensure text input font size is appropriate
            }}
            placeholder="Bagikan momen spesialmu hari ini..."
            value={entryText}
            onChangeText={setEntryText}
            multiline
            autoFocus
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#D81B60",
              borderRadius: 25,
              paddingVertical: 12,
              alignItems: "center",
              marginTop: 15,
              marginBottom: 10,
            }}
            onPress={addNewEntry}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              Simpan
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
