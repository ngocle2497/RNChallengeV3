import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapInput: {
    width: 200,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,.2)',
    paddingHorizontal: 15,
  },
  input: {
    paddingVertical: 10,
    fontSize: 14,
    borderBottomColor: 'transparent',
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
