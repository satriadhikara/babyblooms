import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, ActivityIndicator, FlatList, Text, Dimensions, Modal } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useRouter } from 'expo-router';
import { AntDesign, MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ui/ThemedText";
import * as Location from 'expo-location';

const OSM_TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const SCREEN_HEIGHT = Dimensions.get('window').height;

interface NominatimPlace {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
  distance?: number; // Adding distance property
}

export default function MapScreen() {
  const router = useRouter();
  const mapRef = useRef<MapView | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hospitals, setHospitals] = useState<NominatimPlace[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  
  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      
      // Auto center on location as soon as we get it
      if (mapRef.current && location) {
        setTimeout(() => {
          mapRef.current?.animateToRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }, 1000);
        }, 500); // Small delay to ensure the map is fully loaded
      }
    })();
  }, []);

  // Also center the map when location changes (in case initial centering happens before map is ready)
  useEffect(() => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    }
  }, [location]);

  // Calculate distance from user location to a point
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the earth in km
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
  
  const deg2rad = (deg: number): number => {
    return deg * (Math.PI/180);
  };

  const formatDistance = (distance: number): string => {
    if (distance < 1) {
      return `${(distance * 1000).toFixed(0)} m`;
    }
    return `${distance.toFixed(1)} km`;
  };

  const centerToUserLocation = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    }
  };

  const findNearbyHospitals = async () => {
    if (!location) return;
    
    setIsLoading(true);
    try {
      const { latitude, longitude } = location.coords;
      
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
      let allResults: NominatimPlace[] = [];
      
      for (let i = 0; i < responses.length; i++) {
        const response = responses[i];
        if (response.status === 'fulfilled' && response.value.ok) {
          const data: NominatimPlace[] = await response.value.json();
          console.log(`Search endpoint ${i + 1} found: ${data.length} results`);
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
        });
        
        // Sort by distance
        uniqueResults.sort((a, b) => (a.distance || 0) - (b.distance || 0));
      }
      
      console.log('Combined medical facilities found:', uniqueResults.length);
      
      if (uniqueResults.length > 0) {
        console.log('First facility:', uniqueResults[0].display_name);
        console.log('Distance:', uniqueResults[0].distance);
      } else {
        console.log('No medical facilities found in any search');
      }
      
      setHospitals(uniqueResults);
      
      // Automatically open the modal if results were found
      if (uniqueResults.length > 0) {
        setModalVisible(true);
      }
      
      // Adjust map to show both user and hospital if results were found
      if (uniqueResults.length > 0 && mapRef.current) {
        // Calculate the region that includes both user location and nearest hospital
        const nearestHospital = uniqueResults[0];
        const hospitalLat = parseFloat(nearestHospital.lat);
        const hospitalLon = parseFloat(nearestHospital.lon);
        
        const minLat = Math.min(latitude, hospitalLat);
        const maxLat = Math.max(latitude, hospitalLat);
        const minLon = Math.min(longitude, hospitalLon);
        const maxLon = Math.max(longitude, hospitalLon);
        
        // Add some padding
        const latDelta = (maxLat - minLat) * 1.5 + 0.005;
        const lonDelta = (maxLon - minLon) * 1.5 + 0.005;
        
        mapRef.current.animateToRegion({
          latitude: (minLat + maxLat) / 2,
          longitude: (minLon + maxLon) / 2,
          latitudeDelta: Math.max(0.01, latDelta),
          longitudeDelta: Math.max(0.01, lonDelta),
        }, 1000);
      }
    } catch (error) {
      console.error('Error finding hospitals:', error);
      setErrorMsg('Failed to fetch nearby hospitals');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to select a hospital and focus the map on it
  const focusOnHospital = (hospital: NominatimPlace) => {
    if (mapRef.current) {
      const hospitalLat = parseFloat(hospital.lat);
      const hospitalLon = parseFloat(hospital.lon);
      
      mapRef.current.animateToRegion({
        latitude: hospitalLat,
        longitude: hospitalLon,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
      
      // Optionally close the modal after selecting a location
      setModalVisible(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
          />
        </TouchableOpacity>
        <ThemedText type="titleMedium">RS/Klinik Sekitar</ThemedText>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={[{
              "featureType": "all",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#e0e0e0"
                }
              ]
            },
            {
              "featureType": "all",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "gamma": 0.01
                }
              ]
            },
            {
              "featureType": "landscape",
              "elementType": "geometry",
              "stylers": [
                {
                  "lightness": -100
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry",
              "stylers": [
                {
                  "lightness": 100
                }
              ]
            },
          ]}
        >
          {location && (
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Your Location"
            />
          )}
          
          {hospitals.map((hospital, index) => (
            <Marker
              key={hospital.place_id || index}
              coordinate={{
                latitude: parseFloat(hospital.lat),
                longitude: parseFloat(hospital.lon),
              }}
              title={hospital.display_name.split(',')[0]}
              description={hospital.distance ? `${formatDistance(hospital.distance)} away` : "Hospital"}
              onPress={() => focusOnHospital(hospital)}
            >
              <FontAwesome5 name="hospital" size={24} color="#E53935" />
            </Marker>
          ))}
        </MapView>
        
        <TouchableOpacity 
          style={styles.locationButton} 
          onPress={centerToUserLocation}
        >
          <MaterialIcons name="my-location" size={24} color="#79902A" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.hospitalButton} 
          onPress={findNearbyHospitals}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#E53935" />
          ) : (
            <FontAwesome5 name="hospital" size={24} color="#E53935" />
          )}
        </TouchableOpacity>
        
        {hospitals.length > 0 && (
          <TouchableOpacity
            style={styles.listButton}
            onPress={() => setModalVisible(true)}
          >
            <ThemedText type="bodyMedium" style={styles.listButtonText}>
              {hospitals.length} facilities found
            </ThemedText>
            <Ionicons name="list" size={20} color="#555" />
          </TouchableOpacity>
        )}
        
        {/* Modal for displaying the list of facilities */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <ThemedText type="titleMedium">
                  Nearby Medical Facilities ({hospitals.length})
                </ThemedText>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <AntDesign name="close" size={24} color="#555" />
                </TouchableOpacity>
              </View>
              
              <FlatList
                data={hospitals}
                keyExtractor={(item) => item.place_id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    style={styles.hospitalItem}
                    onPress={() => focusOnHospital(item)}
                  >
                    <View style={styles.hospitalItemIcon}>
                      <FontAwesome5 name="hospital" size={20} color="#E53935" />
                    </View>
                    <View style={styles.hospitalItemInfo}>
                      <ThemedText type="bodyLarge" style={styles.hospitalName}>
                        {item.display_name.split(',')[0]}
                      </ThemedText>
                      <ThemedText type="bodySmall" style={styles.hospitalAddress}>
                        {item.display_name.split(',').slice(1, 3).join(', ')}
                      </ThemedText>
                    </View>
                    {item.distance && (
                      <ThemedText type="bodyMedium" style={styles.hospitalDistance}>
                        {formatDistance(item.distance)}
                      </ThemedText>
                    )}
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    height: 116,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  locationButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'white',
    borderRadius: 30,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  hospitalButton: {
    position: 'absolute',
    bottom: 86, // Positioned above the location button
    right: 16,
    backgroundColor: 'white',
    borderRadius: 30,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  listButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  listButtonText: {
    marginRight: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '75%', // Take up to 75% of screen height
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  hospitalItem: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  hospitalItemIcon: {
    marginRight: 12,
  },
  hospitalItemInfo: {
    flex: 1,
  },
  hospitalName: {
    fontWeight: '600',
  },
  hospitalAddress: {
    color: '#666',
  },
  hospitalDistance: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    marginLeft: 8,
  },
});