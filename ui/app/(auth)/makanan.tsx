import React, { useState, useEffect, useRef } from 'react';
import { ThemedText } from "@/components/ui/ThemedText";
import { 
    View,
    ScrollView,
    Pressable,
    TextInput,
    Touchable,
    TouchableOpacity,
    Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, AntDesign } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';

const Makanan = () => {

    const [entryText, setEntryText] = useState('');
    const textInputRef = useRef(null);

    const router = useRouter();
    const handleBack = () => {
        router.back();
    }

    return (
        <SafeAreaView 
            style={{ 
                flex: 1, 
                backgroundColor: "#F8F7F4", 
            }} 
        >
            {/* Header */}
            <View
                style={{
                height: 96,
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 20,
                marginBottom: 20,
                backgroundColor: "#F8F7F4",
                }}
            >
                <Pressable onPress={() => handleBack()}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </Pressable>
                <ThemedText type='titleMedium'>
                    Makanan & Minuman
                </ThemedText>
                <Pressable>
                    <Feather name="help-circle" size={24} color="black" />
                </Pressable>
            </View>
            
            <ScrollView
                style={{
                    flex: 1,
                    backgroundColor: "#F8F7F4",
                }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
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
                        marginTop: 10,
                        marginLeft: 20,
                        marginRight: 20,
                        backgroundColor: "#EFEFF0",
                        fontSize: 14,
                        color: "#000000",
                        fontWeight: 400,
                        fontFamily: 'switzer',
                        lineHeight: 20,
                    }}
                    placeholder="Cari nama makanan, minuman"
                    value={entryText}
                    onChangeText={setEntryText}
                    multiline
                    autoFocus
                />

                <ThemedText type='bodyMedium' style={{ marginTop: 20, marginLeft: 20, marginRight: 20, color: "#A1A1A1", textAlign: "justify", }}>
                    Cari tahu makanan dan minuman yang aman selama kehamilan! Gunakan pencarian atau ambil foto makananmu dan BloomsAI akan membantu menganalisis dan memberi informasi apakah makananmu aman dikonsumsi.
                </ThemedText>

                <ThemedText style={{color: "#000000", fontWeight:"bold", fontSize: 20, lineHeight:28, marginLeft: 20, fontFamily: 'PlusJakartaSans_700Bold' }} >
                    Kategori
                </ThemedText>
                
                <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 20, marginRight: 20, marginBottom: 20, width: "100%", flexWrap: 'wrap' }} >
                    <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F7F4', padding: 10, width: 186, height: 186, gap: 10 }}>
                        <Image source={require("../../assets/images/biji-bijian.png")} style={{ width: 112, height: 112, borderRadius: 100, }} />
                        <ThemedText type='titleSmall' style={{ marginLeft: 5 }}>Biji-bijian</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F7F4', padding: 10, width: 186, height: 186, gap: 10 }}>
                        <Image source={require("../../assets/images/sayuranDanJamur.png")} style={{ width: 112, height: 112, borderRadius: 100, }} />
                        <ThemedText type='titleSmall' style={{ marginLeft: 5 }}>Sayuran & Jamur</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F7F4', padding: 10, width: 186, height: 186, gap: 10 }}>
                        <Image source={require("../../assets/images/kacang-kacanganan.png")} style={{ width: 112, height: 112, borderRadius: 100, }} />
                        <ThemedText type='titleSmall' style={{ marginLeft: 5 }}>Kacang-kacangan</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F7F4', padding: 10, width: 186, height: 186, gap: 10 }}>
                        <Image source={require("../../assets/images/makananOlahan.png")} style={{ width: 112, height: 112, borderRadius: 100, }} />
                        <ThemedText type='titleSmall' style={{ marginLeft: 5 }}>Makanan olahan</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F7F4', padding: 10, width: 186, height: 186, gap: 10 }}>
                        <Image source={require("../../assets/images/buah-buahan.png")} style={{ width: 112, height: 112, borderRadius: 100, }} />
                        <ThemedText type='titleSmall' style={{ marginLeft: 5 }}>Buah-buahan</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F7F4', padding: 10, width: 186, height: 186, gap: 10 }}>
                        <Image source={require("../../assets/images/bumbuMakanan.png")} style={{ width: 112, height: 112, borderRadius: 100, }} />
                        <ThemedText type='titleSmall' style={{ marginLeft: 5 }}>Bumbu makanan</ThemedText>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <TouchableOpacity 
                style={{
                    position: 'absolute',
                    bottom: 40,
                    left: 30,
                    right: 30,
                    backgroundColor: '#D33995',
                    borderRadius: 48,
                    paddingVertical: 15,
                    alignItems: 'center',
                }}
                onPress={() => router.push("/(auth)/kamera")}
            >
                <ThemedText type='titleMedium' style={{ color: "#FFFFFF" }}>
                    Ambil foto makanan
                </ThemedText>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default Makanan;