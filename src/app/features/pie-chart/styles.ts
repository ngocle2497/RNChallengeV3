import { StyleSheet } from 'react-native';

import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constant';

export const styles = StyleSheet.create({
  canvas: {
    height: CANVAS_HEIGHT,
    width: CANVAS_WIDTH,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
});
