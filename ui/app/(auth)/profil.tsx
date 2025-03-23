import React, { useState, useEffect, useRef } from 'react';
import { ThemedText } from "@/components/ui/ThemedText";
import { 
    View,
    Pressable,
    TouchableOpacity,
    Image,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, Ellipsis } from 'lucide-react-native';
import { useAuth } from './_layout';

const Profil = () => {

    const router = useRouter();
    const handleBack = () => {
        router.back();
    }

    const { session } = useAuth();
    const userName = session?.user.name;
    const userEmail = session?.user.email;
    const userImage = session?.user.image;

    return (
        <SafeAreaView 
            style={{ 
                flex: 1, 
                backgroundColor: "#FFF", 
            }} 
        >
            <View style={{ backgroundColor: "#F8F7F4" }}>      
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
                    backgroundColor: "#FFF",
                }}
                >
                    <Pressable onPress={() => handleBack()}>
                        <AntDesign name="arrowleft" size={24} color="black" />
                    </Pressable>
                    <ThemedText type='titleMedium'>
                        Edit Profil
                    </ThemedText>
                    <Pressable>
                        <Ellipsis color={'#000'} size={24}/>
                    </Pressable>
                </View>
                <View
                    style={{
                        backgroundColor: "#F8F7F4",
                        paddingHorizontal: 20,
                        height: "100%",
                    }}
                >
                    <View style={{ flexDirection: "column", alignItems: "center", gap: 20, marginBottom: 20 }}>
                        <View
                            style={{
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 20,
                                backgroundColor: "#F8F7F4",
                                paddingVertical: 15,
                            }}
                        >
                            <Image
                                source={
                                    userImage
                                        ? { uri: userImage }
                                        : require("@/assets/images/ProfPic.png")
                                }
                                style={{
                                    width: 100,
                                    height: 100,
                                    resizeMode: "contain",
                                    borderRadius: 100,
                                }}
                            />
                            <View style={{ gap: 4, alignItems: "center" }}>
                                <ThemedText type="titleLarge">{userName}</ThemedText>
                                <ThemedText type="bodyMedium" style={{ color: "#7E7E7E" }}>
                                    {userEmail}
                                </ThemedText>
                            </View>
                        </View>
                        {/* edit nama atau email */}
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                paddingVertical: 15,
                                width: "100%",
                                marginHorizontal: 34,
                                
                            }}
                        >
                            <ThemedText type="bodyMedium" style={{ color: "#000" }}>
                                Nama
                            </ThemedText>
                            <TouchableOpacity
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <ThemedText type="bodyMedium" style={{ color: "#000" }}>
                                    {userName}
                                </ThemedText>
                                <ChevronRight size={20} color="#000" />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                paddingVertical: 15,
                                width: "100%",
                                marginHorizontal: 34,
                                
                            }}
                        >
                            <ThemedText type="bodyMedium" style={{ color: "#000" }}>
                                Email
                            </ThemedText>
                            <ThemedText type="bodyMedium" style={{ color: "#000" }}>
                                {userEmail}
                            </ThemedText>
                        </View>
                    </View>    
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Profil;