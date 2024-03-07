import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  KeyboardAvoidingView,
  Modal,
  TouchableOpacity,
  Animated,
  PanResponder,
  Platform
} from "react-native";
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

  setModalVisible(visible, props) {
    const { height, minClosingHeight, openDuration, closeDuration, onClose, onOpen } = this.props;
    const { animatedHeight, pan } = this.state;
    if (visible) {
      this.setState({ modalVisible: visible });
      if (typeof onOpen === "function") onOpen(props);
      Animated.timing(animatedHeight, {
        useNativeDriver: false,
        toValue: height,
        duration: openDuration
      }).start();
    } else {
      Animated.timing(animatedHeight, {
        useNativeDriver: false,
        toValue: minClosingHeight,
        duration: closeDuration
      }).start(() => {
        pan.setValue({ x: 0, y: 0 });
        this.setState({
          modalVisible: visible,
          animatedHeight: new Animated.Value(0)
        });

        if (typeof onClose === "function") onClose(props);
      });
    }
  }

  createPanResponder(props) {
    const { closeOnDragDown, closeOnTouchablesDragDown, height } = props;
    const { pan } = this.state;
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => closeOnDragDown,
      onMoveShouldSetPanResponder: (e, gestureState) => (
        (closeOnTouchablesDragDown && closeOnDragDown)
        && (Math.abs(gestureState.dx) >= 5 
        || Math.abs(gestureState.dy) >= 5)
      ),
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy > 0) {
          Animated.event([null, { dy: pan.y }], { useNativeDriver: false })(e, gestureState);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (height / 4 - gestureState.dy < 0) {
          this.setModalVisible(false);
        } else {
          Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
        }
      }
    });
  }

  open(props) {
    this.setModalVisible(true, props);
  }

  close(props) {
    this.setModalVisible(false, props);
  }
  
  setHeight(newHeight) {
    const { animatedHeight } = this.state;
    const { duration } = this.props;
    Animated.timing(animatedHeight, {
      toValue: newHeight,
      duration
    }).start();
  }

  render() {
    const {
      animationType,
      closeOnDragDown,
      dragFromTopOnly,
      closeOnPressMask,
      closeOnPressBack,
      children,
      customStyles,
      keyboardAvoidingViewEnabled,
      customModalProps
    } = this.props;
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
          if (closeOnPressBack) this.setModalVisible(false);
        }}
        {...customModalProps}
      >
        <KeyboardAvoidingView
          enabled={keyboardAvoidingViewEnabled}
          keyboardVerticalOffset={Platform.select({ios: 0, android: 40})}
          behavior= {(Platform.OS === 'ios')? "padding" : 'height'}
          style={[styles.wrapper, customStyles.wrapper]}
        >
          <TouchableOpacity
            style={styles.mask}
            activeOpacity={1}
            onPress={() => (closeOnPressMask ? this.close() : null)}
          />
          <Animated.View
            {...(!dragFromTopOnly && this.panResponder.panHandlers)}
            style={[panStyle, styles.container, { height: animatedHeight }, customStyles.container]}
          >
            {closeOnDragDown && (
              <View
                {...(dragFromTopOnly && this.panResponder.panHandlers)}
                style={styles.draggableContainer}
              >
                <View style={[styles.draggableIcon, customStyles.draggableIcon]} />
              </View>
            )}
            {children}
          </Animated.View>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}

RBSheet.propTypes = {
  animationType: PropTypes.oneOf(["none", "slide", "fade"]),
  height: PropTypes.number,
  minClosingHeight: PropTypes.number,
  openDuration: PropTypes.number,
  closeDuration: PropTypes.number,
  closeOnDragDown: PropTypes.bool,
  closeOnTouchablesDragDown: PropTypes.bool,
  closeOnPressMask: PropTypes.bool,
  dragFromTopOnly: PropTypes.bool,
  closeOnPressBack: PropTypes.bool,
  keyboardAvoidingViewEnabled: PropTypes.bool,
  customStyles: PropTypes.objectOf(PropTypes.object),
  customModalProps: PropTypes.objectOf(PropTypes.any),
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  children: PropTypes.node
};

RBSheet.defaultProps = {
  animationType: "none",
  height: 260,
  minClosingHeight: 0,
  openDuration: 300,
  closeDuration: 200,
  closeOnDragDown: false,
  closeOnTouchablesDragDown: false,
  dragFromTopOnly: false,
  closeOnPressMask: true,
  closeOnPressBack: true,
  keyboardAvoidingViewEnabled: Platform.OS === "ios",
  customStyles: {},
  customModalProps: {},
  onClose: null,
  onOpen: null,
  children: <View />
};

export default RBSheet;
