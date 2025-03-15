import React, { useState, useEffect } from 'react';
import { ThemedText } from "@/components/ui/ThemedText";
import { 
    View, 
    SafeAreaView, 
    TouchableOpacity, 
    Image,
    StatusBar,
    ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { Sparkle,ArrowUpRight } from 'lucide-react-native';

const PregnancyTrackerApp = () => {
const router = useRouter();
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
        <ScrollView 
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 90 }}
        >
        
            {/* Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 30 }}>
                <View>
                    <ThemedText type='titleMedium' style={{ fontSize: 14, color: '#0C0C0C' }}>Selamat pagi,</ThemedText>
                    <ThemedText type='headlineSmall' style={{color: '#0C0C0C', marginTop: 5 }}>Fiona Siregar</ThemedText>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 35 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                        <Ionicons name="flame" size={16} color="#FF5722" />
                        <ThemedText type='titleMedium' style={{ marginLeft: 4}}>23</ThemedText>
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
                        <ThemedText type='labelSmall' key={`day-${index}`} style={{ width: 36, textAlign: 'center', color: '#E91E63'}}>{day}</ThemedText>
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
                            <ThemedText 
                                type='titleMedium' style={{color: date === today ? '#E91E63' : '#000' }}
                            >
                                {date}
                            </ThemedText>
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
                        position: 'absolute', right: 25, bottom: 10, backgroundColor: '#FFF',
                        width: 54, height: 54, borderRadius: 27, alignItems: 'center', justifyContent: 'center',
                        shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2
                    }}>
                    <Feather name="volume-2" size={20} color="#8C8C8C" />
                </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'flex-start', marginVertical: 20, paddingHorizontal: 20 }}>
                <ThemedText type='titleLarge'>Minggu ke-{pregnancyData.week}, Hari ke-{pregnancyData.day}</ThemedText>
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
                {/* Header ThemedText */}
                <ThemedText type='titleMedium' style={{ fontSize:20, color: "#FFF"}}>
                    {pregnancyData.daysLeft} Hari lagi!
                </ThemedText>
                <ThemedText type='labelLarge' style={{ color: "#FFF", opacity: 0.8, marginTop: 4 }}>
                    Trimester {pregnancyData.trimester}
                </ThemedText>

                {/* HPL & Edit */}
                <View
                    style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 6,
                    }}
                >
                    <ThemedText type='bodyLarge' style={{ color: "#FFF",fontSize:18 }}>
                        HPL: {pregnancyData.dueDate}
                    </ThemedText>
                    <TouchableOpacity>
                    <ThemedText type='bodyLarge' style={{ color: "#FFF",fontSize: 18, textDecorationLine: "underline" }}>
                        Edit
                    </ThemedText>
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
                    onPress={() => router.push("/(auth)/(tabs)/jurnalKondisimu")}
                >
                    <Feather name="plus" size={20} color="#C85A9D" />
                    <ThemedText type='labelLarge' style={{ color: "#C85A9D", marginLeft: 8 }}>
                        Lacak kontraksimu!
                    </ThemedText>
                </TouchableOpacity>
            </LinearGradient>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={true}
                indicatorStyle="black" // Add this to change the color
                contentContainerStyle={{ paddingRight: 20 }} // Add padding for the indicator
                style={{
                    padding: 20,
                    marginTop: 20,
                }}
                scrollIndicatorInsets={{ // Add this to customize the indicator position
                    right: 5,
                    bottom: 0
                }}
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
                    <ThemedText type='bodyLarge' style={{ color: "#000000", marginBottom: 8 }}>
                        Bayimu seukuran
                    </ThemedText>
                    <ThemedText type='bodyLarge' style={{color: "#000000", fontWeight:"semibold"}}>
                        Buah Manggis
                    </ThemedText>
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
                    <ThemedText type='titleMedium' style={{ color: "#D43066"}}>
                        Si kecil pada minggu ke-10
                    </ThemedText>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginVertical: 8,
                        }}
                    >
                        <ThemedText type='labelSmall' style={{ color: "#7E7E7E" }}>Tinggi</ThemedText>
                        <ThemedText type='labelSmall' style={{ color: "#7E7E7E" }}>Berat</ThemedText>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <ThemedText type='bodyLarge' style={{ color: "#000" }}>3.1 cm</ThemedText>
                        <ThemedText type='bodyLarge' style={{ color: "#000" }}>4.0 g</ThemedText>
                    </View>
                    <ThemedText
                        style={{ color: "#000000",fontWeight: 400,fontFamily:'switzer',fontSize:14 ,lineHeight:20, marginTop: 10}}
                    >
                        Aku bukan embrio lagi. Sekarang aku sudah menjadi janin! Jari-jariku
                        sempurna, dan sikuku bisa menekuk. Aku juga mulai menelan dan
                        menendang kecil.
                    </ThemedText>
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
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Sparkle size={24} color="#4697C1" />
                            <ThemedText
                                type='titleMedium'
                                style={{
                                    color: "#4697C1",
                                    marginLeft: 6,
                                }}
                            >
                                Tips untuk Minggu ke-10
                            </ThemedText>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <ArrowUpRight size={24} color="#4697C1" style={{ marginLeft: 6 }} />    
                        </View>
                    </View>
                    <ThemedText
                        style={{ color: "#000000",fontWeight: 400,fontFamily:'switzer',fontSize:14 ,lineHeight:20, marginTop: 10}}
                    >
                        Pada minggu ke-10 kehamilan, tubuh terus beradaptasi dengan berbagai perubahan hormon yang dapat menyebabkan kelelahan, mual, dan sensitivitas terhadap makanan atau bau tertentu. Meskipun ini bisa menjadi masa yang menantang, ada banyak cara untuk tetap merasa sehat dan nyaman. Dengan pola makan...
                    </ThemedText>
                </View>
            </ScrollView>

            <View style={{ marginTop: 20, flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between', marginTop: 30, paddingHorizontal: 20 }}>
                    <ThemedText type='titleMedium' style={{ fontSize: 20}}>Jurnal Kondisimu</ThemedText>
                    <ThemedText type='labelMedium' style={{fontWeight:500, color:"#4697C1"}}>Lihat Detail</ThemedText>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>    
                        <Image 
                            source={require('@/assets/images/SuasanaHati.png')}
                            style={{ width: 60, height: 60, resizeMode: 'contain' }}
                        />
                        <View style={{ gap: 5 }}>
                            <ThemedText type='titleMedium'>Suasana Hati</ThemedText>
                            <ThemedText type='bodyMedium' style={{fontStyle:'italic', color: '#7E7E7E'}}>Sangat Baik</ThemedText>
                        </View>
                    </View>
                    <View>
                        <ThemedText type='titleLarge'>4/5</ThemedText>
                    </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop:20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>    
                        <Image 
                            source={require('@/assets/images/BeratBadan.png')}
                            style={{ width: 60, height: 60, resizeMode: 'contain' }}
                        />
                        <View style={{ gap: 5 }}>
                            <ThemedText type='titleMedium'>Berat Badan</ThemedText>
                            <ThemedText type='bodyMedium' style={{fontStyle:'italic', color: '#7E7E7E'}}>Di atas kisaran sehat</ThemedText>
                        </View>
                    </View>
                    <View>
                        <ThemedText type='titleLarge'>64kg</ThemedText>
                    </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>    
                        <Image 
                            source={require('@/assets/images/Gejala.png')}
                            style={{ width: 60, height: 60, resizeMode: 'contain' }}
                        />
                        <View style={{ gap: 5 }}>
                            <ThemedText type='titleMedium'>Gejala</ThemedText>
                            <ThemedText type='bodyMedium' style={{fontStyle:'italic', color: '#7E7E7E'}}>4 kali dalam minggu ini    </ThemedText>
                        </View>
                    </View>
                </View>

                {/* Button */}
                <TouchableOpacity
                    style={{
                    marginTop: 14,
                    marginHorizontal: 20,
                    backgroundColor: "#4697C1",
                    paddingVertical: 20,
                    borderRadius: 30,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    }}

                    onPress={() => router.push('/(auth)/(tabs)/infoMingguan')}
                >
                    <Feather name="plus" size={20} color="#FFF" />
                    <ThemedText type='labelLarge' style={{ color: "#FFF", marginLeft: 8 }}>
                         Catat kondisi hari ini
                    </ThemedText>
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: 20, flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between', marginTop: 30, paddingHorizontal: 20 }}>
                    <ThemedText type='titleMedium' style={{ fontSize: 20}}>Buku Harian</ThemedText>
                    <ThemedText type='labelMedium' style={{fontWeight:500, color:"#4697C1"}}>Lihat Detail</ThemedText>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 10 }}>
                    <View
                        style={{
                            width: 370,
                            gap: 10,
                            marginTop: 14,
                            backgroundColor: "#FFF",
                            borderRadius: 12,
                            padding: 16,
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: 3,
                        }}
                    >
                        <ThemedText style={{ color: "#000000",fontWeight: 400,fontFamily:'switzer',fontSize:14 ,lineHeight:20}}>
                            Tiba tiba ngidam dipeluk yusril
                        </ThemedText>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>    
                            <Image 
                                source={require('@/assets/images/ProfPic.png')}
                                style={{ width: 40, height: 40, resizeMode: 'contain' }}
                            />
                            <View style={{ gap: 5 }}>
                                <ThemedText type='titleSmall' style={{color:'#626262'}}>Fiona Siregar</ThemedText>
                                <ThemedText  type='labelSmall' style={{color: '#7E7E7E'}}>4 menit lalu</ThemedText>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
    );
};

export default PregnancyTrackerApp;
