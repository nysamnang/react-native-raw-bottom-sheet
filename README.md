# react-native-raw-bottom-sheet

[![npm version](https://badge.fury.io/js/react-native-raw-bottom-sheet.svg)](//npmjs.com/package/react-native-raw-bottom-sheet)
[![npm downloads](https://img.shields.io/npm/dm/react-native-raw-bottom-sheet.svg)
](//npmjs.com/package/react-native-raw-bottom-sheet)
[![Build Status](https://travis-ci.org/nysamnang/react-native-raw-bottom-sheet.svg?branch=master)](https://travis-ci.org/nysamnang/react-native-raw-bottom-sheet)

- Super Lightweight Component
- Smooth Animation
- Add Your own Component To Bottom Sheet
- Customize Whatever You Like
- Support Swipe Down Gesture
- Support All Orientations
- Support Both Android And iOS

|                                                      Showcase iOS                                                      |                                                    Showcase Android                                                    |
| :--------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------: |
| ![](https://raw.githubusercontent.com/nysamnang/stock-images/master/react-native-raw-bottom-sheet/RNRBS-IOS-1.1.0.gif) | ![](https://raw.githubusercontent.com/nysamnang/stock-images/master/react-native-raw-bottom-sheet/RNRBS-AOS-1.1.0.gif) |

## Installation

```
npm i react-native-raw-bottom-sheet --save
```

### or

```
yarn add react-native-raw-bottom-sheet
```

## Example

```jsx
import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

class Example extends Component {
  render() {
    return (
      <View style={{ flex: 1, marginTop: 50, alignItems: "center" }}>
        <Button
          title="OPEN BOTTOM SHEET"
          onPress={() => {
            this.RBSheet.open();
          }}
        />
        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={300}
          duration={250}
          customStyles={{
            container: {
              justifyContent: "center",
              alignItems: "center"
            }
          }}
        >
          <YourOwnComponent />
        </RBSheet>
      </View>
    );
  }
}

const YourOwnComponent = () => <Text>Your Pretty Component Goes Here</Text>;

export default Example;
```

## Props

| Prop             | Type     | Description                                    | Default  |
| ---------------- | -------- | ---------------------------------------------- | -------- |
| height           | number   | Height of Bottom Sheet                         | 260      |
| minClosingHeight | number   | Minimum height of Bottom Sheet before close    | 0        |
| duration         | number   | Duration of Bottom Sheet animation             | 300 (ms) |
| closeOnSwipeDown | boolean  | Use gesture swipe down to close Bottom Sheet   | false    |
| closeOnPressMask | boolean  | Press the area outside to close Bottom Sheet   | true     |
| onClose          | function | Callback function when Bottom Sheet has closed |          |
| customStyles     | object   | Custom style to Bottom Sheet                   | {}       |

### Available Custom Style

```jsx
customStyles: {
  wrapper: {...}, // The Root of Component
  container: {...} // The Container of Bottom Sheet
}
```

## Methods

| Method Name | Description        |
| ----------- | ------------------ |
| open        | Open Bottom Sheet  |
| close       | Close Bottom Sheet |

## Note

- Always set `ref` to `RBSheet` and call each method by using `this.RBSheet.methodName()` like example above.
- If you want to use `Scrollable Component` like `ScrollView`, `Flatlist` or something else inside `RBSheet`, you have to change prop `closeOnSwipeDown` to `false` otherwise it won't work.

## Give me a Star

If you think this project is helpful just give me a ⭐️ Star is enough because i don't drink coffee :D

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/nysamnang/react-native-raw-bottom-sheet/blob/master/LICENSE) file for details

## Author

Made with ❤️ by [NY Samnang](https://github.com/nysamnang).
