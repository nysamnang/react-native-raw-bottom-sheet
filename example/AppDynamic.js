import React, {useRef} from 'react';
import {StyleSheet, FlatList, View, TouchableOpacity, Text} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

const ITEMS = [...Array(10).keys()];

const AppDynamic = () => {
  const refRBSheet = useRef([]);

  const renderItem = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => refRBSheet.current[index].open()}>
          <Text style={styles.buttonText}>ITEM {item + 1}</Text>
        </TouchableOpacity>
        <RBSheet ref={ref => (refRBSheet.current[index] = ref)}>
          <View style={styles.bottomSheetContainer}>
            <Text style={styles.bottomSheetText}>I AM ITEM {item + 1}</Text>
          </View>
        </RBSheet>
      </View>
    );
  };

  return (
    <FlatList
      style={styles.container}
      data={ITEMS}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 50,
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: '#4EB151',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 3,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  bottomSheetContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSheetText: {
    fontSize: 28,
  },
});

export default AppDynamic;
