import { Dimensions } from 'react-native';

// Color Template

// PURPLE:
// 1 -0.2 0 0 0
// 0 1 0 -0.1 0
// 0 1.2 1 0.1 0
// 0 0 1.7 1 0
export const purpleMatrix = [
  1, -0.2, 0, 0, 0, 0, 1, 0, -0.1, 0, 0, 1.2, 1, 0.1, 0, 0, 0, 1.7, 1, 0,
];
// YELLOW
// 1 0 0 0 0
// -0.2 1.0 0.3 0.1 0
// -0.1 0 1 0 0
// 0 0 0 1 0
export const yellowMatrix = [
  1, 0, 0, 0, 0, -0.2, 1.0, 0.3, 0.1, 0, -0.1, 0, 1, 0, 0, 0, 0, 0, 1, 0,
];
// CYAN
// 1 0 0 1.9 -2.2
// 0 1 0 0.0 0.3
// 0 0 1 0 0.5
// 0 0 0 1 0.2
export const cyanMatrix = [
  1, 0, 0, 1.9, -2.2, 0, 1, 0, 0.0, 0.3, 0, 0, 1, 0, 0.5, 0, 0, 0, 1, 0.2,
];
// BLACK AND WHITE
// 0 1 0 0 0
// 0 1 0 0 0
// 0 1 0 0 0
// 0 1 0 1 0
export const blackAndWhiteMatrix = [
  0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0,
];
// OLD TIMES
// 1 0 0 0 0
// -0.4 1.3 -0.4 0.2 -0.1
// 0 0 1 0 0
// 0 0 0 1 0
export const oldTimesMatrix = [
  1, 0, 0, 0, 0, -0.4, 1.3, -0.4, 0.2, -0.1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,
];
// COLD LIFE
// 1 0 0 0 0
// 0 1 0 0 0
// -0.2 0.2 0.1 0.4 0
// 0 0 0 1 0
export const coldLifeMatrix = [
  1, 0, 0, 0, 0, 0, 1, 0, 0, 0, -0.2, 0.2, 0.1, 0.4, 0, 0, 0, 0, 1, 0,
];
// SEPIUM
// 1.3 -0.3 1.1 0 0
// 0 1.3 0.2 0 0
// 0 0 0.8 0.2 0
// 0 0 0 1 0
export const sepiumMatrix = [
  1.3, -0.3, 1.1, 0, 0, 0, 1.3, 0.2, 0, 0, 0, 0, 0.8, 0.2, 0, 0, 0, 0, 1, 0,
];
// MILK
// 0 1.0 0 0 0
// 0 1.0 0 0 0
// 0 0.6 1 0 0
// 0 0 0 1 0
export const milkMatrix = [
  0, 1.0, 0, 0, 0, 0, 1.0, 0, 0, 0, 0, 0.6, 1, 0, 0, 0, 0, 0, 1, 0,
];
// NO FILTER
// 1 0 0 0 0
// 0 1 0 0 0
// 0 0 1 0 0
// 0 0 0 1 0
export const noFilterMatrix = [
  1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,
];

export const R1_OUTPUT_RANGE = [1, 1, 1, 1, 0, 1, 1, 1.3, 0];
export const R2_OUTPUT_RANGE = [0, -0.2, 0, 0, 1, 0, 0, -0.3, 1];
export const R3_OUTPUT_RANGE = [0, 0, 0, 0, 0, 0, 0, 1.1, 0];
export const R4_OUTPUT_RANGE = [0, 0, 0, 1.9, 0, 0, 0, 0, 0];
export const R5_OUTPUT_RANGE = [0, 0, 0, -2.2, 0, 0, 0, 0, 0];

export const G1_OUTPUT_RANGE = [0, 0, -0.2, 0, 0, -0.4, 0, 0, 0];
export const G2_OUTPUT_RANGE = [1, 1, 1, 1, 1, 1.3, 1, 1.3, 1];
export const G3_OUTPUT_RANGE = [0, 0, 0.3, 0, 0, -0.4, 0, 0.2, 0];
export const G4_OUTPUT_RANGE = [0, -0.1, 0.1, 0, 0, 0.2, 0, 0, 0];
export const G5_OUTPUT_RANGE = [0, 0, 0, 0.3, 0, -0.1, 0, 0, 0];

export const B1_OUTPUT_RANGE = [0, 0, -0.1, 0, 0, 0, -0.2, 0, 0];
export const B2_OUTPUT_RANGE = [0, 1.2, 0, 0, 1, 0, 0.2, 0, 0.6];
export const B3_OUTPUT_RANGE = [1, 1, 1, 1, 0, 1, 0.1, 0.8, 1];
export const B4_OUTPUT_RANGE = [0, 0.1, 0, 0, 0, 0, 0.4, 0.2, 0];
export const B5_OUTPUT_RANGE = [0, 0, 0, 0.5, 0, 0, 0, 0, 0];

export const A1_OUTPUT_RANGE = [0, 0, 0, 0, 0, 0, 0, 0, 0];
export const A2_OUTPUT_RANGE = [0, 0, 0, 0, 1, 0, 0, 0, 0];
export const A3_OUTPUT_RANGE = [0, 1.7, 0, 0, 0, 0, 0, 0, 0];
export const A4_OUTPUT_RANGE = [1, 1, 1, 1, 1, 1, 1, 1, 1];
export const A5_OUTPUT_RANGE = [0, 0, 0, 0.2, 0, 0, 0, 0, 0];

const { width } = Dimensions.get('window');
export const FILTER_ARRAY = [
  'No Filter',
  'Purple',
  'Yellow',
  'Cyan',
  'Black and white',
  'Old times',
  'Cold life',
  'Sepium',
  'Milk',
];
export const SIZE_ITEM = 100;
export const SPACER_LIST = 10;
export const PADDING_HORIZONTAL = (width - SIZE_ITEM) / 2;
export const INPUT_RANGE = Array(FILTER_ARRAY.length)
  .fill(0)
  .map((_, i) => i * (SPACER_LIST + SIZE_ITEM));
console.log({ INPUT_RANGE });
