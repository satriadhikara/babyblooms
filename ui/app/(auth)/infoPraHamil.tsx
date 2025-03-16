import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ui/ThemedText';

const InfoPraHamil = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const Router = useRouter();

  const handleSave = () => {
    console.log('Saved height:', height, 'cm, weight:', weight, 'kg');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        <StatusBar barStyle="dark-content" />
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
                <TouchableOpacity style={{ padding: 8 }} onPress={() => Router.push('/(auth)/jurnalKondisimu')}>
                    <Ionicons name="chevron-back" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
                <ThemedText type="titleLarge" style={{marginBottom: 8, textAlign: 'center' }}>
                    Informasi Pra Kehamilan
                </ThemedText>
                <ThemedText type='bodyLarge' style={{ color: '#666', marginBottom: 30, textAlign: 'center', paddingHorizontal: 10}}>
                    Catat kondisi tubuh sebelum kehamilan untuk memantau perubahan kondisimu
                </ThemedText>

                <View style={{ marginBottom: 20 }}>
                    <ThemedText type='labelSmall' style={{ fontSize: 14, marginBottom: 8 }}>Tinggi</ThemedText>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 8, borderWidth: 1, borderColor: '#E0E0E0' }}>
                    <TextInput
                        style={{ flex: 1, height: 50, paddingHorizontal: 16, fontSize: 16 }}
                        placeholder=""
                        value={height}
                        onChangeText={setHeight}
                        keyboardType="numeric"
                    />
                    <ThemedText type='labelLarge' style={{ paddingRight: 16, color: '#0C0C0C' }}>cm</ThemedText>
                    </View>
                </View>

                <View style={{ marginBottom: 20 }}>
                    <ThemedText type='labelSmall' style={{ fontSize: 14, marginBottom: 8 }}>Berat Badan</ThemedText>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 8, borderWidth: 1, borderColor: '#E0E0E0' }}>
                    <TextInput
                        style={{ flex: 1, height: 50, paddingHorizontal: 16, fontSize: 16 }}
                        placeholder=""
                        value={weight}
                        onChangeText={setWeight}
                        keyboardType="numeric"
                    />
                    <ThemedText type='labelLarge' style={{ paddingRight: 16, color: '#0C0C0C' }}>kg</ThemedText>
                    </View>
                </View>

                <View style={{ 
                    position: 'absolute', 
                    bottom: 100, 
                    left: 0,
                    right: 0,
                    paddingHorizontal: 20, 
                    alignItems: 'center' 
                }}>
                    <TouchableOpacity 
                        style={{ 
                            backgroundColor: height && weight ? '#2196F3' : '#CCCCCC', 
                            borderRadius: 46, 
                            height: 50, 
                            width: '100%',
                            justifyContent: 'center', 
                            alignItems: 'center',
                            opacity: height && weight ? 1 : 0.8
                        }} 
                        onPress={handleSave}
                        disabled={!height || !weight}
                    >
                        <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '500' }}>Simpan</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default InfoPraHamil;
