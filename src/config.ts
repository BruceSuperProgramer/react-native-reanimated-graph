import {Dimensions, StyleProp, ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';
import {Path, Vector} from 'react-native-redash';

const screenWidth = Dimensions.get('window').width;
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

export const SIZE = screenWidth;

export const TAB_RADIUS = 8;
export const TAB_WIDTH = 80;
export const TAB_HEIGHT = 50;
export const TAB_PADDING_VERTICAL = 20;

export const CURSOR_SIZE = screenWidth * 0.07;
export const CURSOR_BORDER_SIZE = screenWidth * 0.01;
export const CURSOR_TOTAL_SIZE = CURSOR_SIZE + CURSOR_BORDER_SIZE;
