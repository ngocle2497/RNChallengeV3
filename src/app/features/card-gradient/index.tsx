import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { COLORS } from './constant';
import { HEIGHT_CARD, styles, WIDTH_CARD } from './styles';

import { images } from '../../assets/images';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export const CardGradient = () => {
  // state
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // props
  const gradientReStyle = useAnimatedStyle(
    () => ({
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    }),
    [],
  );

  // effect
  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(-WIDTH_CARD, {
        duration: 3000,
      }),
      -1,
      true,
    );
    translateY.value = withRepeat(
      withTiming(-HEIGHT_CARD, {
        duration: 3000,
      }),
      -1,
      true,
    );
  }, []);

  // render
  return (
    <View style={[styles.root]}>
      <View style={[styles.containerCard]}>
        <AnimatedLinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradient, gradientReStyle]}
          colors={COLORS}
          //   animatedProps={gradientProps}
        />
        <FastImage
          resizeMode="cover"
          style={[StyleSheet.absoluteFillObject]}
          source={images.card}
        />
      </View>
    </View>
  );
};
