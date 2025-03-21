import React, { useState, useEffect, useRef } from 'react';
import { ThemedText } from "@/components/ui/ThemedText";
import { 
    View,
    ScrollView,
    Pressable,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, AntDesign } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { CircleAlert } from "lucide-react-native";

const Aktivitas = () => {

    const [entryText, setEntryText] = useState('');
    const textInputRef = useRef(null);

    const router = useRouter();
    const handleBack = () => {
        router.back();
    }

    return (
        <ScrollView 
            style={{ 
                flex: 1, 
                backgroundColor: "#F8F7F4", 
            }} 
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        >
            {/* Header */}
            <View
                style={{
                height: 156,
                width: "100%",
                flexDirection: "column",
                paddingHorizontal: 20,
                backgroundColor: "#FFFFFF",
                }}
            >
                <View
                    style={{
                    height: 96,
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 10,
                    backgroundColor: "#FFFFFF",
                    }}
                >
                    <Pressable onPress={() => handleBack()}>
                        <AntDesign name="arrowleft" size={24} color="black" />
                    </Pressable>
                    <ThemedText type='titleMedium'>
                        Aktivitas
                    </ThemedText>
                    <Pressable>
                        <Feather name="help-circle" size={24} color="black" />
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
                        textAlignVertical: 'center',
                        marginLeft: 10,
                        marginRight: 10,
                        backgroundColor: "#EFEFF0",
                        fontSize: 14,
                        color: "#000000",
                        fontWeight: 400,
                        fontFamily: 'switzer',
                        lineHeight: 20,
                    }}
                    placeholder="Cari aktivitas"
                    value={entryText}
                    onChangeText={setEntryText}
                    multiline
                    autoFocus
                />
            </View>
            <ScrollView 
                horizontal
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={true}
                    style={{
                        height: 52,
                        width: "100%",
                        flexDirection: "row",
                    }}
                >
                    <TouchableOpacity
                        style={{
                            height: 52,
                            width: 161,
                            backgroundColor: "#FFFFFF",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <ThemedText type='titleSmall'>
                            Terkait Bepergian
                        </ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            height: 52,
                            width: 104,
                            backgroundColor: "#FFFFFF",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <ThemedText type='titleSmall'>
                            Olahraga
                        </ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            height: 52,
                            width: 113,
                            backgroundColor: "#FFFFFF",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <ThemedText type='titleSmall'>
                            Kesehatan
                        </ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            height: 52,
                            width: 94,
                            backgroundColor: "#FFFFFF",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <ThemedText type='titleSmall'>
                            Hiburan
                        </ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            height: 52,
                            width: 94,
                            backgroundColor: "#FFFFFF",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <ThemedText type='titleSmall'>
                            Fashion
                        </ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            height: 52,
                            width: 141,
                            backgroundColor: "#FFFFFF",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <ThemedText type='titleSmall'>
                            Rumah Tangga
                        </ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            height: 52,
                            width: 143,
                            backgroundColor: "#FFFFFF",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <ThemedText type='titleSmall'>
                            Gerakan Tubuh
                        </ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            height: 52,
                            width: 200,
                            backgroundColor: "#FFFFFF",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <ThemedText type='titleSmall'>
                            Kecantikan & Kosmentik
                        </ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            height: 52,
                            width: 172,
                            backgroundColor: "#FFFFFF",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <ThemedText type='titleSmall'>
                            Perawatan Rambut
                        </ThemedText>
                    </TouchableOpacity>
            </ScrollView>
            <View
                style={{
                    height: "auto",
                    width: "100%",
                    backgroundColor: "#FFFFFF",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                }}
            >
                <View
                    style={{
                        width: "100%",
                        height: 64,
                        backgroundColor: "#FFFFFF",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <Image
                        source={require("../../assets/images/BgAktivitas.png")}
                        style={{
                            width: 64,
                            height: 64,
                            borderRadius: 12,
                        }}
                    />
                    <ThemedText style={{ width: 224, fontFamily: "switzer", fontWeight: 400, fontSize: 16, lineHeight: 20  }}>
                        Bolehkah saya belajar menyetir mobil?
                    </ThemedText>
                    <CircleAlert size={24} color="#FFDD00" />
                </View>
            </View>
        </ScrollView>
    );
}

export default Aktivitas;