import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Modal, TouchableOpacity, Animated } from "react-native";
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
      animatedHeight: new Animated.Value(0)
    };

    this.onPressMask = this.onPressMask.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  setModalVisible(visible) {
    const { minHeight, height, duration } = this.props;
    if (visible) {
      this.setState({ modalVisible: visible });
      return Animated.timing(this.state.animatedHeight, {
        toValue: height,
        duration: duration
      }).start();
    } else {
      return Animated.timing(this.state.animatedHeight, {
        toValue: minHeight,
        duration: duration
      }).start(() => {
        this.setState({ modalVisible: visible });
      });
    }
  }

  onPressMask() {
    this.setModalVisible(false);
    if (typeof this.props.onPressMask === "function") {
      this.props.onPressMask();
    }
  }

  open() {
    this.setModalVisible(true);
  }

  close() {
    this.setModalVisible(false);
  }

  render() {
    const { children, customStyles } = this.props;

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
        <TouchableOpacity
          style={[styles.mask, customStyles.mask]}
          activeOpacity={1}
          onPress={this.onPressMask}
        >
          <Animated.View
            style={[
              styles.container,
              { height: this.state.animatedHeight },
              customStyles.container
            ]}
          >
            <TouchableOpacity activeOpacity={1} style={styles.content}>
              <View style={[styles.content, customStyles.content]}>
                {children}
              </View>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

RBSheet.propTypes = {
  minHeight: PropTypes.number,
  height: PropTypes.number,
  duration: PropTypes.number,
  customStyles: PropTypes.object,
  onPressMask: PropTypes.func
};

RBSheet.defaultProps = {
  minHeight: 0,
  height: 260,
  duration: 300,
  customStyles: {}
};

export default RBSheet;