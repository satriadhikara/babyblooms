import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ThemedText } from "@/components/ui/ThemedText";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Send } from "lucide-react-native";

const BloomCare = () => {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([
    { text: "Halo!", sender: "bot" },
    { text: "Konsultasikan kondisimu!", sender: "bot" },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false); // State untuk indikator pengetikan
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

  const handleSend = async () => {
    if (inputText.trim()) {
      setMessages([...messages, { text: inputText, sender: "user" }]);
      const userMessage = inputText;
      setInputText("");

      setIsTyping(true); // Mulai indikator pengetikan

      try {
        const prompt = `Anda adalah BloomsCare yang seorang ahli kesehatan di bidang kehamilan dalam yang memberikan saran kepada ibu hamil. Jawab pertanyaan berikut dengan gaya bahasa yang ramah dan informatif: ${userMessage}. Berikan jawaban dalam teks biasa, tanpa menggunakan format Markdown atau sintaks lainnya. Jangan gunakan simbol ** untuk membuat teks tebal. Saya ingin kamu bisa membedakan konteks dan pertanyaan. Jika konteks ibu hamil tetapi pertanyaan diluar ibu hamil maka tidak masuk dalam lingkup pengetahuanmu. Kamu hanya menjawab pertanyaan seputar kesehatan ibu hamil dan tidak menjawab pertanyaan lain diluar kehamilan. Jika diluar konteks dalam informasi pengetahuan yang ditanyakan walaupun ada kata ibu hamil maupun hal-hal lain tentang kehamilan maka bukan lingkup pengetahuamu. Kamu boleh untuk merekomendasikan terkait dengan pertanyaan, tetapi kamu tetap menyarankan untuk konsultasikan ke dokter atau bidanmu. Berikan jawaban yang singkat tetapi tetap informatif`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
            }),
          }
        );

        const data = await response.json();
        if (data.candidates && data.candidates.length > 0) {
          let responseText = data.candidates[0].content.parts[0].text;
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: responseText, sender: "bot" },
          ]);
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: "Maaf, respons tidak valid.", sender: "bot" },
          ]);
        }
      } catch (error) {
        console.error("Gemini API Error:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Maaf, terjadi kesalahan. Coba lagi nanti.", sender: "bot" },
        ]);
      } finally {
        setIsTyping(false); // Hentikan indikator pengetikan
      }
    }
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: { text: string; sender: string };
    index: number;
  }) => {
    const isFirstBotMessage =
      item.sender === "bot" &&
      (index === 0 || messages[index - 1].sender !== "bot");
    const isBotMessage = item.sender === "bot";
    return (
      <View
        style={[
          styles.messageContainer,
          isBotMessage
            ? styles.botMessageContainer
            : styles.userMessageContainer,
        ]}
      >
        <View style={styles.messageContent}>
          {isFirstBotMessage && (
            <View style={styles.botIconContainer}>
              <Image
                source={require("../../assets/images/dokterAI.png")}
                style={styles.botIcon}
              />
            </View>
          )}
          <View
            style={{
              flexDirection: "column",
              alignItems: isBotMessage ? "flex-start" : "flex-end",
            }}
          >
            {isFirstBotMessage && <Text style={styles.botName}>BloomCare</Text>}
            <View
              style={[
                styles.messageBubble,
                isBotMessage
                  ? styles.botMessageBubble
                  : styles.userMessageBubble,
                isBotMessage && !isFirstBotMessage
                  ? styles.botMessageBubbleAligned
                  : null,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  isBotMessage ? styles.botMessageText : styles.userMessageText,
                ]}
              >
                {item.text}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? -32 : 0}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            onPress={handleBack}
          />
          <ThemedText type="titleMedium">BloomCare</ThemedText>
          <View style={{ width: 24 }} />
        </View>
        <FlatList
          data={
            isTyping ? [...messages, { text: "...", sender: "bot" }] : messages
          }
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.chatContainer}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Chat"
            multiline
          />
          <TouchableOpacity onPress={handleSend}>
            <Send color="#000" size={24} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7F4",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    height: 116,
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    marginVertical: 5,
    maxWidth: "80%",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  userMessageContainer: {
    alignSelf: "flex-end",
    justifyContent: "flex-end",
  },
  botMessageContainer: {
    alignSelf: "flex-start",
  },
  messageContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  messageBubble: {
    padding: 12,
  },
  userMessageBubble: {
    backgroundColor: "#EFEFF0",
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  botMessageBubble: {
    backgroundColor: "#79902A",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
  },
  botMessageBubbleAligned: {
    marginLeft: 52, // Adjust this value to align with the profile picture
  },
  messageText: {
    fontSize: 16,
    fontFamily: "Switzer",
    fontWeight: "400",
  },
  userMessageText: {
    color: "#000", // User message text color
  },
  botMessageText: {
    color: "#FFF", // Bot message text color
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    padding: 10,
    marginRight: 10,
    backgroundColor: "#F0F0F0",
  },
  botIconContainer: {
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 42,
    height: 42,
    borderRadius: 100,
    backgroundColor: "#B8D162",
  },
  botIcon: {
    width: 26,
    height: 26,
  },
  botName: {
    fontSize: 14,
    color: "#000",
    marginBottom: 5,
  },
});

export default BloomCare;
