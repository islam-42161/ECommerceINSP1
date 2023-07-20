import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const ColorPick = ({
  backgroundColorAnimated,
  colors = ["#151515", "lightblue", "lightgreen", "hotpink"],
}) => {
  const COLOR_SIZE = 30;
  const COLOR_GAP = 5;
  const activeColorPosition = useSharedValue(0);
  // changing background color on color position change
  useDerivedValue(() => {
    backgroundColorAnimated.value = interpolateColor(
      activeColorPosition.value,
      colors.map((_, index) => index * (COLOR_GAP + COLOR_SIZE)),
      colors
    );
  }, [activeColorPosition.value]);
  const selectedColorPositionStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: activeColorPosition.value,
      },
    ],
  }));

  const handleColorPress = (index) => {
    //35 = indicator size(30) + gap between indicators(5)
    activeColorPosition.value = withTiming(index * (COLOR_SIZE + COLOR_GAP));
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: COLOR_GAP }}
    >
      <Animated.View
        style={[
          {
            backgroundColor: "transparent",
            borderWidth: 3,
            borderColor: "gray",
            height: COLOR_SIZE,
            width: COLOR_SIZE,
            borderRadius: COLOR_SIZE / 2,
            position: "absolute",
            zIndex: 5,
          },
          selectedColorPositionStyle,
        ]}
      />
      {colors.map((color, index) => (
        <Pressable
          key={index}
          style={{
            backgroundColor: color,
            width: COLOR_SIZE,
            height: COLOR_SIZE,
            borderRadius: COLOR_SIZE / 2,
            elevation: 2,
            // overflow:'hidden'
          }}
          onPress={() => handleColorPress(index)}
        ></Pressable>
      ))}
    </ScrollView>
  );
};

export default ColorPick;

const styles = StyleSheet.create({});
