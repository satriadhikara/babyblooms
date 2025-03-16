import React, { useState, useRef } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Keyboard, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { ThemedText } from '@/components/ui/ThemedText';
import { useRouter } from 'expo-router';

export default function JournalScreen() {
  // Start with an empty array to test the empty state
  interface Entry {
    id: string;
    name: string;
    time: string;
    text: string;
  }

  const [entries, setEntries] = useState<Entry[]>([]);
  // If you want to test with data:
//   const [entries, setEntries] = useState([
//     { id: '1', name: 'Fiona Siregar', time: 'Kemarin', text: 'Halo' },
//     { id: '2', name: 'Fiona Siregar', time: '5m lalu', text: 'Tiba tiba ngidam mangga muda nih.. hehehe' },
//   ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [entryText, setEntryText] = useState('');
  const textInputRef = useRef(null);
  const router = useRouter();

  const addNewEntry = () => {
    if (entryText.trim()) {
      const newEntry = {
        id: Date.now().toString(),
        name: 'Fiona Siregar',
        time: 'Baru saja',
        text: entryText.trim(),
      };

      setEntries([...entries, newEntry]);
      setEntryText('');
    }
    Keyboard.dismiss();
    setModalVisible(false);
  };

  const handleModalHide = () => {
    Keyboard.dismiss();
  };

  const handleSwipeStart = () => {
    // Dismiss keyboard as soon as swipe starts
    Keyboard.dismiss();
  };

  // Component for Empty State
  const EmptyStateComponent = () => (
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
            Belum ada momen terekam
        </ThemedText>
        <ThemedText 
            type='bodyMedium'
            style={{ 
                fontSize: 16, 
                color: '#777777',
                textAlign: 'center'
            }}
        >
            Mulai tulis kisahmu hari ini!
        </ThemedText>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#faf9f6'}}>
    <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {/* Header */}
      <SafeAreaView style={{ backgroundColor: '#fff' }}>
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          height: 50,
          paddingHorizontal: 16,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight  : 13,
          backgroundColor: '#fff',
        }}>
          <TouchableOpacity 
            style={{ padding: 8 }}
            onPress={() => router.push('/(auth)/(tabs)/jurnal')}
          >
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <ThemedText type='titleMedium'>Buku Harian</ThemedText>
          </View>
          <View style={{ width: 40 }} /> 
        </View>
      </SafeAreaView>
  
      {entries.length > 0 ? (
        <FlatList
          data={entries}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={{ flexDirection: 'row', marginBottom: 15, paddingHorizontal: 16, paddingTop: 16 }}>
              <View style={{ alignItems: 'center', marginRight: 10, position: 'relative' }}>
                {/* Profile Image */}
                <Image
                  source={require('@/assets/images/ProfPic.png')}
                  style={{ width: 40, height: 40, borderRadius: 15, zIndex: 1 }}
                  resizeMode="cover"    
                />

                {index > 0 && (
                  <View 
                    style={{ 
                      position: 'absolute',
                      top: -40,
                      height: 50,
                      width: 2,
                      backgroundColor: '#E0E0E0',
                      alignSelf: 'center',
                    }} 
                  />
                )}
                
                {index < entries.length - 1 && (
                  <View 
                    style={{ 
                      position: 'absolute',
                      top: 40, 
                      height: 30,
                      width: 2,
                      backgroundColor: '#E0E0E0',
                      alignSelf: 'center',
                    }} 
                  />
                )}
              </View>
              
              <View style={{ flex: 1 }}>
                <ThemedText type='titleMedium'>{item.name}</ThemedText>
                <ThemedText type='labelSmall' style={{ color: 'gray', fontSize: 12 }}>{item.time}</ThemedText>
                <ThemedText style={{ fontWeight: 'regular',fontSize: 16,fontFamily:'switzer', marginTop: 5 }}>{item.text}</ThemedText>
              </View>
            </View>
          )}
        />
      ) : (
        <EmptyStateComponent />
      )}

      {/* Tombol Tambah */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 20,
          bottom: 30,
          backgroundColor: '#C2185B',
          width: 56,
          height: 56,
          borderRadius: 28,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 4,
        }}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="add" size={32} color="white" />
      </TouchableOpacity>

      {/* Bottom Sheet Modal */}
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => {
          Keyboard.dismiss();
          setModalVisible(false);
        }}
        onSwipeStart={handleSwipeStart}
        onSwipeMove={handleSwipeStart}
        onSwipeComplete={() => setModalVisible(false)}
        onModalHide={handleModalHide}
        swipeDirection="down"
        propagateSwipe={true}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            minHeight: 200,
          }}
        >
          <View style={{ 
            width: 80, 
            height: 5, 
            backgroundColor: '#E0E0E0', 
            borderRadius: 3, 
            alignSelf: 'center', 
            marginBottom: 15 
          }} />
          
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 15 }}>Tulis Momenmu</Text>
          <TextInput
            ref={textInputRef}
            style={{
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: 5,
              padding: 10,
              minHeight: 50,
              maxHeight: 120,
              textAlignVertical: 'top',
            }}
            placeholder="Mau es krim((("
            value={entryText}
            onChangeText={setEntryText}
            multiline
            autoFocus
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#D81B60',
              borderRadius: 25,
              paddingVertical: 12,
              alignItems: 'center',
              marginTop: 15,
              marginBottom: 10,
            }}
            onPress={addNewEntry}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Simpan</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}