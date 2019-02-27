import React from "react";
import { View, Text } from "react-native";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import RBSheet from "../src";

Enzyme.configure({ adapter: new Adapter() });

describe("React Native Raw Bottom Sheet", () => {
  it("should render correctly with no props", () => {
    const component = shallow(<RBSheet />);
    expect(component).toMatchSnapshot();
  });

  it("should render correctly with given props", () => {
    const component = shallow(
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
    expect(component).toMatchSnapshot();
  });

  it("should render correctly with any children", () => {
    const component = shallow(
      <RBSheet>
        <View>
          <Text>React Native Raw Bottom Sheet</Text>
        </View>
      </RBSheet>
    );
    expect(component).toMatchSnapshot();
  });
});
