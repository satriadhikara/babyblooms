import React, { useState, useEffect, useRef } from 'react';
import { ThemedText } from "@/components/ui/ThemedText";
import { 
    View,
    ScrollView,
    Pressable,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search } from "lucide-react-native";

const Obat = () => {

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
            <View
                style={{
                height: 96,
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 20,
                backgroundColor: "white",
                }}
            >
                <Pressable onPress={() => handleBack()}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </Pressable>
                <ThemedText type='titleMedium'>
                    Obat-obatan
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
                        placeholder="Cari obat"
                        placeholderTextColor="#BFBFBF" 
                        value={entryText}
                        onChangeText={setEntryText}
                    />
                </View>

                <ThemedText type='bodyMedium' style={{ marginTop: 20, marginLeft: 20, marginRight: 20, color: "#A1A1A1", textAlign: "justify", }}>
                    Tak yakin obat ini aman untuk kehamilan? Cari nama kimianya di kemasan, lalu klik huruf inisialnya untuk mengetahui lebih lanjut
                </ThemedText>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', margin: 20, gap: 10, justifyContent: 'space-between' }}>
                    {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].map((letter) => (
                        <TouchableOpacity 
                            key={letter} 
                            style={{ 
                                backgroundColor: '#E5E5E5', 
                                borderRadius: 100, 
                                padding: 10, 
                                width: 112, 
                                height: 112, 
                                justifyContent: 'center', 
                                alignItems: 'center',
                                ...(letter === 'Y' || letter === 'Z' ? { marginHorizontal: 35 } : {})
                            }}
                        >
                            <ThemedText type='displaySmall'>{letter}</ThemedText>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Obat;