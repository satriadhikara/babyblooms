import React from 'react';
import { View, Text, Image, TouchableOpacity,ScrollView, TextInput, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback} from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ui/ThemedText';
import { MessageCircleMore, Heart, Image as LucideImage, Send, ArrowLeft, Ellipsis } from 'lucide-react-native';

const ReplyScreen = () => {
    const router = useRouter();
    const [keyboardHeight, setKeyboardHeight] = React.useState(0);
    const [isInputFocused, setIsInputFocused] = React.useState(false);
    const [inputText, setInputText] = React.useState("");

    React.useEffect(() => {
        const keyboardWillShow = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            (e) => setKeyboardHeight(e.endCoordinates.height)
        );
        const keyboardWillHide = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            () => setKeyboardHeight(0)
        );

        return () => {
            keyboardWillShow.remove();
            keyboardWillHide.remove();
        };
    }, []);

    const posts = [
        {
          id: 1,
          author: 'Citra Kirana',
          timeAgo: '20m lalu',
          title: 'Gimana cara hilangin rasa mual',
          content: 'Bun, aku udah seminggu ini mual-mual terus sampai gak nafsu makan.. ada yang tau cara mengatasinya ga yah?',
          likes: 4,
          comments: 2,
          category: 'Pregnancy Q&A',
          avatar: require('@/assets/images/ProfPic.png'),
        },
      ];
    
    const replies = [
        {
            id: 1,
            author: 'Fiona Siregar',
            timeAgo: '10m lalu',
            content: 'coba liat konsultasi di app ini dlu aja bun, kalo masih boleh ke dokter aja langsung. btw gws ya bun, semoga lancar🥰',
            likes: 2,
            comments: 2,
            category: 'Pregnancy Q&A',
            avatar: require('@/assets/images/ProfPic.png'),
            avatarColor: '#eaf0d4',
        },
        {
            id: 2,
            author: 'Jonathan Timmy',
            timeAgo: '10m lalu',
            content: 'itu kayaknya harus ke dokter bun',
            likes: 1,
            comments: 1,
            category: 'Pregnancy Q&A',
            avatar: require('@/assets/images/ProfPic.png'),
            avatarColor: '#f8d8e9',
        }
    ];

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F7F4' }}>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <View style={{ 
                    backgroundColor: 'white',
                }}>
                    <View style={{ 
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        justifyContent: 'space-between', 
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        backgroundColor: 'white',
                        borderBottomWidth: 1,
                        borderBottomColor: '#f0f0f0',
                    }}>
                    <TouchableOpacity onPress={() => router.push('/(auth)/(tabs)/komunitas')}>
                        <ArrowLeft size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 16, fontWeight: '600' }}>Unggahan</Text>
                    <View style={{ width: 32 }} />
                    </View>
                </View>
                
                {posts.map((post) => (
                    <View key={post.id} style={{ marginBottom: 8, padding: 16,  borderBottomWidth: 1, borderBottomColor: '#f0f0f0' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={post.avatar} style={{ width: 40, height: 40, borderRadius: 20, marginRight: 12, backgroundColor: '#e0e0e0' }} />
                            <View>
                                <ThemedText type='titleSmall' style={{ color: '#3B3B3B' }}>{post.author}</ThemedText>
                                <ThemedText type='labelSmall' style={{ color: '#888' }}>{post.timeAgo}</ThemedText>
                            </View>
                        </View>
                        <Ellipsis size={24} color="#888" />
                    </View>
                    <View>
                        <ThemedText type='labelLarge' style={{ marginBottom: 4, color: '#00030F' }}>{post.title}</ThemedText>
                        <ThemedText type='bodyLarge' style={{ color: '#00030F' }}>{post.content}</ThemedText>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                        <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }} >
                            <Heart size={20} color={'#E75480'} fill={'#E75480'} />
                            <ThemedText type='labelMedium' style={{ marginLeft: 4, color: '#888' }}>{post.likes}</ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => router.push('/(auth)/komentar')}>
                            <MessageCircleMore size={20} color="#888" />
                            <ThemedText type='labelMedium' style={{ marginLeft: 4, color: '#888' }}>{post.comments}</ThemedText>
                        </TouchableOpacity>
                        </View>
                        <View style={{ backgroundColor: '#f0f0f0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 }}>
                        <ThemedText type='labelSmall' style={{ fontSize: 12, color: '#A1A1A1' }}>{post.category}</ThemedText>
                        </View>
                    </View>
                    </View>
                ))}

                <ScrollView>
                    {replies.map((reply) => (
                        <View key={reply.id} style={{ marginBottom: 8, padding: 16 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={reply.avatar} style={{ width: 40, height: 40, borderRadius: 20, marginRight: 12, backgroundColor: '#e0e0e0' }} />
                                <View>
                                    <ThemedText type='titleSmall' style={{ color: '#3B3B3B' }}>{reply.author}</ThemedText>
                                    <ThemedText type='labelSmall' style={{ color: '#888' }}>{reply.timeAgo}</ThemedText>
                                </View>
                            </View>
                            <Ellipsis size={24} color="#888" />
                        </View>
                        <View>
                            <ThemedText type='bodyLarge' style={{ color: '#00030F' }}>{reply.content}</ThemedText>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                            <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }} >
                                <Heart size={20} color={'#E75480'} fill={'#E75480'} />
                                <ThemedText type='labelMedium' style={{ marginLeft: 4, color: '#888' }}>{reply.likes}</ThemedText>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => router.push('/(auth)/komentar')}>
                                <MessageCircleMore size={20} color="#888" />
                                <ThemedText type='labelMedium' style={{ marginLeft: 4, color: '#888' }}>{reply.comments}</ThemedText>
                            </TouchableOpacity>
                            </View>
                        </View>
                        </View>
                    ))}
                </ScrollView>
                
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: isInputFocused ? "#ffffff" : "#F8F7F4",
                    }}
                    >
                    <View
                        style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 12,
                        paddingBottom: Platform.OS === "ios" ? 28 : 12,
                        }}
                    >
                        <TouchableOpacity style={{ marginRight: 8, marginBottom: 20 }}>
                            <LucideImage size={24} color="black" />
                        </TouchableOpacity>

                        <View style={{ flex: 1 }}>
                            <TextInput
                                style={{
                                    minHeight: 40,
                                    maxHeight: 120,
                                    borderWidth: 1,
                                    borderColor: "#e0e0e0",
                                    borderRadius: 20,
                                    paddingHorizontal: 16,
                                    paddingVertical: 10,
                                    fontSize: 14,
                                    textAlignVertical: "center",
                                }}
                                multiline={true}
                                placeholder="Tulis tanggapan"
                                placeholderTextColor="#888"
                                onFocus={() => setIsInputFocused(true)}
                                onBlur={() => setIsInputFocused(false)}
                                maxLength={200}
                                value={inputText}
                                onChangeText={(text) => setInputText(text)}
                            />
                            <Text
                                style={{
                                fontSize: 12,
                                textAlign: "right",
                                marginTop: 4,
                                color: inputText.length >= 200 ? "#FF4D4D" : "#888",
                                fontWeight: inputText.length >= 200 ? "bold" : "normal",
                                }}
                            >
                                {inputText.length >= 200 ? "Maksimal 200 karakter" : `${inputText.length}/200`}
                            </Text>
                        </View>
                        <TouchableOpacity style={{ marginLeft: 8, marginBottom: 20 }}>
                            <Send size={24} color="black" fill="transparent" />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

export default ReplyScreen;