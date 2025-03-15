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
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const PregnancySymptomTracker = () => {
  const [mood, setMood] = useState(4);
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState({
    gastrointestinal: ['Nyeri perut', 'Konstipasi'],
    otot: ['Kram kaki'],
    neurologi: ['Sakit kepala'],
    hormonal: ['Perubahan mood'],
  });
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

      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' }}>
        <TouchableOpacity style={{ padding: 4 }}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center', gap: 5}}>
          <Text style={{ fontSize: 17, fontWeight: '700' }}>Minggu 4, Hari 5</Text>
          <Text style={{ fontSize: 14, color: '#7E7E7E' }}>Sel, 20 Mar</Text>
        </View>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 10 }}>Bagaimana perasaanmu hari ini?</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
          {moodEmojis.map((emoji, index) => (
            <TouchableOpacity key={index} onPress={() => setMood(index)}>
              <Text style={{ fontSize: 50, padding: 8, opacity: mood === index ? 1 : 0.6 }}>{emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 10 }}>Berat badan hari ini</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 8, borderWidth: 1, borderColor: '#E0E0E0', marginBottom: 20 }}>
          <TextInput style={{ flex: 1, height: 50, paddingHorizontal: 16, fontSize: 16 }} value={weight} onChangeText={setWeight} keyboardType="numeric" />
          <Text style={{ paddingRight: 16, fontSize: 16, color: '#666' }}>kg</Text>
        </View>

        <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 10 }}>Gejala apa saja yang dirasakan hari ini?</Text>
        {symptomCategories.map(category => (
          <View key={category.id} style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 8 }}>{category.title}</Text>
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
                    <Text style={{ fontSize: 12, fontWeight: '500', color: isSelected ? '#fff' : 'white' }}>{symptom}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 10 }}>Catatan</Text>
        <View style={{ backgroundColor: '#FFF', borderRadius: 8, borderWidth: 1, borderColor: '#E0E0E0', padding: 8, height: 100, marginBottom: 20 }}>
          <TextInput style={{ flex: 1, fontSize: 14, textAlignVertical: 'top' }} multiline placeholder="Tambahkan catatan tambahan tentang gejala atau perasaanmu hari ini" placeholderTextColor="#BBB" value={notes} onChangeText={setNotes} />
        </View>

        <TouchableOpacity style={{ backgroundColor: '#64A8CB', borderRadius: 25, height: 50, justifyContent: 'center', alignItems: 'center', marginVertical: 16 }} onPress={() => Router.push('/(auth)/(tabs)/streak')}>
          <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '500' }}>Simpan</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PregnancySymptomTracker;
