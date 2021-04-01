import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming
} from "react-native-reanimated";
import { SIZE, TABS_PROPS, TAB_HEIGHT, TAB_RADIUS } from "../config";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  tab: {
    height: TAB_HEIGHT,
    borderRadius: TAB_RADIUS,
    justifyContent: "center",
    alignItems: "center"
  },
  tabOverlay: {
    height: TAB_HEIGHT,
    borderRadius: TAB_RADIUS,
    backgroundColor: "rgba(128, 128, 128, .25)",
    position: "absolute",
    top: 0,
    bottom: 0
  },
  tabText: {
    color: "#367be2",
    fontWeight: "bold"
  }
});

const Tabs = ({
  transition,
  tabNames,
  customContainerStyle = null,
  canvasWidth = SIZE,
  previousSelectionValue,
  currentSelectionValue
}: TABS_PROPS) => {
  const tabWidth = canvasWidth / tabNames.length;
  const tabDynamicStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: withTiming(tabWidth * currentSelectionValue.value) }
    ]
  }));
  return (
    <View style={[styles.container, customContainerStyle]}>
      {tabNames.map((tabName, index) => {
        return (
          <TouchableOpacity
            key={tabName}
            style={[styles.tab, { width: tabWidth }]}
            onPress={() => {
              previousSelectionValue.value = currentSelectionValue.value;
              transition.value = 0;
              currentSelectionValue.value = index;
              transition.value = withTiming(1);
            }}
          >
            <Text style={styles.tabText}>{tabName}</Text>
          </TouchableOpacity>
        );
      })}
      <Animated.View
        pointerEvents={"none"}
        style={[styles.tabOverlay, tabDynamicStyle, { width: tabWidth }]}
      />
    </View>
  );
};

export default Tabs;
