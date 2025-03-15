import React from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PregnancyWeekInfo = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#faf9f6' }}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
      }}>
        <TouchableOpacity style={{ padding: 4 }}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: '600' }}>Informasi Minggu ke-4</Text>
        <View style={{ width: 24 }} /> {/* Spacer for centering */}
      </View>
      
      <ScrollView style={{ flex: 1 }}>
        {/* Main content */}
        <View style={{ padding: 16 }}>
          {/* Fruit comparison title */}
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 16, paddingHorizontal: 20 }}>
            Bayimu seukuran Buah Manggis
          </Text>
          
          {/* Fruit image */}
          <View style={{ alignItems: 'center', justifyContent: 'center', height: 180, marginBottom: 20 }}>
            <Image 
                source={require('@/assets/images/manggis.png')}
                style={{ width: 180, height: 180 }}
                resizeMode="contain"
            />
          </View>
          
          {/* Size measurements */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 12, color: '#777', marginBottom: 4 }}>Tinggi</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>3.1 cm</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 12, color: '#777', marginBottom: 4 }}>Berat</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>0.004 kg</Text>
            </View>
          </View>
          
          {/* Description */}
          <Text style={{ fontSize: 14, lineHeight: 20, color: 'black', marginBottom: 24, paddingHorizontal: 16 }}>
            Aku bukan embrio lagi. Sekarang aku sudah menjadi janin yang utuh. Organku seperti paru-paru, hati, limpa dan usus mulai muncul dan menyambung baik!
          </Text>
          
          {/* Weekly tips section */}
          <View style={{padding: 16, borderRadius: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 16, color: '#3881A8' }}>
              TIPS KEHAMILAN MINGGU KE-4
            </Text>
            
            <Text style={{ fontSize: 14, lineHeight: 20, color: 'black', marginBottom: 16 }}>
              Memasuki minggu ke-4 kehamilan, tubuh mulai mengalami beberapa perubahan. Meskipun belum terlihat secara fisik, namun hormon mulai bekerja aktif di dalam tubuh. Berikut tips menjaga kesehatan di minggu ke-4 kehamilan ini.
            </Text>
            
            <Text style={{ fontSize: 14, lineHeight: 20, color: 'black', marginBottom: 16 }}>
              Namun, dengan beberapa strategi sederhana, Anda tetap bisa menjaga kesehatan dan memastikan perkembangan yang sehat bagi janin serta diri sendiri dari perkembangan si kecil. Berikut beberapa tips yang bisa membantu menghadapi tantangan di awal kehamilan:
            </Text>
            
            {/* Tips list */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 8, color: 'black' }}>1. Atasi Mual</Text>
              <Text style={{ fontSize: 14, lineHeight: 20, color: 'black' }}>
                Jika mulai merasa mual tapi tidak tahan terhadap makanan atau tes kehamilan, coba konsumsi makanan kecil tapi sering dengan porsi kecil. Minta bantuan pasangan untuk menyiapkan makanan agar tidak tercium mual sebelum makan.
              </Text>
            </View>
            
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 8, color: 'black' }}>2. Cukupi Konsumsi Vitamin E</Text>
              <Text style={{ fontSize: 14, lineHeight: 20, color: 'black' }}>
                Jika vitamin prenatal memenuhi mual di awal, Anda bisa jadi cobaan mencampur sebelum tidur dengan camilan. Atau tiap pagi memulai dari minum jus, kemudian minum vitamin setelah sarapan berat.
              </Text>
            </View>
            
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 8, color: 'black' }}>3. Penuhi Kebutuhan Vitamin D</Text>
              <Text style={{ fontSize: 14, lineHeight: 20, color: 'black' }}>
                Vitamin D penting untuk perkembangan tulang, saraf, kekebalan gigi dan lainnya. Dapatkan senyawa mineral ini dengan setiap hari konsumsi makanan kaya vitamin D seperti susu, telur, salmon, atau sereal yang diperkaya.
              </Text>
            </View>
            
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 8, color: 'black' }}>4. Susun Pola Makan Sehat</Text>
              <Text style={{ fontSize: 14, lineHeight: 20, color: 'black' }}>
                Sudah mulai makanan gizi baik, namun perlu coba cara kreatif seperti mencampurkan makanan yang enak tapi tidak disukai dengan memasukinya di dalam saus, atau mencampurkan makanan yang lezat. Tetaplah menjaga nutrisi yang dibutuhkan untuk tumbuh kembang.
              </Text>
            </View>
            
            {/* Source */}
            <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 16, color: '#A1A1A1' }}>Sumber:</Text>
            <Text style={{ fontSize: 12, color: '#A1A1A1', marginTop: 2 }}>
              https://mamaforkeeps.com/pregnancy-week-by-week/4
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PregnancyWeekInfo;
