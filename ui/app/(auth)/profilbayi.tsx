import React, { useState, useEffect, useRef } from "react";
import { ThemedText } from "@/components/ui/ThemedText";
import {
  View,
  Pressable,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TextInput,
  Text,
} from "react-native";
import Modal from 'react-native-modal';
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronRight, Ellipsis, Radio } from "lucide-react-native";
import { useAuth } from "./_layout";
import { Calendar as RNCalendar } from 'react-native-calendars';

const Profil = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const handleBack = () => {
    router.back();
  };

  const [entryText, setEntryText] = useState('');
  const textInputRef = useRef(null);
  const handleModalHide = () => {
    Keyboard.dismiss();
  };

  const handleSwipeStart = () => {
    // Dismiss keyboard as soon as swipe starts
    Keyboard.dismiss();
  };

  const { session } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [genderModalVisible, setGenderModalVisible] = useState(false);
  const [selectedGender, setSelectedGender] = useState('Laki Laki');

  // Add after other state declarations
  const [dateModalVisible, setDateModalVisible] = useState(false);

  // Add function to handle date selection
  const addNewDate = () => {
    if (!selectedDate) {
      Alert.alert("Peringatan", "Pilih tanggal terlebih dahulu.");
      return;
    }
    setDateModalVisible(false);
    Alert.alert("Berhasil", "Tanggal telah disimpan.");
  };

  const genderOptions = [
    { label: 'Laki Laki', value: 'Laki Laki' },
    { label: 'Perempuan', value: 'Perempuan' },
    { label: 'Belum Diketahui', value: 'belum diketahui' }
  ];



  const addNewEntryName = () => {
    if (entryText.trim() === "") {
      Alert.alert("Peringatan", "Nama tidak boleh kosong.");
      return;
    }
    setEntryText("");
    setModalVisible(false);

    Alert.alert("Berhasil", "Nama baru telah disimpan.");
  };

  const addNewGender = () => {
    if (!selectedGender) {
      Alert.alert("Peringatan", "Pilih jenis kelamin terlebih dahulu.");
      return;
    }
    setGenderModalVisible(false);
    Alert.alert("Berhasil", "Jenis kelamin telah disimpan.");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFF",
      }}
    >
      <View style={{ backgroundColor: "#F8F7F4", flex: 1 }}>
        {/* Header */}
        <View
          style={{
            height: 96,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            marginBottom: 20,
            backgroundColor: "#FFF",
          }}
        >
          <Pressable onPress={() => handleBack()}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </Pressable>
          <ThemedText type="titleMedium">Profil Bayimu</ThemedText>
          <Pressable>
            <Ellipsis color={"#000"} size={24} />
          </Pressable>
        </View>
        <View
          style={{
            backgroundColor: "#F8F7F4",
            paddingHorizontal: 20,
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
              marginBottom: 20,
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 20,
                backgroundColor: "#F8F7F4",
                paddingVertical: 15,
              }}
            >
              <Image
                // source={
                //   userImage
                //     ? { uri: userImage }
                //     : require("@/assets/images/ProfPic.png")
                // }
                source={require("@/assets/images/babySkinLight.png")}
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: "contain",
                  borderRadius: 100,
                }}
              />
              <View style={{ gap: 4, alignItems: "center" }}>
                <ThemedText type="titleLarge">Seth</ThemedText>
                <ThemedText type="bodyMedium" style={{ color: "#7E7E7E" }}>
                  4 Minggu, 5 Hari
                </ThemedText>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: 15,
                width: "100%",
              }}
            >
              <ThemedText type="bodyMedium" style={{ color: "#000" }}>
                Nama
              </ThemedText>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                onPress={() => setModalVisible(true)}
              >
                <ThemedText type="bodyMedium" style={{ color: "#000" }}>
                  Jake
                </ThemedText>
                <ChevronRight size={20} color="#000" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                paddingTop: 10,
                marginHorizontal: 34,
              }}
            >
              <ThemedText type="bodyMedium" style={{ color: "#000" }}>
                Jenis Kelamin
              </ThemedText>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                onPress={() => setGenderModalVisible(true)}
              >
                <ThemedText type="bodyMedium" style={{ color: "#000" }}>
                  Laki Laki
                </ThemedText>
                <ChevronRight size={20} color="#000" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                paddingTop: 10,
                marginHorizontal: 34,
              }}
            >
              <ThemedText type="bodyMedium" style={{ color: "#000" }}>
                Hari Perkiraan Lahir
              </ThemedText>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                onPress={() => setDateModalVisible(true)}
              >
                <ThemedText type="bodyMedium" style={{ color: "#000" }}>
                  1 Okt 2025
                </ThemedText>
                <ChevronRight size={20} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
                backgroundColor: '#4697C1',
                borderRadius: 25,
                paddingVertical: 12,
                alignItems: 'center',
                marginTop: 15,
                marginBottom: 10,
              }}
              onPress={addNewEntryName}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Simpan</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </Modal>
        <Modal
          isVisible={genderModalVisible}
          onBackdropPress={() => setGenderModalVisible(false)}
          onSwipeComplete={() => setGenderModalVisible(false)}
          swipeDirection="down"
          style={{
            justifyContent: 'flex-end',
            margin: 0,
          }}
        >
          <View style={{
            backgroundColor: 'white',
            padding: 20,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}>
            <View style={{ 
              width: 80, 
              height: 5, 
              backgroundColor: '#E0E0E0', 
              borderRadius: 3, 
              alignSelf: 'center', 
              marginBottom: 15 
            }} />
            
            <Text style={{ 
              fontSize: 16, 
              fontWeight: 'bold', 
              marginBottom: 20 
            }}>
              Jenis Kelamin
            </Text>

            {genderOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 12,
                }}
                onPress={() => {
                  setSelectedGender(option.value);
                  setGenderModalVisible(false);
                }}
              >
                <View style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: '#545F71',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 12,
                }}>
                  {selectedGender === option.value && (
                    <View style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: '#545F71',
                    }} />
                  )}
                </View>
                <Text style={{ 
                  fontSize: 16,
                  color: '#545F71',
                }}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={{
                backgroundColor: '#4697C1',
                borderRadius: 25,
                paddingVertical: 12,
                alignItems: 'center',
                marginTop: 15,
                marginBottom: 10,
              }}
              onPress={addNewGender}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Simpan</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal
          isVisible={dateModalVisible}
          onBackdropPress={() => setDateModalVisible(false)}
          onSwipeComplete={() => setDateModalVisible(false)}
          swipeDirection="down"
          style={{
            justifyContent: 'flex-end',
            margin: 0,
          }}
        >
          <View style={{
            backgroundColor: 'white',
            padding: 20,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}>
            <View style={{ 
              width: 80, 
              height: 5, 
              backgroundColor: '#E0E0E0', 
              borderRadius: 3, 
              alignSelf: 'center', 
              marginBottom: 15 
            }} />
            
            <Text style={{ 
              fontSize: 16, 
              fontWeight: 'bold', 
              marginBottom: 20 
            }}>
              Pilih Tanggal
            </Text>

            <RNCalendar
              current={selectedDate}
              onDayPress={(day: { dateString: string; day: number; month: number; year: number }) => {
              setSelectedDate(day.dateString);
              }}
              markedDates={{
              [selectedDate]: {
                selected: true,
                selectedColor: '#4697C1'
              }
              }}
              theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#545F71',
              selectedDayBackgroundColor: '#D65DB1',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#4697C1',
              dayTextColor: '#545F71',
              textDisabledColor: '#d9e1e8',
              arrowColor: 'black',
              }}
            />

            <TouchableOpacity
              style={{
                backgroundColor: '#4697C1',
                borderRadius: 25,
                paddingVertical: 12,
                alignItems: 'center',
                marginTop: 15,
                marginBottom: 10,
              }}
              onPress={addNewDate}
            >
              <Text style={{ 
                color: 'white', 
                fontWeight: 'bold', 
                fontSize: 16 
              }}>
                Konfirmasi
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default Profil;
