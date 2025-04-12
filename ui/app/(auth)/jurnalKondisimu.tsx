import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft, Flame, Plus, ArrowUpRight } from 'lucide-react-native';
import {useRouter} from 'expo-router';
import { ThemedText } from '@/components/ui/ThemedText';

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
    { emoji: '😞', percentage: 10 },
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
            <ChevronLeft size={24} color="black" />
          </TouchableOpacity>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <ThemedText type='titleMedium'>Jurnal Kondisimu</ThemedText>
            <ThemedText type='bodyMedium' style={{ color: '#757575' }}>{`Minggu ${currentWeek} • ${currentDate.getDate() - 3} ${months[currentDate.getMonth()]} - ${currentDate.getDate() + 3} ${months[currentDate.getMonth()]}`}</ThemedText>
          </View>
          <View style={{ flexDirection: 'row'}}>
            <Flame size={24} color="#FF481F" fill="#FFC633" />
            <ThemedText style={{ fontSize: 14, fontWeight: 'bold', color: 'black', marginLeft: 4 }}>{streakCount}</ThemedText>
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
                <ThemedText type='titleMedium' style={{color: day.active ? '#fff' : '#757575'}}>
                  {day.dayNumber}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        <View style={{ alignItems: 'center', padding: 32, marginTop: 16 }}>
          <View style={{ width: 150, height: 170, marginBottom: 16 }}>
            <Text style={{ fontSize: 150 }}>{currentMoodEmoji}</Text>
          </View>
          <ThemedText type='titleSmall' style={{color: '#757575', marginBottom: 8 }}>Suasana hatimu minggu ini</ThemedText>
          <ThemedText type='titleLarge'>{currentMood}</ThemedText>
        </View>
        
        <View style={{ padding: 16, marginTop: 16 }}>
          <ThemedText type='titleMedium' style={{fontSize: 18}}>Moodmeter</ThemedText>
          <ThemedText type='bodyLarge' style={{color: '#757575', marginBottom: 16 }}>Minggu ke-{currentWeek}</ThemedText>
          {moodData.map((mood, index) => (
            <View key={index} style={{ alignItems: 'center', marginBottom: 12 }}>
            {/* Wrapper untuk emoji agar berada di atas progress bar */}
            <View style={{ position: 'absolute', zIndex: 10, top: -10, left: 0 }}>
              <Text style={{ fontSize: 45 }}>{mood.emoji}</Text>
            </View>
          
            {/* Progress bar */}
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', paddingHorizontal: 20 }}>
              <View style={{ flex: 1, height: 35, backgroundColor: '#EEEEEE', borderRadius: 17, overflow: 'hidden' }}>
                <View style={{
                  height: '100%',
                  width: `${mood.percentage}%`,
                  backgroundColor: ['#91845C', '#91845C', '#91845C', '#91845C', '#91845C'][index],
                  borderRadius: 20,
                }}>
                  <View style={{ position: 'absolute', right: 7, top: 7 }}>
                    <ThemedText type='labelMedium' style={{ color: 'white' }}>
                      {mood.percentage}%
                    </ThemedText>
                  </View>
                </View>
              </View>
            </View>
          </View>
          
          ))}
        </View>

        <View style={{ marginTop: 20, flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
              <ThemedText type='titleMedium' style={{ fontSize: 18}}>Berat Badan</ThemedText>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>    
                  <Image 
                      source={require('@/assets/images/BeratBadan.png')}
                      style={{ width: 60, height: 60, resizeMode: 'contain' }}
                  />
                  <ThemedText style={{fontSize: 24,fontWeight: 'medium', fontFamily:'Switzer-Medium'}}>64 Kg</ThemedText>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                  <ArrowUpRight size={20} color="black" />
                  <ThemedText type='labelLarge' style={{fontSize: 20}}>2 Kg</ThemedText>
              </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 10, marginBottom: 40 }}>
              <ThemedText style={{fontSize: 14, fontFamily:'switzer', color:'#8C8C8C', fontStyle:'italic'}}>* Berat badan terakhir menunjukkan bahwa Bunda berada di atas kisaran sehat untuk minggu 4</ThemedText>
          </View>
          <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
              <ThemedText type='titleMedium' style={{ fontSize: 18}}>Tekanan Darah</ThemedText>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>    
                  <Image 
                      source={require('@/assets/images/BeratBadan.png')}
                      style={{ width: 60, height: 60, resizeMode: 'contain' }}
                  />
                  <ThemedText style={{fontSize: 24,fontWeight: 'medium', fontFamily:'Switzer-Medium'}}>110/79 mmHg</ThemedText>
              </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 10 }}>
              <ThemedText style={{fontSize: 14, fontFamily:'switzer', color:'#8C8C8C', fontStyle:'italic'}}>*Tekanan darah hari ini menunjukkan kondisi normal</ThemedText>
          </View>
        </View>
        <View style={{ marginTop: 40, flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
              <ThemedText type='titleMedium' style={{ fontSize: 18}}>Gejala</ThemedText>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 10 }}>
              <ThemedText type='bodyMedium' style={{color:'#626262'}}>Minggu ini bunda mengalami 4 gejala</ThemedText>
          </View>
        </View>
        <View style={{ marginTop: 20, flexDirection: 'column' }}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>    
                  <View style={{ gap: 5 }}>
                      <ThemedText type='titleMedium' style={{color:'#5D63A6'}}>Gastrointestinal</ThemedText>
                      <ThemedText type='bodySmall' style={{color: '#7E7E7E'}}>Mual/Muntah</ThemedText>
                  </View>
              </View>
              <View>
                  <ThemedText type='titleMedium'>1 kali</ThemedText>
              </View>
          </View>
        </View>
        <View style={{ marginTop: 10, flexDirection: 'column' }}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>    
                  <View style={{ gap: 5 }}>
                      <ThemedText type='titleMedium' style={{color:'#5D63A6'}}>Neurologis</ThemedText>
                      <ThemedText type='bodySmall' style={{color: '#7E7E7E'}}>Sakit Kepala, Insomnia</ThemedText>
                  </View>
              </View>
              <View>
                  <ThemedText type='titleMedium'>2 kali</ThemedText>
              </View>
          </View>
        </View>
        <View style={{ marginTop: 10, flexDirection: 'column' }}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>    
                  <View style={{ gap: 5 }}>
                      <ThemedText type='titleMedium' style={{color:'#5D63A6'}}>Hormonal</ThemedText>
                      <ThemedText type='bodySmall' style={{color: '#7E7E7E'}}>Perubahan Mood</ThemedText>
                  </View>
              </View>
              <View>
                  <ThemedText type='titleMedium'>1 kali</ThemedText>
              </View>
          </View>
        </View>
        <View style={{ marginTop: 40, flexDirection: 'column', paddingHorizontal: 20 }}>
          <ThemedText type='titleMedium' style={{ fontSize: 18}}>Catatan Tambahan</ThemedText>
          <View style={{ marginTop: 10, flexDirection: 'column' }}>
            <View style={{flexDirection: 'row', paddingHorizontal:10, marginTop: 10 }}>
              <ThemedText type='labelMedium' style={{color: '#7E7E7E', width: 40}}>Sen</ThemedText>
              <ThemedText type='labelMedium' style={{fontSize: 16, fontWeight:'bold', marginLeft: 40}}>-</ThemedText>
            </View>
            <View style={{flexDirection: 'row', paddingHorizontal: 10, marginTop: 20 }}>
              <ThemedText type='labelMedium' style={{color: '#7E7E7E', width: 40}}>Sel</ThemedText>
              <ThemedText type='labelMedium' style={{
                flex: 1, 
                marginLeft: 40,
                fontWeight: 'regular'
              }}>Hari ini mood swing banget dan sedikit ngerasain morning sickness</ThemedText>
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
        onPress={() => Router.push('/(auth)/jurnalKondisiDetail')}
      >
        <Plus size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MoodTrackerApp;
