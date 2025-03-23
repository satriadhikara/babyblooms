import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
  Animated,
  Alert,
} from "react-native";
import { ThemedText } from "@/components/ui/ThemedText";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  MessageCircleMore,
  Heart,
  ArrowLeft,
  Ellipsis,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { useAuth } from "./_layout";
import { authClient } from "@/utils/auth-client";
import LoadingComponent from "@/components/ui/Loading";

const MyAccount = () => {
  const { session, isPending } = useAuth();
  const [activeTab, setActiveTab] = useState("Unggahan");
  const [likedPosts, setLikedPosts] = useState<LikedPosts>({});
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [overlayAnimation] = useState(new Animated.Value(0));
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  interface Post {
    id: string;
    author: string;
    timeAgo: string;
    title: string;
    content: string;
    likes: number;
    comments: number;
    category: string;
    avatar: any;
    userLiked?: boolean;
  }

  interface LikedPosts {
    [key: string]: boolean;
  }

  useEffect(() => {
    if (!session) return;

    if (activeTab === "Unggahan") {
      fetchPersonalPosts();
    } else {
      fetchLikedPosts();
    }
  }, [activeTab, session]);

  // Initialize liked posts from server data
  useEffect(() => {
    const initialLikes: LikedPosts = {};
    posts.forEach((post) => {
      if (post.userLiked) {
        initialLikes[post.id] = true;
      }
    });
    setLikedPosts(initialLikes);
  }, [posts]);

  const fetchPersonalPosts = async () => {
    setLoading(true);
    try {
      const cookies = authClient.getCookie();
      const headers = {
        Cookie: cookies,
      };
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/post/personal`,
        {
          headers,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch personal posts");
      }

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching personal posts:", error);
      Alert.alert("Error", "Failed to load your posts");
    } finally {
      setLoading(false);
    }
  };

  const fetchLikedPosts = async () => {
    setLoading(true);
    try {
      // This would ideally be a separate endpoint for liked posts
      // For now, we'll fetch all posts and filter the ones liked by the user
      const cookies = authClient.getCookie();
      const headers = {
        Cookie: cookies,
      };
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/post`,
        {
          headers,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      // Filter only the posts that the user has liked
      const likedPosts = data.filter((post: Post) => post.userLiked);
      setPosts(likedPosts);
    } catch (error) {
      console.error("Error fetching liked posts:", error);
      Alert.alert("Error", "Failed to load liked posts");
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async (postId: string) => {
    // Optimistically update UI
    setLikedPosts((prev: LikedPosts) => ({
      ...prev,
      [postId]: !prev[postId],
    }));

    try {
      const cookies = authClient.getCookie();
      const headers = {
        Cookie: cookies,
      };
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/post/${postId}/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
        }
      );

      if (!response.ok) {
        // Revert optimistic update if request fails
        setLikedPosts((prev: LikedPosts) => ({
          ...prev,
          [postId]: !prev[postId],
        }));
        throw new Error("Failed to like post");
      }

      // Refresh posts after successful like/unlike
      if (activeTab === "Unggahan") {
        fetchPersonalPosts();
      } else {
        fetchLikedPosts();
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const categoryOptions = [
    {
      name: "Pregnancy Q&A",
      icon: require("@/assets/images/QnA.png"),
      backgroundColor: "#E75480",
      params: "Pregnancy Q&A",
    },
    {
      name: "Tips & Rekomendasi",
      icon: require("@/assets/images/Tips.png"),
      backgroundColor: "#E75480",
      params: "Tips & Rekomendasi",
    },
    {
      name: "Gaya Hidup",
      icon: require("@/assets/images/GayaHidup.png"),
      backgroundColor: "#E75480",
      params: "Gaya Hidup",
    },
  ];

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

  if (isPending) {
    return <LoadingComponent />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F7F4" }}>
      <StatusBar backgroundColor="#F8F7F4" barStyle="dark-content" />
      <SafeAreaView
        style={{
          backgroundColor: "#F8F7F4",
        }}
      >
        <View style={{ borderBottomWidth: 1, borderBottomColor: "#E0E0E0" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 16,
              paddingVertical: 20,
              marginLeft: 10,
            }}
          >
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color="black" />
            </TouchableOpacity>
            <ThemedText
              type="titleMedium"
              style={{ fontSize: 16, fontWeight: "600" }}
            >
              Akun Saya
            </ThemedText>
            <View style={{ width: 32 }} />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 6,
              paddingVertical: 10,
              marginLeft: 24,
            }}
          >
            <Image
              source={
                session?.user.image
                  ? { uri: session.user.image }
                  : require("@/assets/images/ProfPic.png")
              }
              style={{ width: 48, height: 48, borderRadius: 24 }}
            />
            <ThemedText
              type="titleMedium"
              style={{ marginLeft: 20, fontSize: 20, color: "#3B3B3B" }}
            >
              {session?.user?.name}
            </ThemedText>
            <View style={{ width: 32 }} />
          </View>

          {/* Tab Bar */}
          <View style={{ flexDirection: "row", height: 48, marginRight: 150 }}>
            {["Unggahan", "Menyukai"].map((category) => {
              const isActive = activeTab === category;
              return (
                <TouchableOpacity
                  key={category}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => setActiveTab(category)}
                >
                  <ThemedText
                    type="titleSmall"
                    style={{
                      fontSize: 12,
                      color: isActive ? "#D33995" : "#AFB1B6",
                    }}
                  >
                    {category}
                  </ThemedText>
                  {isActive && (
                    <View
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 2,
                        backgroundColor: "#D33995",
                      }}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <ScrollView>
          {loading ? (
            <LoadingComponent
              style={{
                marginTop: 100,
                marginBottom: 100,
              }}
            />
          ) : posts.length === 0 ? (
            <View
              style={{
                alignItems: "center",
                marginTop: 100,
                width: "100%",
                height: "100%",
              }}
            >
              <Image
                source={require("@/assets/images/emptyState.png")}
                style={{ width: 210, height: 180, marginBottom: 20 }}
              />
              <ThemedText
                type="titleMedium"
                style={{ fontSize: 16, color: "#777777", fontWeight: "600" }}
              >
                {activeTab === "Unggahan"
                  ? "Belum ada unggahan di sini"
                  : "Belum ada unggahan yang disukai"}
              </ThemedText>
              <ThemedText
                type="bodyMedium"
                style={{
                  fontSize: 14,
                  color: "#888",
                  textAlign: "center",
                  marginTop: 8,
                  paddingHorizontal: 40,
                }}
              >
                {activeTab === "Unggahan"
                  ? "Punya pertanyaan, keluhan, atau tips seputar kehamilan? Bagikan sekarang!"
                  : "Temukan tips, cerita, atau diskusi menarik, lalu tekan suka untuk menyimpannya."}
              </ThemedText>
            </View>
          ) : (
            posts.map((post) => {
              const isLiked = likedPosts[post.id] || false;
              return (
                <View key={post.id} style={{ marginBottom: 8, padding: 24 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 12,
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        source={
                          activeTab === "Menyukai"
                            ? { uri: post.avatar }
                            : session?.user.image
                            ? { uri: session.user.image }
                            : require("@/assets/images/ProfPic.png")
                        }
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                          marginRight: 12,
                          backgroundColor: "#e0e0e0",
                        }}
                      />
                      <View>
                        <ThemedText
                          type="titleSmall"
                          style={{ color: "#3B3B3B" }}
                        >
                          {activeTab === "Menyukai"
                            ? post.author
                            : session?.user.name}
                        </ThemedText>
                        <ThemedText type="labelSmall" style={{ color: "#888" }}>
                          {post.timeAgo}
                        </ThemedText>
                      </View>
                    </View>
                    <Ellipsis size={24} color="#888" />
                  </View>
                  <View>
                    <ThemedText
                      type="labelLarge"
                      style={{
                        marginBottom: 4,
                        color: "#00030F",
                        fontFamily: "Switzer-Semibold",
                      }}
                    >
                      {post.title}
                    </ThemedText>
                    <ThemedText type="bodyLarge" style={{ color: "#00030F" }}>
                      {post.content}
                    </ThemedText>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 12,
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginRight: 16,
                        }}
                        onPress={() => toggleLike(post.id)}
                      >
                        <Heart
                          size={20}
                          color={isLiked ? "#E75480" : "#888"}
                          fill={isLiked ? "#E75480" : "transparent"}
                        />
                        <ThemedText
                          type="labelMedium"
                          style={{ marginLeft: 4, color: "#888" }}
                        >
                          {post.likes}
                        </ThemedText>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{ flexDirection: "row", alignItems: "center" }}
                        onPress={() =>
                          // router.push({
                          //   pathname: "/(auth)/komentar",
                          //   params: { postId: post.id },
                          // })
                          Alert.alert("Coming soon!")
                        }
                      >
                        <MessageCircleMore size={20} color="#888" />
                        <ThemedText
                          type="labelMedium"
                          style={{ marginLeft: 4, color: "#888" }}
                        >
                          {post.comments}
                        </ThemedText>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        backgroundColor: "#f0f0f0",
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 12,
                      }}
                    >
                      <ThemedText
                        type="labelSmall"
                        style={{ fontSize: 12, color: "#A1A1A1" }}
                      >
                        {post.category}
                      </ThemedText>
                    </View>
                  </View>
                </View>
              );
            })
          )}
        </ScrollView>
      </SafeAreaView>
      {showCategoryPicker && (
        <>
          <Animated.View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.4)",
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
              position: "absolute",
              right: 15,
              bottom: 75,
              alignItems: "flex-end",
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
                    onPress={() => {
                      toggleCategoryPicker();
                      router.push({
                        pathname: "/(auth)/unggahanBaru",
                        params: { selectedTopic: category.params },
                      });
                    }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        marginRight: 8,
                        opacity: 0.9,
                      }}
                    >
                      <ThemedText type="titleMedium" style={{ color: "white" }}>
                        {category.name}
                      </ThemedText>
                    </View>
                    <TouchableOpacity
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 28,
                        backgroundColor: category.backgroundColor,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onPress={() => {
                        router.push({
                          pathname: "/(auth)/unggahanBaru",
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
          position: "absolute",
          right: 16,
          bottom: 20,
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: "#D33995",
          alignItems: "center",
          justifyContent: "center",
          elevation: 4,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          zIndex: 100,
        }}
      >
        <Ionicons
          name={showCategoryPicker ? "close" : "add"}
          size={32}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
};

export default MyAccount;
