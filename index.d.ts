import {
  StyleProp,
  ViewStyle,
  ModalProps,
  KeyboardAvoidingViewProps,
} from 'react-native';

interface RBSheetProps {
  /**
   * The height of bottom sheet.
   */
  height?: number;

  /**
   * Duration of the animation when opening bottom sheet.
   */
  openDuration?: number;

  /**
   * Duration of the animation when closing bottom sheet.
   */
  closeDuration?: number;

  /**
   * Press the outside area (mask) to close bottom sheet.
   */
  closeOnPressMask?: boolean;

  /**
   * Press hardware back android to close bottom sheet (Android only).
   */
  closeOnPressBack?: boolean;

  /**
   * Enable the drag-down gesture to close the bottom sheet.
   */
  draggable?: boolean;

  /**
   * The draggable is only worked on the draggable icon.
   * Set this to true if you want to drag on the content as well (doesn't work with ScrollView).
   */
  dragOnContent?: boolean;

  /**
   * Use the native driver to run smoother animation.
   */
  useNativeDriver?: boolean;

  /**
   * Add custom styles to bottom sheet.
   *
   * wrapper: The Root of component (Change the mask's background color here).
   *
   * container: The Container of bottom sheet (The animated view that contains your component).
   *
   * draggableIcon: The style of Draggable Icon (If you set `draggable` to `true`).
   */
  customStyles?: {
    /**
     * The Root of component (Change the mask's background color here).
     */
    wrapper?: StyleProp<ViewStyle>;

    /**
     * The Container of bottom sheet (The animated view that contains your component).
     */
    container?: StyleProp<ViewStyle>;

    /**
     * The style of Draggable Icon (If you set `draggable` to `true`).
     */
    draggableIcon?: StyleProp<ViewStyle>;
  };

  /**
   * Add custom props to modal.
   */
  customModalProps?: ModalProps;

  /**
   * Add custom props to KeyboardAvoidingView.
   */
  customAvoidingViewProps?: KeyboardAvoidingViewProps;

  /**
   * Callback function that will be called after the bottom sheet has been opened.
   */
  onOpen?: () => void;

  /**
   * Callback function that will be called after the bottom sheet has been closed.
   */
  onClose?: () => void;

  /**
   * Your own compoent.
   */
  children?: React.ReactNode;
}

interface RBSheetRef {
  /**
   * The method to open bottom sheet.
   */
  open: () => void;

  /**
   * The method to close bottom sheet.
   */
  close: () => void;
}

declare const RBSheet: React.ForwardRefExoticComponent<
  RBSheetProps & React.RefAttributes<RBSheetRef>
>;

export default RBSheet;
