import { Animated } from 'react-native';
import React, { Component } from 'react'

export interface IProps {
    animationType?: 'none' | 'slide' | 'fade'
    height?: number
    minClosingHeight?: number
    duration?: number
    closeOnSwipeDown?: boolean
    closeOnPressMask?: boolean
    customStyles?: React.CSSProperties
    onClose?: () => void
}

declare class RBSheet extends Component<IProps, any> {
    constructor(props: IProps);
    setModalVisible: (visible: boolean) => void
    createPanResponder: (props: IProps) => void
    open: () => {}
    close: () => {}
}

export default RBSheet;