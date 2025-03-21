import { ThemedText } from "@/components/ui/ThemedText";
import { X } from "lucide-react-native";
import {
  SafeAreaView,
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState, useRef, useEffect } from "react";

const babyForm = () => {
  const router = useRouter();
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState("Pilih tanggal");

  // Separate animations for background and drawer
  const fadeBackgroundAnim = useRef(new Animated.Value(0)).current;
  const slideDrawerAnim = useRef(new Animated.Value(300)).current;

  const showDatePicker = () => {
    setModalVisible(true);
    // Delay setting isDatePickerVisible to true until after the modal appears
    setTimeout(() => {
      setDatePickerVisible(true);
    }, 50);
  };

  const hideDatePicker = () => {
    // Animate both with different timings
    Animated.parallel([
      Animated.timing(fadeBackgroundAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(slideDrawerAnim, {
        toValue: 300,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setDatePickerVisible(false);
      // Small delay before hiding modal completely for smooth transition
      setTimeout(() => {
        setModalVisible(false);
      }, 100);
    });
  };

  const handleConfirm = (event, date) => {
    if (date) {
      setSelectedDate(date);
      const formatted = date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      setFormattedDate(formatted);
    }
  };

  useEffect(() => {
    if (isDatePickerVisible) {
      // Reset the animation values before starting
      fadeBackgroundAnim.setValue(0);
      slideDrawerAnim.setValue(300);

      // Run background fade-in animation
      Animated.timing(fadeBackgroundAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
        delay: 0, // Start immediately
      }).start();

      // Run drawer slide-up animation slightly later
      Animated.timing(slideDrawerAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        delay: 50, // Slight delay so background appears first
      }).start();
    }
  }, [isDatePickerVisible]);

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

        <TouchableOpacity
          style={{
            backgroundColor: "white",
            paddingVertical: 16,
            paddingHorizontal: 20,
            borderRadius: 8,
            marginBottom: 20,
          }}
          onPress={showDatePicker}
        >
          <Text
            style={{
              fontFamily: "Switzer-Regular",
            }}
          >
            {formattedDate}
          </Text>
        </TouchableOpacity>

        <View>
          <View></View>
          <ThemedText
            type="overline"
            style={{
              color: "#F8F7F4",
            }}
          >
            ATAU
          </ThemedText>
          <View></View>
        </View>

        {/* Date Picker Modal as Drawer */}
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="none" // We'll handle our own animation
          onRequestClose={hideDatePicker}
        >
          {isDatePickerVisible && (
            <View style={{ flex: 1 }}>
              {/* Animated background overlay */}
              <Animated.View
                style={[
                  styles.absoluteFillObject,
                  {
                    backgroundColor: "rgba(0,0,0,0.5)",
                    opacity: fadeBackgroundAnim,
                  },
                ]}
              >
                <TouchableWithoutFeedback onPress={hideDatePicker}>
                  <View style={styles.absoluteFillObject} />
                </TouchableWithoutFeedback>
              </Animated.View>

              {/* Animated drawer */}
              <Animated.View
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: "white",
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  paddingTop: 16,
                  paddingBottom: 30,
                  paddingHorizontal: 20,
                  transform: [{ translateY: slideDrawerAnim }],
                }}
              >
                <TouchableWithoutFeedback>
                  <View>
                    <View
                      style={{
                        alignItems: "center",
                        marginBottom: 20,
                      }}
                    >
                      <View
                        style={{
                          width: 40,
                          height: 5,
                          backgroundColor: "#D9D9D9",
                          borderRadius: 5,
                        }}
                      />
                    </View>

                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "600",
                        marginBottom: 20,
                        textAlign: "center",
                      }}
                    >
                      Pilih Tanggal
                    </Text>

                    <DateTimePicker
                      value={selectedDate}
                      mode="date"
                      display="spinner"
                      onChange={handleConfirm}
                      style={{
                        height: 200,
                      }}
                    />

                    <TouchableOpacity
                      style={{
                        backgroundColor: "#D33995",
                        paddingVertical: 16,
                        borderRadius: 48,
                        alignItems: "center",
                        marginTop: 20,
                      }}
                      onPress={hideDatePicker}
                    >
                      <ThemedText
                        type="titleMedium"
                        style={{
                          color: "#EFEFF0",
                        }}
                      >
                        Konfirmasi
                      </ThemedText>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </Animated.View>
            </View>
          )}
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  absoluteFillObject: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default babyForm;
