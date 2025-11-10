import { useCallback, useEffect } from 'react';
import { AppState, type AppStateStatus } from 'react-native';
import DeviceBrightness from './NativeDeviceBrightness';

/**
 * Sets current device brightness level. Available range is between 0-1.
 * Example setBrightnessLevel(0.25, true);
 */
export const setBrightnessLevel = (level: number): void => {
  if (level < 0 || level > 1) {
    throw Error('Available range is between 0-1 in setBrightnessLevel');
  }

  DeviceBrightness.setBrightnessLevel(level);
};

/**
 * Gets current device brightness level in range 0-1.
 */
export const getBrightnessLevel = (): number => {
  return DeviceBrightness.getBrightnessLevel();
};

/**
 * Resets brightness to the level it was before the brightness has been set manualy
 */
export const resetBrightness = (): void => {
  DeviceBrightness.resetBrightness();
};

/**
 * Hook sets a brightness level,
 * will trigger each time when level is changed.
 * It also releases controlling brightness when app goes into inactive/background state
 * and restore when it comes back to foreground state.
 * This is just a javascript implementation. You may write you own using static methods.
 * @param level: required
 * @param resetOnUnmount: optional. Default is false.
 */
export const useDeviceBrightness = (
  level: number,
  resetOnUnmount = false
): void => {
  useEffect(() => {
    setBrightnessLevel(level);

    return () => {
      if (resetOnUnmount) {
        resetBrightness();
      }
    };
  }, [level, resetOnUnmount]);

  const handleAppStateChange = useCallback(
    (nextAppState: AppStateStatus) => {
      switch (nextAppState) {
        case 'active':
          setBrightnessLevel(level);
          break;
        case 'background':
        case 'inactive':
          resetBrightness();
          break;
        default:
          break;
      }
    },
    [level]
  );

  useEffect(() => {
    const listener = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      listener.remove();
    };
  }, [level, handleAppStateChange]);
};
