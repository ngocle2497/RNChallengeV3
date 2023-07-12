import React, { useCallback, useState } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';

import { Light } from './components/light';
import { styles } from './styles';

export const DarkLightMode = () => {
  // state
  const [isDark, setIsDark] = useState<boolean>(false);

  const progress = useDerivedValue(() => withSpring(isDark ? 1 : 0));

  const moonBackground = useDerivedValue(() =>
    interpolateColor(progress.value, [0, 1], ['#000', '#fff'], undefined, {
      gamma: 5,
    }),
  );

  const rootBackground = useDerivedValue(() =>
    interpolateColor(progress.value, [0, 1], ['#fff', '#000'], undefined, {
      gamma: 5,
    }),
  );

  const translateX = useDerivedValue(() =>
    interpolate(progress.value, [0, 1], [50, 15]),
  );

  const translateY = useDerivedValue(() =>
    interpolate(progress.value, [0, 1], [-50, -15]),
  );

  // func
  const handleToggle = () => {
    setIsDark(v => !v);
  };

  const renderLight = useCallback((_: number, i: number) => {
    return <Light key={i} progress={progress} rotateDeg={(360 / 10) * i} />;
  }, []);

  // style
  const sunStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const moonStyle = useAnimatedStyle(() => ({
    backgroundColor: moonBackground.value,
  }));

  const rootStyle = useAnimatedStyle(() => ({
    backgroundColor: rootBackground.value,
  }));

  // render
  return (
    <Animated.View style={[styles.root, rootStyle]}>
      <TouchableWithoutFeedback onPress={handleToggle}>
        <View style={styles.circle}>
          <Animated.View style={[styles.moon, moonStyle]} />
          <Animated.View style={[styles.sun, sunStyle]} />
        </View>
      </TouchableWithoutFeedback>
      {Array(100).fill(0).map(renderLight)}
    </Animated.View>
  );
};
