import * as React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { interpolate, useAnimatedProps, useDerivedValue, useSharedValue } from "react-native-reanimated";
import { getYForX, mixPath, useVector } from "react-native-redash";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";
import Cursor from "./component/Cursor";
import Tabs from "./component/Tabs";
import { SIZE } from "./config";
import { buildGraphPath } from "./utils";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    }
});
const AnimatedPath = Animated.createAnimatedComponent(Path);
const Graph = ({ graphs, canvasWidth = SIZE, canvasHeight = SIZE, tabsCustomContainerStyle = null, onCursorMove }) => {
    const transition = useSharedValue(1);
    const previous = useSharedValue(0);
    const current = useSharedValue(0);
    const translation = useVector();
    const pathsData = graphs.map((graph) => {
        const { axisValues } = graph;
        const pathData = buildGraphPath(axisValues);
        return pathData;
    });
    const minY = useDerivedValue(() => {
        return pathsData[current.value].minY;
    });
    const maxY = useDerivedValue(() => {
        return pathsData[current.value].maxY;
    });
    const currentPath = useDerivedValue(() => {
        return pathsData[current.value].path;
    });
    const currentPathString = useDerivedValue(() => {
        return pathsData[current.value].pathString;
    });
    const animatedProps = useAnimatedProps(() => {
        const previousPath = pathsData[previous.value].path;
        const currentPath = pathsData[current.value].path;
        const path = mixPath(transition.value, previousPath, currentPath);
        return { d: path };
    });
    const animatedGradientBackgroundProps = useAnimatedProps(() => {
        return {
            d: `${currentPathString.value}  L ${canvasWidth} ${canvasHeight} L 0 ${canvasHeight}`,
            opacity: transition.value == 1 ? 1 : 0
        };
    });
    useDerivedValue(() => {
        let y = getYForX(currentPath.value, translation.x.value);
        y = interpolate(y, [canvasHeight, 0], [minY.value, maxY.value]);
        if (onCursorMove)
            onCursorMove({ x: translation.x.value, y });
    });
    return (<View style={styles.container}>
      <Svg width={canvasWidth} height={canvasHeight}>
        <AnimatedPath animatedProps={animatedProps} fill="transparent" stroke="#367be2" strokeWidth={5}></AnimatedPath>
        <Defs>
          <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="gradient">
            <Stop stopColor="#CDE3F8" offset="0%"/>
            <Stop stopColor="#eef6fd" offset="80%"/>
            <Stop stopColor="#FEFFFF" offset="100%"/>
          </LinearGradient>
        </Defs>
        <AnimatedPath animatedProps={animatedGradientBackgroundProps} fill="url(#gradient)"/>
      </Svg>

      <Cursor transition={transition} graphPath={currentPath} translation={translation}/>
      <Tabs transition={transition} tabNames={graphs.map((o) => o.graphName)} customContainerStyle={tabsCustomContainerStyle} canvasWidth={canvasWidth} previousSelectionValue={previous} currentSelectionValue={current}/>
    </View>);
};
export default Graph;
//# sourceMappingURL=Graph.js.map