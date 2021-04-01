import { StyleProp, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { Path, Vector } from 'react-native-redash';
export interface AXIS_DATA {
    x: number;
    y: number;
}
export interface GRAPH {
    axisValues: [AXIS_DATA];
    graphName: string;
}
export interface GRAPH_SEETING {
    graphs: [GRAPH];
    canvasWidth?: number;
    canvasHeight?: number;
}
export interface GRAPH_PROPS {
    graphs: GRAPH[];
    canvasWidth?: number;
    canvasHeight?: number;
    tabsCustomContainerStyle?: StyleProp<ViewStyle>;
    onCursorMove?: (point: AXIS_DATA) => void;
}
export interface TABS_PROPS {
    transition: Animated.SharedValue<number>;
    tabNames: string[];
    customContainerStyle?: StyleProp<ViewStyle>;
    canvasWidth?: number;
    previousSelectionValue: Animated.SharedValue<number>;
    currentSelectionValue: Animated.SharedValue<number>;
}
export interface CURSOR_PROPS {
    customCursorStyle?: StyleProp<ViewStyle>;
    transition: Animated.SharedValue<number>;
    graphPath: Animated.SharedValue<Path>;
    canvasWidth?: number;
    canvasHeight?: number;
    translation: Vector<Animated.SharedValue<number>>;
}
export declare const SIZE: number;
export declare const TAB_RADIUS = 8;
export declare const TAB_WIDTH = 80;
export declare const TAB_HEIGHT = 50;
export declare const TAB_PADDING_VERTICAL = 20;
export declare const CURSOR_SIZE: number;
export declare const CURSOR_BORDER_SIZE: number;
export declare const CURSOR_TOTAL_SIZE: number;
