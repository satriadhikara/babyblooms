import React, { useState, useEffect, useRef } from "react";
import { ThemedText } from "@/components/ui/ThemedText";
import {
  View,
  ScrollView,
  Pressable,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
  ActivityIndicator,
  Modal,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import {
  HelpCircle,
  ArrowLeft,
  CircleCheck,
  CircleX,
  CircleHelp,
  CircleAlert,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Activity {
  id: string;
  title: string;
  category: string;
  imageUrl?: string | null;
  isSafe: boolean;
}

const Aktivitas = () => {
  const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/api`;

  const [entryText, setEntryText] = useState("");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const textInputRef = useRef(null);
  const [HelpModalVisible, setHelpModalVisible] = useState(false);
  const router = useRouter();
  const handleBack = () => router.back();

  const scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [156, 0],
    extrapolate: "clamp",
  });

  const categories = [
    "Semua",
    "Terkait Bepergian",
    "Olahraga",
    "Kesehatan",
    "Hiburan",
    "Fashion",
    "Rumah Tangga",
    "Gerakan Tubuh",
    "Kecantikan & Kosmetik",
    "Perawatan Rambut",
  ];

  // Fetch all activities when component mounts
  useEffect(() => {
    fetchActivities();
  }, []);

  // Fetch activities from API
  const fetchActivities = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/activity`);
      if (!response.ok) {
        throw new Error("Failed to fetch activities");
      }

      const result = await response.json();

      if (result.success) {
        console.log("Fetched activities:", result.data);
        setActivities(result.data);
        setFilteredActivities(result.data);
      } else {
        setError(result.message || "Failed to fetch activities");
      }
    } catch (error) {
      console.error("Error fetching activities:", error);
      setError("Network error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Filter activities by category
  const filterByCategory = async (category: string) => {
    setSelectedCategory(category);
    setIsLoading(true);

    try {
      if (category === "Semua") {
        setFilteredActivities(activities);
        setIsLoading(false);
        return;
      }

      const response = await fetch(
        `${API_URL}/activity/category/${encodeURIComponent(category)}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch ${category} activities`);
      }

      const result = await response.json();

      if (result.success) {
        setFilteredActivities(result.data);
      } else {
        setError(result.message || "Failed to fetch activities by category");
      }
    } catch (error) {
      console.error(`Error fetching ${category} activities:`, error);
      setError("Network error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Search activities
  const handleSearch = async () => {
    if (!entryText.trim()) {
      setFilteredActivities(activities);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/activity/search?query=${encodeURIComponent(entryText)}`
      );
      if (!response.ok) {
        throw new Error("Failed to search activities");
      }

      const result = await response.json();

      if (result.success) {
        setFilteredActivities(result.data);
      } else {
        setError(result.message || "Failed to search activities");
      }
    } catch (error) {
      console.error("Error searching activities:", error);
      setError("Network error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const getIcon = (isSafe: boolean) => {
    if (isSafe === true) {
      return <CircleCheck size={24} color="#ECFDF3" fill="#039855" />;
    } else if (isSafe === false) {
      return <CircleX size={24} color="#F8F7F4" fill="#D91F11" />;
    } else {
      return <CircleAlert size={24} color="#F8F7F4" fill="#FFDD00" />;
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F8F7F4",
        paddingHorizontal: 10,
        position: "fixed",
      }}
    >
      <Animated.View
        style={{
          height: headerHeight,
          width: "100%",
          backgroundColor: "#F8F7F4",
          overflow: "hidden",
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
            backgroundColor: "#F8F7F4",
          }}
        >
          <Pressable onPress={() => handleBack()}>
            <ArrowLeft size={24} color="black" />
          </Pressable>
          <ThemedText type="titleMedium">Aktivitas</ThemedText>
          <Pressable onPress={() => setHelpModalVisible(true)}>
            <HelpCircle size={24} color="black" />
          </Pressable>
        </View>
        <TextInput
          ref={textInputRef}
          style={{
            height: 40,
            borderWidth: 1,
            borderColor: "#E0E0E0",
            borderRadius: 48,
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginHorizontal: 10,
            backgroundColor: "#EFEFF0",
            fontSize: 14,
            color: "#000000",
            fontFamily: "switzer",
          }}
          placeholder="Cari aktivitas"
          value={entryText}
          onChangeText={setEntryText}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
      </Animated.View>

      {/* Category Tabs */}
      <View
        style={{
          height: 52,
          width: "100%",
          backgroundColor: "#F8F7F4",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={{
                height: 52,
                paddingHorizontal: 16,
                justifyContent: "center",
                alignItems: "center",
                borderBottomWidth: selectedCategory === category ? 2 : 0,
                borderBottomColor: "#96B88A",
              }}
              onPress={() => filterByCategory(category)}
            >
              <ThemedText
                type="titleSmall"
                style={{
                  color: selectedCategory === category ? "#96B88A" : "#000000",
                }}
              >
                {category}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Animated.ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        {isLoading ? (
          <View style={{ padding: 20, alignItems: "center" }}>
            <ActivityIndicator size="large" color="#96B88A" />
          </View>
        ) : error ? (
          <View style={{ padding: 20, alignItems: "center" }}>
            <ThemedText style={{ color: "red" }}>{error}</ThemedText>
            <TouchableOpacity
              style={{
                marginTop: 10,
                padding: 10,
                backgroundColor: "#F0F0F0",
                borderRadius: 5,
              }}
              onPress={fetchActivities}
            >
              <ThemedText>Coba Lagi</ThemedText>
            </TouchableOpacity>
          </View>
        ) : filteredActivities.length === 0 ? (
          <View style={{ padding: 20, alignItems: "center" }}>
            <ThemedText>Tidak ada aktivitas ditemukan</ThemedText>
          </View>
        ) : (
          filteredActivities.map((activity) => (
            <View
              key={activity.id}
              style={{
                height: "auto",
                width: "100%",
                backgroundColor: "#F8F7F4",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: 64,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Image
                  source={
                    activity.imageUrl
                      ? { uri: activity.imageUrl }
                      : require("../../assets/images/splash-icon.png")
                  }
                  style={{ width: 64, height: 64, borderRadius: 12 }}
                />
                <ThemedText
                  style={{ width: 224, fontFamily: "switzer", fontSize: 16 }}
                >
                  {activity.title}
                </ThemedText>
                <View style={{ width: 24, height: 24 }}>
                  {getIcon(activity.isSafe)}
                </View>
              </View>
            </View>
          ))
        )}
      </Animated.ScrollView>

      <Modal
        visible={HelpModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setHelpModalVisible(false)}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "flex-end",
          }}
          activeOpacity={1}
          onPress={() => setHelpModalVisible(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "white",
              padding: 20,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
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
            <View style={{ paddingHorizontal: 20 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginBottom: 20,
                  textAlign: "center",
                  fontFamily: "PlusJakarta-Sans-Bold",
                }}
              >
                Ketahui aktivitas yang bisa dan tidak aman untuk dilakukan!
              </Text>
            </View>

            <View style={{ alignItems: "center", marginBottom: 20 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 12,
                  backgroundColor: "#D1FADF",
                  padding: 13,
                  borderRadius: 25,
                }}
              >
                <CircleCheck size={24} color="#ECFDF3" fill="#039855" />
                <Text style={{ marginLeft: 12, fontFamily: "Switzer-Regular" }}>
                  Aman!
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 12,
                  backgroundColor: "#FFF8C9",
                  padding: 13,
                  borderRadius: 25,
                }}
              >
                <CircleAlert size={24} color="#F8F7F4" fill="#FFDD00" />
                <Text style={{ marginLeft: 12, fontFamily: "Switzer-Regular" }}>
                  Hati-hati
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 12,
                  backgroundColor: "#FADCD9",
                  padding: 13,
                  borderRadius: 25,
                }}
              >
                <CircleX size={24} color="#F8F7F4" fill="#D91F11" />
                <Text style={{ marginLeft: 12, fontFamily: "Switzer-Regular" }}>
                  Tidak aman
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: "#D33995",
                borderRadius: 30,
                paddingVertical: 20,
                alignItems: "center",
                marginTop: 15,
                marginBottom: 10,
              }}
              onPress={() => setHelpModalVisible(false)}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 16,
                  fontFamily: "Switzer-Medium",
                }}
              >
                Mengerti
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default Aktivitas;
