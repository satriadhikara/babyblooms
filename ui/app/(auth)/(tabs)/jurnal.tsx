import React, { useState, useEffect } from 'react';
import { 
View, 
Text, 
SafeAreaView, 
TouchableOpacity, 
Image,
StatusBar,
ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter, Router } from "expo-router";

const PregnancyTrackerApp = () => {
const today = 24; 
const daysOfWeek = ['M', 'S', 'S', 'R', 'K', 'J', 'S'];
const dates = [23, 24, 25, 26, 27, 28, 29];

// Add dummy pregnancy data state
const [pregnancyData, setPregnancyData] = useState({
    week: 10,
    day: 4,
    dueDate: '1 Okt 2025',
    daysLeft: 246,
    trimester: 1
});

const Router = useRouter();

// Simulate data update every 24 hours
useEffect(() => {
    const timer = setInterval(() => {
    setPregnancyData(prev => ({
        ...prev,
        day: prev.day + 1,
        daysLeft: prev.daysLeft - 1,
        // Reset day counter and increment week when day reaches 7
        ...(prev.day >= 7 ? { day: 1, week: prev.week + 1 } : {})
    }));
    }, 86400000); // 24 hours in milliseconds

    return () => clearInterval(timer);
}, []);

return (
    <SafeAreaView style={{ flex: 1}}>
        <LinearGradient
            colors={['#F8DEED', '#FFFFFF']}
            style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
            }}
        />
        <StatusBar barStyle="dark-content" />

        <ScrollView 
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 90 }}
        >
        
            {/* Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 60, paddingBottom: 30 }}>
                <View>
                    <Text style={{ fontSize: 14, color: '#666' }}>Selamat pagi,</Text>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', fontFamily: 'Plus-Jakarta-Sans', color: '#333', marginTop: 5 }}>Fiona Siregar</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                        <Ionicons name="flame" size={16} color="#FF5722" />
                        <Text style={{ marginLeft: 4, fontSize: 14, fontWeight: 'bold' }}>23</Text>
                    </View>
                    <TouchableOpacity>
                        <Ionicons name="notifications-outline" size={24} color="#333" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Calendar */}
            <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    {daysOfWeek.map((day, index) => (
                        <Text key={`day-${index}`} style={{ width: 36, textAlign: 'center', fontSize: 12, color: '#E91E63', fontWeight: '500' }}>{day}</Text>
                    ))}
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
                    {dates.map((date, index) => (
                        <View 
                        key={`date-${index}`} 
                        style={{ 
                            width: 36, height: 36, borderRadius: 20, alignItems: 'center', justifyContent: 'center',
                            backgroundColor: date === today ? '#FFF' : 'transparent'
                        }}
                        >
                            <Text 
                                style={{ fontSize: 16, fontWeight: '500', color: date === today ? '#E91E63' : '#000' }}
                            >
                                {date}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Fetus Visualization */}
            <View style={{ alignItems: 'center', marginTop: 20, position: 'relative' }}>
                <Image 
                    source={require('@/assets/images/yusril.png')}
                    style={{ width: 400, height: 400, resizeMode: 'contain' }}
                />
                <TouchableOpacity style={{ 
                        position: 'absolute', right: 50, bottom: 10, backgroundColor: '#FFF',
                        width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center',
                        shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2
                    }}>
                    <Feather name="volume-2" size={20} color="#4CAF50" />
                </TouchableOpacity>
            </View>

            <LinearGradient
                colors={["#C85A9D", "#C85A9D"]}
                style={{
                    borderRadius: 12,
                    padding: 16,
                    marginHorizontal: 20,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                }}
            >
                {/* Header Text */}
                <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "bold" }}>
                    {pregnancyData.daysLeft} Hari lagi!
                </Text>
                <Text style={{ color: "#FFF", opacity: 0.8, marginTop: 4 }}>
                    Trimester {pregnancyData.trimester}
                </Text>

                {/* HPL & Edit */}
                <View
                    style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 6,
                    }}
                >
                    <Text style={{ color: "#FFF", fontSize: 14, fontWeight: "bold" }}>
                    HPL: {pregnancyData.dueDate}
                    </Text>
                    <TouchableOpacity>
                    <Text style={{ color: "#FFF", fontSize: 14, textDecorationLine: "underline" }}>
                        Edit
                    </Text>
                    </TouchableOpacity>
                </View>

                {/* Progress Bar */}
                <View
                    style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                    }}
                >
                    <View
                        style={{
                            height: 6,
                            flex: 1,
                            backgroundColor: "#4A0D32",
                            borderRadius: 3,
                            marginRight: 4,
                        }}
                    />
                    <View
                        style={{
                            height: 6,
                            flex: 1,
                            backgroundColor: "#E89AC7",
                            borderRadius: 3,
                            marginRight: 4,
                        }}
                    />
                    <View
                        style={{
                            height: 6,
                            flex: 1,
                            backgroundColor: "#E89AC7",
                            borderRadius: 3,
                        }}
                    />
                </View>

                {/* Button */}
                <TouchableOpacity
                    style={{
                    marginTop: 14,
                    backgroundColor: "#FFF",
                    paddingVertical: 12,
                    borderRadius: 30,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    }}

                    onPress={() => Router.push("/panduan")}
                >
                    <Feather name="plus" size={20} color="#C85A9D" />
                    <Text style={{ color: "#C85A9D", fontSize: 16, fontWeight: "bold", marginLeft: 8 }}>
                    Lacak kontraksimu!
                    </Text>
                </TouchableOpacity>
            </LinearGradient>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ padding: 20, marginTop: 20 }}
            >
                {/* Size Comparison Card */}
                <View
                    style={{
                    width: 165,
                    backgroundColor: "#FFF",
                    borderRadius: 12,
                    padding: 16,
                    alignItems: "flex-start",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                    marginRight: 10,
                    }}
                >
                    <Text style={{ fontWeight: "bold", color: "#333", marginBottom: 8 }}>
                        Bayimu seukuran
                    </Text>
                    <Text style={{ fontWeight: "bold", fontSize: 16, color: "#000" }}>
                        Buah Manggis
                    </Text>
                    <View style={{ width:135, marginTop: 10, alignItems: "center" }}>
                        <Image
                            source={require('@/assets/images/manggis.png')}
                            style={{ width: 80, height: 80, marginTop: 10 }}
                            resizeMode="contain"
                        />
                    </View>
                </View>

                {/* Baby Development Card */}
                <View
                    style={{
                    width: 342,
                    backgroundColor: "#FFF",
                    borderRadius: 12,
                    padding: 16,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                    marginRight: 10,
                    }}
                >
                    <Text style={{ fontWeight: "bold", color: "#D43066", fontSize: 16 }}>
                        Si kecil pada minggu ke-10
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginVertical: 8,
                        }}
                    >
                        <Text style={{ fontWeight: "bold", color: "#777" }}>Tinggi</Text>
                        <Text style={{ fontWeight: "bold", color: "#777" }}>Berat</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text style={{ fontWeight: "bold", color: "#000" }}>3.1 cm</Text>
                        <Text style={{ fontWeight: "bold", color: "#000" }}>4.0 g</Text>
                    </View>
                    <Text
                        style={{ color: "#333", marginTop: 10, fontSize: 14, lineHeight: 20 }}
                    >
                        Aku bukan embrio lagi. Sekarang aku sudah menjadi janin! Jari-jariku
                        sempurna, dan sikuku bisa menekuk. Aku juga mulai menelan dan
                        menendang kecil.
                    </Text>
                </View>

                {/* Tips Card */}
                <View
                    style={{
                    width: 342,
                    backgroundColor: "#FFF",
                    borderRadius: 12,
                    padding: 16,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                    marginRight: 40,
                    }}
                >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text
                            style={{
                            fontWeight: "bold",
                            color: "#3B82F6",
                            fontSize: 16,
                            marginLeft: 6,
                            }}
                        >
                            Tips untuk Minggu ke-10
                        </Text>
                    </View>
                    <Text
                        style={{ color: "#333", marginTop: 10, fontSize: 14, lineHeight: 20 }}
                    >
                        Pada minggu ke-10 kehamilan, tubuh terus beradaptasi dengan berbagai perubahan hormon yang dapat menyebabkan kelelahan, mual, dan sensitivitas terhadap makanan atau bau tertentu. Meskipun ini bisa menjadi masa yang menantang, ada banyak cara untuk tetap merasa sehat dan nyaman. Dengan pola makan...
                    </Text>
                </View>
            </ScrollView>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={{ 
            flexDirection: 'row', position: 'absolute', bottom: 0, left: 0, right: 0, 
            backgroundColor: '#FFF', height: 70, borderTopWidth: 1, borderTopColor: '#F0F0F0'
        }}>
            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Feather name="book-open" size={22} color="#999" />
                <Text style={{ fontSize: 12, color: '#999', marginTop: 4 }}>Panduan</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Feather name="users" size={22} color="#999" />
                <Text style={{ fontSize: 12, color: '#999', marginTop: 4 }}>Komunitas</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                <View style={{ 
                    backgroundColor: '#E91E63', width: 56, height: 56, borderRadius: 28, alignItems: 'center', 
                    justifyContent: 'center', marginTop: -20, shadowColor: '#E91E63', shadowOffset: { width: 0, height: 4 }, 
                    shadowOpacity: 0.3, shadowRadius: 6, elevation: 6
                }}>
                    <Ionicons name="home" size={28} color="#FFF" />
                </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Feather name="play" size={22} color="#999" />
                <Text style={{ fontSize: 12, color: '#999', marginTop: 4 }}>Media</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Feather name="menu" size={22} color="#999" />
                <Text style={{ fontSize: 12, color: '#999', marginTop: 4 }}>Menu</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
    );
};

export default PregnancyTrackerApp;
