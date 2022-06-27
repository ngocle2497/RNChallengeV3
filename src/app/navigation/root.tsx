import React, { useEffect } from 'react';

import BootSplash from 'react-native-bootsplash';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { navigationRef } from './navigation-service';
import { APP_SCREEN, RootStackParamList } from './screen-type';

import { CardRotate } from '../features/card-rotate';
import { Home } from '../features/home';

const RootStack = createStackNavigator<RootStackParamList>();

export const RootNavigation = () => {
  // effect
  useEffect(() => {
    const id = setTimeout(() => {
      BootSplash.hide({ fade: true });
    }, 1000);
    return () => clearTimeout(id);
  }, []);

  // render
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator>
        <RootStack.Screen
          options={{ title: 'Home' }}
          name={APP_SCREEN.HOME}
          component={Home}
        />
        <RootStack.Screen
          options={{ title: 'Card Rotate' }}
          name={APP_SCREEN.CARD_ROTATE}
          component={CardRotate}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
