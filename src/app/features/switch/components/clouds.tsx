import React from 'react';
import { StyleSheet, View } from 'react-native';

import { SharedValue } from 'react-native-reanimated';

import { Cloud } from './cloud';

import { CloudType } from '../type';

const CLOUDS: Array<CloudType> = [
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

export const Clouds = ({ progress }: { progress: SharedValue<number> }) => {
  // func
  const renderCloud = (item: CloudType) => {
    return <Cloud key={item.id} cloud={item} progress={progress} />;
  };

  // render
  return <View style={styles.rowCloud}>{CLOUDS.map(renderCloud)}</View>;
};

const styles = StyleSheet.create({
  rowCloud: {
    flexDirection: 'row',
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    marginLeft: 2,
  },
});
