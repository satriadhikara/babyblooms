import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { ChevronLeft, Edit, Check, Plus, Minus, Pencil, Trash2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ui/ThemedText';


const ChecklistScreen = () => {
  // State for week selection
  const [selectedWeek, setSelectedWeek] = useState(4);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // State for checklist items
  const [checklistItems, setChecklistItems] = useState([
    {
      id: 1,
      text: 'Makan sayuran hijau gelap dan makan zat besi tambahan',
      completed: true,
    },
    {
      id: 2,
      text: 'Tetap berolahraga tapi jangan memaksakan diri',
      completed: true,
    },
    {
      id: 3,
      text: 'Cek tekanan darah',
      completed: false,
    },
    {
      id: 4,
      text: 'Dengarkan musik yang menenangkan untuk membantu agar lebih rileks',
      completed: false,
    },
    {
      id: 5,
      text: 'Hitung tendangan dan gerakan bayi',
      completed: false,
    },
  ]);

  // Toggle completion status of a checklist item
    interface ChecklistItem {
        id: number;
        text: string;
        completed: boolean;
    }

    const toggleComplete = (id: number): void => {
        setChecklistItems(
            checklistItems.map((item: ChecklistItem) => 
                item.id === id ? { ...item, completed: !item.completed } : item
            )
        );
    };

  // Calculate completion percentage
  const completionPercentage = Math.round(
    (checklistItems.filter(item => item.completed).length / checklistItems.length) * 100
  );
  const router = useRouter();

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
                    Checklist
                </ThemedText>
                <TouchableOpacity onPress={() => setIsEditMode(!isEditMode)}>
                    <Pencil size={22} color={isEditMode ? '#D65DB1' : '#000'} />
                </TouchableOpacity>
            </View>

            {/* Week selector */}
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                paddingVertical: 8,
                paddingHorizontal: 12,
                backgroundColor: '#F8F7F4',
                }}
            >
                {[1, 2, 3, 4, 5, 6, 7].map(week => (
                <TouchableOpacity 
                    key={week}
                    style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: 8,
                    width: 70,
                    height: 70,
                    borderRadius: 16,
                    backgroundColor: selectedWeek === week ? '#D65DB1' : '#F0F0F0',
                    }}
                    onPress={() => setSelectedWeek(week)}
                >
                    <ThemedText type='bodySmall' style={{
                        fontSize: 12,
                        color: selectedWeek === week ? '#FFF' : '#999',
                    }}>
                        Minggu
                    </ThemedText>
                    <ThemedText style={{
                        fontSize: 20,
                        fontFamily: 'PlusJakartaSans_700Bold',
                        fontWeight: 'bold',
                        marginTop: 4,
                        color: selectedWeek === week ? '#FFF' : '#333',
                    }}>
                        {week}
                    </ThemedText>
                </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Progress bar */}
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 22,
                paddingVertical: 10,
                width: 'auto',
                height: 60,
                backgroundColor: '#F8F7F4',
            }}>
                <View style={{
                height: 8,
                backgroundColor: '#EEEEEE',
                borderRadius: 4,
                flex: 1,
                marginRight: 10,
                }}>
                <View style={{
                    height: 8,
                    backgroundColor: '#B8D162',
                    borderRadius: 4,
                    width: `${completionPercentage}%`,
                }} />
                </View>
                <ThemedText style={{
                    fontFamily: 'Switzer',
                    fontSize: 16,
                    color: 'black',
                }}>{completionPercentage}%</ThemedText>
            </View>

            <ScrollView style={{
                paddingHorizontal: 10,
                paddingTop: 16,
            }}>
                {checklistItems.map(item => (
                    <TouchableOpacity 
                        key={item.id} 
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 16,
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            borderRadius: 8,
                        }}
                        onPress={() => !isEditMode && toggleComplete(item.id)}
                    >
                        {!isEditMode && (
                            <View style={{
                                paddingTop: 2,
                                marginRight: 12,
                            }}>
                                {item.completed ? (
                                    <View style={{
                                        width: 22,
                                        height: 22,
                                        borderRadius: 11,
                                        backgroundColor: '#B8D162',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Check size={16} color="#fff" />
                                    </View>
                                ) : (
                                    <View style={{width: 22, height: 22, borderRadius: 11, backgroundColor: '#D9D9D9', alignItems: 'center', justifyContent: 'center'}}>    
                                        <Check size={20} color="white" />
                                    </View>
                                )}
                            </View>
                        )}
                        <ThemedText style={{
                            fontSize: 16,
                            fontFamily: 'Switzer',
                            fontWeight: '500',
                            color: item.completed ? '#B8D162' : '#333',
                            flex: 1,
                            lineHeight: 22,
                        }}>
                            {item.text}
                        </ThemedText>
                        {isEditMode && (
                            <TouchableOpacity 
                                onPress={() => {}}
                                style={{
                                    padding: 8,
                                }}
                            >
                                <View style={{width: 22, height: 22, borderRadius: 11, backgroundColor: '#FF4343', alignItems: 'center', justifyContent: 'center',}}>
                                    <Minus size={20} color="white" />
                                </View>
                            </TouchableOpacity>
                        )}
                    </TouchableOpacity>
                ))}

                {!isEditMode && (
                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 8,
                        paddingHorizontal: 12,
                    }}>
                        <Plus size={20} color="#999" />
                        <ThemedText style={{
                            fontSize: 16,
                            fontFamily: 'Switzer',
                            fontWeight: '500',
                            color: '#7E7E7E',
                            marginLeft: 12,
                        }}>
                            Tambah checklist baru
                        </ThemedText>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </SafeAreaView>
    </View>
  );
};

export default ChecklistScreen;