import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';

import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { Item } from './components/item';
import { styles } from './styles';

export const ADN = () => {
  // state
  const progress = useSharedValue(0);
  const opacity = useSharedValue(0);
  const rotate = useDerivedValue(() =>
    interpolate(progress.value, [0, 1], [0, 360]),
  );

  // func
  const renderItem = useCallback((_: number, i: number) => {
    return <Item key={i} index={i} />;
  }, []);

  // style
  const wrapRestyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
    opacity: opacity.value,
  }));

  // effect
  useEffect(() => {
    progress.value = withDelay(
      500,
      withRepeat(
        withTiming(1, { duration: 10000, easing: Easing.linear }),
        -1,
        false,
      ),
    );
    setTimeout(() => {
      opacity.value = 1;
    }, 500);
  }, []);

  // render
  return (
    <View style={styles.container}>
      <Animated.View style={wrapRestyle}>
        {Array(10).fill(0).map(renderItem)}
      </Animated.View>
    </View>
  );
};
