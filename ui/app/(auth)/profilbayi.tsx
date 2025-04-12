import React, { useState, useEffect, useRef } from "react";
import { ThemedText } from "@/components/ui/ThemedText";
import {
  View,
  Pressable,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TextInput,
  Text,
  StyleSheet, // Import StyleSheet
  ActivityIndicator, // Import ActivityIndicator
} from "react-native";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronRight, Ellipsis, Radio } from "lucide-react-native";
import { useAuth } from "./_layout";
import { Calendar as RNCalendar } from "react-native-calendars";
import { authClient } from "@/utils/auth-client";
// Removed Skeleton Placeholder import

// Keep Child and PregnancyData interfaces the same
interface Child {
  id: string;
  mother_id: string;
  name: string;
  estimated_date_of_birth: string;
  connection_code: string;
  created_at: string;
  updated_at: string;
  gender: string;
}

interface PregnancyData {
  week: number;
  day: number;
  hpl: string;
  hpht: string;
  daysLeft: number;
  trimester: number;
  formattedHpl?: string;
  isMom: boolean;
}

const Profil = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const handleBack = () => {
    router.back();
  };

  const [entryText, setEntryText] = useState("");
  const textInputRef = useRef(null);
  const handleModalHide = () => {
    Keyboard.dismiss();
  };

  const handleSwipeStart = () => {
    Keyboard.dismiss();
  };

  const { session } = useAuth();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [genderModalVisible, setGenderModalVisible] = useState(false);
  const [selectedGender, setSelectedGender] = useState("Laki Laki");
  const [dateModalVisible, setDateModalVisible] = useState(false);

  const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/api`;

  const [children, setChildren] = useState<Child | null>(null); // Initialize as null
  const [pregnancyData, setPregnancyData] = useState<PregnancyData | null>(
    null
  ); // Initialize as null

  // --- Combined Loading and Error State ---
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  // --- End Loading State ---

  useEffect(() => {
    if (!session) {
      setIsDataLoading(false); // Not logged in, stop loading
      return;
    }

    const fetchData = async () => {
      setIsDataLoading(true); // Start loading
      setLoadingError(null); // Reset error

      try {
        const cookies = authClient.getCookie();
        const headers = { Cookie: cookies };

        // Fetch both concurrently
        const [childrenResponse, pregnancyResponse] = await Promise.all([
          fetch(`${API_URL}/user/child`, { method: "GET", headers }),
          fetch(`${API_URL}/user/pregnantInfo`, { method: "GET", headers }),
        ]);

        // Check responses
        if (!childrenResponse.ok) {
          throw new Error(
            `Failed to fetch children: ${childrenResponse.status}`
          );
        }
        if (!pregnancyResponse.ok) {
          throw new Error(
            `Failed to fetch pregnancy info: ${pregnancyResponse.status}`
          );
        }

        // Parse data
        const childrenData = await childrenResponse.json();
        const pregnancyRawData = await pregnancyResponse.json();

        // Process pregnancy data
        const hplDate = new Date(pregnancyRawData.hpl);
        const today = new Date();
        const daysLeft = Math.floor(
          (hplDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        );
        const options: Intl.DateTimeFormatOptions = {
          day: "numeric",
          month: "short",
          year: "numeric",
        };
        const formattedHpl = hplDate.toLocaleDateString("id-ID", options);

        const processedPregnancyData: PregnancyData = {
          week: pregnancyRawData.week,
          day: pregnancyRawData.day,
          hpl: pregnancyRawData.hpl,
          hpht: pregnancyRawData.hpht,
          daysLeft: daysLeft,
          trimester: pregnancyRawData.trimester || 1,
          formattedHpl: formattedHpl,
          isMom: pregnancyRawData.isMom,
        };

        // Set state
        setChildren(childrenData);
        setPregnancyData(processedPregnancyData);
      } catch (error: any) {
        console.error("Error fetching profile data:", error);
        setLoadingError(
          error.message || "Gagal memuat data profil. Silakan coba lagi."
        );
        setChildren(null); // Clear data on error
        setPregnancyData(null);
      } finally {
        setIsDataLoading(false); // Stop loading regardless of outcome
      }
    };

    fetchData();
  }, [session, API_URL]); // Added API_URL dependency

  // Keep modal functions (addNewDate, addNewEntryName, addNewGender) the same

  const genderOptions = [
    { label: "Laki Laki", value: "Laki Laki" },
    { label: "Perempuan", value: "Perempuan" },
    { label: "Belum Diketahui", value: "belum diketahui" },
  ];

  const addNewEntryName = () => {
    if (entryText.trim() === "") {
      Alert.alert("Peringatan", "Nama tidak boleh kosong.");
      return;
    }
    // TODO: Add API call to update name here
    setEntryText("");
    setModalVisible(false);
    Alert.alert("Berhasil", "Nama baru telah disimpan.");
  };

  const addNewGender = () => {
    if (!selectedGender) {
      Alert.alert("Peringatan", "Pilih jenis kelamin terlebih dahulu.");
      return;
    }
    // TODO: Add API call to update gender here
    setGenderModalVisible(false);
    Alert.alert("Berhasil", "Jenis kelamin telah disimpan.");
  };

  const addNewDate = () => {
    if (!selectedDate) {
      Alert.alert("Peringatan", "Pilih tanggal terlebih dahulu.");
      return;
    }
    // TODO: Add API call to update HPL here
    setDateModalVisible(false);
    Alert.alert("Berhasil", "Tanggal telah disimpan.");
  };

  // --- Helper to render main content ---
  const renderContent = () => {
    if (isDataLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4697C1" />
        </View>
      );
    }

    if (loadingError) {
      return (
        <View style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>{loadingError}</ThemedText>
          {/* Optional: Add a retry button here */}
        </View>
      );
    }

    if (children && pregnancyData) {
      return (
        <>
          {/* Profile Pic and Name */}
          <View style={styles.profilePicContainer}>
            <Image
              source={require("@/assets/images/babySkinLight.png")}
              style={styles.profileImage}
            />
            <View style={styles.profileNameContainer}>
              <ThemedText type="titleLarge">
                {children.name || "Bayi"}
              </ThemedText>
              <ThemedText type="bodyMedium" style={styles.weekDayText}>
                {pregnancyData.week} minggu {pregnancyData.day} hari
              </ThemedText>
            </View>
          </View>

          {/* Details List */}
          <View style={styles.detailsListContainer}>
            {/* Name Row */}
            <View style={styles.detailRow}>
              <ThemedText type="bodyMedium" style={styles.detailLabel}>
                Nama
              </ThemedText>
              <TouchableOpacity
                style={styles.detailValueTouchable}
                onPress={() => setModalVisible(true)}
              >
                <ThemedText type="bodyMedium" style={styles.detailValue}>
                  {children.name || "Bayi"}
                </ThemedText>
                <ChevronRight size={20} color="#000" />
              </TouchableOpacity>
            </View>
            {/* Gender Row */}
            <View style={styles.detailRow}>
              <ThemedText type="bodyMedium" style={styles.detailLabel}>
                Jenis Kelamin
              </ThemedText>
              <TouchableOpacity
                style={styles.detailValueTouchable}
                onPress={() => setGenderModalVisible(true)}
              >
                <ThemedText type="bodyMedium" style={styles.detailValue}>
                  {children.gender || "Gender"}
                </ThemedText>
                <ChevronRight size={20} color="#000" />
              </TouchableOpacity>
            </View>
            {/* HPL Row */}
            <View style={styles.detailRow}>
              <ThemedText type="bodyMedium" style={styles.detailLabel}>
                Hari Perkiraan Lahir
              </ThemedText>
              <TouchableOpacity
                style={styles.detailValueTouchable}
                onPress={() => setDateModalVisible(true)}
              >
                <ThemedText type="bodyMedium" style={styles.detailValue}>
                  {pregnancyData.formattedHpl || "Tanggal"}
                </ThemedText>
                <ChevronRight size={20} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        </>
      );
    }

    // Fallback if not loading, no error, but data is null
    return (
      <View style={styles.errorContainer}>
        <ThemedText style={styles.errorText}>Data tidak tersedia.</ThemedText>
      </View>
    );
  };
  // --- End Helper ---

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.outerContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={handleBack}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </Pressable>
          <ThemedText type="titleMedium">Profil Bayimu</ThemedText>
          <Pressable>
            <Ellipsis color={"#000"} size={24} />
          </Pressable>
        </View>

        <View style={styles.contentContainer}>
          {/* --- Render Content --- */}
          {renderContent()}
          {/* --- End Render Content --- */}
        </View>

        {/* Modals (Keep existing modal code here) */}
        {/* Name Modal */}
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
          style={styles.modalStyle}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.modalContentContainer}
          >
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Edit Nama</Text>
            <TextInput
              ref={textInputRef}
              style={styles.modalTextInput}
              placeholder="Masukkan nama bayi"
              value={entryText}
              onChangeText={setEntryText}
              autoFocus
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={addNewEntryName}
            >
              <Text style={styles.modalButtonText}>Simpan</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </Modal>

        {/* Gender Modal */}
        <Modal
          isVisible={genderModalVisible}
          onBackdropPress={() => setGenderModalVisible(false)}
          onSwipeComplete={() => setGenderModalVisible(false)}
          swipeDirection="down"
          style={styles.modalStyle}
        >
          <View style={styles.modalContentContainer}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Jenis Kelamin</Text>
            {genderOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.genderOptionTouchable}
                onPress={() => {
                  setSelectedGender(option.value);
                  // Don't close modal immediately, let user press Simpan
                }}
              >
                <View style={styles.radioOuter}>
                  {selectedGender === option.value && (
                    <View style={styles.radioInner} />
                  )}
                </View>
                <Text style={styles.genderOptionLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.modalButton} onPress={addNewGender}>
              <Text style={styles.modalButtonText}>Simpan</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* Date Modal */}
        <Modal
          isVisible={dateModalVisible}
          onBackdropPress={() => setDateModalVisible(false)}
          onSwipeComplete={() => setDateModalVisible(false)}
          swipeDirection="down"
          style={styles.modalStyle}
        >
          <View style={styles.modalContentContainer}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Pilih Tanggal Perkiraan Lahir</Text>
            <RNCalendar
              current={selectedDate}
              onDayPress={(day: { dateString: string }) => {
                setSelectedDate(day.dateString);
              }}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  selectedColor: "#4697C1", // Match button color
                },
              }}
              theme={{
                backgroundColor: "#ffffff",
                calendarBackground: "#ffffff",
                textSectionTitleColor: "#545F71",
                selectedDayBackgroundColor: "#4697C1", // Match button color
                selectedDayTextColor: "#ffffff",
                todayTextColor: "#4697C1",
                dayTextColor: "#545F71",
                textDisabledColor: "#d9e1e8",
                arrowColor: "black",
                monthTextColor: "#4697C1",
                indicatorColor: "#4697C1",
                textDayFontWeight: "300",
                textMonthFontWeight: "bold",
                textDayHeaderFontWeight: "300",
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 16,
              }}
            />
            <TouchableOpacity style={styles.modalButton} onPress={addNewDate}>
              <Text style={styles.modalButtonText}>Konfirmasi</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

// --- Add StyleSheet ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  outerContainer: {
    backgroundColor: "#F8F7F4",
    flex: 1,
  },
  header: {
    height: 96,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  contentContainer: {
    backgroundColor: "#F8F7F4",
    paddingHorizontal: 20,
    paddingTop: 20,
    flex: 1,
  },
  // --- Loading Style ---
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50, // Add some padding
  },
  // --- End Loading Style ---
  profilePicContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 15,
    marginBottom: 30,
    paddingVertical: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    borderRadius: 50,
  },
  profileNameContainer: {
    gap: 4,
    alignItems: "center",
  },
  weekDayText: {
    color: "#7E7E7E",
  },
  detailsListContainer: {
    // Container for the list items
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  detailLabel: {
    color: "#000",
  },
  detailValueTouchable: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flexShrink: 1,
  },
  detailValue: {
    color: "#555",
    marginRight: 5,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "#D32F2F",
    textAlign: "center",
  },
  // Modal Styles (Keep existing modal styles)
  modalStyle: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContentContainer: {
    backgroundColor: "white",
    padding: 20,
    paddingBottom: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  modalHandle: {
    width: 80,
    height: 5,
    backgroundColor: "#E0E0E0",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  modalTextInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    minHeight: 50,
    maxHeight: 120,
    textAlignVertical: "top",
    marginBottom: 15,
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: "#4697C1",
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 15,
    marginBottom: 10,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  genderOptionTouchable: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#545F71",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#545F71",
  },
  genderOptionLabel: {
    fontSize: 16,
    color: "#545F71",
  },
});
// --- End StyleSheet ---

export default Profil;
