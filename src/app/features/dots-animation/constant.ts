import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const COLORS = [
  '#1abc9c',
  '#2ecc71',
  '#3498db',
  '#9b59b6',
  '#f1c40f',
  '#e67e22',
  '#e74c3c',
];

export const getRandomColor = () =>
  COLORS[Math.floor(Math.random() * COLORS.length)];

export const centerPoint = {
  x: width / 2,
  y: height / 2,
};
