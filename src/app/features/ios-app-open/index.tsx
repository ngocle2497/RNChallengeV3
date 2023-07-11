import React from 'react';
import {LayoutChangeEvent} from 'react-native';
import {StyleSheet, View} from 'react-native';
import {Image} from 'expo-image';
import Animated, {
  Extrapolate,
  interpolate,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {App} from './components/app';
import {DetailApp} from './components/detail-app';
import {styles} from './styles';

export const IosAppOpen = () => {
  // state
  const progress = useSharedValue(0);
  const maxHeight = useSharedValue(0);

  const opacityBackground = useDerivedValue(() =>
    interpolate(progress.value, [0, 1], [0, 1], Extrapolate.CLAMP),
  );

  const scaleWallpaper = useDerivedValue(() =>
    interpolate(progress.value, [0, 1], [1, 1.2], Extrapolate.CLAMP),
  );
  const translateYeWallpaper = useDerivedValue(() =>
    interpolate(progress.value, [0, 1], [0, -50], Extrapolate.CLAMP),
  );

  // func
  const onLayout = (e: LayoutChangeEvent) => {
    maxHeight.value = e.nativeEvent.layout.height;
  };

  // render
  return (
    <View style={styles.root}>
      <View style={styles.container} onLayout={onLayout}>
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            {
              transform: [
                {scale: scaleWallpaper},
                {translateY: translateYeWallpaper},
              ],
            },
          ]}>
          <Image
            style={StyleSheet.absoluteFillObject}
            source={require('./images/iphone14.png')}
          />
        </Animated.View>
        <Animated.View
          pointerEvents={'none'}
          style={[styles.backdrop, {opacity: opacityBackground}]}
        />
        <App progress={progress} maxHeight={maxHeight} />
        <DetailApp progress={progress} maxHeight={maxHeight} />
      </View>
    </View>
  );
};
