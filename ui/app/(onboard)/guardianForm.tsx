import React, { useState, useRef } from "react";
import { ThemedText } from "@/components/ui/ThemedText";
import { ChevronLeft } from "lucide-react-native";
import {
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Keyboard,
  ActivityIndicator, // Import ActivityIndicator
  Alert, // Import Alert for feedback
} from "react-native";
import { router } from "expo-router";
import { authClient } from "@/utils/auth-client";

// --- Configuration ---
const TOTAL_LENGTH = 6;
const PREFIX = "BB";
const INPUT_LENGTH = TOTAL_LENGTH - PREFIX.length;
// --- IMPORTANT: Replace with your actual API base URL ---
const API_BASE_URL =
  "http://babyblooms-api-mhtx1y-ea3f25-91-108-110-101.traefik.me/api"; // Example: Replace!
// --- End Configuration ---

const GuardianForm = () => {
  const [codeInput, setCodeInput] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState<string | null>(null); // State for API errors
  const inputRef = useRef<TextInput>(null);

  const isInputComplete = codeInput.length === INPUT_LENGTH;

  const handlePress = () => {
    inputRef.current?.focus();
  };

  const handleTextChange = (text: string) => {
    // Clear error when user starts typing again
    if (error) setError(null);
    const filteredText = text.toUpperCase().replace(/[^A-Z0-9]/g, "");
    setCodeInput(filteredText.slice(0, INPUT_LENGTH));
  };

  // --- API Connection Logic ---
  const handleConnect = async () => {
    if (!isInputComplete || isLoading) {
      return; // Don't proceed if input is incomplete or already loading
    }

    Keyboard.dismiss(); // Dismiss keyboard before API call
    setIsLoading(true);
    setError(null); // Clear previous errors

    const fullConnectionCode = PREFIX + codeInput;

    try {
      // Note: The Hono zValidator usually validates the *body* for POST requests.
      // If it truly expects a *param*, the route definition might be different
      // (e.g., /connect/:connectionCode) and the fetch URL would change.
      // Assuming it expects a JSON body based on standard practice for POST.
      const cookies = authClient.getCookie();
      const headers = {
        Cookie: cookies,
      };
      const response = await fetch(
        `${API_BASE_URL}/user/connect/${fullConnectionCode}`,
        {
          method: "POST",
          headers,
        }
      );

      // Check if the response status indicates success (e.g., 2xx)
      if (!response.ok) {
        // Try to parse error message from response body, otherwise use status text
        let errorMessage = `Error: ${response.status} ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData?.message || errorData?.error || errorMessage;
        } catch (parseError) {
          // Ignore if response body isn't valid JSON
        }
        throw new Error(errorMessage); // Throw an error to be caught below
      }

      // --- Success Handling ---
      // const responseData = await response.json(); // If API returns data on success
      // console.log("Connection successful:", responseData);
      Alert.alert("Sukses", "Berhasil tersambung!"); // Simple success alert
      router.replace("/(auth)/(tabs)/jurnal");

      // TODO: Navigate to the next screen or update UI accordingly
      // Example: navigation.navigate('HomeScreen');

      // --- End Success Handling ---
    } catch (err: any) {
      console.error("Connection failed:", err);
      setError(
        err.message || "Gagal tersambung. Silakan coba lagi." // Set user-friendly error message
      );
      // Optional: Show an alert for the error as well
      // Alert.alert("Error", err.message || "Gagal tersambung.");
    } finally {
      setIsLoading(false); // Stop loading indicator regardless of success/failure
    }
  };
  // --- End API Connection Logic ---

  const boxes = Array.from({ length: TOTAL_LENGTH });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingContainer}
    >
      <Pressable style={styles.outerContainer} onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity>
              <ChevronLeft color="#3F4373" size={28} />
            </TouchableOpacity>
          </View>
          <ThemedText type="titleLarge" style={styles.title}>
            Sambungkan dengan Ibu
          </ThemedText>
          <ThemedText type="bodyLarge" style={styles.subtitle}>
            Temani setiap momen yang terjadi
          </ThemedText>

          <View style={styles.formContainer}>
            <Pressable style={styles.otpContainer} onPress={handlePress}>
              {boxes.map((_, index) => {
                let digit = "";
                let isPrefixBox = false;

                if (index < PREFIX.length) {
                  digit = PREFIX[index];
                  isPrefixBox = true;
                } else {
                  const inputIndex = index - PREFIX.length;
                  digit = codeInput[inputIndex] || "";
                }

                const isFocused =
                  !isPrefixBox && index === codeInput.length + PREFIX.length;

                return (
                  <View
                    key={index}
                    style={[styles.otpBox, isFocused && styles.otpBoxFocused]}
                  >
                    <ThemedText style={styles.otpText}>{digit}</ThemedText>
                  </View>
                );
              })}
            </Pressable>

            <TextInput
              ref={inputRef}
              value={codeInput}
              onChangeText={handleTextChange}
              maxLength={INPUT_LENGTH}
              keyboardType="default"
              autoCapitalize="characters"
              autoCorrect={false}
              textContentType="oneTimeCode"
              autoComplete="sms-otp"
              caretHidden
              style={styles.hiddenInput}
            />

            {/* Display Error Message */}
            {error && <ThemedText style={styles.errorText}>{error}</ThemedText>}

            <TouchableOpacity
              style={[
                styles.button,
                (!isInputComplete || isLoading) && styles.buttonDisabled, // Disable if incomplete OR loading
              ]}
              disabled={!isInputComplete || isLoading} // Disable touch if incomplete OR loading
              onPress={handleConnect} // Call handleConnect on press
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#EFEFF0" /> // Show loader
              ) : (
                <ThemedText
                  type="titleMedium"
                  style={[
                    styles.buttonText,
                    !isInputComplete && styles.buttonTextDisabled, // Apply disabled text style only if incomplete
                  ]}
                >
                  Sambungkan
                </ThemedText>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.laterButton} disabled={isLoading}>
              <ThemedText
                type="bodyMedium"
                style={[
                  styles.laterButtonText,
                  isLoading && styles.laterButtonTextDisabled, // Optionally dim "later" button during load
                ]}
              >
                Sambungkan nanti
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  // (Keep previous styles the same)
  keyboardAvoidingContainer: {
    flex: 1,
  },
  outerContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
    backgroundColor: "#FFFFFF",
  },
  header: {
    width: "100%",
    paddingHorizontal: 32,
    marginBottom: 24,
    alignSelf: "flex-start",
  },
  title: {
    marginBottom: 6,
    color: "#3F4373",
    fontWeight: "bold",
  },
  subtitle: {
    color: "#777777",
    marginBottom: 40,
    textAlign: "center",
    paddingHorizontal: 40,
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#4A4F87",
    width: "100%",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 30,
    alignItems: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20, // Reduced margin to make space for error
    paddingHorizontal: 10,
  },
  otpBox: {
    width: 48,
    height: 56,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    alignItems: "center",
    justifyContent: "center",
  },
  otpBoxFocused: {
    borderColor: "#3F4373",
    borderWidth: 2,
  },
  otpText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0C0C0C",
  },
  hiddenInput: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
  },
  // --- Error Text Style ---
  errorText: {
    color: "#FFBDBD", // Light red color for error text on dark background
    marginBottom: 15,
    textAlign: "center",
    fontSize: 14,
  },
  // --- End Error Text Style ---
  button: {
    backgroundColor: "#0C0C0C",
    paddingVertical: 16,
    paddingHorizontal: 36,
    alignItems: "center",
    justifyContent: "center", // Center ActivityIndicator
    borderRadius: 48,
    width: "90%",
    minHeight: 54, // Ensure button height stays consistent with/without loader
    marginTop: "auto",
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: "#555555",
  },
  buttonText: {
    color: "#EFEFF0",
    fontWeight: "bold",
  },
  buttonTextDisabled: {
    // Only applies when incomplete, not during loading
    color: "#AAAAAA",
  },
  laterButton: {
    padding: 8,
  },
  laterButtonText: {
    color: "#E0E0FF",
    textDecorationLine: "underline",
  },
  laterButtonTextDisabled: {
    color: "#A0A0CC", // Dimmer color when main button is loading
  },
});

export default GuardianForm;
