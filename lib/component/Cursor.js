import * as React from "react";
import { StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { Extrapolate, interpolate, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withDecay, withSpring } from "react-native-reanimated";
import { clamp, getYForX } from "react-native-redash";
import { CURSOR_BORDER_SIZE, CURSOR_SIZE, CURSOR_TOTAL_SIZE, SIZE } from "../config";
const styles = StyleSheet.create({
    container: Object.assign({}, StyleSheet.absoluteFillObject),
    cursor: {
        width: CURSOR_SIZE,
        height: CURSOR_SIZE,
        borderRadius: CURSOR_SIZE,
        backgroundColor: "#367be2",
        borderWidth: CURSOR_BORDER_SIZE,
        borderColor: "#fff"
    },
    cursorRibbleOverlay: Object.assign(Object.assign({}, StyleSheet.absoluteFillObject), { backgroundColor: "rgba(128, 128, 128, .39)", borderRadius: CURSOR_SIZE })
});
const Cursor = ({ transition, graphPath, canvasWidth = SIZE, translation }) => {
    const activeStatusTransition = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => {
        const x = translation.x.value - CURSOR_TOTAL_SIZE / 2;
        const y = getYForX(graphPath.value, translation.x.value) - CURSOR_TOTAL_SIZE / 2;
        let scale;
        if (transition.value > 0 && transition.value < 1) {
            scale = 0;
        }
        else {
            scale = 1;
        }
        return {
            transform: [{ translateX: x }, { translateY: y }, { scale }]
        };
    }, [graphPath.value]);
    const cursorRibbleOverlayDynamic = useAnimatedStyle(() => {
        const scaleRatio = interpolate(activeStatusTransition.value, [0, 1], [0, 1], Extrapolate.CLAMP);
        return {
            transform: [{ scale: scaleRatio * 1.75 }]
        };
    });
    const onGestureEvent = useAnimatedGestureHandler({
        onStart: ({}, ctx) => {
            ctx.x = translation.x.value;
            ctx.y = translation.y.value;
            activeStatusTransition.value = withSpring(1);
        },
        onActive: ({ translationX, translationY }, ctx) => {
            translation.x.value = clamp(ctx.x + translationX, 0, canvasWidth);
            translation.y.value = ctx.y + translationY;
        },
        onEnd: ({ velocityX }) => {
            translation.x.value = withDecay({
                velocity: velocityX,
                clamp: [0, canvasWidth]
            }, () => {
                activeStatusTransition.value = withSpring(0);
            });
        }
    });
    return (<PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={styles.container}>
        <Animated.View style={[styles.cursor, animatedStyle]}>
          <Animated.View style={[styles.cursorRibbleOverlay, cursorRibbleOverlayDynamic]}/>
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>);
};
export default Cursor;
//# sourceMappingURL=Cursor.js.map