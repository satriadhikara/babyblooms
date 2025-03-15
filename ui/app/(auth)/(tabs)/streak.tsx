import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import { useRouter } from 'expo-router';

const StreakCelebration = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const symptoms = [
        { name: 'Nyeri perut', color: '#93AF33', textColor: '#93AF33' },
        { name: 'Kram kaki', color: '#5D63A6', textColor: '#5D63A6' },
        { name: 'Insomnia', color: '#DA5AA7', textColor: '#DA5AA7' },
        { name: 'Perubahan mood', color: '#64A8CB', textColor: '#64A8CB' },
    ];

    const Router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#faf9f6', paddingHorizontal: 24 }}>
      <StatusBar barStyle="dark-content" />
      
      {/* Close button */}
      <TouchableOpacity style={{ position: 'absolute', top: 80, left: 16, padding: 4 }} onPress={() => Router.push('/(auth)/(tabs)/jurnalKondisiDetail')}>
        <Ionicons name="close" size={24} color="black" />
      </TouchableOpacity>
      
      {/* Main content */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 100 }}>
        {/* Fire icon */}
        <View style={{ marginBottom: 24 }}>
          <Ionicons name="flame" size={150} color="#FF5722" />
        </View>
        
        {/* Streak text */}
        <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 }}>
          23 hari berturut-turut!
        </Text>
        <Text style={{
          fontSize: 16,
          textAlign: 'center',
          color: 'black',
          lineHeight: 20,
          marginBottom: 24,
          paddingHorizontal: 20     
        }}>
          Terus lacak kehamilanmu untuk mengetahui perkembangannya dan klik gejala untuk mempelajari lebih lanjut dengan BloomsAI.
        </Text>
        
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 24 }}>
            {symptoms.map((symptom, index) => (
                <TouchableOpacity 
                key={index}
                style={{ 
                    paddingVertical: 8, 
                    paddingHorizontal: 16, 
                    borderRadius: 20, 
                    margin: 4,
                    borderWidth: 2,
                    borderColor: symptom.color, // Using the same color as text for border
                    backgroundColor: 'white' // Optional: add white background
                }}
                >
                <Text style={{ fontSize: 14, fontWeight: '500', color: symptom.textColor }}>
                    {symptom.name}
                </Text>
                </TouchableOpacity>
            ))}
        </View>
      </View>
      
      {/* Return button */}
      <TouchableOpacity 
        style={{ 
          position: 'absolute', 
          bottom: 36, 
          left: 24, 
          right: 24, 
          backgroundColor: '#4697C1', 
          borderRadius: 48, 
          height: 50, 
          justifyContent: 'center', 
          alignItems: 'center' 
        }} 
        onPress={() => Router.push('/(auth)/(tabs)/jurnalKondisimu')}
      >
        <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700' }}>Kembali ke Jurnal Kondisimu</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default StreakCelebration;
