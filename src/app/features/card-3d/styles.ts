import { StyleSheet } from 'react-native';

import { HEIGHT_IMAGE, HEIGHT_WALL, WIDTH_IMAGE } from './constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  containerImage: {
    width: WIDTH_IMAGE,
    height: HEIGHT_IMAGE,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  rightContainer: {
    overflow: 'hidden',
    width: HEIGHT_WALL,
    height: HEIGHT_IMAGE,
    position: 'absolute',
    left: WIDTH_IMAGE,
  },
  rightImage: {
    width: WIDTH_IMAGE,
    height: HEIGHT_IMAGE,
    position: 'absolute',
    transform: [{ scaleX: 25 }],
    right: (WIDTH_IMAGE * 25 - WIDTH_IMAGE) / 2,
  },
  bottomContainer: {
    overflow: 'hidden',
    width: WIDTH_IMAGE,
    height: HEIGHT_WALL,
    position: 'absolute',
    top: HEIGHT_IMAGE,
  },
  bottomImage: {
    width: WIDTH_IMAGE,
    height: HEIGHT_IMAGE,
    position: 'absolute',
    transform: [{ scaleY: 50 }],
    bottom: (HEIGHT_IMAGE * 50 - HEIGHT_IMAGE) / 2,
  },
  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,.1)',
  },
  rowButton: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#9c88ff',
  },
  textButton: {
    color: '#ffffff',
  },
  spacer: {
    width: 15,
  },
});
