import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const CALCULATED_IMAGE_WIDTH = screenWidth * 0.9;
export const CALCULATED_IMAGE_HEIGHT = CALCULATED_IMAGE_WIDTH * 0.9;
export const RADIUS = 8;
export const FILL_COLOR = '#3498db';
