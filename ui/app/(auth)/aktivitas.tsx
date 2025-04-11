import React, { useState, useEffect, useRef } from 'react';
import { ThemedText } from "@/components/ui/ThemedText";
import { 
    View,
    ScrollView,
    Pressable,
    TextInput,
    TouchableOpacity,
    Image,
    Animated,
    ActivityIndicator
} from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { CircleAlert, HelpCircle, ArrowLeft, CircleCheck, CircleX, CircleHelp } from "lucide-react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

// Define the Activity interface based on your schema
interface Activity {
    id: string;
    title: string;
    category: string;
    imageUrl?: string | null;
    isSafe: boolean;
}

const Aktivitas = () => {

    const API_URL = "http://babyblooms-api-mhtx1y-ea3f25-91-108-110-101.traefik.me/api";

    const [entryText, setEntryText] = useState('');
    const [activities, setActivities] = useState<Activity[]>([]);
    const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const textInputRef = useRef(null);
    const router = useRouter();
    const handleBack = () => router.back();

    const scrollY = useRef(new Animated.Value(0)).current;
    const headerHeight = scrollY.interpolate({
        inputRange: [0, 50],
        outputRange: [156, 0],
        extrapolate: 'clamp',
    });

    const categories = [
        "Semua", "Terkait Bepergian", "Olahraga", "Kesehatan", "Hiburan", 
        "Fashion", "Rumah Tangga", "Gerakan Tubuh", "Kecantikan & Kosmetik", "Perawatan Rambut"
    ];

    // Fetch all activities when component mounts
    useEffect(() => {
        fetchActivities();
    }, []);

    // Fetch activities from API
    const fetchActivities = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/activity`);
            if (!response.ok) {
                throw new Error('Failed to fetch activities');
            }
            
            const result = await response.json();
            
            if (result.success) {
                console.log('Fetched activities:', result.data);
                setActivities(result.data);
                setFilteredActivities(result.data);
            } else {
                setError(result.message || 'Failed to fetch activities');
            }
        } catch (error) {
            console.error('Error fetching activities:', error);
            setError('Network error. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    // Filter activities by category
    const filterByCategory = async (category: string) => {
        setSelectedCategory(category);
        setIsLoading(true);
        
        try {
            if (category === 'Semua') {
                setFilteredActivities(activities);
                setIsLoading(false);
                return;
            }
            
            const response = await fetch(`${API_URL}/activity/category/${encodeURIComponent(category)}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${category} activities`);
            }
            
            const result = await response.json();
            
            if (result.success) {
                setFilteredActivities(result.data);
            } else {
                setError(result.message || 'Failed to fetch activities by category');
            }
        } catch (error) {
            console.error(`Error fetching ${category} activities:`, error);
            setError('Network error. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    // Search activities
    const handleSearch = async () => {
        if (!entryText.trim()) {
            setFilteredActivities(activities);
            return;
        }
        
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/activity/search?query=${encodeURIComponent(entryText)}`);
            if (!response.ok) {
                throw new Error('Failed to search activities');
            }
            
            const result = await response.json();
            
            if (result.success) {
                setFilteredActivities(result.data);
            } else {
                setError(result.message || 'Failed to search activities');
            }
        } catch (error) {
            console.error('Error searching activities:', error);
            setError('Network error. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const getIcon = (isSafe: boolean) => {
        if (isSafe === true) {
            return <CircleCheck size={24} color="#F8F7F4" fill="green" />;
        } else if (isSafe === false) {
            return <CircleX size={24} color="#F8F7F4" fill="red" />;
        } else {
            return <CircleHelp size={24} color="#F8F7F4" fill="gray" />;
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F7F4", paddingHorizontal: 10, position: 'fixed'}}>
            <Animated.View
                style={{
                    height: headerHeight,
                    width: "100%",
                    backgroundColor: "#F8F7F4",
                    overflow: 'hidden',
                }}
            >
                <View
                    style={{
                        height: 96,
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingHorizontal: 20,
                        backgroundColor: "#F8F7F4",
                    }}
                >
                    <Pressable onPress={() => handleBack()}>
                        <ArrowLeft size={24} color="black" />
                    </Pressable>
                    <ThemedText type='titleMedium'>Aktivitas</ThemedText>
                    <Pressable>
                        <HelpCircle size={24} color="black" />
                    </Pressable>
                </View>
                <TextInput
                    ref={textInputRef}
                    style={{
                        height: 40,
                        borderWidth: 1,
                        borderColor: '#E0E0E0',
                        borderRadius: 48,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        marginHorizontal: 10,
                        backgroundColor: "#EFEFF0",
                        fontSize: 14,
                        color: "#000000",
                        fontFamily: 'switzer',
                    }}
                    placeholder="Cari aktivitas"
                    value={entryText}
                    onChangeText={setEntryText}
                    onSubmitEditing={handleSearch}
                    returnKeyType="search"
                />
            </Animated.View>
            
            {/* Category Tabs */}
            <View style={{ height: 52, width: "100%", backgroundColor: "#F8F7F4", position: 'sticky', top: 0, zIndex: 10 }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                    {categories.map((category, index) => (
                        <TouchableOpacity
                            key={index}
                            style={{
                                height: 52,
                                paddingHorizontal: 16,
                                justifyContent: "center",
                                alignItems: "center",
                                borderBottomWidth: selectedCategory === category ? 2 : 0,
                                borderBottomColor: "#96B88A",
                            }}
                            onPress={() => filterByCategory(category)}
                        >
                            <ThemedText 
                                type='titleSmall'
                                style={{ 
                                    color: selectedCategory === category ? "#96B88A" : "#000000" 
                                }}
                            >
                                {category}
                            </ThemedText>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <Animated.ScrollView 
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { y: scrollY } } }
                ], { useNativeDriver: false })}
            >
                {isLoading ? (
                    <View style={{ padding: 20, alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#96B88A" />
                    </View>
                ) : error ? (
                    <View style={{ padding: 20, alignItems: 'center' }}>
                        <ThemedText style={{ color: 'red' }}>{error}</ThemedText>
                        <TouchableOpacity 
                            style={{ marginTop: 10, padding: 10, backgroundColor: '#F0F0F0', borderRadius: 5 }}
                            onPress={fetchActivities}
                        >
                            <ThemedText>Coba Lagi</ThemedText>
                        </TouchableOpacity>
                    </View>
                ) : filteredActivities.length === 0 ? (
                    <View style={{ padding: 20, alignItems: 'center' }}>
                        <ThemedText>Tidak ada aktivitas ditemukan</ThemedText>
                    </View>
                ) : (
                    filteredActivities.map((activity) => (
                        <View key={activity.id} style={{
                            height: "auto",
                            width: "100%",
                            backgroundColor: "#F8F7F4",
                            alignItems: "center",
                            justifyContent: "center",
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            marginBottom: 10,
                        }}>
                            <View style={{
                                width: "100%",
                                height: 64,
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <Image
                                    source={activity.imageUrl ? { uri: activity.imageUrl } : require("../../assets/images/splash-icon.png")}
                                    style={{ width: 64, height: 64, borderRadius: 12 }}
                                />
                                <ThemedText style={{ width: 224, fontFamily: "switzer", fontSize: 16 }}>
                                    {activity.title}
                                </ThemedText>
                                <View style={{ width: 24, height: 24 }}>
                                    {getIcon(activity.isSafe)}
                                </View>
                            </View>
                        </View>
                    ))
                )}
            </Animated.ScrollView>
        </SafeAreaView>
    );
}

export default Aktivitas;