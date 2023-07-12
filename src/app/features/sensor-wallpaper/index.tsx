import React from 'react';
import { StyleSheet, View } from 'react-native';

import Animated, {
  Extrapolate,
  interpolate,
  SensorType,
  useAnimatedSensor,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';

import { Image } from 'expo-image';

import { BUFFER_HEIGHT, BUFFER_WIDTH, styles } from './styles';

import { images } from '../../assets/images';

export const SensorWallpaper = () => {
  // state
  const animatedSensor = useAnimatedSensor(SensorType.ROTATION, {
    interval: 10,
  });

  const translateY = useDerivedValue(
    () =>
      interpolate(
        animatedSensor.sensor.value.yaw * 200 + 20,
        [-150, 0, 150],
        [-BUFFER_HEIGHT, 0, BUFFER_HEIGHT],
        Extrapolate.CLAMP,
      ),
    [],
  );

  const translateX = useDerivedValue(
    () =>
      interpolate(
        animatedSensor.sensor.value.pitch * 200 + 20,
        [-150, 0, 150],
        [-BUFFER_WIDTH, 0, BUFFER_WIDTH],
        Extrapolate.CLAMP,
      ),
    [],
  );

  const wallpaperReStyle = useAnimatedStyle(() => {
    const { yaw, pitch } = animatedSensor.sensor.value;

    console.log('pitch', pitch * 200 + 20);

    console.log('yaw', yaw * 200 + 20);

    return {
      transform: [
        { translateY: translateY.value },
        { translateX: translateX.value },
      ],
      //   height: withTiming(yaw * 200 + 20, { duration: 100 }), // <- usage
      //   width: withTiming(pitch * 200 + 20, { duration: 100 }), // <- usage
    };
  }, []);

  // render
  return (
    <View style={[styles.root]}>
      {/* <Animated.View style={[{ backgroundColor: 'black' }, wallpaperReStyle]} /> */}
      <Animated.View style={[styles.containerBg, wallpaperReStyle]}>
        <Image style={[StyleSheet.absoluteFillObject]} source={images.sky} />
      </Animated.View>
      <Image style={[StyleSheet.absoluteFillObject]} source={images.eiffel} />
    </View>
  );
};
