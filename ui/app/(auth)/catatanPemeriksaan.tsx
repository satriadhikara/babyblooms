import React, { useState } from 'react';
import { View, TouchableOpacity, SafeAreaView } from 'react-native';
import { ChevronLeft, Plus, Settings} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ui/ThemedText';


const ChecklistScreen = () => {
  // State for week selection
    const [selectedWeek, setSelectedWeek] = useState(4);
    const [isEditMode, setIsEditMode] = useState(false);
    const router = useRouter();
    interface MedicalNote {
        id: string;
        date: string;
        description: string;
        color: string;
      }

    const [medicalNotes] = useState<MedicalNote[]>([
        {
        id: '1',
        date: 'Pertemuan 23 Februari',
        description: 'Pemeriksaan: ...',
        color: '#E99CCA'
        },
        {
        id: '2',
        date: 'Pertemuan 16 Februari',
        description: 'Pemeriksaan: ...',
        color: '#9FC9DF'
        }
    ]);

  return (
    <View style={{flex: 1, backgroundColor: '#F8F7F4'}}> 
        <SafeAreaView style={{
         backgroundColor: '#F8F7F4',
        }}>
            {/* Header */}
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 16,
                backgroundColor: '#F8F7F4',
            }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <ChevronLeft size={24} color="#000" />
                </TouchableOpacity>
                <ThemedText type='titleMedium'>
                    Catatan Pemeriksaan
                </ThemedText>
                <TouchableOpacity onPress={() => setIsEditMode(!isEditMode)}>
                    <Settings size={22} color={isEditMode ? '#D65DB1' : '#000'} />
                </TouchableOpacity>
            </View>

            {medicalNotes.map((note) => (
                <View 
                key={note.id}
                style={{
                    flexDirection: 'row', 
                    alignItems: 'center',
                    paddingHorizontal: 20, 
                    marginTop: 10 
                }}
                >  
                    <TouchableOpacity 
                        onPress={() => router.push('/(auth)/catatanPemeriksaanDetail')}
                        style={{ width: "100%" }}
                        activeOpacity={0.7}
                    >
                        <View style={{ 
                            width:"100%",
                            gap: 2, 
                            backgroundColor: '#FFFFFF',
                            borderRadius: 10,
                            paddingVertical: 10, 
                            borderLeftWidth: 16,
                            paddingLeft: 20, 
                            borderLeftColor: note.color
                        }}>
                            <ThemedText type='titleMedium'>{note.date}</ThemedText>
                            <ThemedText type='bodyMedium' style={{color: '#7E7E7E'}}>
                            {note.description}
                            </ThemedText>
                        </View>
                    </TouchableOpacity>  
                </View>
            ))}
        </SafeAreaView>
        {/* Add Button */}
        <TouchableOpacity
        style={{
            position: "absolute",
            right: 16,
            bottom: 40,
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: "#D33995",
            alignItems: "center",
            justifyContent: "center",
            elevation: 4,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            zIndex: 100,
        }}
        onPress={() => router.push('/(auth)/catatanBaru')}
        >
            <Plus size={32} color="#fff" />
        </TouchableOpacity>
    </View>
  );
};

export default ChecklistScreen;