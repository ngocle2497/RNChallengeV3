import React from 'react';
import { View } from 'react-native';

import {
  Canvas,
  Easing,
  runTiming,
  useTouchHandler,
  useValue,
  useValueEffect,
} from '@shopify/react-native-skia';

import { Dot } from './components/dot';
import { styles } from './styles';

const DOTS = Array(200)
  .fill(0)
  .map((_, i) => i);

export const DotsAnimation = () => {
  // state
  const progress = useValue(0);

  const active = useValue(false);

  // func
  const renderDot = (_: number, i: number) => {
    return <Dot progress={progress} index={i} key={i} />;
  };

  const touchHandle = useTouchHandler({
    onActive: () => {},
    onStart: () => {
      active.current = !active.current;
    },
  });

  // effect
  useValueEffect(active, value => {
    runTiming(progress, value ? 1 : 0, {
      easing: Easing.inOut(Easing.ease),
      duration: 2000,
    });
  });

  // render
  return (
    <View style={styles.root}>
      <Canvas onTouch={touchHandle} style={styles.root}>
        {DOTS.map(renderDot)}
      </Canvas>
    </View>
  );
};
