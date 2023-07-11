import { Dimensions, StyleSheet } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  rowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 10,
  },
  textButton: {
    color: '#000',
  },
  rowChildren: {
    // paddingHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  box: {
    width: (SCREEN_WIDTH - 32) / 3,
    height: (SCREEN_WIDTH - 32) / 3,
    marginLeft: 8,
    borderRadius: 10,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  textBox: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
