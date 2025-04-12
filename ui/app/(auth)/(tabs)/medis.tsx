import { useRef, useState, useEffect } from 'react';
import { View, Text, Animated, TouchableOpacity, ScrollView, SafeAreaView, Image, ActivityIndicator } from 'react-native';
import { MaterialIcons, Feather, FontAwesome5 } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/ThemedText';
import { useRouter } from 'expo-router';
import { Plus, Bell } from 'lucide-react-native';
import * as Location from 'expo-location';
import { useAuth } from "../_layout";

interface NearbyFacility {
  place_id: number;
  name: string;
  address: string;
  distance: number | string;
  lat: string;
  lon: string;
  display_name: string;
}

const MedicalAppScreen = () => {
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, text: 'Makan sayuran hijau gelap dan makan zat besi tambahan', completed: true },
    { id: 2, text: 'Tetap berolahraga tapi jangan memaksakan diri', completed: false },
    { id: 3, text: 'Cek tekanan darah', completed: false },
    { id: 4, text: 'Dengarkan musik yang menenangkan untuk membantu agar lebih rileks', completed: false },
  ]);
  const router = useRouter();
  const scrollX = useRef(new Animated.Value(0)).current;

  // Add states for location and medical facilities
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [nearbyFacilities, setNearbyFacilities] = useState<NearbyFacility[]>([]);
  const [isLoadingFacilities, setIsLoadingFacilities] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { session, isPending } = useAuth();

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

  interface Appointment {
    id: string;
    title: string;
    doctor: string;
    location: string;
    date: string;
    time: string;
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

  // Get location and fetch nearby facilities
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      fetchNearbyFacilities(location);
    })();
  }, []);

  // Calculate distance function
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the earth in km
    const deg2rad = (deg: number) => deg * (Math.PI/180);
    
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1); 
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    return distance;
  };

  // Format distance for display
  const formatDistance = (distance: number): string => {
    if (distance < 1) {
      return `${(distance * 1000).toFixed(0)} m`;
    }
    return `${distance.toFixed(1)} km`;
  };

  // Fetch nearby medical facilities
  const fetchNearbyFacilities = async (userLocation: Location.LocationObject) => {
    if (!userLocation) return;
    
    setIsLoadingFacilities(true);
    try {
      const { latitude, longitude } = userLocation.coords;
      
      // Create multiple fetch requests with different parameters
      const requests = [
        // Search by keywords in Indonesian
        fetch(
          `https://nominatim.openstreetmap.org/search?` +
          `q=rumah+sakit&format=json&limit=5&` +
          `viewbox=${longitude - 0.8},${latitude - 0.8},${longitude + 0.8},${latitude + 0.8}&bounded=1`
        ),
        // Search by more Indonesian keywords
        fetch(
          `https://nominatim.openstreetmap.org/search?` +
          `q=klinik&format=json&limit=5&` +
          `viewbox=${longitude - 0.8},${latitude - 0.8},${longitude + 0.8},${latitude + 0.8}&bounded=1`
        ),
        // Search by more keywords
        fetch(
          `https://nominatim.openstreetmap.org/search?` +
          `q=puskesmas&format=json&limit=5&` +
          `viewbox=${longitude - 0.8},${latitude - 0.8},${longitude + 0.8},${latitude + 0.8}&bounded=1`
        ),
        // Search for midwives (bidan)
        fetch(
          `https://nominatim.openstreetmap.org/search?` +
          `q=bidan&format=json&limit=5&` +
          `viewbox=${longitude - 0.8},${latitude - 0.8},${longitude + 0.8},${latitude + 0.8}&bounded=1`
        )
      ];
      
      // Execute all requests in parallel
      const responses = await Promise.allSettled(requests);
      
      // Process successful responses
      let allResults: any[] = [];
      
      for (let i = 0; i < responses.length; i++) {
        const response = responses[i];
        if (response.status === 'fulfilled' && response.value.ok) {
          const data = await response.value.json();
          allResults = [...allResults, ...data];
        }
      }
      
      // Remove duplicates based on place_id
      const uniqueResults = allResults.filter((place, index, self) =>
        index === self.findIndex((p) => p.place_id === place.place_id)
      );
      
      // Calculate distance for each facility and sort by distance
      if (uniqueResults.length > 0) {
        uniqueResults.forEach(place => {
          const placeLat = parseFloat(place.lat);
          const placeLon = parseFloat(place.lon);
          place.distance = calculateDistance(
            latitude, 
            longitude, 
            placeLat, 
            placeLon
          );
          
          // Add a name field for easier access
          place.name = place.display_name.split(',')[0];
          place.address = place.display_name.split(',').slice(1, 3).join(', ');
        });
        
        // Sort by distance
        uniqueResults.sort((a, b) => (a.distance || 0) - (b.distance || 0));
      }
      
      // Save only the closest facilities
      setNearbyFacilities(uniqueResults.slice(0, 2));
      
      // Save all facilities to global storage (such as AsyncStorage)
      // We'll pass the data via router.push instead to keep things simple
      
    } catch (error) {
      console.error('Error finding hospitals:', error);
      setErrorMsg('Failed to fetch nearby hospitals');
    } finally {
      setIsLoadingFacilities(false);
    }
  };

  const navigateToMaps = () => {
    // Pass the facilities data to the maps screen
    router.push({
      pathname: '/(auth)/maps',
      params: { 
        showModal: 'true',
        // We can't pass complex objects directly, but the maps screen will fetch the data itself
      }
    });
  };

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
      {/* Header */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
      }}>
        <ThemedText type="headlineSmall" >Medis</ThemedText>
          <TouchableOpacity onPress={() => router.push("/(auth)/menu")}>
            <Image
              source={
                session?.user.image
                  ? { uri: session.user.image }
                  : require("@/assets/images/ProfPic.png")
              }
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                marginLeft: 15,
                backgroundColor: "#e0e0e0",
              }}
            />
          </TouchableOpacity>
      </View>
      <ScrollView>
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
            (index - 1) * 240, 
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
          <TouchableOpacity onPress={navigateToMaps}>
            <ThemedText type='labelMedium' style={{ color: '#AFB1B6'}}>Lihat semua</ThemedText>
          </TouchableOpacity>
        </View>
        
        {isLoadingFacilities ? (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <ActivityIndicator size="small" color="#E53935" />
            <ThemedText type="bodySmall" style={{ marginTop: 8 }}>Mencari fasilitas kesehatan terdekat...</ThemedText>
          </View>
        ) : nearbyFacilities.length > 0 ? (
          nearbyFacilities.map((facility) => (
            <View 
              key={facility.place_id}
              style={{
                flexDirection: 'row', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                paddingHorizontal: 20, 
                marginTop: 10 
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>    
                <View style={{ 
                  width: 60, 
                  height: 60, 
                  borderRadius: 30,
                  backgroundColor: '#F5F5F5',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#E0E0E0'
                }}>
                  <FontAwesome5 name="hospital" size={24} color="#E53935" />
                </View>
                <View style={{ gap: 5 }}>
                  <ThemedText type='titleSmall'>{facility.name}</ThemedText>
                  <ThemedText type='bodySmall' style={{fontStyle:'italic', color: '#7E7E7E'}}>
                    {facility.address}
                  </ThemedText>
                </View>
              </View>
              <View>
                <ThemedText type='bodyMedium'>{typeof facility.distance === 'number' ? formatDistance(facility.distance) : facility.distance}</ThemedText>
              </View>
            </View>
          ))
        ) : (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <ThemedText type="bodyMedium">Tidak ada fasilitas kesehatan terdekat ditemukan</ThemedText>
          </View>
        )}

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
          marginBottom: 40,
          backgroundColor: "#D33995",
          paddingVertical: 20,
          borderRadius: 30,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          }}
          onPress={() => router.push('/(auth)/catatanBaru')}
        >
          <Plus size={20} color="#FFF"/>
          <ThemedText type='labelLarge' style={{ color: "#FFF", marginLeft: 8 }}>
              Buat Catatan Baru
          </ThemedText>
        </TouchableOpacity>  
      </ScrollView>
    </SafeAreaView>
  );
};

export default MedicalAppScreen;