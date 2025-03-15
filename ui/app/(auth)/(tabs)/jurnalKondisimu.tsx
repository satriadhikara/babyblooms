import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import {useRouter} from 'expo-router';

const MoodTrackerApp = () => {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
  
  const currentDate = new Date();
  const currentWeek = 4;
  
  const daysOfWeek = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(currentDate.getDate() - 3 + i);
    daysOfWeek.push({ dayNumber: date.getDate(), active: i === 2 });
  }
  
  const moodData = [
    { emoji: '😁', percentage: 20 },
    { emoji: '😊', percentage: 35 },
    { emoji: '😐', percentage: 70 },
    { emoji: '😞', percentage: 0 },
    { emoji: '😡', percentage: 0 },
  ];
  
  const [currentMood, setCurrentMood] = useState('Sangat Baik');
  const [currentMoodEmoji, setCurrentMoodEmoji] = useState('😊');
  const [streakCount, setStreakCount] = useState(23);
  const Router = useRouter();
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar style="dark" />
      <ScrollView 
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 90 }}
      >
        <View style={{ width:'100%' ,flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', padding: 16, backgroundColor: '#fff' }}>
          <TouchableOpacity 
            style={{ padding: 8 }}
            onPress={() => Router.push('/(auth)/(tabs)/jurnal')}
          >
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Jurnal Kondisimu</Text>
            <Text style={{ fontSize: 12, color: '#757575' }}>{`Minggu ${currentWeek} • ${currentDate.getDate() - 3} ${months[currentDate.getMonth()]} - ${currentDate.getDate() + 3} ${months[currentDate.getMonth()]}`}</Text>
          </View>
          <View style={{ flexDirection: 'row'}}>
            <Ionicons name="flame" size={18} color="#FF5722" />
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black', marginLeft: 4 }}>{streakCount}</Text>
          </View>
        </View>
        
        <View style={{padding: 16, backgroundColor: '#fff'}}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              width: '100%' 
            }}
          >
            {daysOfWeek.map((day, index) => (
              <TouchableOpacity 
                key={index} 
                style={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: 20, 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  backgroundColor: day.active ? '#C2185B' : '#F5F5F5' 
                }}
              >
                <Text style={{ 
                  fontSize: 14, 
                  fontWeight: '500', 
                  color: day.active ? '#fff' : '#757575' 
                }}>
                  {day.dayNumber}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        <View style={{ alignItems: 'center', padding: 32, marginTop: 16 }}>
          <View style={{ width: 150, height: 170, marginBottom: 16 }}>
            <Text style={{ fontSize: 150 }}>{currentMoodEmoji}</Text>
          </View>
          <Text style={{ fontSize: 14, color: '#757575', marginBottom: 8 }}>Suasana hatimu minggu ini</Text>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{currentMood}</Text>
        </View>
        
        <View style={{ padding: 16, marginTop: 16 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Moodmeter</Text>
          <Text style={{ fontSize: 12, color: '#757575', marginBottom: 16 }}>Minggu ke-{currentWeek}</Text>
          {moodData.map((mood, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Text style={{fontSize: 45}}>{mood.emoji}</Text>
              <View style={{flex: 1, height: 35, backgroundColor: '#EEEEEE', borderRadius: 17, overflow: 'hidden' }}>
                <View style={{height: '100%', width: `${mood.percentage}%`, backgroundColor: ['#91845C','#91845C','#91845C','#91845C','#91845C' ][index], borderRadius: 12 }}>
                  <View style={{ position: 'absolute', right: 5, top: 9 }}>
                    <Text style={{ fontSize: 12, color: 'white' }}>{mood.percentage}%</Text>
                  </View>
                </View>  
              </View>
            </View>
          ))}
        </View>

        <View style={{ marginTop: 20, flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold'}}>Berat Badan</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>    
                  <Image 
                      source={require('@/assets/images/BeratBadan.png')}
                      style={{ width: 60, height: 60, resizeMode: 'contain' }}
                  />
                  <Text style={{fontSize: 20, fontWeight: 'bold'}}>64 Kg</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                  <Feather name="arrow-up-right" size={18} color="black" />
                  <Text style={{fontSize: 18, fontWeight:'regular'}}>2 Kg</Text>
              </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 10 }}>
              <Text style={{fontSize: 14, color:'#8C8C8C', fontStyle:'italic'}}>* Berat badan terakhir menunjukkan bahwa Bunda berada di atas kisaran sehat untuk minggu 4</Text>
          </View>
        </View>
        <View style={{ marginTop: 40, flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold'}}>Gejala</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 10 }}>
              <Text style={{fontSize: 16, color:'#626262'}}>Minggu ini bunda mengalami 4 gejala</Text>
          </View>
        </View>
        <View style={{ marginTop: 20, flexDirection: 'column' }}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>    
                  <View style={{ gap: 5 }}>
                      <Text style={{fontSize: 20, fontWeight: 'bold', color:'#5D63A6'}}>Suasana Hati</Text>
                      <Text style={{color: '#7E7E7E'}}>Mual/Muntah</Text>
                  </View>
              </View>
              <View>
                  <Text style={{fontSize: 16, fontWeight:'bold'}}>1 kali</Text>
              </View>
          </View>
        </View>
        <View style={{ marginTop: 10, flexDirection: 'column' }}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>    
                  <View style={{ gap: 5 }}>
                      <Text style={{fontSize: 20, fontWeight: 'bold', color:'#5D63A6'}}>Neurologis</Text>
                      <Text style={{color: '#7E7E7E'}}>Sakit Kepala, Insomnia</Text>
                  </View>
              </View>
              <View>
                  <Text style={{fontSize: 16, fontWeight:'bold'}}>2 kali</Text>
              </View>
          </View>
        </View>
        <View style={{ marginTop: 10, flexDirection: 'column' }}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>    
                  <View style={{ gap: 5 }}>
                      <Text style={{fontSize: 20, fontWeight: 'bold', color:'#5D63A6'}}>Hormonal</Text>
                      <Text style={{color: '#7E7E7E'}}>Perubahan Mood</Text>
                  </View>
              </View>
              <View>
                  <Text style={{fontSize: 16, fontWeight:'bold'}}>1 kali</Text>
              </View>
          </View>
        </View>
        <View style={{ marginTop: 40, flexDirection: 'column', paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold'}}>Catatan Tambahan</Text>
          <View style={{ marginTop: 10, flexDirection: 'column' }}>
            <View style={{flexDirection: 'row', alignItems: 'center',gap: 40, paddingHorizontal: 20, marginTop: 10 }}>
              <Text style={{color: '#7E7E7E'}}>Sen</Text>
              <Text style={{fontSize: 16, fontWeight:'bold'}}>-</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center',gap: 40, paddingHorizontal: 20, marginTop: 20 }}>
              <Text style={{color: '#7E7E7E'}}>Sel</Text>
              <Text style={{fontSize: 16}}>Hari ini mood swing banget dan sedikit ngerasain morning sickness</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity 
        style={{ 
          position: 'absolute', 
          bottom: 24, 
          right: 24, 
          width: 56, 
          height: 56, 
          borderRadius: 28, 
          backgroundColor: '#2196F3', 
          justifyContent: 'center', 
          alignItems: 'center', 
          elevation: 4,
          zIndex: 1000
        }}
        onPress={() => Router.push('/(auth)/(tabs)/jurnalKondisiDetail')}
      >
        <Ionicons name="add" size={24} color="#fff"/>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MoodTrackerApp;
