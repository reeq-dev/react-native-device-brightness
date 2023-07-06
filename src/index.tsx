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

/**
 * Sets current device brightness level. Available range is between 0-1.
 * Example setBrightnessLevel(0.25, true);
 */
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

/**
 * Gets current device brightness level in range 0-1.
 */
export const getBrightnessLevel = (): Promise<number> => {
  return DeviceBrightness.getBrightnessLevel();
};

/**
 * Gets android current device system brightness level in range 0-1, iOS throws error.
 */
export const getSystemBrightnessLevel = (): Promise<number> => {
  if (Platform.OS !== 'android') {
    throw Error('getSystemBrightnessLevel is android only');
  }
  return DeviceBrightness.getSystemBrightnessLevel();
};

/**
 * Hook sets a brightness level,
 * will trigger each time when level is changed.
 */
export const useDeviceBrightness = (
  level: number,
  animated: boolean = false
): void => {
  useEffect(() => {
    setBrightnessLevel(level, animated);
  }, [level, animated]);
};

/**
 * Hook sets a brightness level,
 * will trigger only once when component is mounted, and restore to level user had before mount.
 */
export const useUnmountBrightness = (
  level: number,
  animated: boolean = false
): void => {
  const prevBrightness = useRef({});

  const restoreBrightness = async () => {
    try {
      const prev = Number(prevBrightness.current);

      setBrightnessLevel(prev || 0.5, animated);
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
    getPrevAndSetNewBrightness();
    return () => {
      restoreBrightness();
    };
  }, []);
};
