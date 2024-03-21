import React from 'react';
import {render, act} from '@testing-library/react-native';
import RBSheet from '../src';

describe('<RBSheet />', () => {
  let ref;
  let getByTestId;

  beforeEach(() => {
    ref = React.createRef();
    getByTestId = render(<RBSheet ref={ref} />).getByTestId;
  });

  it('should render correctly', () => {
    getByTestId = render(<RBSheet ref={ref} draggable />).getByTestId;

    act(() => {
      ref.current.open();
    });

    expect(getByTestId('Modal')).toBeTruthy();
    expect(getByTestId('KeyboardAvoidingView')).toBeTruthy();
    expect(getByTestId('TouchableOpacity')).toBeTruthy();
    expect(getByTestId('AnimatedView')).toBeTruthy();
    expect(getByTestId('DraggableView')).toBeTruthy();
    expect(getByTestId('DraggableIcon')).toBeTruthy();
  });
});
