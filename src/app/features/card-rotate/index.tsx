import React from 'react';
import { Dimensions, View } from 'react-native';

import { Card } from './components/card';
import { Overlay } from './components/overlay';
import { styles } from './styles';

const { width } = Dimensions.get('window');

const BASE_WIDTH = width * 0.8;
const BASE_HEIGHT = 270;

const CARD_WIDTH = BASE_WIDTH - 15;
const CARD_HEIGHT = BASE_HEIGHT - 15;

export const CardRotate = () => {
  // state

  // render
  return (
    <View style={[styles.background]}>
      <Overlay width={BASE_WIDTH} height={BASE_HEIGHT} />
      <Card height={CARD_HEIGHT} width={CARD_WIDTH} />
    </View>
  );
};
