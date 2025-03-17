import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/ThemedText';
import { useRouter } from 'expo-router';

const BloomsAI = () => {
    const [messages, setMessages] = useState<{ text: string; sender: string }[]>([
        { text: 'Halo!', sender: 'bot' },
        { text: 'Tuliskan HPL bayimu untuk mengetahui ramalan bayimu hari ini', sender: 'bot' }
    ]);
    const [inputText, setInputText] = useState('');
    const router = useRouter();
    const handleBack = () => {
        router.back();
    };

    const handleSend = () => {
        if (inputText.trim()) {
            setMessages([...messages, { text: inputText, sender: 'user' }]);
            setInputText('');
            setTimeout(() => {
                setMessages(prevMessages => [...prevMessages, { text: 'Pada 1 Oktober, si kecil dalam kandungan sedang aktif! \nMungkin Anda merasakan lebih banyak gerakan atau tendangan kecil. Ini pertanda ia tumbuh sehat dan responsif.\nBeri sentuhan lembut atau ajak bicara agar ia semakin nyaman. ', sender: 'bot' }]);
            }, 1000);
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
                            <Text style={styles.botName}>BloomsAI</Text>
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
        <View style={styles.container}>
            <View style={styles.header}>
                <AntDesign name="arrowleft" size={24} color="black" onPress={handleBack} />
                <ThemedText type='titleMedium'>BloomsAI</ThemedText>
                <AntDesign name="menu-fold" size={24} color="black" />
            </View>
            <FlatList
                data={messages}
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
        </View>
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
        backgroundColor: '#D33995',
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
        color: '#5D63A6',
        marginBottom: 5,
    },
});

export default BloomsAI;