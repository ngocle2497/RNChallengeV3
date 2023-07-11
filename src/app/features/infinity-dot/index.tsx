import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Circle } from './components/circle';

export const InfinityDot = () => {
  // render
  return (
    <View style={styles.content}>
      <View style={styles.row}>
        <View>
          <Circle left />
        </View>
        <View>
          <Circle />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#000',
  },
});
