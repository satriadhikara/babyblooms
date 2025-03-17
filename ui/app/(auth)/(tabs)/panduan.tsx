import React, { useState, useEffect, useRef } from 'react';
import { ThemedText } from "@/components/ui/ThemedText";
import { 
    View, 
    SafeAreaView, 
    TouchableOpacity, 
    Image,
    StatusBar,
    ScrollView,
    TextInput
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { Sparkle,ArrowUpRight } from 'lucide-react-native';

const PanduanPage = () => {
    
    const router = useRouter();
    const [entryText, setEntryText] = useState('');
    const textInputRef = useRef(null);

    return (
        <SafeAreaView style={{ flex: 1}}>
            <LinearGradient
                colors={['#F8F7F4', '#F8F7F4']}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                }}
            />
            <ScrollView 
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 90 }}
            >
            
                {/* Header */}
                <ThemedText type='bodyLarge' style={{color: "#000000", fontWeight:"bold", fontSize: 24, marginTop: 60, marginLeft: 30}} >
                    Momspedia
                </ThemedText>

                <TextInput
                    ref={textInputRef}
                    style={{
                        width: 341,
                        height: 40,
                        borderWidth: 1,
                        borderColor: '#E0E0E0',
                        borderRadius: 48,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        textAlignVertical: 'center',
                        marginTop: 10,
                        marginLeft: 30,
                        backgroundColor: "#EFEFF0",
                        fontSize: 14,
                        color: "#000000",
                        fontWeight: 400,
                        fontFamily: 'switzer',
                        lineHeight: 20,
                    }}
                    placeholder="Cari topik, artikel, lainnya"
                    value={entryText}
                    onChangeText={setEntryText}
                    multiline
                    autoFocus
                />
    
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={true}
                    indicatorStyle="black" // Add this to change the color
                    contentContainerStyle={{ paddingRight: 20 }} // Add padding for the indicator
                    style={{
                        padding: 20,
                        marginTop: 10,
                        marginLeft: 10,
                        marginRight: 10,
                    }}
                    scrollIndicatorInsets={{ // Add this to customize the indicator position
                        right: 5,
                        bottom: 0
                    }}
                >
                    {/* BloomsAI */}
                    <TouchableOpacity
                        style={{
                            width: 148,
                            height: 120,
                            backgroundColor: "#0C0C0C",
                            borderRadius: 12,
                            alignItems: "flex-start",
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: 3,
                            marginRight: 10,
                        }}

                        onPress={() => router.push("/(auth)/food")}
                    >
                        <Image
                            source={require("../../../assets/images/bg_image_bloomsAI.png")}
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 12,
                                position: 'absolute',
                                opacity: 0.5,
                            }}
                        />
                        <Image
                            source={require("../../../assets/images/bloomsAI.png")}
                            style={{
                                width: 84,
                                height: 50,
                                marginTop: 21,
                                marginLeft: 16,
                                position: 'absolute',
                            }}
                        />
                        <ThemedText type='titleMedium' style={{ color: "#F8F7F4", top: 80, left: 16 }}>
                            BloomsAI
                        </ThemedText>
                    </TouchableOpacity>
    
                    {/* Makanan & Minuman */}
                    <TouchableOpacity
                        style={{
                        width: 148,
                        height: 120,
                        backgroundColor: "#FFF",
                        borderRadius: 12,
                        padding: 16,
                        alignItems: "flex-start",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 3,
                        marginRight: 10,
                        }}
                    >
                        <ThemedText type='titleMedium' style={{ color: "#000000", top: 80, left: 16, fontWeight: 700, fontFamily: 'switzer', fontSize: 16, lineHeight: 24 }}>
                            Makanan & Minuman
                        </ThemedText>
                    </TouchableOpacity>
    
                    {/* Aktivitas */}
                    <TouchableOpacity
                        style={{
                        width: 148,
                        height: 120,
                        backgroundColor: "#FFF",
                        borderRadius: 12,
                        padding: 16,
                        alignItems: "flex-start",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 3,
                        marginRight: 10,
                        }}
                    >
                        <ThemedText type='titleMedium' style={{ color: "#000000", top: 80, left: 16, fontWeight: 700, fontFamily: 'switzer', fontSize: 16, lineHeight: 24 }}>
                            Aktivitas
                        </ThemedText>
                    </TouchableOpacity>

                    {/* Obat-obatan */}
                    <TouchableOpacity
                        style={{
                        width: 148,
                        height: 120,
                        backgroundColor: "#FFF",
                        borderRadius: 12,
                        padding: 16,
                        alignItems: "flex-start",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 3,
                        marginRight: 10,
                        }}
                    >
                        <ThemedText type='titleMedium' style={{ color: "#000000", top: 80, left: 16, fontWeight: 700, fontFamily: 'switzer', fontSize: 16, lineHeight: 24 }}>
                            Obat-obatan
                        </ThemedText>
                    </TouchableOpacity>
                </ScrollView>
            </ScrollView>
        </SafeAreaView>
    );
}

export default PanduanPage