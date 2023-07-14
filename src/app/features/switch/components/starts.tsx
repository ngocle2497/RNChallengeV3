import React from 'react';
import { StyleSheet, View } from 'react-native';

import { SharedValue } from 'react-native-reanimated';

import { Star } from './star';

import { StarType } from '../type';

const CLOUDS: Array<StarType> = [
  {
    id: 1,
    size: 18,
    delay: 200,
    translateY: -4,
  },
  {
    id: 2,
    size: 24,
    delay: 100,
    translateY: 5,
  },
  {
    id: 3,
    size: 14,
    delay: 300,
    translateY: -5,
  },
];

export const Starts = ({ progress }: { progress: SharedValue<number> }) => {
  // func
  const renderStar = (item: StarType) => {
    return <Star key={item.id} star={item} progress={progress} />;
  };

  // render
  return <View style={styles.rowStar}>{CLOUDS.map(renderStar)}</View>;
};

const styles = StyleSheet.create({
  rowStar: {
    flexDirection: 'row',
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: 2,
  },
});
