import React from "react";
import { Tabs } from "expo-router";
import { View, Image, Text, Pressable } from "react-native";
import { Compass } from "lucide-react-native";
import { ThemedText } from "@/components/ui/ThemedText";
import {useRouter} from "expo-router";

export default function TabsLayout() {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 100,
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#e0e0e0",
        },
      }}
    >
      <Tabs.Screen
        name="panduan"
        options={{
          title: "Panduan",
          tabBarIcon: ({ focused }) => (
            <Pressable onPress={() => router.push("/panduan")}>
              <View style={{ paddingTop: 20, width: 100, alignItems: "center", justifyContent: "center" }}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Compass size={24} color={focused ? "#CA5598" : "#888888"} strokeWidth={2} />
                </View>
                <ThemedText style={{ fontSize: 12, lineHeight: 16, fontWeight: "500", fontFamily: "Switzer", marginTop: 4, color: focused ? "#CA5598" : "#888888" }}>
                  Panduan
                </ThemedText>
              </View>
            </Pressable>
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="komunitas"
        options={{
          title: "Komunitas",
          tabBarIcon: ({ focused }) => (
            <Pressable onPress={() => router.push("/komunitas")}>
              <View style={{ paddingTop: 20, width: 100, alignItems: "center", justifyContent: "center" }}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("@/assets/images/Komunitas.png")}
                    style={{ width: 24, height: 24, tintColor: focused ? "#CA5598" : "#888888" }}
                  />
                </View>
                <ThemedText style={{ fontSize: 12, lineHeight: 16, fontWeight: "500", fontFamily: "Switzer", marginTop: 4, color: focused ? "#CA5598" : "#888888" }}>
                  Komunitas
                </ThemedText>
              </View>
            </Pressable>
          ),
          tabBarLabel: () => null,
        }}
      />  
      <Tabs.Screen
        name="jurnal"
        options={{
          title: "Jurnal",
          tabBarIcon: ({ focused }) => (
            <Pressable onPress={() => router.push("/jurnal")}>
              <View style={{ paddingTop: 20, width: 100, alignItems: "center", justifyContent: "center" }}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: focused ? "#CA5598" : "#F8E1EE"
                  }}
                >
                  <Image
                    source={require("@/assets/images/Jurnal.png")}
                    style={{ width: 24, height: 24, tintColor: focused ? "#F8E1EE" : "#CA5598" }}
                  />
                </View>
              </View>
            </Pressable>
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="medis"
        options={{
          title: "Medis",
          tabBarIcon: ({ focused }) => (
            <Pressable onPress={() => router.push("/medis")}>
              <View style={{ paddingTop: 20, width: 100, alignItems: "center", justifyContent: "center" }}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("@/assets/images/Medical.png")}
                    style={{ width: 24, height: 24, tintColor: focused ? "#CA5598" : "#888888" }}
                  />
                </View>
                <ThemedText style={{ fontSize: 12, lineHeight: 16, fontWeight: "500", fontFamily: "Switzer", marginTop: 4, color: focused ? "#CA5598" : "#888888" }}>
                  Medis
                </ThemedText>
              </View>
            </Pressable>
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          tabBarIcon: ({ focused }) => (
            <Pressable onPress={() => router.push("/menu")}>
              <View style={{ paddingTop: 20, width: 100, alignItems: "center", justifyContent: "center" }}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("@/assets/images/Menu.png")}
                    style={{ width: 24, height: 24, tintColor: focused ? "#CA5598" : "#888888" }}
                  />
                </View>
                <ThemedText style={{ fontSize: 12, lineHeight: 16, fontWeight: "500", fontFamily: "Switzer", marginTop: 4, color: focused ? "#CA5598" : "#888888" }}>
                  Menu
                </ThemedText>
              </View>
            </Pressable>
          ),
          tabBarLabel: () => null,
        }}
      />
    </Tabs>
  );
}
