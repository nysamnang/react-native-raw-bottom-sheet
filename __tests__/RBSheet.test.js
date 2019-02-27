import React from "react";
import { View, Text } from "react-native";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import RBSheet from "../src";

Enzyme.configure({ adapter: new Adapter() });

describe("React Native Raw Bottom Sheet", () => {
  describe("Render", () => {
    it("should render correctly with no props", () => {
      const wrapper = shallow(<RBSheet />);
      expect(wrapper).toMatchSnapshot();
    });

    it("should render correctly with given props", () => {
      const wrapper = shallow(
        <RBSheet
          height={300}
          minClosingHeight={100}
          duration={350}
          closeOnSwipeDown={false}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: "#00000066"
            },
            container: {
              justifyContent: "center",
              alignItems: "center"
            }
          }}
          onClose={() => {}}
        />
      );
      expect(wrapper).toMatchSnapshot();
    });

    it("should render correctly with any children", () => {
      const wrapper = shallow(
        <RBSheet>
          <View>
            <Text>React Native Raw Bottom Sheet</Text>
          </View>
        </RBSheet>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("Method", () => {
    it("should createPanResponder called", () => {
      const wrapper = shallow(<RBSheet />);
      const createPanResponder = jest.spyOn(RBSheet.prototype, "createPanResponder");
      wrapper.instance().createPanResponder({ closeOnSwipeDown: true, height: 300 });
      expect(createPanResponder).toHaveBeenCalled();
    });

    it("should component open", () => {
      jest.useFakeTimers(); // https://github.com/facebook/jest/issues/4359
      const wrapper = shallow(<RBSheet />);
      const setModalVisible = jest.spyOn(RBSheet.prototype, "setModalVisible");
      wrapper.instance().open();
      expect(setModalVisible).toHaveBeenCalled();
      expect(wrapper.state().modalVisible).toBe(true);
    });

    it("should component close", () => {
      jest.useFakeTimers(); // https://github.com/facebook/jest/issues/4359
      const wrapper = shallow(<RBSheet />);
      const setModalVisible = jest.spyOn(RBSheet.prototype, "setModalVisible");
      wrapper.instance().close();
      expect(setModalVisible).toHaveBeenCalled();
      expect(wrapper.state().modalVisible).toBe(false);
    });
  });
});
