# react-native-raw-bottom-sheet


# Forked from NYSamnang and added "minHeight", so you can make the sheet simply go down and not disappear if you set minHeight > 0.

[![npm version](https://badge.fury.io/js/react-native-raw-bottom-sheet.svg)](//npmjs.com/package/react-native-raw-bottom-sheet) [![npm downloads](https://img.shields.io/npm/dm/react-native-raw-bottom-sheet.svg)
](//npmjs.com/package/react-native-raw-bottom-sheet)

- Super Lightweight Component
- Smooth Animation
- Add Your own Component To Bottom Sheet
- Customize Whatever You Like
- Support All Orientations
- Support Both Android And iOS

|                                                   Showcase iOS                                                   |                                                 Showcase Android                                                 |
| :--------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------: |
| ![](https://raw.githubusercontent.com/NYSamnang/stock-images/master/react-native-raw-bottom-sheet/RNRBS-IOS.gif) | ![](https://raw.githubusercontent.com/NYSamnang/stock-images/master/react-native-raw-bottom-sheet/RNRBS-AOS.gif) |

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
          minHeight={0}
          duration={250}
          customStyles={{
            content: {
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

| Prop         | Type     | Description                                   | Default  |
| ------------ | -------- | --------------------------------------------- | -------- |
| height       | number   | Height of Bottom Sheet                        | 260      |
| minHeight    | number   | Minimum height of Bottom Sheet                | 0        |
| duration     | number   | Duration of Bottom Sheet animation            | 300 (ms) |
| customStyles | object   | Custom style to Bottom Sheet                  | {}       |
| onPressMask  | function | Event on Mask (The area outside Bottom Sheet) |          |

### Available Custom Style

```jsx
customStyles: {
  mask: {...}, // The area outside Bottom Sheet
  container: {...}, // Bottom Sheet Container
  content: {...} // Bottom Sheet Content
}
```

## Methods

| Method Name | Description        |
| ----------- | ------------------ |
| open        | Open Bottom Sheet  |
| close       | Close Bottom Sheet |

### Note

Always set `ref` to `RBSheet` and call each method by using `this.RBSheet.methodName()` like example above.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/NYSamnang/react-native-raw-bottom-sheet/blob/master/LICENSE) file for details

## Author

Made with ❤️ by [NY Samnang](https://github.com/NYSamnang).
