import { useRef, useEffect } from "react";
import { View, Animated, Easing, StyleProp, ViewStyle } from "react-native";

interface LoadingProps {
  style?: StyleProp<ViewStyle>;
}

const LoadingComponent = ({ style }: LoadingProps = {}) => {
  // Create animation values for each circle
  const anim1 = useRef(new Animated.Value(0)).current;
  const anim2 = useRef(new Animated.Value(0)).current;
  const anim3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Create the sequential animation
    const flowAnimation = Animated.loop(
      Animated.stagger(200, [
        Animated.sequence([
          Animated.timing(anim1, {
            toValue: 1,
            duration: 400,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(anim1, {
            toValue: 0,
            duration: 400,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(anim2, {
            toValue: 1,
            duration: 400,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(anim2, {
            toValue: 0,
            duration: 400,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(anim3, {
            toValue: 1,
            duration: 400,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(anim3, {
            toValue: 0,
            duration: 400,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    // Start the animation
    flowAnimation.start();

    // Clean up animation on unmount
    return () => {
      flowAnimation.stop();
    };
  }, []);

  // Scale transform for each circle
  const scale1 = anim1.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5],
  });

  const scale2 = anim2.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5],
  });

  const scale3 = anim3.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5],
  });

  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        },
        style,
      ]}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Animated.View
          style={{
            width: 10,
            height: 10,
            backgroundColor: "#E99CCA",
            borderRadius: 5,
            transform: [{ scale: scale1 }],
          }}
        />
        <Animated.View
          style={{
            width: 10,
            height: 10,
            backgroundColor: "#B8D162",
            borderRadius: 5,
            transform: [{ scale: scale2 }],
          }}
        />
        <Animated.View
          style={{
            width: 10,
            height: 10,
            backgroundColor: "#9EA1CA",
            borderRadius: 5,
            transform: [{ scale: scale3 }],
          }}
        />
      </View>
    </View>
  );
};

export default LoadingComponent;
