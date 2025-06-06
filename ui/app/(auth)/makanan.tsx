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
import { Search, ScanLine } from "lucide-react-native";

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
                backgroundColor: "white", 
            }} 
        >
            {/* Header */}
            <View
                style={{
                height: 70,
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: 30,
                paddingHorizontal: 20,
                marginBottom: 20,
                backgroundColor: "white",
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
                    marginBottom: 35,
                }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 40,
                    borderRadius: 48,
                    marginTop: 20,
                    marginLeft: 25,
                    marginRight: 15,
                    marginBottom: 20,
                    backgroundColor: "#EFEFF0",
                    paddingHorizontal: 16,
                }}>
                    <Search size={20} color="#BFBFBF" />
                    <TextInput
                        ref={textInputRef}
                        style={{
                            flex: 1,
                            marginLeft: 8,
                            fontSize: 14,
                            color: "#000000",
                            fontFamily: 'switzer',
                            lineHeight: 20,
                        }}
                        placeholder="Cari nama makanan, minuman"
                        placeholderTextColor="#BFBFBF" 
                        value={entryText}
                        onChangeText={setEntryText}
                    />
                </View>

                <ThemedText type='bodyMedium' style={{ marginTop:7, marginLeft: 20, marginRight: 20, marginBottom:15 , color: "#A1A1A1", textAlign: "justify", }}>
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
                    flexDirection: "row",
                    gap: 16,
                    bottom: 40,
                    left: 30,
                    right: 30,
                    backgroundColor: '#D33995',
                    borderRadius: 48,
                    paddingVertical: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onPress={() => router.push('/(auth)/(tabs)/kamera')}
            >
                <ScanLine size={24} color="#FFFFFF"/>
                <ThemedText type='titleMedium' style={{ color: "#FFFFFF" }}>
                    Ambil foto makanan
                </ThemedText>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default Makanan;