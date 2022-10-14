import React, { useEffect } from 'react';
import { View } from 'react-native';

import {
  Canvas,
  ColorMatrix,
  Group,
  Image,
  Mask,
  Paint,
  runTiming,
  SkImage,
  useImage,
  usePaintRef,
  useValue,
} from '@shopify/react-native-skia';

import { IconButton } from './components/icon-button';
import { ImageMask } from './components/image-mask';
import { WIDTH_CANVAS } from './constant';
import { icons } from './icons';
import { styles } from './styles';

import { images } from '../../assets/images';

export const IconMaskTransition = () => {
  // state
  const paint = usePaintRef();

  const girl = useImage(images.girl);
  const homeImage = useImage(icons.home);
  const messageImage = useImage(icons.message);
  const notificationImage = useImage(icons.notification);
  const shapesImage = useImage(icons.shapes);
  const statusImage = useImage(icons.status);
  const activeImage = useValue(homeImage);
  const blur = useValue(90);

  // func
  const handleSelectIconMask = (nextImage: SkImage) => {
    return () => {
      activeImage.current = nextImage;
      blur.current = 90;
      runTiming(blur, 1);
    };
  };

  useEffect(() => {
    // MARK: Init mask image
    if (homeImage) {
      activeImage.current = homeImage;
    }
  }, [homeImage]);

  if (
    !girl ||
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
    <View style={styles.container}>
      <Canvas style={styles.canvas}>
        <Paint ref={paint}>
          <ColorMatrix
            matrix={[
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, -20,
            ]}
          />
          {/* <Blur blur={blur} /> */}
        </Paint>
        <Mask
          mask={
            <Group layer={paint}>
              <ImageMask activeImage={activeImage} imageSK={homeImage} />
              <ImageMask
                activeImage={activeImage}
                imageSK={notificationImage}
              />
              <ImageMask activeImage={activeImage} imageSK={messageImage} />
              <ImageMask activeImage={activeImage} imageSK={shapesImage} />
              <ImageMask activeImage={activeImage} imageSK={statusImage} />
            </Group>
          }>
          <Image
            x={0}
            y={0}
            width={WIDTH_CANVAS}
            height={550}
            image={girl}
            fit="cover"
          />
        </Mask>
      </Canvas>
      <View style={styles.rowIcons}>
        <IconButton onPress={handleSelectIconMask(homeImage)} icon="home" />
        <IconButton
          onPress={handleSelectIconMask(notificationImage)}
          icon="notification"
        />
        <IconButton
          onPress={handleSelectIconMask(messageImage)}
          icon="message"
        />
        <IconButton onPress={handleSelectIconMask(shapesImage)} icon="shapes" />
        <IconButton onPress={handleSelectIconMask(statusImage)} icon="status" />
      </View>
    </View>
  );
};
