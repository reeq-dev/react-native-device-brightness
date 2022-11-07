import React, { useEffect } from 'react';

import {
  getBrightnessLevel,
  setBrightnessLevel,
} from '@reeq/react-native-device-brightness';
import { View } from 'react-native';

export default function App() {
  useEffect(() => {
    getBrightnessLevel().then((level) => {
      console.log(level);
    });
    setBrightnessLevel(1, true);
  }, []);

  return <View />;
}
