import React from 'react';

import {
  Path,
  Skia,
  useValue,
  useValueEffect,
} from '@shopify/react-native-skia';

import { PathMaskProps } from '../type';

export const PathMask = ({ activeId, activePath, id }: PathMaskProps) => {
  // state
  const path = useValue(Skia.Path.Make());

  // effect
  useValueEffect(activePath, v => {
    if (activeId.current === id) {
      path.current = v;
    }
  });

  // render
  return (
    <Path
      style="stroke"
      strokeJoin={'round'}
      strokeCap={'round'}
      path={path}
      strokeWidth={80}
    />
  );
};
