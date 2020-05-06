import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
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
          openDuration={350}
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

    describe("Mask", () => {
      it("should render mask", () => {
        const wrapper = shallow(<RBSheet />);
        expect(wrapper.find(TouchableOpacity).length).toEqual(1);
      });

      it("should closeOnPressMask when given prop true", () => {
        const wrapper = shallow(<RBSheet closeOnPressMask />);
        wrapper.instance().close = jest.fn();
        wrapper.find(TouchableOpacity).simulate("Press");
        expect(wrapper.instance().close).toHaveBeenCalled();
      });

      it("should not closeOnPressMask when given prop false", () => {
        const wrapper = shallow(<RBSheet closeOnPressMask={false} />);
        wrapper.instance().close = jest.fn();
        wrapper.find(TouchableOpacity).simulate("Press");
        expect(wrapper.instance().close).not.toHaveBeenCalled();
      });
    });

    describe("Modal", () => {
      it("should render modal", () => {
        const wrapper = shallow(<RBSheet />);
        expect(wrapper.find(Modal).length).toEqual(1);
      });
    });

    describe("DraggableArea", () => {
      it("should not render draggable area", () => {
        const wrapper = shallow(<RBSheet />);
        expect(wrapper.find(View).length).toEqual(1);
      });

      it("should render draggable area", () => {
        const wrapper = shallow(<RBSheet closeOnDragDown />);
        expect(wrapper.find(View).length).toEqual(3);
      });
    });
  });

  describe("Method", () => {
    it("should createPanResponder called", () => {
      const wrapper = shallow(<RBSheet />);
      const createPanResponder = jest.spyOn(RBSheet.prototype, "createPanResponder");
      wrapper.instance().createPanResponder({ closeOnSwipeDown: true, height: 300 });
      expect(createPanResponder).toHaveBeenCalledTimes(1);
    });

    let wrapper;
    let setModalVisible;
    const onClose = jest.fn();
    beforeEach(() => {
      wrapper = shallow(<RBSheet onClose={onClose} />);
      setModalVisible = jest.spyOn(RBSheet.prototype, "setModalVisible");
      jest.useFakeTimers(); // https://github.com/facebook/jest/issues/4359
      jest.mock("Animated", () => {
        const ActualAnimated = require.requireActual("Animated");
        return {
          ...ActualAnimated,
          timing: (value, config) => {
            return {
              start: callback => {
                value.setValue(config.toValue);
                if (typeof callback === "function") callback();
              }
            };
          }
        };
      });
    });

    it("should method open called", () => {
      wrapper.instance().open();
      expect(setModalVisible).toHaveBeenCalled();
      expect(wrapper.state().modalVisible).toBe(true);
    });

    it("should method close called", () => {
      wrapper.instance().close();
      expect(setModalVisible).toHaveBeenCalled();
      expect(wrapper.state().modalVisible).toBe(false);
    });

    it("should onClose callback function called", () => {
      wrapper.instance().close();
      expect(onClose).toHaveBeenCalled();
    });

    it("should onRequestClose called", () => {
      const mockFn = jest.fn();
      RBSheet.prototype.setModalVisible = mockFn;
      wrapper
        .find(Modal)
        .props()
        .onRequestClose();
      expect(mockFn).toHaveBeenCalled();
    });
  });
});
