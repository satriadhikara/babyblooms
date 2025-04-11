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
import { ChevronRight, Ellipsis, LogOut } from "lucide-react-native";
import { useAuth } from "./_layout";
import { authClient } from "@/utils/auth-client";

const EditProfil = () => {
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
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            marginBottom: 20,
            backgroundColor: "#FFF",
          }}
        >
          <Pressable onPress={() => router.back()}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </Pressable>
          <ThemedText type="titleMedium">Edit Profil</ThemedText>
          <Pressable>
            <Ellipsis color={"#000"} size={24} />
          </Pressable>
        </View>
        <View
          style={{
            backgroundColor: "#F8F7F4",
            paddingHorizontal: 20,
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
              marginBottom: 20,
            }}
          >
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

          {/* Logout Button - positioned at the bottom */}
          <View style={{
            position: "absolute",
            bottom: 40,
            left: 0,
            right: 0,
            alignItems: "center",
            paddingHorizontal: 20}}
          >
            <TouchableOpacity
              style={{    
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#FFF",
                  paddingVertical: 15,
                  paddingHorizontal: 30,
                  borderRadius: 30,
                  width: "80%",
                  borderWidth: 1,
                  borderColor: "#D33995",
                  elevation: 1,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 1
                }}
              onPress={handleLogout}
            >
              <LogOut size={20} color="#D33995" />
              <ThemedText type="bodyLarge" style={{color: "#D33995", marginLeft: 10, fontWeight: "500"}}>
                Keluar
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoutText: {
    color: "#D33995",
    marginLeft: 10,
    fontWeight: "500",
  },
});

export default EditProfil;
