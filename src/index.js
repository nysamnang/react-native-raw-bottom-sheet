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
  constructor(props) {
    super();
    this.state = {
      modalVisible: false,
      animatedTranslate: new Animated.Value(props.height)
    };

    this.createPanResponder();
  }

  createPanResponder() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => this.props.closeOnSwipeDown,
      onPanResponderMove: (e, gestureState) => {
        gestureState.dy < 0
          ? null
          : Animated.event([null, { dy: this.state.animatedTranslate }])(e, gestureState);
      },
      onPanResponderRelease: (e, gestureState) => {
        if (this.props.height / 4 - gestureState.dy < 0) {
          this.setModalVisible(false);
        } else {
          Animated.spring(this.state.animatedTranslate, { 
            toValue: 0,
            useNativeDriver: true
          }).start();
        }
      }
    });
  }

  setModalVisible(visible) {
    const { height, duration, onClose } = this.props;
    if (visible) {
      this.setState({ modalVisible: visible });
      Animated.timing(this.state.animatedTranslate, {
        toValue: 0,
        duration: duration,
        useNativeDriver: true,
        delay: 200
      }).start();
    } else {
      Animated.timing(this.state.animatedTranslate, {
        toValue: height,
        duration: duration,
        useNativeDriver: true
      }).start(() => {
        this.setState({ modalVisible: visible });
        this.state.animatedTranslate.setValue(height);
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

    return (
      <Modal
        transparent={true}
        animationType="none"
        useNativeDriver={true}
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
              styles.container,
              customStyles.container,
              { height: this.props.height },
              { 
                transform: [
                  { translateY: this.state.animatedTranslate }
                ]
              }
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
  duration: PropTypes.number,
  closeOnSwipeDown: PropTypes.bool,
  closeOnPressMask: PropTypes.bool,
  customStyles: PropTypes.object,
  onClose: PropTypes.func
};

RBSheet.defaultProps = {
  height: 260,
  duration: 300,
  closeOnSwipeDown: true,
  closeOnPressMask: true,
  customStyles: {}
};

export default RBSheet;
