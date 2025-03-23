import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView, TextInput, Modal } from 'react-native';
import { ChevronLeft, ChevronRight, Plus, Clock, X } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ui/ThemedText';
import DateTimePicker from '@react-native-community/datetimepicker';

const CalendarApp = () => {
    const [currentDate, setCurrentDate] = useState(new Date(2025, 2, 26)); // March 26, 2025
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const [formData, setFormData] = useState({
      title: 'Pertemuan Week 5',
      doctor: 'Dr. Darius Klainie',
      startDateTime: new Date(),
      endDateTime: new Date(),
    });

    const [showStartDate, setShowStartDate] = useState(false);
    const [showStartTime, setShowStartTime] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);
    const [showEndTime, setShowEndTime] = useState(false);

    const onStartDateChange = (event: any, selectedDate?: Date) => {
      setShowStartDate(false);
      if (selectedDate) {
        const newDate = new Date(formData.startDateTime);
        newDate.setFullYear(selectedDate.getFullYear());
        newDate.setMonth(selectedDate.getMonth());
        newDate.setDate(selectedDate.getDate());
        setFormData({ ...formData, startDateTime: newDate });
      }
    };
    
    const onStartTimeChange = (event: any, selectedTime?: Date) => {
      setShowStartTime(false);
      if (selectedTime) {
        const newDate = new Date(formData.startDateTime);
        newDate.setHours(selectedTime.getHours());
        newDate.setMinutes(selectedTime.getMinutes());
        setFormData({ ...formData, startDateTime: newDate });
      }
    };

    const onEndDateChange = (event: any, selectedDate?: Date) => {
      setShowEndDate(false);
      if (selectedDate) {
        const newDate = new Date(formData.endDateTime);
        newDate.setFullYear(selectedDate.getFullYear());
        newDate.setMonth(selectedDate.getMonth());
        newDate.setDate(selectedDate.getDate());
        setFormData({ ...formData, endDateTime: newDate });
      }
    };
    
    const onEndTimeChange = (event: any, selectedTime?: Date) => {
      setShowEndTime(false);
      if (selectedTime) {
        const newDate = new Date(formData.endDateTime);
        newDate.setHours(selectedTime.getHours());
        newDate.setMinutes(selectedTime.getMinutes());
        setFormData({ ...formData, endDateTime: newDate });
      }
    };

    const monthNames = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    
    const weekdayNames = ['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB'];
  
    const generateCalendarDays = (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      
      // First day of the month
      const firstDay = new Date(year, month, 1);
      // Last day of the month
      const lastDay = new Date(year, month + 1, 0);
      
      // Array to hold all dates
      const dates = [];
      
      // Add empty slots for days before the first of the month
      let startDay = firstDay.getDay();
      for (let i = 0; i < startDay; i++) {
        dates.push(null);
      }
      
      // Add all days of the month
      for (let i = 1; i <= lastDay.getDate(); i++) {
        dates.push(new Date(year, month, i));
      }
      
      return dates;
    };
  
    const dates = generateCalendarDays(currentDate);
    const router = useRouter();
  
    const goToPrevMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };
  
    const goToNextMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };
  
    const isSelectedDate = (date: Date | null) => {
      if (!date) return false;
      return date.getDate() === currentDate.getDate() &&
             date.getMonth() === currentDate.getMonth() &&
             date.getFullYear() === currentDate.getFullYear();
    };
  
    const isToday = (date: Date | null) => {
      if (!date) return false;
      const today = new Date();
      return date.getDate() === today.getDate() &&
             date.getMonth() === today.getMonth() &&
             date.getFullYear() === today.getFullYear();
    };

    interface Appointment {
        id: string;
        title: string;
        doctor: string;
        location: string;
        date: string;
        time: string;
      }
      
    const [todayAppointments] = useState<Appointment[]>([
    {
        id: '1',
        title: 'Pemeriksaan Week 24',
        doctor: 'Dr. Darius Klainie',
        location: 'Bleso',
        date: 'Senin, 4 Maret',
        time: '15:00 - 16:00'
    },
    {
        id: '2',
        title: 'USG Trimester 2',
        doctor: 'Dr. Sarah Smith',
        location: 'Bleso',
        date: 'Senin, 4 Maret',
        time: '16:30 - 17:30'
    }
    ]);

    // Function to handle form input changes
    const handleInputChange = (field: string, value: string) => {
      setFormData({
        ...formData,
        [field]: value
      });
    };

    // Function to handle form submission
    const handleSubmit = () => {
      // Here you would handle the submission of the new appointment
      console.log('Form submitted:', formData);
      setIsBottomSheetVisible(false);
    };

  return (
    <SafeAreaView style={{
        flex: 1,
        backgroundColor: '#4A4F87',
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 10,
        }}>
          <TouchableOpacity 
            style={{ padding: 8 }}
            onPress={() => {router.back()}}
          >
            <ChevronLeft color="#fff" size={24} />
          </TouchableOpacity>
          <ThemedText style={{
            color: '#fff',
            fontSize: 18,
            fontWeight: '500',
          }}>
            Jadwal Pertemuan
          </ThemedText>
          <TouchableOpacity 
            style={{ padding: 8 }}
            onPress={() => setIsBottomSheetVisible(true)}
          >
            <Plus color="#fff" size={24} />
          </TouchableOpacity>
        </View>
        
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          marginBottom: 20,
          marginTop: 20,
        }}>
          <ThemedText type='titleLarge' style={{color: '#FFFFFF'}}>
            {`${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
          </ThemedText>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <TouchableOpacity onPress={goToPrevMonth}>
              <ChevronLeft color="#fff" size={24} />
            </TouchableOpacity>
            <TouchableOpacity onPress={goToNextMonth}>
              <ChevronRight color="#fff" size={24} />
            </TouchableOpacity>
          </View>
        </View>
        
        
        <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingHorizontal: 16,
        }}>
            {weekdayNames.map((day, index) => (
            <View 
                key={`weekday-${index}`}
                style={{
                width: '14.28%',
                paddingVertical: 25,
                alignItems: 'center',
                }}
            >
                <ThemedText type='bodySmall' style={{color: '#fff'}}
                >
                    {day}
                </ThemedText>
            </View>
            ))}

            {dates.map((date, index) => (
            <TouchableOpacity
                key={`date-${index}`}
                style={{
                    width: '14.28%',
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: isSelectedDate(date) ? '#fff' : 'transparent',
                    borderRadius: 25,
                }}
                disabled={!date}
                onPress={() => date && setCurrentDate(date)}
            >
                {date ? (
                <ThemedText style={{
                    color: isSelectedDate(date) ? '#5C61A6' : 
                        isToday(date) ? '#FFC633' : '#fff',
                    fontSize: 20,
                    fontFamily: 'Switzer-Regular',
                    fontWeight: isToday(date) ? 'bold' : 'normal',
                }}>
                    {date.getDate()}
                </ThemedText>
                ) : null}
            </TouchableOpacity>
            ))}
        </View>
        
        <View style={{
          flex: 1,
          marginTop: 20,
          backgroundColor: '#fff',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          padding: 24,
        }}>
            <ScrollView 
                showsVerticalScrollIndicator={true}
                style={{ padding: 14 }}
                indicatorStyle="black" 
                persistentScrollbar={true} 
                contentContainerStyle={{ paddingRight: 12 }} 
            >
                <View style={{ marginBottom: 16 }}>
                    <ThemedText type='titleLarge' style={{color: '#000000',fontSize: 18, marginBottom: 8}}>
                        Hari Ini
                    </ThemedText>
                    
                    {todayAppointments.length === 0 ? (
                        <ThemedText type='bodyLarge' style={{color: '#7E7E7E', marginBottom: 8}}>
                        Tidak ada jadwal
                        </ThemedText>
                    ) : (
                        <ScrollView 
                          horizontal={false} 
                          showsVerticalScrollIndicator={true}
                          indicatorStyle="black" 
                          persistentScrollbar={true} 
                          contentContainerStyle={{ paddingRight: 12 }} 
                          style={{ maxHeight: 200 }} 
                        >
                        {todayAppointments.map((appointment) => (
                            <View 
                              key={appointment.id}
                              style={{
                                  backgroundColor: '#E8EAFF',
                                  borderRadius: 12,
                                  padding: 16,
                                  marginBottom: 12,
                              }}
                            >
                              <ThemedText style={{
                                  fontSize: 16,
                                  fontWeight: '600',
                                  color: '#5C61A6',
                                  marginBottom: 8,
                              }}>
                                  {appointment.title}
                              </ThemedText>
                            <View style={{ flexDirection: 'column' }}>
                                <ThemedText style={{
                                  fontSize: 14,
                                  color: '#666',
                                }}>
                                  {appointment.doctor}
                                </ThemedText>
                                <View style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  marginTop: 4,
                                }}>
                                  <ThemedText style={{
                                      fontSize: 12,
                                      color: '#666',
                                  }}>
                                      {`${appointment.location} (${appointment.date})`}
                                  </ThemedText>
                                  <View style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                  }}>
                                      <Clock size={14} color="#7583CA" />
                                      <ThemedText style={{
                                        fontSize: 12,
                                        color: '#666',
                                        marginLeft: 4,
                                      }}>
                                        {appointment.time}
                                      </ThemedText>
                                  </View>
                                </View>
                              </View>
                            </View>
                        ))}
                        </ScrollView>
                    )}
                </View>
                <View style={{ marginBottom: 16, marginTop: 30 }}>
                    <ThemedText type='titleLarge' style={{color: '#000000',fontSize: 18, marginBottom: 8}}>
                        Akan Datang
                    </ThemedText>
                    
                    {todayAppointments.length === 0 ? (
                        <ThemedText type='bodyLarge' style={{color: '#7E7E7E', marginBottom: 8}}>
                            Tidak ada jadwal
                        </ThemedText>
                    ) : (
                        <ScrollView 
                          horizontal={false} 
                          showsVerticalScrollIndicator={false}
                          style={{ maxHeight: 200 }} 
                        >
                          {todayAppointments.map((appointment) => (
                            <View 
                            key={appointment.id}
                            style={{
                                backgroundColor: '#E8EAFF',
                                borderRadius: 12,
                                padding: 16,
                                marginBottom: 12,
                            }}
                            >
                              <ThemedText style={{
                                  fontSize: 16,
                                  fontWeight: '600',
                                  color: '#5C61A6',
                                  marginBottom: 8,
                              }}>
                                  {appointment.title}
                              </ThemedText>
                              <View style={{ flexDirection: 'column' }}>
                                  <ThemedText style={{
                                    fontSize: 14,
                                    color: '#666',
                                  }}>
                                    {appointment.doctor}
                                  </ThemedText>
                                  <View style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  marginTop: 4,
                                  }}>
                                    <ThemedText style={{
                                        fontSize: 12,
                                        color: '#666',
                                    }}>
                                        {`${appointment.location} (${appointment.date})`}
                                    </ThemedText>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                        <Clock size={14} color="#7583CA" />
                                        <ThemedText style={{
                                        fontSize: 12,
                                        color: '#666',
                                        marginLeft: 4,
                                        }}>
                                        {appointment.time}
                                        </ThemedText>
                                    </View>
                                  </View>
                                </View>
                             </View>
                          ))}
                        </ScrollView>
                    )}
                </View>
            </ScrollView>
        </View>

        {/* Bottom Sheet Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isBottomSheetVisible}
          onRequestClose={() => setIsBottomSheetVisible(false)}
        >
          <View style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.5)'
          }}>
            <View style={{
              backgroundColor: 'white',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              height: '90%',
              paddingVertical: 24,
              paddingHorizontal: 16,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: -2
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
              {/* Header with buttons */}
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}>
                <TouchableOpacity onPress={() => setIsBottomSheetVisible(false)}>
                  <ThemedText type='titleMedium' style={{color: '#777777' }}>Batal</ThemedText>
                </TouchableOpacity>
                <ThemedText type='titleMedium' style={{ color:"#000000" }}>Jadwal Baru</ThemedText>
                <TouchableOpacity onPress={handleSubmit}>
                  <ThemedText type='titleMedium' style={{color: '#5D63A6' }}>Simpan</ThemedText>
                </TouchableOpacity>
              </View>
              
              {/* Form fields */}
              <View style={{ marginBottom: 16 }}>
                <ThemedText type='bodyMedium' style={{color: '#5D63A6', marginBottom: 4 }}>Judul</ThemedText>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#E1E1E1',
                    borderRadius: 8,
                    padding: 12,
                    fontSize: 16,
                  }}
                  value={formData.title}
                  onChangeText={(value) => handleInputChange('title', value)}
                />
              </View>
              
              <View style={{ marginBottom: 16 }}>
                <ThemedText type='bodyMedium' style={{color: '#5D63A6', marginBottom: 4 }}>Pertemuan dengan</ThemedText>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#E1E1E1',
                    borderRadius: 8,
                    padding: 12,
                    fontSize: 16,
                  }}
                  value={formData.doctor}
                  onChangeText={(value) => handleInputChange('doctor', value)}
                />
              </View>
              
              <View style={{ borderWidth: 1, borderColor: '#E1E1E1', marginBottom: 16, padding:10, borderRadius:10 }} >
                {/* Time fields */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom:20, justifyContent: 'space-between', paddingHorizontal: 3, paddingBottom:10 , borderBottomWidth: 1, borderColor: '#E1E1E1' }}>
                  <ThemedText type='labelLarge' style={{ fontWeight: '500', color: '#19191B', marginBottom: 8 }}>
                    Mulai
                  </ThemedText>
                  <View style={{ 
                    flexDirection: 'row', 
                    justifyContent: 'space-between',
                    gap: 8
                  }}>
                    <TouchableOpacity 
                      style={{
                        width: 100,
                        padding: 12,
                        backgroundColor: '#EFEFF0',
                        borderRadius: 8,
                      }}
                      onPress={() => setShowStartDate(true)}
                    >
                      <View style={{ width: 100 , flexDirection: 'row', alignItems: 'center'}}>
                        <ThemedText style={{ textAlign: 'center' }}>
                          {formData.startDateTime.toLocaleDateString('id-ID')}
                        </ThemedText>
                      </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={{
                        width: 80,
                        padding: 12,
                        backgroundColor: '#EFEFF0',
                        borderRadius: 8,
                      }}
                      onPress={() => setShowStartTime(true)}
                    >
                      <ThemedText style={{ textAlign: 'center' }}>
                        {formData.startDateTime.toLocaleTimeString('id-ID', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </ThemedText>
                    </TouchableOpacity>
                  </View>
                </View>
                
                <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between', paddingHorizontal: 3 }}>
                  <ThemedText type='labelLarge' style={{ fontWeight: '500', color: '#19191B'}}>
                    Berakhir
                  </ThemedText>
                  <View style={{ 
                    flexDirection: 'row', 
                    justifyContent: 'space-between',
                    gap: 8
                  }}>
                    <TouchableOpacity 
                      style={{
                        width: 100,
                        padding: 12,
                        backgroundColor: '#EFEFF0',
                        borderRadius: 8,
                      }}
                      onPress={() => setShowEndDate(true)}
                    >
                      <View style={{ width: 100 , flexDirection: 'row', alignItems: 'center'}}>
                        <ThemedText>
                          {formData.endDateTime.toLocaleDateString('id-ID')}
                        </ThemedText>
                      </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={{
                        width: 80,
                        padding: 12,
                        backgroundColor: '#EFEFF0',
                        borderRadius: 8,
                      }}
                      onPress={() => setShowEndTime(true)}
                    >
                      <ThemedText style={{ textAlign: 'center' }}>
                        {formData.endDateTime.toLocaleTimeString('id-ID', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </ThemedText>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Date & Time Pickers */}
              {showStartDate && (
                <DateTimePicker
                  value={formData.startDateTime}
                  mode="date"
                  onChange={onStartDateChange}
                />
              )}

              {showStartTime && (
                <DateTimePicker
                  value={formData.startDateTime}
                  mode="time"
                  onChange={onStartTimeChange}
                />
              )}

              {showEndDate && (
                <DateTimePicker
                  value={formData.endDateTime}
                  mode="date"
                  onChange={onEndDateChange}
                />
              )}

              {showEndTime && (
                <DateTimePicker
                  value={formData.endDateTime}
                  mode="time"
                  onChange={onEndTimeChange}
                />
              )}
            </View>
          </View>
        </Modal>
    </SafeAreaView>
    );
  };

export default CalendarApp;