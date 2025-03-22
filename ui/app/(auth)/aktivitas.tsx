import React, { useState, useEffect, useRef } from 'react';
import { ThemedText } from "@/components/ui/ThemedText";
import { 
    View,
    ScrollView,
    Pressable,
    TextInput,
    TouchableOpacity,
    Image,
    Animated
} from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { CircleAlert, HelpCircle, ArrowLeft } from "lucide-react-native";

const Aktivitas = () => {
    const [entryText, setEntryText] = useState('');
    const textInputRef = useRef(null);
    const router = useRouter();
    const handleBack = () => router.back();

    const scrollY = useRef(new Animated.Value(0)).current;
    const headerHeight = scrollY.interpolate({
        inputRange: [0, 50],
        outputRange: [156, 0],
        extrapolate: 'clamp',
    });

    return (
        <View style={{ flex: 1, backgroundColor: "#F8F7F4", paddingHorizontal: 10, position: 'fixed'}}>
            <Animated.View
                style={{
                    height: headerHeight,
                    width: "100%",
                    backgroundColor: "#F8F7F4",
                    overflow: 'hidden',
                }}
            >
                <View
                    style={{
                        height: 96,
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingHorizontal: 20,
                        backgroundColor: "#F8F7F4",
                    }}
                >
                    <Pressable onPress={() => handleBack()}>
                        <ArrowLeft size={24} color="black" />
                    </Pressable>
                    <ThemedText type='titleMedium'>Aktivitas</ThemedText>
                    <Pressable>
                        <HelpCircle size={24} color="black" />
                    </Pressable>
                </View>
                <TextInput
                    ref={textInputRef}
                    style={{
                        height: 40,
                        borderWidth: 1,
                        borderColor: '#E0E0E0',
                        borderRadius: 48,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        marginHorizontal: 10,
                        backgroundColor: "#EFEFF0",
                        fontSize: 14,
                        color: "#000000",
                        fontFamily: 'switzer',
                    }}
                    placeholder="Cari aktivitas"
                    value={entryText}
                    onChangeText={setEntryText}
                    multiline
                />
            </Animated.View>
            
            {/* Fixed Tabs */}
            <View style={{ height: 52, width: "100%", backgroundColor: "#F8F7F4", position: 'sticky', top: 0, zIndex: 10 }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                    {["Terkait Bepergian", "Olahraga", "Kesehatan", "Hiburan", "Fashion", "Rumah Tangga", "Gerakan Tubuh", "Kecantikan & Kosmetik", "Perawatan Rambut"].map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={{
                                height: 52,
                                paddingHorizontal: 16,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <ThemedText type='titleSmall'>{item}</ThemedText>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <Animated.ScrollView 
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { y: scrollY } } }
                ], { useNativeDriver: false })}
            >
                {[...Array(20)].map((_, index) => (
                    <View key={index} style={{
                        height: "auto",
                        width: "100%",
                        backgroundColor: "#F8F7F4",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        marginBottom: 10,
                    }}>
                        <View style={{
                            width: "100%",
                            height: 64,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <Image
                                source={require("../../assets/images/BgAktivitas.png")}
                                style={{ width: 64, height: 64, borderRadius: 12 }}
                            />
                            <ThemedText style={{ width: 224, fontFamily: "switzer", fontSize: 16 }}>
                                Aktivitas #{index + 1} - Bolehkah saya belajar menyetir mobil?
                            </ThemedText>
                            <CircleAlert size={24} color="#FFDD00" />
                        </View>
                    </View>
                ))}
            </Animated.ScrollView>
        </View>
    );
}

export default Aktivitas;