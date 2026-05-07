import { TurboModuleRegistry, type TurboModule } from 'react-native';

export interface Spec extends TurboModule {
  setBrightnessLevel: (level: number) => void;
  getBrightnessLevel: () => number;
  getSystemBrightnessLevel: () => number;
  resetBrightness: () => void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('DeviceBrightness');
