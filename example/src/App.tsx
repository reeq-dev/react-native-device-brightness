import React, { useEffect, useState } from 'react';

import {
  getBrightnessLevel,
  getSystemBrightnessLevel,
  setBrightnessLevel,
  useDeviceBrightness,
  useUnmountBrightness,
} from '@reeq/react-native-device-brightness';
import {
  Alert,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const BrightnessLockerComponent = () => {
  const level = 0.94;

  useUnmountBrightness(level);

  return (
    <Text>
      I set brightness level to {level}, but will restore your previous
      brightness when you delete me
    </Text>
  );
};

const BrightnessSetterComponent = () => {
  const level = 0.75;
  useDeviceBrightness(1, true);

  return (
    <Text>
      I set brightness level to {level}, and when you delete me brightness won't
      be changed
    </Text>
  );
};

export default function App() {
  const [brightness, setBrightness] = useState<number>();
  const [isLockerVisible, setLockerVisible] = useState(false);
  const [isSetterVisible, setSetterVisible] = useState(false);

  useEffect(() => {
    getBrightnessLevel().then((level) => setBrightness(level));
  }, []);

  return (
    <SafeAreaView style={[styles.container, styles.flex]}>
      <View style={[styles.flex, styles.container]}>
        <Text>Current device brightness is {brightness}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            const level = await getBrightnessLevel();
            setBrightness(level);
            Alert.alert('getBrightnessLevel', `Brightness level is ${level}`);
          }}
        >
          <Text>Get brightness level</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            const level = 1;
            await setBrightnessLevel(level, true);
            Alert.alert('setBrightnessLevel', `Brightness is set to ${level}`);
          }}
        >
          <Text>Set brightness level</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            if (Platform.OS !== 'android') {
              return;
            }
            const level = await getSystemBrightnessLevel();
            Alert.alert(
              'getSystemBrightnessLevel',
              `System brightness level is ${level}`
            );
          }}
        >
          <Text>Get system brightness level (android)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setLockerVisible((prev) => !prev);
          }}
        >
          <Text>{`${
            isLockerVisible ? 'Unmount' : 'Render'
          } BrightnessLockerComponent`}</Text>
        </TouchableOpacity>
        {isLockerVisible && <BrightnessLockerComponent />}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setSetterVisible((prev) => !prev);
          }}
        >
          <Text>{`${
            isSetterVisible ? 'Unmount' : 'Render'
          } BrightnessSetterComponent`}</Text>
        </TouchableOpacity>
        {isSetterVisible && <BrightnessSetterComponent />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'flex-start',
  },
  flex: {
    flex: 1,
  },
  button: {
    marginTop: 16,
    padding: 8,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 16,
  },
});
