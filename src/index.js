import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Modal,
  TouchableOpacity,
  Animated,
  PanResponder
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
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      animatedHeight: new Animated.Value(0),
      pan: new Animated.ValueXY()
    };

    this.createPanResponder();
  }

  createPanResponder() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => this.props.closeOnSwipeDown,
      onPanResponderMove: (e, gestureState) => {
        gestureState.dy < 0
          ? null
          : Animated.event([null, { dy: this.state.pan.y }])(e, gestureState);
      },
      onPanResponderRelease: (e, gestureState) => {
        if (this.props.height / 4 - gestureState.dy < 0) {
          this.setModalVisible(false);
        } else {
          Animated.spring(this.state.pan, { toValue: { x: 0, y: 0 } }).start();
        }
      }
    });
  }

  setModalVisible(visible) {
    const { height, minClosingHeight, duration, onClose } = this.props;
    if (visible) {
      this.setState({ modalVisible: visible });
      Animated.timing(this.state.animatedHeight, {
        toValue: height,
        duration: duration
      }).start();
    } else {
      Animated.timing(this.state.animatedHeight, {
        toValue: minClosingHeight,
        duration: duration
      }).start(() => {
        this.setState({
          modalVisible: visible,
          animatedHeight: new Animated.Value(0),
          pan: new Animated.ValueXY()
        });

        if (typeof onClose === "function") onClose();
      });
    }
  }

  open() {
    this.setModalVisible(true);
  }

  close() {
    this.setModalVisible(false);
  }

  render() {
    const { closeOnPressMask, children, customStyles } = this.props;
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    };

    return (
      <Modal
        transparent={true}
        animationType="none"
        visible={this.state.modalVisible}
        supportedOrientations={SUPPORTED_ORIENTATIONS}
        onRequestClose={() => {
          this.setModalVisible(false);
        }}
      >
        <View style={[styles.wrapper, customStyles.wrapper]}>
          <TouchableOpacity
            style={styles.mask}
            activeOpacity={1}
            onPress={() => (closeOnPressMask ? this.close() : {})}
          />
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[
              panStyle,
              styles.container,
              customStyles.container,
              { height: this.state.animatedHeight }
            ]}
          >
            {children}
          </Animated.View>
        </View>
      </Modal>
    );
  }
}

RBSheet.propTypes = {
  height: PropTypes.number,
  minClosingHeight: PropTypes.number,
  duration: PropTypes.number,
  closeOnSwipeDown: PropTypes.bool,
  closeOnPressMask: PropTypes.bool,
  customStyles: PropTypes.object,
  onClose: PropTypes.func
};

RBSheet.defaultProps = {
  height: 260,
  minClosingHeight: 0,
  duration: 300,
  closeOnSwipeDown: false,
  closeOnPressMask: true,
  customStyles: {}
};

export default RBSheet;
