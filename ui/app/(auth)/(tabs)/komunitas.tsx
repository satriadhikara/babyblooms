import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView, StatusBar, Platform, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemedText } from '@/components/ui/ThemedText';
import { MessageCircleMore, Heart,Bell,Ellipsis, Beaker  } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const CommunityScreen = () => {
  const [activeTab, setActiveTab] = useState('Semua');
  const [likedPosts, setLikedPosts] = useState<LikedPosts>({});
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [overlayAnimation] = useState(new Animated.Value(0));
  const router = useRouter();

  interface Post {
    id: number;
    author: string;
    timeAgo: string;
    title: string;
    content: string;
    likes: number;
    comments: number;
    category: string;
    avatar: any;
  }

  interface LikedPosts {
    [key: number]: boolean;
  }

  const toggleCategoryPicker = () => {
    const toValue = !showCategoryPicker ? 1 : 0;
    
    Animated.parallel([
      Animated.timing(animation, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnimation, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    setShowCategoryPicker(!showCategoryPicker);
  };

  const toggleLike = (postId: number) => {
    setLikedPosts((prev: LikedPosts) => ({
      ...prev,
      [postId]: !prev[postId], // Toggle like status
    }));
  };

  const categoryOptions = [
    { 
      name: 'Pregnancy Q&A', 
      icon: require('@/assets/images/QnA.png'), 
      backgroundColor: '#E75480',
      params: 'Pregnancy Q&A'
    },
    { 
      name: 'Tips & Rekomendasi', 
      icon: require('@/assets/images/Tips.png'), 
      backgroundColor: '#E75480',
      params: 'Tips & Rekomendasi'
    },
    { 
      name: 'Gaya Hidup', 
      icon: require('@/assets/images/GayaHidup.png'), 
      backgroundColor: '#E75480',
      params: 'Gaya Hidup'
    },
];

  const posts = [
    {
      id: 1,
      author: 'Citra Kirana',
      timeAgo: '20m lalu',
      title: 'Gimana cara hilangin rasa mual',
      content: 'Bun, aku udah seminggu ini mual-mual terus sampai gak nafsu makan.. ada yang tau cara mengatasinya ga yah?',
      likes: 4,
      comments: 2,
      category: 'Pregnancy Q&A',
      avatar: require('@/assets/images/ProfPic.png'),
    },
    {
      id: 2,
      author: 'Tomoro Tuku',
      timeAgo: '1j lalu',
      title: 'Konsultasi dokter',
      content: 'Bun, untuk konsultasi ke dokter tuh enaknya berapa kali sehari ya?',
      likes: 2,
      comments: 1,
      category: 'Tips & Rekomendasi',
      avatar: require('@/assets/images/ProfPic.png'),
    },
    {
      id: 3,
      author: 'Fiona Siregar',
      timeAgo: '3j lalu',
      title: 'Yoga hamil',
      content: 'baru aja coba yoga hamil, ternyata bikin lebih enak! Rekomendasi kelas online atau offline?',
      likes: 0,
      comments: 0,
      category: 'Tips & Rekomendasi',
      avatar: require('@/assets/images/ProfPic.png'),
    },
  ];

  const handleCategorySelect = (category: string) => {
    // Here you would handle the creation of a new post with the selected category
    console.log(`Selected category: ${category}`);
    setShowCategoryPicker(false);
    // You could navigate to a create post screen with the selected category pre-selected
    // router.push({ pathname: '/(auth)/create-post', params: { category } });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F7F4' }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <SafeAreaView style={{ 
        backgroundColor: 'white',
      }}>
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          paddingHorizontal: 24,
          paddingVertical: 5,
          backgroundColor: 'white',
        }}>
          <ThemedText type='headlineSmall'>Komunitas</ThemedText>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Bell size={24} color="#000"/>
            <TouchableOpacity onPress={() => router.push('/(auth)/akunSaya')}>
              <Image 
                source={require('@/assets/images/ProfPic.png')} 
                style={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: 20, 
                  marginLeft: 15, 
                  backgroundColor: '#e0e0e0' 
                }} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {/* Tab Bar */}
      <View style={{ flexDirection: 'row', backgroundColor: 'white', height: 48, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
        {['Semua', 'Pregnancy Q&A', 'Tips & Rekomendasi'].map((category) => {
          const isActive = activeTab === category;
          return (
            <TouchableOpacity key={category} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => setActiveTab(category)}>
              <ThemedText type='titleSmall' style={{ fontSize: 12, color: isActive ? '#D33995' : '#AFB1B6' }}>{category}</ThemedText>
              {isActive && <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, backgroundColor: '#D33995' }} />}
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView>
        {posts.map((post) => {
          const isLiked = likedPosts[post.id] || false;
          return (
            <View key={post.id} style={{ marginBottom: 8, padding: 24 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={post.avatar} style={{ width: 40, height: 40, borderRadius: 20, marginRight: 12, backgroundColor: '#e0e0e0' }} />
                  <View>
                    <ThemedText type='titleSmall' style={{ color: '#3B3B3B' }}>{post.author}</ThemedText>
                    <ThemedText type='labelSmall' style={{ color: '#888' }}>{post.timeAgo}</ThemedText>
                  </View>
                </View>
                <Ellipsis size={24} color="#888" />
              </View>
              <View>
                <ThemedText type='labelLarge' style={{ marginBottom: 4, color: 'black' }}>{post.title}</ThemedText>
                <ThemedText type='bodyLarge' style={{ color: '#00030F' }}>{post.content}</ThemedText>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }} onPress={() => toggleLike(post.id)}>
                    <Heart size={20} color={isLiked ? '#E75480' : '#888'} fill={isLiked ? '#E75480' : 'transparent'} />
                    <ThemedText type='labelMedium' style={{ marginLeft: 4, color: '#888' }}>{post.likes + (isLiked ? 1 : 0)}</ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => router.push('/(auth)/komentar')}>
                    <MessageCircleMore size={20} color="#888" />
                    <ThemedText type='labelMedium' style={{ marginLeft: 4, color: '#888' }}>{post.comments}</ThemedText>
                  </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: '#f0f0f0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 }}>
                  <ThemedText type='labelSmall' style={{ fontSize: 12, color: '#A1A1A1' }}>{post.category}</ThemedText>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {showCategoryPicker && (
        <>
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              zIndex: 99,
              opacity: overlayAnimation,
            }}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={toggleCategoryPicker}
              style={{ flex: 1 }}
            />
          </Animated.View>
          
          <View 
            style={{ 
              position: 'absolute', 
              right: 15, 
              bottom: 75, 
              alignItems: 'flex-end',
              zIndex: 100,
            }}
          >
            {categoryOptions.map((category, index) => {
              const translateY = animation.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              });
              
              const opacity = animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              });

              const scale = animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 1],
              });

              return (
                <Animated.View
                  key={category.name}
                  style={{
                    transform: [{ translateY }, { scale }],
                    opacity,
                    marginBottom: 12,
                  }}
                >
                  <TouchableOpacity 
                      onPress={() => index === categoryOptions.length - 1 
                        ? toggleCategoryPicker() 
                        : handleCategorySelect(category.name)
                      }
                      style={{ 
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <View style={{
                        marginRight: 8,
                        opacity: 0.9,
                      }}>
                        <ThemedText type='titleMedium' style={{ color: 'white' }}>
                          {category.name}
                        </ThemedText>
                      </View>
                      <TouchableOpacity 
                        style={{ 
                          width: 56, 
                          height: 56, 
                          borderRadius: 28, 
                          backgroundColor: category.backgroundColor,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onPress={() => {
                          router.push({
                            pathname: '/(auth)/unggahanBaru',
                            params: { selectedTopic: category.params },
                          });
                        }}
                      >
                        <Image 
                          source={category.icon}
                          style={{
                            width: 24,
                            height: 24,
                          }}
                        />
                    </TouchableOpacity>
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </View>
        </>
      )}

      {/* Add Button */}
      <TouchableOpacity 
        onPress={toggleCategoryPicker}
        style={{ 
          position: 'absolute', 
          right: 16, 
          bottom: 20, 
          width: 56, 
          height: 56, 
          borderRadius: 28, 
          backgroundColor: '#D33995', 
          alignItems: 'center', 
          justifyContent: 'center', 
          elevation: 4, 
          shadowColor: '#000', 
          shadowOffset: { width: 0, height: 2 }, 
          shadowOpacity: 0.25, 
          shadowRadius: 3.84,
          zIndex: 100,
        }}
      >
        <Ionicons name={showCategoryPicker ? "close" : "add"} size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default CommunityScreen;