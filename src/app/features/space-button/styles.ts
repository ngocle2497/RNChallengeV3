import { StyleSheet } from 'react-native';

import { HEIGHT_CANVAS, WIDTH_CANVAS } from './constant';

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowCanvas: {
    flexDirection: 'row',
    position: 'absolute',
  },
  canvas: {
    width: WIDTH_CANVAS,
    height: HEIGHT_CANVAS,
  },
  canvasLeft: {
    transform: [{ rotate: '180deg' }],
  },
  button: {
    padding: 30,
    borderRadius: 10,
    backgroundColor: 'violet',
  },
});
