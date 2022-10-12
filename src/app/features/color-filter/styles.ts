import { StyleSheet } from 'react-native';

import { PADDING_HORIZONTAL, SIZE_ITEM, SPACER_LIST } from './constants';

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
    width: SIZE_ITEM,
    height: SIZE_ITEM,
    borderRadius: 5,
    overflow: 'hidden',
  },
  spacer: {
    width: SPACER_LIST,
  },
  textWrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.2)',
  },
  textItem: {
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
  },
});
