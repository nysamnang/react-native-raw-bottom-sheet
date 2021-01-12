import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  KeyboardAvoidingView,
  Modal,
  TouchableOpacity,
  Animated,
  PanResponder,
  Platform,
  ScrollView
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
      Animated.timing(animatedHeight, {
        useNativeDriver: false,
        toValue: height,
        duration: openDuration
      }).start(() => {
        if (typeof onOpen === "function") onOpen(props);
      });
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
    const { closeOnDragDown, height } = props;
    const { pan } = this.state;
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => closeOnDragDown,
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

  snapTo(props) {
    const { animatedHeight } = this.state;
    const { height, duration = 200 } = props;
    Animated.timing(animatedHeight, {
      useNativeDriver: false,
      toValue: height,
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
      renderHeader,
      enabledInnerScrolling,
      closeButton
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
      >
        <KeyboardAvoidingView
          enabled={keyboardAvoidingViewEnabled}
          behavior="padding"
          style={[styles.wrapper, customStyles.wrapper]}
        >
          {closeButton}
          <TouchableOpacity
            style={styles.mask}
            activeOpacity={1}
            onPress={() => (closeOnPressMask ? this.close() : null)}
          />
          {renderHeader && (
            <Animated.View style={[panStyle]}>
              {renderHeader()}
            </Animated.View>
          )}
          <Animated.View
            {...(!dragFromTopOnly && !enabledInnerScrolling && this.panResponder.panHandlers)}
            style={[panStyle, styles.container, { height: animatedHeight }, customStyles.container]}
          >
            {closeOnDragDown && (
              <View
                {...((enabledInnerScrolling ? !dragFromTopOnly : dragFromTopOnly) && this.panResponder.panHandlers)}
                style={styles.draggableContainer}
              >
                <View style={[styles.draggableIcon, customStyles.draggableIcon]} />
              </View>
            )}
            {enabledInnerScrolling ? <ScrollView contentContainerStyle={{ flexGrow:1 }} showsVerticalScrollIndicator={false}>{children}</ScrollView> : children}
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
  closeOnPressMask: PropTypes.bool,
  dragFromTopOnly: PropTypes.bool,
  closeOnPressBack: PropTypes.bool,
  keyboardAvoidingViewEnabled: PropTypes.bool,
  customStyles: PropTypes.objectOf(PropTypes.object),
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  renderHeader: PropTypes.func,
  children: PropTypes.node,
  enabledInnerScrolling: PropTypes.bool,
  closeButton: PropTypes.node
};

RBSheet.defaultProps = {
  animationType: "none",
  height: 260,
  minClosingHeight: 0,
  openDuration: 300,
  closeDuration: 200,
  closeOnDragDown: false,
  dragFromTopOnly: false,
  closeOnPressMask: true,
  closeOnPressBack: true,
  keyboardAvoidingViewEnabled: Platform.OS === "ios",
  customStyles: {},
  onClose: null,
  onOpen: null,
  renderHeader: null,
  children: <View />,
  enabledInnerScrolling: false,
  closeButton: <View />
};

export default RBSheet;
