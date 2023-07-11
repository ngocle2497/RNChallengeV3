import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  text: {
    color: '#000',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textLiked: {
    color: '#fff',
  },
  wrapTextLiked: {
    ...StyleSheet.absoluteFillObject,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 100,
    height: 50,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  leftHeart: {
    width: 67,
    height: 50,
    position: 'absolute',
    left: 0,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    backgroundColor: 'red',
  },
  rightHeart: {
    width: 67,
    height: 50,
    position: 'absolute',
    right: 0,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    backgroundColor: 'red',
    transform: [{ rotate: '150deg' }],
  },
});
