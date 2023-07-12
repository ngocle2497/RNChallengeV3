import React, { useState } from 'react';
import { Button, View } from 'react-native';

import { Canvas, useValue } from '@shopify/react-native-skia';

import { PathCircle } from './path-circle';
import { styles } from './styles';

export const PieChart = () => {
  // state
  const [show, setShow] = useState<boolean>(false);

  const pieData = useValue({
    0: {
      percent: 10,
      percentStart: 0,
    },
    1: {
      percent: 20,
      percentStart: 10,
    },
    2: {
      percent: 50,
      percentStart: 30,
    },
    3: {
      percent: 20,
      percentStart: 80,
    },
  });

  // func
  const shuffle = () => {
    const newObj = {} as any;

    const arrPercent = [] as Array<number>;

    const length = 4;

    let number = 0;
    let calculate;
    let totalProcessed = 0;

    for (let i = 0; i < length; i++) {
      // FIRST ONE
      if (i === 0) {
        number = Math.floor(Math.random() * 100) + 1;

        totalProcessed = number;

        arrPercent.push(number);

        newObj[i] = {
          percent: number,
          percentStart: 0,
        };
      }

      //  MIDDLE SECTION
      if (i > 0 && i < length - 1) {
        if (length > 2) {
          calculate = 100 - totalProcessed;

          number = Math.floor(Math.random() * calculate) + 1;

          totalProcessed = totalProcessed + number;

          newObj[i] = {
            percent: number,
            percentStart: arrPercent.reduce((prev, curr) => {
              prev += curr;

              return prev;
            }, 0),
          };

          arrPercent.push(number);
        }
      }

      // LAST ONE
      if (i === length - 1) {
        const lastOne = 100 - totalProcessed;

        newObj[i] = {
          percent: lastOne,
          percentStart: arrPercent.reduce((prev, curr) => {
            prev += curr;

            return prev;
          }, 0),
        };

        arrPercent.push(lastOne);
      }
    }

    if (arrPercent.some(x => x < 1)) {
      shuffle();

      return;
    }

    pieData.current = newObj;
  };

  const handleShow = () => {
    setShow(v => !v);
  };

  // render
  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas}>
        {show ? (
          <>
            <PathCircle pieData={pieData} index={0} color={'#00a8ff'} />
            <PathCircle pieData={pieData} index={1} color={'#9c88ff'} />
            <PathCircle pieData={pieData} index={2} color={'#fbc531'} />
            <PathCircle pieData={pieData} index={3} color={'#4cd137'} />
          </>
        ) : null}
      </Canvas>
      <Button title="Toggle Visible" onPress={handleShow} />
      <Button title="Shuffle" onPress={shuffle} />
    </View>
  );
};
