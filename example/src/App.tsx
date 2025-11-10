import { useState } from 'react';

import {
  getBrightnessLevel,
  resetBrightness,
  setBrightnessLevel,
  useDeviceBrightness,
} from '@reeq/react-native-device-brightness';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const UnmountBrightnessComponent = () => {
  const level = 0.94;

  useDeviceBrightness(level, true);

  return (
    <Text style={styles.text}>
      I set brightness level to {level}, but will restore your previous
      brightness when you delete me
    </Text>
  );
};

export default function App() {
  const [brightness, setBrightness] = useState<number>(getBrightnessLevel());
  const [isUnmountBrightnessVisible, setUnmountBrightnessVisibility] =
    useState(false);

  return (
    <View style={[styles.flex, styles.container, styles.verticalCenter]}>
      <Text>Current device brightness is {brightness}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          const level = getBrightnessLevel();
          setBrightness(level);
          Alert.alert('getBrightnessLevel', `Brightness level is ${level}`);
        }}
      >
        <Text style={styles.text}>Get brightness level</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          const level = 1;
          setBrightnessLevel(level);
          Alert.alert('setBrightnessLevel', `Brightness is set to ${level}`);
        }}
      >
        <Text style={styles.text}>Set brightness level</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          resetBrightness();
          Alert.alert('resetBrightness', `Brightness reset`);
        }}
      >
        <Text style={styles.text}>Reset brightness</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setUnmountBrightnessVisibility((prev) => !prev);
        }}
      >
        <Text style={styles.text}>{`${
          isUnmountBrightnessVisible ? 'Unmount' : 'Render'
        } UnmountBrightnessComponent`}</Text>
      </TouchableOpacity>
      {isUnmountBrightnessVisible && <UnmountBrightnessComponent />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'flex-start',
    backgroundColor: '#000000',
  },
  flex: {
    flex: 1,
  },
  text: {
    color: '#FFFFFF',
  },
  verticalCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  button: {
    marginTop: 16,
    padding: 8,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 16,
  },
});
