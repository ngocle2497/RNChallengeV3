import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },
  contentScroll: {
    height: 1000,
  },
  baseItem: {
    position: 'absolute',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,.4)',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
});
