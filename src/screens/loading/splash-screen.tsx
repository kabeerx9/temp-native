import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const {width} = Dimensions.get('window');

const SplashScreen = () => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.5);
  const rotate = useSharedValue(0);
  const slideX = useSharedValue(-width);
  const glowIntensity = useSharedValue(0);

  useEffect(() => {
    // Initial fade and scale animation
    opacity.value = withTiming(1, {
      duration: 1500,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    scale.value = withTiming(1, {
      duration: 1500,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    // Continuous rotation
    rotate.value = withRepeat(
      withTiming(360, {
        duration: 3000,
        easing: Easing.linear,
      }),
      -1, // Infinite repetition
    );

    // Slide in animation
    slideX.value = withTiming(0, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });

    // Glow animation
    glowIntensity.value = withRepeat(
      withSequence(
        withTiming(5, {duration: 1000}),
        withTiming(0, {duration: 1000}),
      ),
      -1,
    );
  }, []);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{scale: scale.value}],
  }));

  const rotatingViewStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${rotate.value}deg`}],
  }));

  const slideTextStyle = useAnimatedStyle(() => ({
    transform: [{translateX: slideX.value}],
  }));

  const glowTextStyle = useAnimatedStyle(() => ({
    textShadowRadius: glowIntensity.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, containerStyle]}>
        {/* Rotating border */}
        <Animated.View style={[styles.rotatingBorder, rotatingViewStyle]}>
          <View style={styles.innerCircle} />
        </Animated.View>

        {/* Brand name with glow effect */}
        <Animated.Text style={[styles.brandText, glowTextStyle]}>
          Xxeno Sama
        </Animated.Text>

        {/* Sliding subtitle */}
        <Animated.Text style={[styles.subtitle, slideTextStyle]}>
          React native!
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  rotatingBorder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#4a90e2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  innerCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    borderWidth: 2,
    borderTopColor: '#4a90e2',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  brandText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: '#4a90e2',
    textShadowOffset: {width: 0, height: 0},
    marginBottom: 16,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    opacity: 0.8,
  },
});

export default SplashScreen;
