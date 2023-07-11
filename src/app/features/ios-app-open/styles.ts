import {StyleSheet} from 'react-native';
import {APP_SIZE, LEFT_TOP, APP_RADIUS} from './constant';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  app: {
    position: 'absolute',
    width: APP_SIZE,
    height: APP_SIZE,
    borderRadius: APP_RADIUS,
    left: LEFT_TOP,
    top: LEFT_TOP,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  detailApp: {
    backgroundColor: '#ffffff',
    position: 'absolute',
    overflow: 'hidden',
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  allBoard: {
    flex: 1,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#25CCF7',
    marginBottom: 10,
  },
  searchBox: {
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#ecf0f1',
    flexDirection: 'row',
    alignItems: 'center',
  },
  search: {
    color: '#8395a7',
    fontSize: 15,
  },
  containerDetail: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  contentDetail: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noBoard: {
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 5,
  },
  description: {
    fontSize: 15,
    marginBottom: 5,
    textAlign: 'center',
    color: '#8395a7',
  },
  iconCreate: {
    width: 36,
    height: 36,
    marginRight: 20,
  },
  iconMore: {
    width: 28,
    height: 28,
  },
  iconCopy: {
    width: 60,
    height: 60,
  },
});
