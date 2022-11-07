import { useEffect, useRef } from 'react';
import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package '@reeq/react-native-device-brightness' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const DeviceBrightness = NativeModules.DeviceBrightness
  ? NativeModules.DeviceBrightness
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export const setBrightnessLevel = (
  level: number,
  animated: boolean = false
): void => {
  if (level < 0 || level > 1) {
    if (!(Platform.OS === 'android' && level === -1)) {
      throw Error('level value must betweens 0 to 1');
    }
  }

  DeviceBrightness.setBrightnessLevel(level, animated);
};

export const getBrightnessLevel = (): Promise<number> => {
  return DeviceBrightness.getBrightnessLevel();
};

export const getSystemBrightnessLevel = (): Promise<number> => {
  if (Platform.OS !== 'android') {
    throw Error('getSystemBrightnessLevel is android only');
  }
  return DeviceBrightness.getSystemBrightnessLevel();
};

export const useDeviceBrightness = (
  level: number,
  animated: boolean = false
): void => {
  useEffect(() => {
    setBrightnessLevel(level, animated);
  }, [level, animated]);
};

export const useUnmountBrightness = (
  level: number,
  animated: boolean = false
): void => {
  const prevBrightness = useRef({});

  const restoreBrightness = async () => {
    try {
      const prev = Number(prevBrightness.current);

      setBrightnessLevel(prev || 0.5);
    } catch (err) {
      console.log(err);
    }
  };

  const getPrevAndSetNewBrightness = async () => {
    try {
      const prev = await getBrightnessLevel();
      prevBrightness.current = prev;
      setBrightnessLevel(level, animated);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log('settings brightness');
    getPrevAndSetNewBrightness();
    return () => {
      console.log('removing brightness');
      restoreBrightness();
    };
  }, []);
};
