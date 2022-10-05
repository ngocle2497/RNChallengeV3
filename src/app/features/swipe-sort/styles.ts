import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    width: 150,
    height: 250,
    borderRadius: 10,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    backgroundColor: '#ffffff',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
