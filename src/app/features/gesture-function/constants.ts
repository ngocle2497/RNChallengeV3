import { Dimensions } from 'react-native';

export const { width: screenWidth } = Dimensions.get('window');

export const OVAL_BASE_SIZE = 100;

export const OVAL_RADIUS = OVAL_BASE_SIZE / 2;

// 100 -> 200 => x =>
export const OVAL_UPPER_WIDTH = OVAL_BASE_SIZE * 2;

export const DISTANCE_CHANGE = 50;

export const G_HEIGHT = 200;

export const OUTPUT_RANGE_X = [
  [
    screenWidth / 2 - OVAL_RADIUS,
    screenWidth / 2 - OVAL_RADIUS,
    screenWidth / 2 - OVAL_RADIUS,
  ],
  [
    screenWidth / 2 - OVAL_RADIUS - OVAL_UPPER_WIDTH / 2,
    screenWidth / 2 - OVAL_RADIUS,
    screenWidth / 2 - OVAL_RADIUS,
  ],
  [
    screenWidth / 2 - OVAL_RADIUS - OVAL_UPPER_WIDTH / 2,
    screenWidth / 2 - OVAL_RADIUS,
    screenWidth / 2 - OVAL_RADIUS,
  ],
];

export const OUTPUT_RANGE_WIDTH = [
  [OVAL_BASE_SIZE, OVAL_BASE_SIZE, OVAL_UPPER_WIDTH],
  [OVAL_UPPER_WIDTH, OVAL_BASE_SIZE, OVAL_UPPER_WIDTH],
  [OVAL_UPPER_WIDTH, OVAL_BASE_SIZE, OVAL_BASE_SIZE],
];

export const POSITION_X = [
  -screenWidth / 2 + OVAL_RADIUS + 10,
  0,
  screenWidth / 2 - OVAL_RADIUS - 10,
];
