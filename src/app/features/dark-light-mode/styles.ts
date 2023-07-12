import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
  },
  moon: {
    borderColor: 'green',
    ...StyleSheet.absoluteFillObject,
    borderRadius: 100,
  },
  sun: {
    borderColor: 'green',
    ...StyleSheet.absoluteFillObject,
    borderRadius: 100,
    backgroundColor: '#000',
  },
  wrapLight: {
    width: 120,
    height: 10,
    position: 'absolute',
  },
  light: {
    height: 5,
    width: 15,
    borderRadius: 20,
    backgroundColor: '#000',
  },
});
