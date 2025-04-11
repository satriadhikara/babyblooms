import React, { useState } from 'react';
import { 
  View,  
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { ChevronLeft, Circle, Trash2 } from 'lucide-react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { useRouter } from 'expo-router';

const NoteScreen = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#F7F6F1',
    }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderBottomColor: '#EFEFEF',
          borderBottomWidth: 1,
        }}>
          <TouchableOpacity style={{ padding: 8 }} onPress={() => router.back()}>
            <ChevronLeft size={24} color="#000" />
          </TouchableOpacity>
          <ThemedText type='titleMedium'>
            Catatan Baru
          </ThemedText>
          <TouchableOpacity style={{ padding: 8 }}>
            <Circle size={24} color="#7E7E7E" fill="#D9D9D9" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView style={{
          flex: 1,
          padding: 16,
        }}>
          <TextInput
            style={{
              fontSize: 20,
              fontWeight: '300',
              color: '#BFBFBF',
              paddingVertical: 8,
            }}
            placeholder="Judul Catatan"
            placeholderTextColor="#BFBFBF"
            value={title}
            onChangeText={setTitle}
          />
          
          <View style={{
            height: 1,
            backgroundColor: '#E0E0E0',
            marginVertical: 10,
          }} />
          
          <TextInput
            style={{
                flex: 1,
                fontSize: 14,
                lineHeight: 20,
                color: '#666',
                paddingTop: 12,
                minHeight: 500,
            }}
            multiline
            placeholder={
                'Bagaimana hasil pemeriksaan?\n' +
                'Apa yang bunda konsultasikan dengan dokter?\n' +
                'Tulis hal-hal penting dari dokter yang perlu diingat di sini.'
            }
            placeholderTextColor="#BFBFBF"
            value={content}
            onChangeText={setContent}
            textAlignVertical="top"
        />
        </ScrollView>

        {/* Footer */}
        <View style={{
          padding: 16,
          borderTopColor: '#EFEFEF',
          borderTopWidth: 1,
          alignItems: 'flex-start',
        }}>
          <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 8,
          }}>
            <Trash2 size={20} color="#A0A0A0" />
            <ThemedText type='bodyLarge' style={{
              marginLeft: 8,
              color: '#A1A1A1',
              fontSize: 14,
            }}>
              Hapus Catatan
            </ThemedText>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NoteScreen;