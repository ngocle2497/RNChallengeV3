import { Image, Position } from './type';

export const arrayToObjectZIndex = (list: Array<Image>) => {
  const object = {} as Position;

  for (let i = 0; i < list.length; i++) {
    const value = list[i];

    object[value.id] = list.length - i;
  }

  return object;
};

export const sortPosition = (positions: Position) => {
  'worklet';
  const newObject: Position = {};

  for (const key in positions) {
    if (positions[key] >= Object.keys(positions).length) {
      newObject[key] = 1;
    } else {
      newObject[key] = positions[key] + 1;
    }
  }

  return newObject;
};
