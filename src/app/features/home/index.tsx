import React from 'react';
import { ScrollView } from 'react-native';

import { ItemFunction } from './components/item-function';

import { navigate } from '../../navigation/navigation-service';
import { APP_SCREEN } from '../../navigation/screen-type';

export const Home = () => {
  // func
  const handleCardRotatePress = () => {
    navigate(APP_SCREEN.CARD_ROTATE);
  };

  const handleSpaceButtonPress = () => {
    navigate(APP_SCREEN.SPACE_BUTTON);
  };

  const handleCardGradientPress = () => {
    navigate(APP_SCREEN.CARD_GRADIENT);
  };

  const handleMountedElementPress = () => {
    navigate(APP_SCREEN.MOUNTED_ELEMENT);
  };

  // render
  return (
    <ScrollView>
      <ItemFunction text="Card Rotate" onPress={handleCardRotatePress} />
      <ItemFunction text="Space Button" onPress={handleSpaceButtonPress} />
      <ItemFunction text="Card Gradient" onPress={handleCardGradientPress} />
      <ItemFunction
        text="Mounted Element"
        onPress={handleMountedElementPress}
      />
    </ScrollView>
  );
};
