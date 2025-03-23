import { useRef, useState } from 'react';
import { View, Text,Animated, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/ThemedText';
import { useRouter } from 'expo-router';
import { Plus, Bell,  } from 'lucide-react-native';

const MedicalAppScreen = () => {
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, text: 'Makan sayuran hijau gelap dan makan zat besi tambahan', completed: true },
    { id: 2, text: 'Tetap berolahraga tapi jangan memaksakan diri', completed: false },
    { id: 3, text: 'Cek tekanan darah', completed: false },
    { id: 4, text: 'Dengarkan musik yang menenangkan untuk membantu agar lebih rileks', completed: false },
  ]);
  const router = useRouter();

  const scrollX = useRef(new Animated.Value(0)).current;

  interface ChecklistItem {
    id: number;
    text: string;
    completed: boolean;
  }

  interface MedicalNote {
    id: string;
    date: string;
    description: string;
    color: string;
  }

  interface NearbyFacility {
    id: string;
    name: string;
    address: string;
    distance: string;
    image: any; // for require() image source
  }

  interface Appointment {
    id: string;
    title: string;
    doctor: string;
    location: string;
    date: string;
    time: string;
  }

  const [nearbyFacilities] = useState<NearbyFacility[]>([
    {
      id: '1',
      name: 'Suasana Hati',
      address: 'Jl. Melati No.4',
      distance: '400m',
      image: require('@/assets/images/klinik.png')
    },
    {
      id: '2',
      name: 'Berat Badan',
      address: 'Jl. Raya Bogor No.325',
      distance: '1,2km',
      image: require('@/assets/images/rumahsakit.png')
    }
  ]);

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
  
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      title: 'Pemeriksaan Week 24',
      doctor: 'Dr. Darius Klaine',
      location: 'Bekasi',
      date: 'Senin, 4 Maret',
      time: '15:00 - 16:00'
    },
    {
      id: '2',
      title: 'Pemeriksaan Week 24',
      doctor: 'Dr. Darius Klaine',
      location: 'Bekasi',
      date: 'Senin, 4 Maret',
      time: '15:00 - 16:00'
    },
    {
      id: '3',
      title: 'Pemeriksaan Week 24',
      doctor: 'Dr. Darius Klaine',
      location: 'Bekasi',
      date: 'Senin, 4 Maret',
      time: '15:00 - 16:00'
    },
  ]);

  const toggleChecklistItem = (id: number): void => {
    setChecklistItems(
      checklistItems.map((item: ChecklistItem) => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#f5f5f5',
    }}>
      <View>
        {/* Header */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 15,
        }}>
          <ThemedText type="headlineSmall" >Medis</ThemedText>
          <TouchableOpacity style={{ padding: 5 }}>
            <Bell size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={{marginBottom: 20}}>
        {/* Appointments Section */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          marginTop: 20,
          marginBottom: 10,
        }}>
          <ThemedText type="titleMedium" style={{
            fontSize: 20,
          }}>Jadwal pertemuan</ThemedText>
          <TouchableOpacity onPress={() => router.push('/(auth)/jadwalPertemuan')}>
            <ThemedText type='labelMedium' style={{ color: '#AFB1B6'}}>Lihat semua</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Appointment Cards */}
        <Animated.ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={{ paddingHorizontal: 20, marginRight: 20 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {appointments.map((appointment, index) => {
          const inputRange = [
            (index - 1) * 240, // card width (220) + marginRight (20)
            index * 240,
            (index + 1) * 240,
          ];
          
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.6, 1, 0.6],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View 
              key={appointment.id}
              style={{
                backgroundColor: '#6CB4EE',
                borderRadius: 12,
                padding: 15,
                width: 220,
                gap: 5,
                marginRight: 20,
                opacity,
              }}
            >
              <ThemedText type='titleMedium' style={{
                color: '#EFEFF0',
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 5,
              }}>
                {appointment.title}
              </ThemedText>
              
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
                <Feather name="user" size={16} color="white" />
                <ThemedText type='bodyMedium' style={{
                  color: '#FAFAFA',
                  marginLeft: 8,
                }}>
                  {appointment.doctor}
                </ThemedText>
              </View>

              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
                <MaterialIcons name="location-on" size={16} color="white" />
                <ThemedText type='bodySmall' style={{
                  color: '#FAFAFA',
                  marginLeft: 8,
                }}>
                  {`${appointment.location} (${appointment.date})`}
                </ThemedText>
              </View>

              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
                <Feather name="clock" size={16} color="white" />
                <ThemedText type='bodySmall' style={{
                  color: '#FAFAFA',
                  marginLeft: 8,
                }}>
                  {appointment.time}
                </ThemedText>
              </View>
            </Animated.View>
            );
          })}
        </Animated.ScrollView>

        {/* Checklist Section */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          marginTop: 20,
          marginBottom: 10,
        }}>
          <ThemedText type="titleMedium" style={{
            fontSize: 20,
            }}>
              Checklist
          </ThemedText>
          <TouchableOpacity onPress={() => router.push('/(auth)/checkList')}>
            <ThemedText type='labelMedium' style={{ color: '#AFB1B6'}}>Lihat semua</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Checklist Items */}
        <View style={{
          paddingHorizontal: 20,
          padding: 10,
        }}>
          {checklistItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                padding: 10,
              }}
              onPress={() => toggleChecklistItem(item.id)}
            >
              <View style={{ marginRight: 10, marginTop: 2 }}>
                {item.completed ? (
                  <View style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: '#8BC34A',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <Feather name="check" size={14} color="white" />
                  </View>
                ) : (
                  <View style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#ccc',
                  }} />
                )}
              </View>
              <ThemedText style={{
                flex: 1,
                fontSize: 14,
                lineHeight: 20,
                color: item.completed ? '#8BC34A' : 'black',
              }}>
                {item.text}
              </ThemedText>
            </TouchableOpacity>
          ))}

          {/* Add Checklist Item Button */}
          <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
          }}>
            <Feather name="plus" size={16} color="black" />
            <Text style={{
              marginLeft: 10,
              fontSize: 14,
              color: '#666',
            }}>Tambah checklist baru</Text>
          </TouchableOpacity>
        </View>

        {/* RS/Klinik terdekat Section */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          marginTop: 20,
          marginBottom: 10,
        }}>
          <ThemedText type="titleMedium" style={{
            fontSize: 20,
          }}>RS/Klinik terdekat</ThemedText>
          <TouchableOpacity onPress={() => router.push('/(auth)/RSComingSoon')}>
            <ThemedText type='labelMedium' style={{ color: '#AFB1B6'}}>Lihat semua</ThemedText>
          </TouchableOpacity>
        </View>
        {nearbyFacilities.map((facility) => (
          <View 
            key={facility.id}
            style={{
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              paddingHorizontal: 20, 
              marginTop: 10 
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>    
              <Image 
                source={facility.image}
                style={{ width: 60, height: 60, resizeMode: 'contain' }}
              />
              <View style={{ gap: 5 }}>
                <ThemedText type='titleSmall'>{facility.name}</ThemedText>
                <ThemedText type='bodySmall' style={{fontStyle:'italic', color: '#7E7E7E'}}>
                  {facility.address}
                </ThemedText>
              </View>
            </View>
            <View>
              <ThemedText type='bodyMedium'>{facility.distance}</ThemedText>
            </View>
          </View>
        ))}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          marginTop: 20,
          marginBottom: 10,
        }}>
          <ThemedText type="titleMedium" style={{
            fontSize: 20,
            }}>
              Catatan Pemeriksaanmu
          </ThemedText>
          <TouchableOpacity onPress={() => router.push('/(auth)/catatanPemeriksaan')}>
            <ThemedText type='labelMedium' style={{ color: '#AFB1B6'}}>Lihat semua</ThemedText>
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
          </View>
        ))}

        <TouchableOpacity
          style={{
          marginTop: 14,
          marginHorizontal: 20,
          backgroundColor: "#D33995",
          paddingVertical: 20,
          borderRadius: 30,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          }}
        >
          <Plus size={20} color="#FFF"/>
          <ThemedText type='labelLarge' style={{ color: "#FFF", marginLeft: 8 }} onPress={() => router.push('/(auth)/infoPraHamil')}>
              Buat Catatan Baru
          </ThemedText>
        </TouchableOpacity>  
      </ScrollView>
    </SafeAreaView>
  );
};

export default MedicalAppScreen;