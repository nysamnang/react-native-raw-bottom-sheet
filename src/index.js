import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Modal, TouchableOpacity, Animated, PanResponder, StatusBar, Button, Dimensions } from "react-native";
import styles from "./style";

const SUPPORTED_ORIENTATIONS = [
  "portrait",
  "portrait-upside-down",
  "landscape",
  "landscape-left",
  "landscape-right"
];

class RBSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      animatedHeight: new Animated.Value(0),
      pan: new Animated.ValueXY()
    };

    this.createPanResponder(props);
  }

  setModalVisible(visible) {
    const { minClosingHeight, duration, onClose, coverFullScreen } = this.props;
    let height;
    coverFullScreen ? height = Dimensions.get('screen').height : height = this.props.height
    const { animatedHeight, pan } = this.state;
    if (visible) {
      this.setState({ modalVisible: visible });
      Animated.timing(animatedHeight, {
        toValue: height,
        duration
      }).start();
    } else {
      Animated.timing(animatedHeight, {
        toValue: minClosingHeight,
        duration
      }).start(() => {
        pan.setValue({ x: 0, y: 0 });
        this.setState({
          modalVisible: visible,
          animatedHeight: new Animated.Value(0)
        });

        if (typeof onClose === "function") onClose();
      });
    }
  }

  createPanResponder(props) {
    const { closeOnDragDown, height } = props;
    const { pan } = this.state;
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => closeOnDragDown,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy > 0) {
          Animated.event([null, { dy: pan.y }])(e, gestureState);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (height / 4 - gestureState.dy < 0) {
          this.setModalVisible(false);
        } else {
          Animated.spring(pan, { toValue: { x: 0, y: 0 } }).start();
        }
      }
    });
  }

  open() {
    this.setModalVisible(true);
  }

  close() {
    this.setModalVisible(false);
  }

  render() {
    const { animationType, closeOnPressMask, children, customStyles, hasCloseBtn, closeBtnText, closeBtnColor} = this.props;
    const { animatedHeight, pan, modalVisible } = this.state;
    const panStyle = {
      transform: pan.getTranslateTransform()
    };

    return (
      <Modal
        transparent
        animationType={animationType}
        visible={modalVisible}
        supportedOrientations={SUPPORTED_ORIENTATIONS}
        onRequestClose={() => {
          this.setModalVisible(false);
        }}
      >
        <View style={[styles.wrapper, customStyles.wrapper]}>
          <StatusBar hidden={true} />
          <TouchableOpacity
            style={styles.mask}
            activeOpacity={1}
            onPress={() => (closeOnPressMask ? this.close() : {})}
          />
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[panStyle, styles.container, customStyles.container, { height: animatedHeight }]}
          >
            {
              hasCloseBtn &&
              <View style={{ alignItems: 'flex-end' }}>
                <Button
                  title={closeBtnText}
                  color={closeBtnColor}
                  onPress={() => {
                    this.close();
                  }}
                />
              </View>
            }
            {children}
          </Animated.View>
        </View>
      </Modal>
    );
  }
}

RBSheet.propTypes = {
  animationType: PropTypes.oneOf(["none", "slide", "fade"]),
  height: PropTypes.number,
  minClosingHeight: PropTypes.number,
  duration: PropTypes.number,
  closeOnDragDown: PropTypes.bool,
  closeOnPressMask: PropTypes.bool,
  customStyles: PropTypes.objectOf(PropTypes.object),
  onClose: PropTypes.func,
  children: PropTypes.node,
  hasCloseBtn: PropTypes.bool,
  closeBtnText: PropTypes.string,
  closeBtnColor: PropTypes.string,
  coverFullScreen: PropTypes.bool
};

RBSheet.defaultProps = {
  animationType: "none",
  height: 260,
  minClosingHeight: 0,
  duration: 300,
  closeOnDragDown: false,
  closeOnPressMask: true,
  customStyles: {},
  onClose: null,
  children: <View />,
  hasCloseBtn: false,
  closeBtnText: "Close",
  closeBtnColor: "#f00",
  coverFullScreen: false
};

export default RBSheet;
