import React, { useState, useEffect, useRef } from "react";
import { ThemedText } from "@/components/ui/ThemedText";
import {
  View,
  ScrollView,
  Pressable,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Modal,
} from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search, CircleCheck, CircleX, CircleAlert } from "lucide-react-native";

// Define Medicine interface based on your schema
interface Medicine {
  id: string;
  name: string;
  category: string;
  description?: string | null;
  isSafe: boolean;
}

const Obat = () => {
  const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/api`;

  const [entryText, setEntryText] = useState("");
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [helpModalVisible, setHelpModalVisible] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const textInputRef = useRef(null);
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  // Log when filtered medicines change
  useEffect(() => {
    console.log("Filtered medicines count:", filteredMedicines.length);
  }, [filteredMedicines]);

  // Fetch medicines by letter
  const fetchMedicinesByLetter = async (letter: string) => {
    setIsLoading(true);
    setSelectedLetter(letter);
    setError(null);
    setSearchPerformed(false);

    try {
      // Using correct endpoint for letter-based search
      const response = await fetch(`${API_URL}/medicine/category/${letter}`);
      const result = await response.json();

      console.log(`Letter ${letter} results:`, result); // Debug logging

      if (result.success) {
        if (result.data && Array.isArray(result.data)) {
          console.log(
            `Found ${result.data.length} medicines for letter ${letter}`
          );
          setFilteredMedicines(result.data);
        } else {
          console.log(
            "Letter fetch successful but no data found or invalid format"
          );
          setFilteredMedicines([]);
        }
      } else {
        setError("Failed to fetch medicines");
        setFilteredMedicines([]);
      }
    } catch (error) {
      console.error(`Error fetching medicines for letter ${letter}:`, error);
      setError("Network error. Please try again.");
      setFilteredMedicines([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Search medicines
  const handleSearch = async () => {
    if (!entryText.trim()) {
      setFilteredMedicines([]);
      setSelectedLetter(null);
      setSearchPerformed(false);
      return;
    }

    // Normalize search text - capitalize first letter of each word
    const normalizedSearchText = entryText
      .trim()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    console.log("Searching with normalized text:", normalizedSearchText);

    setIsLoading(true);
    setError(null);
    setSelectedLetter(null);
    setSearchPerformed(true);

    try {
      const response = await fetch(
        `${API_URL}/medicine/search?query=${encodeURIComponent(
          normalizedSearchText
        )}`
      );
      const result = await response.json();

      console.log("Search results:", result); // Debug logging

      if (result.success) {
        if (result.data && Array.isArray(result.data)) {
          console.log(
            `Found ${result.data.length} medicines for query "${normalizedSearchText}"`
          );
          setFilteredMedicines(result.data);
        } else {
          console.log("Search successful but no data found or invalid format");
          setFilteredMedicines([]);
        }
      } else {
        setError("Failed to search medicines");
        setFilteredMedicines([]);
      }
    } catch (error) {
      console.error("Error searching medicines:", error);
      setError("Network error. Please try again.");
      setFilteredMedicines([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset search and filters
  const resetSearch = () => {
    setEntryText("");
    setSelectedLetter(null);
    setFilteredMedicines([]);
    setSearchPerformed(false);
  };

  // Get safety icon based on isSafe property
  const getSafetyIcon = (isSafe: boolean | null) => {
    if (isSafe === true) {
      return <CircleCheck size={24} color="#ECFDF3" fill="#039855" />;
    } else if (isSafe === false) {
      return <CircleX size={24} color="#F8F7F4" fill="#D91F11" />;
    } else {
      return <CircleAlert size={24} color="#F8F7F4" fill="#FFDD00" />;
    }
  };

  // Render each medicine item
  const renderMedicineItem = ({ item }: { item: Medicine }) => (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ThemedText type="titleMedium" style={{ flex: 1 }}>
          {item.name}
        </ThemedText>
        {getSafetyIcon(item.isSafe)}
      </View>

      {item.description && (
        <ThemedText type="bodyMedium" style={{ marginTop: 8 }}>
          {item.description}
        </ThemedText>
      )}
    </View>
  );

  // Determine if we should show results view
  const shouldShowResults =
    selectedLetter !== null || searchPerformed || filteredMedicines.length > 0;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          height: 96,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          backgroundColor: "white",
        }}
      >
        <Pressable onPress={() => handleBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <ThemedText type="titleMedium">Obat-obatan</ThemedText>
        <Pressable onPress={() => setHelpModalVisible(true)}>
          <Feather name="help-circle" size={24} color="black" />
        </Pressable>
      </View>

      {shouldShowResults ? (
        <View style={{ flex: 1, backgroundColor: "#F8F7F4" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: 40,
              borderRadius: 48,
              marginTop: 20,
              marginLeft: 25,
              marginRight: 15,
              marginBottom: 20,
              backgroundColor: "#EFEFF0",
              paddingHorizontal: 16,
            }}
          >
            <Pressable onPress={handleSearch}>
              <Search size={20} color="#BFBFBF" />
            </Pressable>
            <TextInput
              ref={textInputRef}
              style={{
                flex: 1,
                marginLeft: 8,
                fontSize: 14,
                color: "#000000",
                fontFamily: "switzer",
                lineHeight: 20,
              }}
              placeholder="Cari obat"
              placeholderTextColor="#BFBFBF"
              value={entryText}
              onChangeText={setEntryText}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
            {entryText.length > 0 && (
              <Pressable onPress={() => setEntryText("")}>
                <AntDesign name="close" size={20} color="#BFBFBF" />
              </Pressable>
            )}
          </View>

          {/* Header showing current view */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 20,
              marginBottom: 10,
            }}
          >
            <Pressable onPress={resetSearch} style={{ marginRight: 10 }}>
              <AntDesign name="arrowleft" size={20} color="black" />
            </Pressable>
            <ThemedText type="titleMedium">
              {selectedLetter
                ? `Obat dengan awalan "${selectedLetter}"`
                : searchPerformed
                ? `Hasil pencarian "${entryText}"`
                : "Hasil pencarian"}
            </ThemedText>
          </View>

          {isLoading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" color="#E99CCA" />
            </View>
          ) : (
            <>
              {error ? (
                <View style={{ padding: 20, alignItems: "center" }}>
                  <ThemedText type="bodyMedium" style={{ color: "#D91F11" }}>
                    {error}
                  </ThemedText>
                  <TouchableOpacity
                    style={{
                      marginTop: 10,
                      padding: 10,
                      backgroundColor: "#EFEFF0",
                      borderRadius: 8,
                    }}
                    onPress={() =>
                      selectedLetter
                        ? fetchMedicinesByLetter(selectedLetter)
                        : handleSearch()
                    }
                  >
                    <ThemedText type="bodyMedium">Coba Lagi</ThemedText>
                  </TouchableOpacity>
                </View>
              ) : (
                <FlatList
                  data={filteredMedicines}
                  renderItem={renderMedicineItem}
                  keyExtractor={(item) => item.id || Math.random().toString()}
                  contentContainerStyle={{
                    paddingVertical: 10,
                    // Add this to ensure list takes up space even when empty
                    minHeight: filteredMedicines.length === 0 ? 300 : undefined,
                  }}
                  ListEmptyComponent={
                    <View
                      style={{
                        padding: 20,
                        alignItems: "center",
                        marginTop: 50,
                      }}
                    >
                      <ThemedText type="bodyMedium">
                        Tidak ada obat yang ditemukan
                      </ThemedText>
                    </View>
                  }
                />
              )}
            </>
          )}
        </View>
      ) : (
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: "#F8F7F4",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: 40,
              borderRadius: 48,
              marginTop: 20,
              marginLeft: 25,
              marginRight: 15,
              marginBottom: 20,
              backgroundColor: "#EFEFF0",
              paddingHorizontal: 16,
            }}
          >
            <Pressable onPress={handleSearch}>
              <Search size={20} color="#BFBFBF" />
            </Pressable>
            <TextInput
              ref={textInputRef}
              style={{
                flex: 1,
                marginLeft: 8,
                fontSize: 14,
                color: "#000000",
                fontFamily: "switzer",
                lineHeight: 20,
              }}
              placeholder="Cari obat"
              placeholderTextColor="#BFBFBF"
              value={entryText}
              onChangeText={setEntryText}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
            {entryText.length > 0 && (
              <Pressable onPress={() => setEntryText("")}>
                <AntDesign name="close" size={20} color="#BFBFBF" />
              </Pressable>
            )}
          </View>

          <ThemedText
            type="bodyMedium"
            style={{
              marginTop: 20,
              marginLeft: 20,
              marginRight: 20,
              color: "#A1A1A1",
              textAlign: "justify",
            }}
          >
            Tak yakin obat ini aman untuk kehamilan? Cari nama kimianya di
            kemasan, lalu klik huruf inisialnya untuk mengetahui lebih lanjut
          </ThemedText>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              margin: 20,
              gap: 10,
              justifyContent: "space-between",
            }}
          >
            {[
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G",
              "H",
              "I",
              "J",
              "K",
              "L",
              "M",
              "N",
              "O",
              "P",
              "Q",
              "R",
              "S",
              "T",
              "U",
              "V",
              "W",
              "X",
              "Y",
              "Z",
            ].map((letter) => (
              <TouchableOpacity
                key={letter}
                style={{
                  backgroundColor: "#E5E5E5",
                  borderRadius: 100,
                  padding: 10,
                  width: 112,
                  height: 112,
                  justifyContent: "center",
                  alignItems: "center",
                  ...(letter === "Y" || letter === "Z"
                    ? { marginHorizontal: 35 }
                    : {}),
                }}
                onPress={() => fetchMedicinesByLetter(letter)}
              >
                <ThemedText type="displaySmall">{letter}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}

      {helpModalVisible && (
        <Modal
          transparent={true}
          visible={helpModalVisible}
          onRequestClose={() => setHelpModalVisible(false)}
          animationType="slide"
        >
          <Pressable
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "flex-end",
            }}
            onPress={() => setHelpModalVisible(false)}
          >
            <View
              style={{
                backgroundColor: "white",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                padding: 20,
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 5,
                  backgroundColor: "#E0E0E0",
                  borderRadius: 2.5,
                  alignSelf: "center",
                  marginBottom: 20,
                }}
              />

              <ThemedText
                type="titleLarge"
                style={{ textAlign: "center", marginBottom: 20 }}
              >
                Panduan Keamanan Obat
              </ThemedText>

              <View style={{ marginBottom: 20 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <CircleCheck size={24} color="#ECFDF3" fill="#039855" />
                  <ThemedText type="bodyMedium" style={{ marginLeft: 10 }}>
                    Aman dikonsumsi selama kehamilan
                  </ThemedText>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <CircleAlert size={24} color="#F8F7F4" fill="#FFDD00" />
                  <ThemedText type="bodyMedium" style={{ marginLeft: 10 }}>
                    Konsultasi dengan dokter terlebih dahulu
                  </ThemedText>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <CircleX size={24} color="#F8F7F4" fill="#D91F11" />
                  <ThemedText type="bodyMedium" style={{ marginLeft: 10 }}>
                    Tidak aman selama kehamilan
                  </ThemedText>
                </View>
              </View>

              <TouchableOpacity
                style={{
                  backgroundColor: "#D33995",
                  borderRadius: 25,
                  padding: 15,
                  alignItems: "center",
                }}
                onPress={() => setHelpModalVisible(false)}
              >
                <ThemedText type="labelLarge" style={{ color: "white" }}>
                  Mengerti
                </ThemedText>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default Obat;
