import { Dimensions, StyleSheet } from 'react-native';

const { width: WIDTH_DEVICE, height: HEIGHT_DEVICE } = Dimensions.get('window');

export const BUFFER_WIDTH = 75;
export const BUFFER_HEIGHT = 100;

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerBg: {
    position: 'absolute',
    width: WIDTH_DEVICE + BUFFER_WIDTH * 2,
    height: HEIGHT_DEVICE + BUFFER_HEIGHT * 2,
  },
});
