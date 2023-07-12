import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { CanvasFunction } from './canvas-func';

export const GestureFunction = () => {
  // state
  const [textPressed, setTextPressed] = useState<string>('');

  // func
  const handleExecFunc = (index: number) => {
    switch (index) {
      case 0:
        setTextPressed('Back');

        break;
      case 1:
        setTextPressed('Refresh');

        break;
      case 2:
        setTextPressed('Close');

        break;

      default:
        break;
    }
  };

  // render
  return (
    <View style={styles.root}>
      <CanvasFunction onExecFunc={handleExecFunc}>
        <Text>{'You choose: ' + textPressed}</Text>
      </CanvasFunction>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
