import { StyleSheet } from 'react-native';

export const WIDTH_CARD = 250;
export const HEIGHT_CARD = 150;

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#232323',
  },
  containerCard: {
    width: WIDTH_CARD,
    height: HEIGHT_CARD,
    borderRadius: 15,
    // justifyContent: 'center',
    // alignItems: 'center',
    overflow: 'hidden',
  },
  gradient: {
    width: WIDTH_CARD * 2,
    height: HEIGHT_CARD * 2,
    position: 'absolute',
  },
});
