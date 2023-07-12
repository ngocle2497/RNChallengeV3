import React, { useState } from 'react';
import { View } from 'react-native';

import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

import { BaseImage } from './components/base-image';
import { Button } from './components/button';
import { HEIGHT_WALL } from './constants';
import { styles } from './styles';

export const Card3D = () => {
  // state
  const [active, setActive] = useState<boolean>(false);

  const rotateValue = useDerivedValue(() => withTiming(active ? 45 : 0));

  const sizeWall = useDerivedValue(() => withTiming(active ? HEIGHT_WALL : 0));

  // func
  const handleAnimatePress = () => {
    setActive(true);
  };

  const handleResetPress = () => {
    setActive(false);
  };

  // restyle
  const wrapRestyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotateX: `${rotateValue.value}deg` },
        { rotateZ: `${rotateValue.value}deg` },
        { scale: 0.8 },
      ],
    };
  });

  const bottomRestyle = useAnimatedStyle(() => ({
    height: sizeWall.value,
    // SkewX is not supported on native android
    transform: [
      { translateX: withTiming(active ? 10 : 0) },
      { skewX: '45deg' },
    ],
  }));

  const rightRestyle = useAnimatedStyle(() => ({
    transform: [
      { skewY: '45deg' },
      { translateY: withTiming(active ? 10 : 0) },
    ],
    width: sizeWall.value,
  }));

  // render
  return (
    <View style={styles.container}>
      <Animated.View style={wrapRestyle}>
        <View style={[styles.containerImage]}>
          <BaseImage />
        </View>
        <Animated.View style={[styles.rightContainer, rightRestyle]}>
          <View style={[styles.rightImage]}>
            <BaseImage />
          </View>
          <View style={styles.overlay} />
        </Animated.View>
        <Animated.View style={[styles.bottomContainer, bottomRestyle]}>
          <View style={[styles.bottomImage]}>
            <BaseImage />
          </View>
          <View style={styles.overlay} />
        </Animated.View>
      </Animated.View>

      <View style={styles.rowButton}>
        <Button text="Animate" onPress={handleAnimatePress} />
        <View style={styles.spacer} />
        <Button text="Reset" onPress={handleResetPress} />
      </View>
    </View>
  );
};
