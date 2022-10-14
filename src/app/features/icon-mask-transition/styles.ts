import { StyleSheet } from 'react-native';

import { HEIGHT_CANVAS, WIDTH_CANVAS } from './constant';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  canvas: {
    width: WIDTH_CANVAS,
    backgroundColor: '#ffffff',
    height: HEIGHT_CANVAS,
  },
  iconButton: { width: 24, height: 24 },
  rowIcons: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,.5)',
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 20,
    marginHorizontal: 20,
    justifyContent: 'space-around',
  },
});
