import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/ThemedText';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const LittleZodiac = () => {
    const [messages, setMessages] = useState<{ text: string; sender: string }[]>([
        { text: 'Halo!', sender: 'bot' },
        { text: 'Tuliskan HPL bayimu untuk mengetahui ramalan bayimu hari ini', sender: 'bot' }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false); // State untuk indikator pengetikan
    const router = useRouter();
    const handleBack = () => {
        router.back();
    };

    const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

    const handleSend = async () => {
        if (inputText.trim()) {
            setMessages([...messages, { text: inputText, sender: 'user' }]);
            const userMessage = inputText;
            setInputText('');

            setIsTyping(true); // Mulai indikator pengetikan

            try {
                const prompt = `Anda adalah LittleZodiac yang seorang ahli dalam memberikan informasi informatif dalam hal ramalan zodiak, Jika ia memberikan tanggal HPL atau tanggal lahirnya si bayi maka kamu akan memberikan informasi ramalan zodiak nya. Jawab pertanyaan berikut dengan gaya bahasa yang ramah dan informatif serta memberikan kesan bahagia kepada ibu atau pendamping yang bertanya: ${userMessage} . Berikan jawaban dalam teks biasa, tanpa menggunakan format Markdown atau sintaks lainnya. Jangan gunakan simbol ** untuk membuat teks tebal. Saya ingin kamu bisa membedakan konteks dan pertanyaan. Jika konteks zodiac tetapi pertanyaan diluar zodiac maka tidak masuk dalam lingkup pengetahuanmu. Kamu hanya menjawab pertanyaan seputar zodiac dan tidak menjawab pertanyaan lain diluar zodiac. Jika diluar konteks dalam informasi pengetahuan yang ditanyakan walaupun ada kata zodiac maupun hal-hal lain tentang zodiac maka bukan lingkup pengetahuamu. Kamu berikan juga consent bahwa hal ini jangan ditelan mentah-mentah. Berikan jawaban yang singkat tentang ramalan zodiac tetapi tetap informatif`;

                const response = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            contents: [{ parts: [{ text: prompt }] }],
                        }),
                    }
                );

                const data = await response.json();
                if (data.candidates && data.candidates.length > 0) {
                    let responseText = data.candidates[0].content.parts[0].text;
                    setMessages((prevMessages) => [...prevMessages, { text: responseText, sender: 'bot' }]);
                } else {
                    setMessages((prevMessages) => [...prevMessages, { text: 'Maaf, respons tidak valid.', sender: 'bot' }]);
                }
            } catch (error) {
                console.error('Gemini API Error:', error);
                setMessages((prevMessages) => [...prevMessages, { text: 'Maaf, terjadi kesalahan. Coba lagi nanti.', sender: 'bot' }]);
            } finally {
                setIsTyping(false); // Hentikan indikator pengetikan
            }
        }
    };

    const renderItem = ({ item, index }: { item: { text: string; sender: string }, index: number }) => {
        const isFirstBotMessage = item.sender === 'bot' && (index === 0 || messages[index - 1].sender !== 'bot');
        const isBotMessage = item.sender === 'bot';
        return (
            <View style={[styles.messageContainer, isBotMessage ? styles.botMessageContainer : styles.userMessageContainer]}>
                <View style={styles.messageContent}>
                    {isFirstBotMessage && (
                        <View style={styles.botIconContainer}>
                            <Image
                                source={require('../../assets/images/CrystalBall.png')}
                                style={styles.botIcon}
                            />
                        </View>
                    )}
                    <View style={{ flexDirection: 'column', alignItems: isBotMessage ? 'flex-start' : 'flex-end' }}>
                        {isFirstBotMessage && (
                            <Text style={styles.botName}>LittleZodiac</Text>
                        )}
                        <View style={[styles.messageBubble, isBotMessage ? styles.botMessageBubble : styles.userMessageBubble, isBotMessage && !isFirstBotMessage ? styles.botMessageBubbleAligned : null]}>
                            <Text style={[styles.messageText, isBotMessage ? styles.botMessageText : styles.userMessageText]}>{item.text}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <AntDesign name="arrowleft" size={24} color="black" onPress={handleBack} />
                <ThemedText type='titleMedium'>LittleZodiac</ThemedText>
                <AntDesign name="menu-fold" size={24} color="black" />
            </View>
            <FlatList
                data={isTyping ? [...messages, { text: '...', sender: 'bot' }] : messages} // Tampilkan indikator pengetikan
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
                />
                <TouchableOpacity onPress={handleSend}>
                    <AntDesign name="arrowright" size={24} color="#007BFF" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        height: 116,
    },
    chatContainer: {
        flex: 1,
        padding: 10,
    },
    messageContainer: {
        marginVertical: 5,
        maxWidth: '80%',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    userMessageContainer: {
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
    },
    botMessageContainer: {
        alignSelf: 'flex-start',
    },
    messageContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    messageBubble: {
        padding: 12,
    },
    userMessageBubble: {
        backgroundColor: '#EFEFF0',
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    botMessageBubble: {
        backgroundColor: '#7D82B8',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
    },
    botMessageBubbleAligned: {
        marginLeft: 52, // Adjust this value to align with the profile picture
    },
    messageText: {
        fontSize: 16,
        fontFamily: 'Switzer',
        fontWeight: '400',
    },
    userMessageText: {
        color: '#000', // User message text color
    },
    botMessageText: {
        color: '#FFF', // Bot message text color
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 25,
        padding: 10,
        marginRight: 10,
        backgroundColor: '#F0F0F0',
    },
    botIconContainer: {
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 42,
        height: 42,
        borderRadius: 100,
        backgroundColor: '#5D63A6',
    },
    botIcon: {
        width: 26,
        height: 26,
    },
    botName: {
        fontSize: 14,
        color: '#000',
        marginBottom: 5,
    },
});

export default LittleZodiac;