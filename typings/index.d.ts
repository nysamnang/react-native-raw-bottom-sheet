import * as React from 'react'
import { StyleProp, ViewStyle, Animated } from 'react-native'

declare module 'react-native-raw-bottom-sheet' {

    export type RBSheetProps = {
        animationType?: 'none' | 'fade' | 'slide'
        height?: number
        minClosingHeight?: number
        duration?: number
        closeOnSwipeDown?: boolean
        closeOnPressMask?:boolean
        onClose?: () => void
        customStyles?: {
            wrapper?: StyleProp<ViewStyle>
            container?: StyleProp<Animated.View>
        }
    }

    class RBSheet extends React.Component<RBSheetProps> {
        open(): void
        close(): void
    }

    export default RBSheet
}
