import React from 'react';
import { View } from 'react-native';

import { CanvasTransition } from './components/canvas-transition';
import { styles } from './styles';

export const IconMaskTransition = () => {
  // render
  return (
    <View style={styles.container}>
      {/* <BackgroundImage /> */}
      <CanvasTransition />
    </View>
  );
};
