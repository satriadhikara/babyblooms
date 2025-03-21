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
                contentContainerStyle={{ paddingBottom: 30 }}
            >
            
                {/* Header */}
                <ThemedText type='bodyLarge' style={{color: "#000000", fontWeight:"bold", fontSize: 24, marginTop: 60, marginLeft: 25}} >
                    Momspedia
                </ThemedText>

                <TextInput
                    ref={textInputRef}
                    style={{
                        height: 40,
                        borderWidth: 1,
                        borderColor: '#E0E0E0',
                        borderRadius: 48,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        textAlignVertical: 'center',
                        marginTop: 20,
                        marginLeft: 25,
                        marginRight: 15,
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
                    showsHorizontalScrollIndicator={false}
                    style={{
                        marginTop: 30,
                        marginLeft: 25,
                        marginRight: 25,
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
                            marginRight: 12,
                        }}

                        onPress={() => router.push("/(auth)/kamera")}
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
                            backgroundColor: "#0C0C0C",
                            borderRadius: 12,
                            alignItems: "flex-start",
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: 3,
                            marginRight: 12,
                        }}

                        onPress={() => router.push("/(auth)/makanan")}
                    >
                        <Image
                            source={require("../../../assets/images/BgMakanan.png")}
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 12,
                                position: 'absolute',
                                opacity: 0.5,
                            }}
                        />
                        <ThemedText type='titleMedium' style={{ color: "#F8F7F4", top: 64, left: 16 }}>
                            Makanan & Minuman
                        </ThemedText>
                    </TouchableOpacity>
    
                    {/* Aktivitas */}
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
                            marginRight: 12,
                        }}

                        onPress={() => router.push("/(auth)/aktivitas")}
                    >
                        <Image
                            source={require("../../../assets/images/BgAktivitas.png")}
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 12,
                                position: 'absolute',
                                opacity: 0.5,
                            }}
                        />
                        <ThemedText type='titleMedium' style={{ color: "#F8F7F4", top: 84, left: 16 }}>
                            Aktivitas
                        </ThemedText>
                    </TouchableOpacity>

                    {/* Obat - obatan */}
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
                            marginRight: 12,
                        }}

                        onPress={() => router.push("/(auth)/obat")}
                    >
                        <Image
                            source={require("../../../assets/images/BgObat-Obatan.png")}
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 12,
                                position: 'absolute',
                                opacity: 0.5,
                            }}
                        />
                        <ThemedText type='titleMedium' style={{ color: "#F8F7F4", top: 84, left: 16 }}>
                            Obat - obatan
                        </ThemedText>
                    </TouchableOpacity>
                </ScrollView>

                <ThemedText style={{color: "#000000", fontWeight:"bold", fontSize: 20, lineHeight:28, marginTop: 30, marginLeft: 25, fontFamily: 'PlusJakartaSans_700Bold' }} >
                    Rekomendasi
                </ThemedText>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{
                        marginTop: 10,
                        marginLeft: 25,
                        marginRight: 25,
                    }}
                    scrollIndicatorInsets={{ // Add this to customize the indicator position
                        right: 5,
                        bottom: 0
                    }}
                >
                    {/* Berita 1 */}
                    <TouchableOpacity
                        style={{
                            width: 280,
                            height: 180,
                            backgroundColor: "#000",
                            borderRadius: 24,
                            alignItems: "flex-start",
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: 3,
                            marginRight: 12,
                        }}
                    >
                        <Image
                            source={require("../../../assets/images/BgRekomendasiImunisasi.png")}
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 24,
                                position: 'absolute',
                            }}
                        />
                    </TouchableOpacity>
    
                    {/* Berita 2 */}
                    <TouchableOpacity
                        style={{
                            width: 280,
                            height: 180,
                            backgroundColor: "#000",
                            borderRadius: 24,
                            alignItems: "flex-start",
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: 3,
                            marginRight: 12,
                        }}
                    >
                        <Image
                            source={require("../../../assets/images/BgRekomendasiUSG.png")}
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 24,
                                position: 'absolute',
                            }}
                        />
                        <ThemedText type='titleMedium' style={{ color: "#F8F7F4", top: 80, left: 16 }}>
                            Berita 2
                        </ThemedText>
                    </TouchableOpacity>
    
                    {/* Berita 3 */}
                    <TouchableOpacity
                        style={{
                            width: 280,
                            height: 180,
                            backgroundColor: "#000",
                            borderRadius: 24,
                            alignItems: "flex-start",
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: 3,
                        }}
                    >
                        <Image
                            source={require("../../../assets/images/BgRekomendasiHamil.png")}
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 24,
                                position: 'absolute',
                            }}
                        />
                    </TouchableOpacity>
                </ScrollView>

                <ThemedText style={{color: "#000000", fontWeight:"bold", fontSize: 20, lineHeight:28, marginTop: 30, marginLeft: 25, fontFamily: 'PlusJakartaSans_700Bold' }} >
                    Artikel Seputar Kehamilan
                </ThemedText>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{
                        marginTop: 10,
                        marginLeft: 25,
                        marginRight: 25,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            width: 77,
                            height: 26,
                            backgroundColor: "#4A4F87",
                            borderRadius: 100,
                            alignItems: "center",
                            justifyContent: "center",
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: 3,
                            marginRight: 6,
                        }}
                    >
                        <ThemedText
                            style={{ 
                                fontSize: 14, 
                                color: "#FAFAFA", 
                                fontFamily: 'switzer', 
                                fontWeight: 500, 
                            }}
                        >
                            Semua
                        </ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            width: 100,
                            height: 26,
                            backgroundColor: "#4A4F87",
                            borderRadius: 100,
                            alignItems: "center",
                            justifyContent: "center",
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: 3,
                            marginRight: 6,
                        }}
                    >
                        <ThemedText
                            style={{ 
                                fontSize: 14, 
                                color: "#FAFAFA", 
                                fontFamily: 'switzer', 
                                fontWeight: 500, 
                            }}
                        >
                            Kesehatan
                        </ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            width: 105,
                            height: 26,
                            backgroundColor: "#4A4F87",
                            borderRadius: 100,
                            alignItems: "center",
                            justifyContent: "center",
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: 3,
                            marginRight: 6,
                        }}
                    >
                        <ThemedText
                            style={{ 
                                fontSize: 14, 
                                color: "#FAFAFA", 
                                fontFamily: 'switzer', 
                                fontWeight: 500, 
                            }}
                        >
                            Gaya Hidup
                        </ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            width: 91,
                            height: 26,
                            backgroundColor: "#4A4F87",
                            borderRadius: 100,
                            alignItems: "center",
                            justifyContent: "center",
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: 3,
                        }}
                    >
                        <ThemedText
                            style={{ 
                                fontSize: 14, 
                                color: "#FAFAFA", 
                                fontFamily: 'switzer', 
                                fontWeight: 500, 
                            }}
                        >
                            Olahraga
                        </ThemedText>
                    </TouchableOpacity>
                </ScrollView>
                {/* Artikel 1 */}
                <TouchableOpacity
                    style={{
                        height: 108,
                        backgroundColor: "#FFF",
                        borderRadius: 12,
                        alignItems: "flex-start",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 3,
                        marginTop: 20,
                        marginLeft: 25,
                        marginRight: 25,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignContent: "center",
                    }}
                >
                    <View
                        style={{
                            width: 146,
                            height: 108,
                            borderRadius: 12,
                            alignItems: "center",
                            backgroundColor: "#000000",
                        }}
                    >
                        <Image
                            source={require("../../../assets/images/HamilKosong.png")}
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 12,
                                position: 'absolute',
                            }}
                        />
                    </View>
                    <View
                        style={{
                            width: 200,
                            height: 108,
                            borderRadius: 12,
                            alignItems: "center",
                            backgroundColor: "#000000",
                        }}
                    >
                        <ThemedText
                            style={{
                                fontSize: 14,
                                color: "#FFFFFF",
                                fontFamily: 'switzer',
                                fontWeight: 400,
                                lineHeight: 20,
                            }}
                        >
                            Artikel 1
                        </ThemedText>
                    </View>
                </TouchableOpacity>
                {/* Artikel 2 */}
                <TouchableOpacity
                    style={{
                        height: 108,
                        backgroundColor: "#FFF",
                        borderRadius: 12,
                        alignItems: "flex-start",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 3,
                        marginTop: 20,
                        marginLeft: 25,
                        marginRight: 25,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignContent: "center",
                    }}
                >
                    <View
                        style={{
                            width: 146,
                            height: 108,
                            borderRadius: 12,
                            alignItems: "center",
                            backgroundColor: "#000000",
                        }}
                    >
                        <Image
                            source={require("../../../assets/images/GulaDarahMelonjak.png")}
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 12,
                                position: 'absolute',
                            }}
                        />
                    </View>
                    <View
                        style={{
                            width: 200,
                            height: 108,
                            borderRadius: 12,
                            alignItems: "center",
                            backgroundColor: "#000000",
                        }}
                    >
                        <ThemedText
                            style={{
                                fontSize: 14,
                                color: "#FFFFFF",
                                fontFamily: 'switzer',
                                fontWeight: 400,
                                lineHeight: 20,
                            }}
                        >
                            Artikel 2
                        </ThemedText>
                    </View>
                </TouchableOpacity>
                {/* Artikel 3 */}
                <TouchableOpacity
                    style={{
                        height: 108,
                        backgroundColor: "#FFF",
                        borderRadius: 12,
                        alignItems: "flex-start",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 3,
                        marginTop: 20,
                        marginLeft: 25,
                        marginRight: 25,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignContent: "center",
                    }}
                >
                    <View
                        style={{
                            width: 146,
                            height: 108,
                            borderRadius: 12,
                            alignItems: "center",
                            backgroundColor: "#000000",
                        }}
                    >
                        <Image
                            source={require("../../../assets/images/PentingnyaOlahraga.png")}
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 12,
                                position: 'absolute',
                            }}
                        />
                    </View>
                    <View
                        style={{
                            width: 200,
                            height: 108,
                            borderRadius: 12,
                            alignItems: "center",
                            backgroundColor: "#000000",
                        }}
                    >
                        <ThemedText
                            style={{
                                fontSize: 14,
                                color: "#FFFFFF",
                                fontFamily: 'switzer',
                                fontWeight: 400,
                                lineHeight: 20,
                            }}
                        >
                            Artikel 3
                        </ThemedText>
                    </View>
                </TouchableOpacity>
                {/* Artikel 4 */}
                <TouchableOpacity
                    style={{
                        height: 108,
                        backgroundColor: "#FFF",
                        borderRadius: 12,
                        alignItems: "flex-start",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 3,
                        marginTop: 20,
                        marginLeft: 25,
                        marginRight: 25,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignContent: "center",
                    }}
                >
                    <View
                        style={{
                            width: 146,
                            height: 108,
                            borderRadius: 12,
                            alignItems: "center",
                            backgroundColor: "#000000",
                        }}
                    >
                        <Image
                            source={require("../../../assets/images/GayaHidupBumil.png")}
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 12,
                                position: 'absolute',
                            }}
                        />
                    </View>
                    <View
                        style={{
                            width: 200,
                            height: 108,
                            borderRadius: 12,
                            alignItems: "center",
                            backgroundColor: "#000000",
                        }}
                    >
                        <ThemedText
                            style={{
                                fontSize: 14,
                                color: "#FFFFFF",
                                fontFamily: 'switzer',
                                fontWeight: 400,
                                lineHeight: 20,
                            }}
                        >
                            Artikel 4
                        </ThemedText>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

export default PanduanPage