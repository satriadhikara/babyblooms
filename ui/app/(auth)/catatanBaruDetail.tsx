import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView
} from 'react-native';
import { ChevronLeft, Circle, Trash2 } from 'lucide-react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { useRouter } from 'expo-router';

const CatatanBaruDetail = () => {
    const router = useRouter();
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#F8F7F4',
    }}>
      {/* Header */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 12,
        backgroundColor: '#F8F7F4',
      }}>
        <TouchableOpacity style={{ padding: 8 }} onPress={() => router.back()}>
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <ThemedText type='titleMedium' style={{
          fontSize: 16,
          fontWeight: '500',
        }}>
          Catatan Baru
        </ThemedText>
        <TouchableOpacity style={{ padding: 8 }}>
          <Circle size={24} color="#7E7E7E" fill="#D9D9D9" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={{
        flex: 1,
        paddingHorizontal: 25,
      }}>
        <ThemedText type='titleMedium' style={{
          fontSize: 18,
          color: '#000000',
          paddingVertical: 8,
        }}>
          Pertemuan 23 Feb
        </ThemedText>
        
        <View style={{
          height: 1,
          backgroundColor: '#000000',
          marginVertical: 10,
        }} />
        
        {/* Pemeriksaan Section */}
        <View style={{ marginBottom: 16 }}>
          <ThemedText type='bodyLarge' style={{marginBottom: 8}}>
            Pemeriksaan:
          </ThemedText>
          <View style={{ marginLeft: 4 }}>
            {[
              'Tekanan Darah: 110/70 mmHg',
              'Berat Badan: 64 kg',
              'Tinggi Badan: 160 cm',
              'Indeks Massa Tubuh (IMT): 25 (Overweight)',
              'Detak Jantung Janin: 140 bpm',
              'Tinggi Fundus Uteri: 25 cm',
              'Gerakan Janin: Aktif',
              'Kadar Hemoglobin (Hb): 12,5 g/dL (Normal)',
              'Pemeriksaan Urin: Normal',
              'Kadar Gula Darah: 90 mg/dL (Normal)',
            ].map((item, index) => (
              <View key={index} style={{
                flexDirection: 'row',
                marginBottom: 6,
                alignItems: 'flex-start',
              }}>
                <ThemedText style={{
                  fontSize: 16,
                  marginRight: 4,
                  lineHeight: 20,
                }}>•</ThemedText>
                <ThemedText type='bodyLarge' style={{flex: 1}}>
                  {item}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>
        
        {/* Catatan Tambahan Section */}
        <View style={{ marginBottom: 16 }}>
          <ThemedText type='bodyLarge' style={{marginBottom: 8}}>
            Catatan Tambahan:
          </ThemedText>
          <ThemedText type='bodyLarge' style={{color: '#333333'}}>
            Semua hasil pemeriksaan dalam batas normal. Ibu disarankan untuk tetap menjaga pola makan seimbang, mengonsumsi zat besi dan asam folat, serta rutin melakukan kontrol kehamilan. Jika ada keluhan seperti pusing berlebihan, bengkak pada kaki, atau gerakan janin berkurang, segera periksakan ke dokter.
          </ThemedText>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={{
        padding: 16,
        backgroundColor: '#F8F7F4',
        alignItems: 'flex-start',
      }}>
        <TouchableOpacity style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 8,
        }}>
          <Trash2 size={20} color="#E74C3C" />
          <ThemedText style={{
            marginLeft: 8,
            color: '#E74C3C',
            fontSize: 14,
            fontWeight: '500',
          }}>
            Hapus Catatan
          </ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CatatanBaruDetail;