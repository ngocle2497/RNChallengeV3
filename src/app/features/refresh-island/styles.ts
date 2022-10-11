import { StyleSheet } from 'react-native';

import {
  HEIGHT_ISLAND,
  MARGIN_TOP,
  RADIUS_ISLAND,
  WIDTH_ISLAND,
} from './constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  canvas: {
    ...StyleSheet.absoluteFillObject,
  },
  dynamicIsland: {
    width: WIDTH_ISLAND,
    height: HEIGHT_ISLAND,
    borderRadius: RADIUS_ISLAND,
    backgroundColor: '#000',
    position: 'absolute',
    alignSelf: 'center',
    top: MARGIN_TOP,
  },
});
