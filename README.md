# react-native-raw-bottom-sheet

[![npm version](https://badge.fury.io/js/react-native-raw-bottom-sheet.svg)](//npmjs.com/package/react-native-raw-bottom-sheet)
[![npm downloads](https://img.shields.io/npm/dm/react-native-raw-bottom-sheet.svg)
](//npmjs.com/package/react-native-raw-bottom-sheet)
[![Build Status](https://travis-ci.org/nysamnang/react-native-raw-bottom-sheet.svg?branch=master)](https://travis-ci.org/nysamnang/react-native-raw-bottom-sheet)

- Super Lightweight Component
- Add Your own Component To Bottom Sheet
- Customize Whatever You Like
- Support Drag Down Gesture
- Support All Orientations
- Support Both Android And iOS
- Smooth Animation
- Zero Configuration
- Zero dependency
- Top Search Ranking (react native bottom sheet) at [npms.io](https://npms.io/search?q=react%20native%20bottom%20sheet)

|                                                      Showcase iOS                                                      |                                                    Showcase Android                                                    |
| :--------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------: |
| ![](https://raw.githubusercontent.com/nysamnang/stock-images/master/react-native-raw-bottom-sheet/RNRBS-IOS-2.0.3.gif) | ![](https://raw.githubusercontent.com/nysamnang/stock-images/master/react-native-raw-bottom-sheet/RNRBS-AOS-2.0.3.gif) |

## Installation

```
npm i react-native-raw-bottom-sheet --save
```

### or

```
yarn add react-native-raw-bottom-sheet
```

## Example

#### Class component

```jsx
import React, { Component } from "react";
import { View, Button } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

export default class Example extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button title="OPEN BOTTOM SHEET" onPress={() => this.RBSheet.open()} />
        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={300}
          openDuration={250}
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
```

#### Functional component

```jsx
import React, { useRef } from "react";
import { View, Button } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

export default function Example() {
  const refRBSheet = useRef();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000"
      }}
    >
      <Button title="OPEN BOTTOM SHEET" onPress={() => refRBSheet.current.open()} />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
        <YourOwnComponent />
      </RBSheet>
    </View>
  );
}
```

#### Dynamic Bottom Sheet

```jsx
renderItem = (item, index) => (
  <View>
    <Button title={`OPEN BOTTOM SHEET-${index}`} onPress={() => this[RBSheet + index].open()} />
    <RBSheet
      ref={ref => {
        this[RBSheet + index] = ref;
      }}
    >
      <YourOwnComponent onPress={() => this[RBSheet + index].close()} />
    </RBSheet>
  </View>
);
```

## Props

| Props                      | Type     | Description                                             | Default  |
| ---------------------------| -------- | ------------------------------------------------------- | -------- |
| animationType              | string   | Background animation ("none", "fade", "slide")          | "none"   |
| height                     | number   | Height of Bottom Sheet                                  | 260      |
| minClosingHeight           | number   | Minimum height of Bottom Sheet before close             | 0        |
| openDuration               | number   | Open Bottom Sheet animation duration                    | 300 (ms) |
| closeDuration              | number   | Close Bottom Sheet animation duration                   | 200 (ms) |
| closeOnDragDown            | boolean  | Use gesture drag down to close Bottom Sheet             | false    |
| closeOnTouchablesDragDown  | boolean  | Use gesture drag down on touchable components to close Bottom Sheet<br/> (Doesn't work for touchable components inside a scrollView) <br/> (closeOnDragDown must be enabled for this to work)            | false    |
| dragFromTopOnly            | boolean  | Drag only the top area of the draggableIcon to close Bottom Sheet instead of the whole content | false    |
| closeOnPressMask           | boolean  | Press the area outside to close Bottom Sheet            | true     |
| closeOnPressBack           | boolean  | Press back android to close Bottom Sheet (Android only) | true     |
| onClose                    | function | Callback function when Bottom Sheet has closed          | null     |
| onOpen                     | function | Callback function when Bottom Sheet has opened          | null     |
| customStyles               | object   | Custom style to Bottom Sheet                            | {}       |
| keyboardAvoidingViewEnabled     | boolean   | Enable KeyboardAvoidingView             | true (ios) |
| customModalProps     | object   | Custom props to Bottom Sheet Modal            | {} |

### Available Custom Style

```
customStyles: {
  wrapper: {...}, // The Root of Component (You can change the `backgroundColor` or any styles)
  container: {...}, // The Container of Bottom Sheet
  draggableIcon: {...} // The Draggable Icon (If you set closeOnDragDown to true)
}
```

## Methods

| Method Name | Description        |
| ----------- | ------------------ |
| open        | Open Bottom Sheet  |
| close       | Close Bottom Sheet |

## Note

- If you combind `RBSheet` with <a href="https://github.com/kmagiera/react-native-gesture-handler" target="_blank">react-native-gesture-handler</a>, the components inside RBSheet will not fire onPress event on Android [#37](https://github.com/nysamnang/react-native-raw-bottom-sheet/issues/37).
- The demo source codes are in `example folder`.
- In case of android set `android:windowSoftInputMode="adjustPan"` in AndroidManifest.xml to completely control the behavior of the KeyboardAvoidingView. 

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/nysamnang/react-native-raw-bottom-sheet/blob/master/LICENSE) file for details

## Author

Made with ❤️ by [NY Samnang](https://github.com/nysamnang).
