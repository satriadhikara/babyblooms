import React, { useState, useEffect, useRef } from 'react';
import { ThemedText } from "@/components/ui/ThemedText";
import { 
    View,
    ScrollView,
    Pressable,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, AntDesign } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';

const BloomsAI = () => {

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
                    BloomsAI
                </ThemedText>
                <View style={{ width: 24 }} />
            </View>

            <ThemedText type='bodyMedium' style={{ marginTop: 0, marginLeft: 20, marginRight: 20, color: "#A1A1A1", textAlign: "justify", }}>
                BloomsAI merupakan asisten cerdas yang siap membantumu memahami setiap tahap perkembangan bayi, memberikan rekomendasi kesehatan, serta menjawab pertanyaan seputar kehamilan kapan saja.    
            </ThemedText>

            <View style={{ flexDirection: 'row', marginTop: 30, marginLeft: 20, marginRight: 20, marginBottom: 20, flexWrap: 'wrap', justifyContent: "space-between", gap: 16,}} >
                <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#B8D1624D', padding: 10, width: 177, height: 206, gap: 10, borderRadius: 12 }} onPress={() => router.push("/(auth)/bloomCare")}>
                    <View style={{ width: 74, height: 74, borderRadius: 100, backgroundColor: "#B8D162", justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require("../../assets/images/dokterAI.png")} style={{ width: 60, height: 60 }} />
                    </View><ThemedText type='titleMedium' style={{ marginLeft: 5 }}>BloomCare</ThemedText>
                    <ThemedText style={{ marginLeft: 5, fontSize: 14, fontFamily: 'Switzer', fontWeight: 400, textAlign: 'center' }}>Konsultasikan kondisimu dengan AI</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#81B8D533', padding: 10, width: 177, height: 206, gap: 10, borderRadius: 12 }} onPress={() => router.push("/(auth)/nameNest")}>
                    <View style={{ width: 74, height: 74, borderRadius: 100, backgroundColor: "#81B8D5", justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require("../../assets/images/bayiAI.png")} style={{ width: 41, height: 41 }} />
                    </View>
                    <ThemedText type='titleMedium' style={{ marginLeft: 5 }}>NameNest</ThemedText>
                    <ThemedText style={{ marginLeft: 5, fontSize: 14, fontFamily: 'Switzer', fontWeight: 400, textAlign: 'center' }}>Tentukan nama bayimu sekarang</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#5D63A64D', padding: 10, width: 177, height: 206, gap: 10, borderRadius: 12 }} onPress={() => router.push("/(auth)/littleZodiac")}>
                <   View style={{ width: 74, height: 74, borderRadius: 100, backgroundColor: "#5D63A6", justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require("../../assets/images/CrystalBall.png")} style={{ width: 40, height: 40 }} />
                    </View>
                    <ThemedText type='titleMedium' style={{ marginLeft: 5 }}>LittleZodiac</ThemedText>
                    <ThemedText style={{ marginLeft: 5, fontSize: 14, fontFamily: 'Switzer', fontWeight: 400, textAlign: 'center' }}>Cari tahu ramalan horoskop bayimu!</ThemedText>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default BloomsAI;