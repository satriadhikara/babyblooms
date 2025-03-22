import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {X} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ui/ThemedText';

const PregnancySymptomTracker = () => {
  const [mood, setMood] = useState(4);
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<Partial<Symptoms>>({});
  const Router = useRouter();

  interface Symptoms {
    gastrointestinal: string[];
    otot: string[];
    neurologi: string[];
    hormonal: string[];
  }

  const toggleSymptom = (category: keyof Symptoms, symptom: string) => {
    setSelectedSymptoms(prev => {
      const updatedCategory = prev[category] || [];
      return {
        ...prev,
        [category]: updatedCategory.includes(symptom)
          ? updatedCategory.filter(s => s !== symptom)
          : [...updatedCategory, symptom],
      };
    });
  };

  interface SelectedSymptoms {
    [key: string]: string[];
  }

  const isSymptomSelected = (category: keyof Symptoms, symptom: string): boolean =>
    selectedSymptoms[category]?.includes(symptom) || false;

  const symptomCategories: { id: keyof Symptoms; title: string; symptoms: string[] }[] = [
      { id: 'gastrointestinal', title: 'Gastrointestinal', symptoms: ['Nyeri perut', 'Kembung', 'Konstipasi', 'Mual/Muntah', 'Maag/Dispepsia'] },
      { id: 'otot', title: 'Otot dan Tulang', symptoms: ['Nyeri punggung', 'Kram kaki', 'Kaki atau pergelangan kaki yang bengkak'] },
      { id: 'neurologi', title: 'Neurologi', symptoms: ['Sakit kepala', 'Insomnia'] },
      { id: 'hormonal', title: 'Hormonal', symptoms: ['Nyeri payudara', 'Perubahan mood'] },
    ];

  const moodEmojis = ['😡', '😞', '😐', '🙂', '😍'];

  interface TagColors {
    gastrointestinal: string;
    otot: string;
    neurologi: string;
    hormonal: string;
    [key: string]: string;
  }
  
  const getTagColor = (category: keyof TagColors): string => {
    const colors: TagColors = {
      gastrointestinal: '#93AF33',
      otot: '#5D63A6',
      neurologi: '#DA5AA7',
      hormonal: '#64A8CB',
    };
    return colors[category] || '#888888';
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
      <StatusBar barStyle="dark-content" />
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 60,paddingBottom: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' }}>
        <TouchableOpacity style={{ padding: 4 }} onPress={() => Router.back()}>
          <X size={30} color="black" />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center', gap: 5}}>
          <ThemedText type='titleMedium'>Minggu 4, Hari 5</ThemedText>
          <ThemedText type='labelMedium' style={{color: '#7E7E7E' }}>Sel, 20 Mar</ThemedText>
        </View>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <ThemedText type='titleMedium' style={{marginBottom: 10 }}>Bagaimana perasaanmu hari ini?</ThemedText>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
          {moodEmojis.map((emoji, index) => (
            <TouchableOpacity key={index} onPress={() => setMood(index)}>
              <Text style={{ fontSize: 50, padding: 8, opacity: mood === index ? 1 : 0.6 }}>{emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <ThemedText  type='titleMedium' style={{ marginBottom: 10 }}>Berat badan hari ini</ThemedText>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 8, borderWidth: 1, borderColor: '#E0E0E0', marginBottom: 20 }}>
          <TextInput style={{ flex: 1, height: 50, paddingHorizontal: 16, fontSize: 16 }} value={weight} onChangeText={setWeight} keyboardType="numeric" />
          <ThemedText type='labelLarge' style={{ paddingRight: 16,color: '#666' }}>kg</ThemedText>
        </View>

        <ThemedText type='titleMedium' style={{ marginBottom: 10 }}>Gejala apa saja yang dirasakan hari ini?</ThemedText>
        {symptomCategories.map(category => (
          <View key={category.id} style={{ marginBottom: 12 }}>
            <ThemedText type='titleSmall' style={{marginBottom: 8 }}>{category.title}</ThemedText>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {category.symptoms.map(symptom => {
                const isSelected = isSymptomSelected(category.id, symptom);
                return (
                  <TouchableOpacity
                    key={symptom}
                    style={{
                      paddingVertical: 8,
                      paddingHorizontal: 15,
                      borderRadius: 20,
                      margin: 4,
                      backgroundColor: getTagColor(category.id),
                      opacity: isSelected ? 0.4 : 1,
                      borderWidth: isSelected ? 0 : 1,
                      borderColor: '#d0d0d0',
                    }}
                    onPress={() => toggleSymptom(category.id, symptom)}
                  >
                    <ThemedText type='labelMedium' style={{fontWeight: '500', color: isSelected ? '#fff' : 'white' }}>{symptom}</ThemedText>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        <ThemedText type='titleMedium' style={{ marginBottom: 10 }}>Catatan</ThemedText>
        <View style={{ backgroundColor: '#FFF', borderRadius: 8, borderWidth: 1, borderColor: '#E0E0E0', padding: 8, height: 100, marginBottom: 20 }}>
          <TextInput style={{ flex: 1, fontSize: 14, textAlignVertical: 'top' }} multiline placeholder="Tambahkan catatan tambahan tentang gejala atau perasaanmu hari ini" placeholderTextColor="#BBB" value={notes} onChangeText={setNotes} />
        </View>

        <TouchableOpacity style={{ backgroundColor: '#64A8CB', borderRadius: 25, height: 50, justifyContent: 'center', alignItems: 'center', marginVertical: 16 }} onPress={() => Router.push('/(auth)/streak')}>
          <ThemedText type='titleMedium' style={{ color: '#FFFFFF'}}>Simpan</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PregnancySymptomTracker;
