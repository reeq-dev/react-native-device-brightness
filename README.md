# react-native-device-brightness

React-Native library which allows you to control device brightness

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
    getSystemBrightnessLevel,
    useDeviceBrightness,
    useUnmountBrightness
} from '@reeq/react-native-device-brightness';

// setting brightness
setBrightnessLevel(level: number, animated?: boolean);

// getting brightness
const brightness = await getBrightnessLevel();
console.log(brightness);

// getting system brightness (Android only)
const brightness = await getSystemBrightnessLevel();
console.log(brightness);

// just setting a brightness for the rest of app's life
useDeviceBrightness(level: number, animated?: boolean);

// setting a brightness and will restore to previous brightness on unmount
useUnmountBrightness(level: number, animated?: boolean);

```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
