import {Dimensions} from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;

export const BAR_LENGTH = 80;
export const CANVAS_HEIGHT = 200;
export const MAX_BAR_HEIGHT = 100;
export const SIZE_BALL = 45;
export const WRAP_BALL = 70;
export const CANVAS_WIDTH = (SCREEN_WIDTH - WRAP_BALL - 32) / 2;
export const BAR_WIDTH = CANVAS_WIDTH / (BAR_LENGTH + 12);
export const ORIGIN_GROUP = {
  x: CANVAS_WIDTH / 2,
  y: CANVAS_HEIGHT / 2,
};
