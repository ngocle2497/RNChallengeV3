import React, { useEffect } from 'react';

import BootSplash from 'react-native-bootsplash';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { navigationRef } from './navigation-service';
import { APP_SCREEN, RootStackParamList } from './screen-type';

import { Card3D } from '../features/card-3d';
import { CardGradient } from '../features/card-gradient';
import { CardRotate } from '../features/card-rotate';
import { ColorFilter } from '../features/color-filter';
import { Home } from '../features/home';
import { MountedElement } from '../features/mounted-element';
import { RefreshIsland } from '../features/refresh-island';
import { ScratchTicket } from '../features/scratch-tickets';
import { SensorWallpaper } from '../features/sensor-wallpaper';
import { SpaceButton } from '../features/space-button';
import { SwipeSort } from '../features/swipe-sort';

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
        <RootStack.Screen
          options={{ title: 'Space Button' }}
          name={APP_SCREEN.SPACE_BUTTON}
          component={SpaceButton}
        />
        <RootStack.Screen
          options={{ title: 'Card Gradient' }}
          name={APP_SCREEN.CARD_GRADIENT}
          component={CardGradient}
        />
        <RootStack.Screen
          options={{ title: 'Mounted Element' }}
          name={APP_SCREEN.MOUNTED_ELEMENT}
          component={MountedElement}
        />
        <RootStack.Screen
          options={{ title: 'Sensor Wallpaper' }}
          name={APP_SCREEN.SENSOR_WALLPAPER}
          component={SensorWallpaper}
        />
        <RootStack.Screen
          options={{ title: 'Swipe Sort' }}
          name={APP_SCREEN.SWIPE_SORT}
          component={SwipeSort}
        />
        <RootStack.Screen
          options={{ title: 'Card 3D' }}
          name={APP_SCREEN.CARD_3D}
          component={Card3D}
        />
        <RootStack.Screen
          options={{ title: 'Refresh Island' }}
          name={APP_SCREEN.REFRESH_ISLAND}
          component={RefreshIsland}
        />
        <RootStack.Screen
          options={{ title: 'Color Filter' }}
          name={APP_SCREEN.COLOR_FILTER}
          component={ColorFilter}
        />
        <RootStack.Screen
          options={{ title: 'Scratch Ticket' }}
          name={APP_SCREEN.SCRATCH_TICKET}
          component={ScratchTicket}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
