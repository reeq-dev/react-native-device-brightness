# react-native-device-brightness

React-Native library which allows you to control device brightness

## Compatibility

- **v1.0.6** — compatible with both the old and the new React Native architectures
- **v2.0.0 and above** — compatible **only with the new architecture**

## Installation

```sh
npm install @reeq/react-native-device-brightness
```

or

```sh
yarn add @reeq/react-native-device-brightness
```

and

```sh
cd ios/
pod install
```

## Usage

```js
import {
    setBrightnessLevel,
    getBrightnessLevel,
    useDeviceBrightness,
    resetBrightness,
} from '@reeq/react-native-device-brightness';

// setting brightness
setBrightnessLevel(level: number);

// getting brightness
const brightness = getBrightnessLevel();

// reseting brightness
resetBrightness();

// just setting a brightness for the rest of app's life
useDeviceBrightness(level: number, resetOnUnmount?: boolean);

## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
```
