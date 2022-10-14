import React, { useState } from 'react';
import { View } from 'react-native';

import {
  Canvas,
  ColorMatrix,
  Group,
  Mask,
  Paint,
  SkImage,
  useImage,
  usePaintRef,
} from '@shopify/react-native-skia';

import { BackgroundImage } from './background-image';
import { IconButton } from './icon-button';
import { ImageMask } from './image-mask';

import { icons } from '../icons';
import { styles } from '../styles';

export const CanvasTransition = () => {
  // state
  const paint = usePaintRef();

  const homeImage = useImage(icons.home);
  const messageImage = useImage(icons.message);
  const notificationImage = useImage(icons.notification);
  const shapesImage = useImage(icons.shapes);
  const statusImage = useImage(icons.status);
  const [activeImage, setActive] = useState<SkImage | null>(null);

  // func
  const handleSelectIconMask = (nextImage: SkImage) => {
    return () => {
      setActive(nextImage);
    };
  };
  if (
    !homeImage ||
    !messageImage ||
    !notificationImage ||
    !shapesImage ||
    !statusImage
  ) {
    return null;
  }

  // render
  return (
    <>
      <Canvas style={[styles.canvas]}>
        <Paint ref={paint}>
          <ColorMatrix
            matrix={[
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 70, -35,
            ]}
          />
          {/* <Blur blur={blur} /> */}
        </Paint>
        <Mask
          mask={
            <Group layer={paint}>
              <ImageMask activeImage={activeImage} imageSK={homeImage} />
              <ImageMask activeImage={activeImage} imageSK={messageImage} />
              <ImageMask activeImage={activeImage} imageSK={shapesImage} />
              <ImageMask activeImage={activeImage} imageSK={statusImage} />
            </Group>
          }>
          <BackgroundImage />
        </Mask>
      </Canvas>
      <View style={styles.rowIcons}>
        <IconButton onPress={handleSelectIconMask(homeImage)} icon="home" />

        <IconButton
          onPress={handleSelectIconMask(messageImage)}
          icon="message"
        />
        <IconButton onPress={handleSelectIconMask(shapesImage)} icon="shapes" />
        <IconButton onPress={handleSelectIconMask(statusImage)} icon="status" />
      </View>
    </>
  );
};
