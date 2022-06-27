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
  // render
  return (
    <ScrollView>
      <ItemFunction text="Card Rotate" onPress={handleCardRotatePress} />
    </ScrollView>
  );
};
