import React from 'react';
import {
  render,
  act,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react-native';
import RBSheet from '../src';

describe('React Native Raw Bottom Sheet <RBSheet />', () => {
  let ref;
  let getByTestId;

  beforeEach(() => {
    ref = React.createRef();
    getByTestId = render(<RBSheet ref={ref} />).getByTestId;
    act(() => {
      ref.current.open();
    });
  });

  afterEach(cleanup);

  it('should render correctly', () => {
    expect(getByTestId('Modal')).toBeTruthy();
    expect(getByTestId('KeyboardAvoidingView')).toBeTruthy();
    expect(getByTestId('TouchableOpacity')).toBeTruthy();
    expect(getByTestId('AnimatedView')).toBeTruthy();
  });

  it('should render draggable correctly', () => {
    getByTestId = render(<RBSheet ref={ref} draggable />).getByTestId;
    act(() => {
      ref.current.open();
    });
    expect(getByTestId('DraggableView')).toBeTruthy();
    expect(getByTestId('DraggableIcon')).toBeTruthy();
  });

  it('should handle open and close method', async () => {
    expect(getByTestId('Modal')).toBeTruthy();
    act(() => {
      ref.current.close();
    });
    await waitFor(() =>
      expect(() => getByTestId('Modal')).toThrow(
        'Unable to find an element with testID: Modal',
      ),
    );
  });

  it('should handle open and close callbacks', async () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();
    getByTestId = render(
      <RBSheet ref={ref} onOpen={onOpen} onClose={onClose} />,
    ).getByTestId;
    act(() => {
      ref.current.open();
    });
    await waitFor(() => expect(onOpen).toHaveBeenCalled());
    act(() => {
      ref.current.close();
    });
    await waitFor(() => expect(onClose).toHaveBeenCalled());
  });

  it('should not close on press mask', () => {
    fireEvent.press(getByTestId('TouchableOpacity'));
    expect(getByTestId('Modal')).toBeTruthy();
  });

  it('should close on press mask', async () => {
    getByTestId = render(<RBSheet ref={ref} closeOnPressMask />).getByTestId;
    act(() => {
      ref.current.open();
    });
    fireEvent.press(getByTestId('TouchableOpacity'));
    await waitFor(() =>
      expect(() => getByTestId('Modal')).toThrow(
        'Unable to find an element with testID: Modal',
      ),
    );
  });

  it('should not close on press back', () => {
    fireEvent(getByTestId('Modal'), 'requestClose');
    expect(getByTestId('Modal')).toBeTruthy();
  });

  it('should close on press back', async () => {
    getByTestId = render(<RBSheet ref={ref} closeOnPressBack />).getByTestId;
    act(() => {
      ref.current.open();
    });
    fireEvent(getByTestId('Modal'), 'requestClose');
    await waitFor(() =>
      expect(() => getByTestId('Modal')).toThrow(
        'Unable to find an element with testID: Modal',
      ),
    );
  });
});
