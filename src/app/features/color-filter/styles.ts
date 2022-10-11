import { StyleSheet } from 'react-native';

import { PADDING_HORIZONTAL, SIZE_LIST, SPACER_LIST } from './constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  listWrapper: {
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingTop: 50,
  },
  item: {
    width: SIZE_LIST,
    height: SIZE_LIST,
    borderRadius: 5,
    overflow: 'hidden',
  },
  spacer: {
    width: SPACER_LIST,
  },
});
