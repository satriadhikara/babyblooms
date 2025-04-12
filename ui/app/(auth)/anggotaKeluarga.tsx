import React, { useState, useEffect, useRef } from "react";
import { ThemedText } from "@/components/ui/ThemedText";
import {
  View,
  Pressable,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronRight, Plus} from "lucide-react-native";
import { useAuth } from "./_layout";
import { authClient } from "@/utils/auth-client";

const Profil = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  const { session } = useAuth();
  const userName = session?.user.name;
  const userEmail = session?.user.email;
  const userImage = session?.user.image;

  const handleLogout = async () => {
    Alert.alert("Logout", "Apakah Anda yakin ingin keluar?", [
      {
        text: "Batal",
        style: "cancel",
      },
      {
        text: "Keluar",
        style: "destructive",
        onPress: async () => {
          try {
            await authClient.signOut();
            router.replace("/");
          } catch (error) {
            console.error("Error during logout:", error);
            Alert.alert("Error", "Gagal keluar. Silakan coba lagi.");
          }
        },
      },
    ]);
  };
  interface FamilyMember {
    id: number;
    name: string;
    accessType: string;
    image: any;
  }
  
  const familyMembers: FamilyMember[] = [
    {
      id: 1,
      name: "John Simangunsong",
      accessType: "Akses Penuh",
      image: require("@/assets/images/ProfPic.png"),
    },
    {
      id: 2,
      name: "Yusril Simangunsong",
      accessType: "Akses Sebagian",
      image: require("@/assets/images/ProfPic.png"),
    },
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFF",
      }}
    >
        <View style={{ backgroundColor: "#F8F7F4", flex: 1 }}>
            {/* Header */}
            <View
            style={{
                height: 96,
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20,
                marginBottom: 20,
                backgroundColor: "#FFF",
            }}
            >
                <Pressable style={{marginRight:50}} onPress={() => router.back()}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </Pressable>
                <ThemedText type="titleMedium" style={{marginLeft:50}}>Anggota Keluarga</ThemedText>
            </View>
            <View
            style={{
                backgroundColor: "#F8F7F4",
                paddingHorizontal: 20,
                flex: 1,
            }}
            >
                <View style={{flexDirection:"row",alignItems:"center",gap:20,backgroundColor:"#F8F7F4",paddingVertical:20}}>
                    <Image
                        source={
                          session?.user.image
                            ? { uri: session.user.image }
                            : require("@/assets/images/ProfPic.png")
                        }
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                        }}
                    />
                    <View style={{gap:6, justifyContent:"center"}}>
                        <ThemedText type="titleMedium" >{session?.user.name}</ThemedText>
                        <ThemedText type="bodySmall" style={{ color: "#777777" }}>Pemilik</ThemedText>
                    </View>
                </View>
                <View style={{flexDirection:"row",alignItems:"center",gap:6, marginTop:30}}>
                    <ThemedText style={{ color: "#777777",marginBottom:10,fontSize: 13,lineHeight: 20,fontWeight: "600",fontFamily: "PlusJakartaSans_600SemiBold" }}>Anggota Keluarga</ThemedText>
                    <ThemedText style={{ color: "#D33995",marginBottom:10,fontSize: 13,lineHeight: 20,fontWeight: "700",fontFamily: "PlusJakartaSans_700Bold" }}>2</ThemedText>
                </View>
                {familyMembers.map((member) => (
                    <View 
                        key={member.id}
                        style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 20,
                        backgroundColor: "#F8F7F4",
                        paddingVertical: 20,
                        borderBottomWidth: 1,
                        borderBottomColor: "#E0E0E0"
                        }}
                    >
                        <View style={{flexDirection: "row", alignItems: "center", gap: 20}}> 
                        <Image
                            source={member.image}
                            style={{
                            width: 60,
                            height: 60,
                            }}
                        />
                        <View style={{gap: 6, justifyContent: "center"}}>
                            <ThemedText type="titleMedium">{member.name}</ThemedText>
                            <ThemedText type="bodySmall" style={{ color: "#777777" }}>
                            {member.accessType}
                            </ThemedText>
                        </View>
                        </View>
                        <ChevronRight size={24} color="#7E7E7E"/>
                    </View>
                    ))}
            </View>
        </View>
        <TouchableOpacity 
            style={{
                position: 'absolute',
                flexDirection: "row",
                gap: 16,
                bottom: 40,
                left: 30,
                right: 30,
                backgroundColor: '#4697C1',
                borderRadius: 48,
                paddingVertical: 15,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Plus size={24} color="#FFFFFF"/>
            <ThemedText type='titleMedium' style={{ color: "#FFFFFF" }}>
                Undang Keluarga
            </ThemedText>
        </TouchableOpacity>
    </SafeAreaView>
  );
};
export default Profil;
