import React, { useState, useRef } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';

export default function JournalScreen() {
    const router = useRouter();
    const handleBack = () => {
        router.back();
    }

    return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F7F6F1'}}>
        {/* Header */}
        <View style={{ backgroundColor: '#fff' }}>
            <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                height: 56,
                paddingHorizontal: 16,
                backgroundColor: '#fff',
            }}>
                <TouchableOpacity 
                    style={{ padding: 8 }}
                    onPress={() => handleBack()}
                >
                    <ChevronLeft size={24} color="#000" />
                </TouchableOpacity>
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <ThemedText type='titleMedium'>RS/Klinik Sekitar</ThemedText>
                </View>
                <View style={{ width: 40 }} /> 
            </View>
        </View>
        <View style={{ 
            flex: 1, 
            justifyContent: 'center', 
            alignItems: 'center', 
            padding: 20,
        }}>
            <Image
                source={require('@/assets/images/emptyState.png')}
                style={{ width: 180, height: 180, marginBottom: 20 }}
                resizeMode="contain"
            />
            <ThemedText 
                type='titleMedium'
                style={{ 
                    fontSize: 18, 
                    fontWeight: '500', 
                    color: '#666',
                    marginBottom: 8,
                    textAlign: 'center'
                }}
            >
                Coming Soon
            </ThemedText>
        </View>
    </SafeAreaView>
  ); 
}