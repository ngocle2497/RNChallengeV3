import React, { useState } from 'react';
import { LayoutChangeEvent, useWindowDimensions, View } from 'react-native';

import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

import {
  Canvas,
  Group,
  Image,
  Mask,
  Skia,
  useImage,
  useValue,
} from '@shopify/react-native-skia';

import { PathMask } from './components/path-mask';
import { styles } from './styles';
import { PathType } from './type';

import { images } from '../../assets/images';
import { randomUUID } from '../../constants';

export const ScratchTicket = () => {
  const { width } = useWindowDimensions();
  const cat = useImage(images.cat);
  const scratch_me = useImage(images.scratch_me);
  const [paths, setPaths] = useState<Array<PathType>>([]);
  const activePath = useValue(Skia.Path.Make());
  const activePathID = useValue<string | undefined>(undefined);
  const [heightCanvas, setHeightCanvas] = useState(0);

  const createPath = (x: number, y: number) => {
    const newId = randomUUID();
    setPaths(d => d.concat([{ id: newId }]));
    const path = Skia.Path.Make();
    path.moveTo(x, y);
    activePath.current = path;
    activePathID.current = newId;
  };

  const lineToPath = (x: number, y: number) => {
    activePath.current = activePath.current.lineTo(x, y);
  };

  const closePath = () => {
    activePathID.current = undefined;
  };

  const gesture = Gesture.Pan()
    .shouldCancelWhenOutside(false)
    .onStart(({ x, y }) => {
      runOnJS(createPath)(x, y);
    })
    .onChange(({ x, y }) => {
      runOnJS(lineToPath)(x, y);
    })
    .onEnd(() => {
      runOnJS(closePath)();
    });

  console.log('re-render');

  const renderPath = (item: PathType) => {
    return (
      <PathMask
        key={item.id}
        activeId={activePathID}
        activePath={activePath}
        id={item.id}
      />
    );
  };

  const onLayoutCanvas = (e: LayoutChangeEvent) => {
    setHeightCanvas(e.nativeEvent.layout.height);
  };

  if (!cat || !scratch_me) {
    return null;
  }
  // render
  return (
    <GestureDetector gesture={gesture}>
      <View onLayout={onLayoutCanvas} style={styles.canvas}>
        <Canvas style={styles.canvas}>
          {heightCanvas ? (
            <>
              <Image
                x={width / 2 - 150}
                y={heightCanvas / 2 - 50}
                width={300}
                height={100}
                image={scratch_me}
                fit="fill"
              />
              <Mask mask={<Group>{paths.map(renderPath)}</Group>}>
                <Image
                  x={0}
                  y={0}
                  width={width}
                  height={heightCanvas}
                  image={cat}
                  fit="cover"
                />
              </Mask>
            </>
          ) : null}
        </Canvas>
      </View>
    </GestureDetector>
  );
};
