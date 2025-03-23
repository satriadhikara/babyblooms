import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Modal } from 'react-native';
import { ArrowLeft, CircleHelp, FileWarning } from "lucide-react-native";
import { ThemedText } from '@/components/ui/ThemedText';
import { router } from 'expo-router';

type HelpBottomSheetProps = {
  visible: boolean;
  onClose: () => void;
};

const HelpBottomSheet = ({ visible, onClose }: HelpBottomSheetProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}>
        <View style={{
          backgroundColor: 'white',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          padding: 20,
          paddingBottom: 30,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 5,
        }}>
          <View style={{ 
            width: 80, 
            height: 5, 
            backgroundColor: '#E0E0E0', 
            borderRadius: 3, 
            alignSelf: 'center', 
            marginBottom: 15 
          }} />
          <ThemedText type='titleMedium' style={{
            fontSize: 20,
            marginBottom: 15,
            textAlign: 'center',
            color: '#000000',
          }}>
            Panduan Contraction Counter
          </ThemedText>
          
          <ThemedText type='bodyLarge' style={{
            marginBottom: 15,
            color: '#000000',
          }}>
            Kontraksi persalinan biasanya mulai muncul di minggu ke-37 kehamilan atau lebih. Namun, beberapa ibu bisa mengalami kontraksi Braxton Hicks (kontraksi palsu) lebih awal. Pantau kontraksi dengan mudah menggunakan fitur ini untuk mengetahui tanda-tanda persalinan.
          </ThemedText>
          
          <View style={{marginBottom: 20}}>
            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <ThemedText type='bodyMedium' style={{marginRight: 5}}>1.</ThemedText>
              <View style={{flex:1}}>
                <ThemedText style={{fontSize: 16,fontWeight: "700", fontFamily: "Switzer", lineHeight: 24}}>
                  Mulai Menghitung
                </ThemedText>
                <ThemedText style={{fontSize: 16,fontWeight: "400", fontFamily: "Switzer", lineHeight: 24}}>
                  Tekan "Kontraksi Mulai" saat kontraksi dimulai.
                </ThemedText>
              </View>
            </View>

            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <ThemedText type='bodyMedium' style={{marginRight: 5}}>2.</ThemedText>
              <View style={{flex:1}}>
                <ThemedText style={{fontSize: 16,fontWeight: "700", fontFamily: "Switzer", lineHeight: 24,}}>
                  Berhenti Menghitung
                </ThemedText>
                <ThemedText style={{fontSize: 16,fontWeight: "400", fontFamily: "Switzer", lineHeight: 24}}>
                  Tekan "Kontraksi Berhenti" saat kontraksi berakhir.
                </ThemedText>
              </View>
            </View>

            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <ThemedText type='bodyMedium' style={{marginRight: 5}}>3.</ThemedText>
              <View style={{flex:1}}>
                <ThemedText style={{fontSize: 16,fontWeight: "700", fontFamily: "Switzer", lineHeight: 24,}}>
                  Pantau Pola Kontraksi
                </ThemedText>
                <ThemedText style={{fontSize: 16,fontWeight: "400", fontFamily: "Switzer", lineHeight: 24}}>
                  BabyBlooms akan mencatat durasi dan frekuensi serta pola kontraksimu.
                </ThemedText>
              </View>
            </View>

            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <ThemedText type='bodyMedium' style={{marginRight: 5}}>4.</ThemedText>
              <View style={{flex:1}}>
                <ThemedText style={{fontSize: 16,fontWeight: "700", fontFamily: "Switzer", lineHeight: 24,}}>
                  Dapatkan Notifikasi
                </ThemedText>
                <ThemedText style={{fontSize: 16,fontWeight: "400", fontFamily: "Switzer", lineHeight: 24}}>
                  Jika pola kontraksi menunjukkan tanda persalinan aktif, BabyBlooms akan memberi tahumu dan menotifikasi pendamping.
                </ThemedText>
              </View>
            </View>
          </View>
          
          <ThemedText style={{
            fontStyle: 'italic',
            fontSize: 14,
            fontWeight: "400",
            fontFamily: "Switzer",
            lineHeight: 20,
            marginTop: 10,
            marginBottom: 20,
            color: '#555',
          }}>
            Jika kontraksi terjadi sebelum minggu ke-37 atau terasa sangat menyakitkan dan tidak biasa, segera konsultasikan dengan dokter.
          </ThemedText>
          
          <TouchableOpacity 
            style={{
              backgroundColor: '#D33995',
              borderRadius: 50,
              paddingVertical: 12,
              alignItems: 'center',
              marginTop: 5,
            }}
            onPress={onClose}
          >
            <ThemedText style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Mengerti!</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const AlertModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}>
        <View style={{
          backgroundColor: 'white',
          borderRadius: 20,
          padding: 20,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          width: '80%',
        }}>
          <FileWarning size={50} color="#D33995" />
          <ThemedText type='titleMedium' style={{
            fontSize: 20,
            marginVertical: 15,
            color: '#000000',
          }}>
            Saatnya ke rumah sakit
          </ThemedText>
          <ThemedText type='bodyLarge' style={{ color: '#AFB1B6'}}>
             Kontraksi sudah menunjukkan fase persalinan aktif. Segera pergi ke fasilitas medis dan hubungi dokter. Kami akan memberi tahu pendampingmu sekarang. Tetap tenang, si kecil akan segera lahir!
            </ThemedText>
          <TouchableOpacity 
            style={{
              backgroundColor: '#D33995',
              borderRadius: 50,
              paddingVertical: 12,
              width: '100%',
              alignItems: 'center',
              marginTop: 20,
            }}
            onPress={onClose}
          >
            <ThemedText style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
              Mengerti
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const ContractionCounter = () => {
    const [contractions, setContractions] = useState<{ id: number; duration: number; timestamp: Date }[]>([]);
    const [isTracking, setIsTracking] = useState(false);
    const [currentDuration, setCurrentDuration] = useState(0);
    const [frequency, setFrequency] = useState(0);
    const [displayFrequency, setDisplayFrequency] = useState('0:00');
    const [displayDuration, setDisplayDuration] = useState('0:00');
    const [showHelpSheet, setShowHelpSheet] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const todayDate = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    const [showAlert, setShowAlert] = useState(false);

    // Start tracking a contraction
    const startContraction = () => {
      setIsTracking(true);
      setCurrentDuration(0);
      const startTime = new Date();

      // Start timer to update duration
      timerRef.current = setInterval(() => {
          setCurrentDuration(prevDuration => prevDuration + 1);
      }, 1000);
    };

    const stopContraction = () => {
      setIsTracking(false);
      if (timerRef.current !== null) {
          clearInterval(timerRef.current);
    }

    const duration = currentDuration;
    const newContraction = {
        id: contractions.length + 1,
        duration: duration,
        timestamp: new Date(),
    };

    // Add new contraction to the beginning of the list
    setContractions(prevContractions => [newContraction, ...prevContractions]);
    };

    // Format seconds to mm:ss
    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Calculate average duration
    useEffect(() => {
        if (contractions.length > 0) {
        // Calculate average duration
        const totalDuration = contractions.reduce((sum, contraction) => sum + contraction.duration, 0);
        const avgDuration = Math.round(totalDuration / contractions.length);
        setDisplayDuration(formatTime(avgDuration));

        // Calculate frequency if there are at least 2 contractions
        if (contractions.length >= 2) {
            const mostRecent = contractions[0].timestamp;
            const secondMostRecent = contractions[1].timestamp;
            const timeBetween = (mostRecent.getTime() - secondMostRecent.getTime()) / 1000; 
            setFrequency(timeBetween);
            setDisplayFrequency(formatTime(Math.round(timeBetween)));
        }
        } else {
          setDisplayDuration('0:00');
          setDisplayFrequency('0:00');
        }
    }, [contractions]);

    useEffect(() => {
      if (contractions.length + 1 === 5) {
        setShowAlert(true);
      }
    }, [contractions.length]);

    useEffect(() => {
        if (isTracking) {
        setDisplayDuration(formatTime(currentDuration));
        }
    }, [currentDuration, isTracking]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
      <View style={{ 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
      }}>
        <TouchableOpacity onPress={router.back} style={{ padding: 8 }}>
          <ArrowLeft size={24} color="black" />
        </TouchableOpacity>
        <ThemedText type='titleMedium'>Contraction Counter</ThemedText>
        <TouchableOpacity onPress={() => setShowHelpSheet(true)}>
          <CircleHelp size={24} color="black" />
        </TouchableOpacity>
      </View>
      
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 16,
        gap: 16,
      }}>
        <View style={{
          flex: 1,
          alignItems: 'center',
          padding: 12,
          backgroundColor: '#f0f0f0',
          borderRadius: 8,
          gap: 8,
        }}>
          <ThemedText type='titleLarge'>{displayDuration}</ThemedText>
          <ThemedText type='bodySmall' style={{ 
            textAlign: 'center',
            marginTop: 4,
            color: '#666'
          }}>rata-rata durasi</ThemedText>
        </View>
        <View style={{
          flex: 1,
          alignItems: 'center',
          padding: 12,
          backgroundColor: '#f0f0f0',
          borderRadius: 8,
          gap: 8,
        }}>
          <ThemedText type='titleLarge'>{contractions.length}</ThemedText>
          <ThemedText type='bodySmall' style={{ 
            textAlign: 'center',
            marginTop: 4,
            color: '#666'
          }}>kontraksi dalam 1 jam terakhir</ThemedText>
        </View>
        <View style={{
          flex: 1,
          alignItems: 'center',
          padding: 12,
          backgroundColor: '#f0f0f0',
          borderRadius: 8,
          gap: 8,
        }}>
          <ThemedText type='titleLarge'>{displayFrequency}</ThemedText>
          <ThemedText type='bodySmall' style={{ 
            textAlign: 'center',
            marginTop: 4,
            color: '#666'
          }}>rata-rata frekuensi</ThemedText>
        </View>
      </View>
      
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 75,
        marginTop: 20
      }}>
        <ThemedText type='bodyMedium' style={{ color: '#666' }}>Durasi</ThemedText>
        <ThemedText type='bodyMedium' style={{ color: '#666' }}>Frekuensi</ThemedText>
      </View>
      
      <View style={{flex:1}}>
        <View style={{
          flex: 1,
          alignItems: 'center',
          marginTop: 20,
          paddingHorizontal: 40,
        }}>
          <ScrollView 
            style={{ 
              width: '100%',
            }} 
            contentContainerStyle={{ 
              alignItems: 'center',
              paddingBottom: 200, // Space for button
              paddingTop: 10,
            }}
            showsVerticalScrollIndicator={true}
          >
            {/* Current Counter when tracking */}
            {isTracking && (
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '83%',
                    justifyContent: 'space-between',
                    marginBottom: 15,
                    padding: 12,
                }}>
                    <ThemedText type='titleLarge' style={{
                        width: 70,
                        textAlign: 'center',
                        color: '#E75480'
                    }}>
                        {formatTime(currentDuration)}
                    </ThemedText>
                    <View style={{
                        width: 48,
                        height: 48,
                        borderRadius: 24,
                        borderWidth: 5,
                        borderColor: '#DA5AA7',
                        backgroundColor: 'transparent',
                        justifyContent: 'center',
                        alignItems: 'center',
                        elevation: 3
                    }}>
                        <ThemedText style={{
                            color: '#DA5AA7',
                            fontWeight: 'bold',
                            fontSize: 16
                        }}>
                            {contractions.length + 1}
                        </ThemedText>
                    </View>
                    <ThemedText type='titleLarge' style={{
                        width: 70,
                        textAlign: 'center'
                    }}>
                        0:00
                    </ThemedText>
                </View>
            )}

            {/* Previous Contractions */}
            {contractions.map((item, index) => (
              <View key={index} style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'transparent',
                padding: 12,
                borderRadius: 8,
              }}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',gap: 50, marginRight: 115}}>
                  <ThemedText type='titleLarge' style={{
                    width: 70,
                    textAlign: 'center'
                  }}>
                    {formatTime(item.duration)}
                  </ThemedText>
                  
                  {index > 0 && (
                    <View style={{
                      position: 'absolute',
                      top: -40, 
                      left: '83%',
                      height: 70, 
                      width: 7,
                      backgroundColor: '#DA5AA7',
                      opacity: 0.3,
                    }} />
                  )}
                  
                  <View style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: '#DA5AA7',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <ThemedText style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 16
                    }}>
                      {contractions.length - index}
                    </ThemedText>
                  </View>
                </View>
                <View style={{position:'absolute', left: '72%', top: 50}}>
                  <ThemedText type='titleLarge' style={{
                    width: 70,
                    textAlign: 'center',
                  }}>
                    {index < contractions.length - 1 
                      ? formatTime(Math.round((contractions[index].timestamp.getTime() - contractions[index + 1].timestamp.getTime()) / 1000)) 
                      : ''}
                  </ThemedText>
                </View>
              </View>
            ))}

            <ThemedText style={{
                marginVertical: 16,
                color: '#999'
            }}>
                {todayDate}
            </ThemedText>
          </ScrollView>

          <View style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            alignItems: 'center',
            paddingBottom: 20,
            backgroundColor: 'transparent',
          }}>
            {isTracking ? (
              <TouchableOpacity 
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 75,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 9,
                  borderColor: 'rgba(255, 244, 244, 0.11)',
                  shadowColor: '#000',
                  backgroundColor: '#d87093',
                  elevation: 5, // Add elevation for Android
                  shadowOffset: { width: 0, height: 2 }, // Add shadow for iOS
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                }}
                onPress={stopContraction}>
                <ThemedText style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}>Kontraksi Berhenti</ThemedText>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 75,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#666',
                  borderWidth: 9,
                  borderColor: 'rgba(255, 244, 244, 0.11)',
                  shadowColor: '#000',
                  elevation: 5,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                }}
                onPress={startContraction}>
                <ThemedText style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}>Kontraksi</ThemedText>
                <ThemedText style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}>Mulai</ThemedText>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      <AlertModal 
        visible={showAlert}
        onClose={() => setShowAlert(false)}
      />
      
      {/* Help Bottom Sheet */}
      <HelpBottomSheet 
        visible={showHelpSheet} 
        onClose={() => setShowHelpSheet(false)} 
      />
    </SafeAreaView>
  );
};

export default ContractionCounter;