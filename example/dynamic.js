/* eslint-disable no-use-before-define */
/* eslint-disable import/no-unresolved */
import React, { Component } from "react";
import { StyleSheet, FlatList, View, TouchableOpacity, Text } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

const ITEMS = [...Array(25).keys()];

class Dynamic extends Component {
  renderItem({ item }) {
    return (
      <View>
        <TouchableOpacity style={styles.button} onPress={() => this[RBSheet + item].open()}>
          <Text style={styles.buttonText}>ITEM {item}</Text>
        </TouchableOpacity>
        <RBSheet
          ref={ref => {
            this[RBSheet + item] = ref;
          }}
        >
          <View style={styles.bottomSheetContainer}>
            <Text style={styles.bottomSheetText}>I AM ITEM {item}</Text>
          </View>
        </RBSheet>
      </View>
    );
  }

  render() {
    return (
      <FlatList
        style={styles.container}
        data={ITEMS}
        renderItem={this.renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 50,
    marginHorizontal: 20
  },
  button: {
    backgroundColor: "#4EB151",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 3,
    marginTop: 20
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16
  },
  bottomSheetContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  bottomSheetText: {
    fontSize: 28
  }
});

export default Dynamic;
