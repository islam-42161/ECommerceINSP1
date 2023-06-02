import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  runOnUI,
  scrollTo,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

const INDICATOR_HEIGHT = 5;
const INDICATOR_WIDTH = 20;
const GAP = 10;
const DotsCarousel = ({
  items = [1, 2, 3],
  animatedScrollX,
  style,
  animatedRef,
}) => {


  const gotoIndex = (index) => {
    runOnUI(scrollTo)(animatedRef, index*width, 0, true);
  };

  return (
    <ScrollView
      style={[styles.dotscontainer]}
      contentContainerStyle={[styles.dotsContentContainer, style]}
      pointerEvents="none"
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {items.map((element, index) => (
        <Dot
          i={index}
          key={index}
          animatedScrollX={animatedScrollX}
          gotoIndex={gotoIndex}
        />
      ))}
    </ScrollView>
  );
};
const Dot = ({ i, animatedScrollX,gotoIndex }) => {
  const animatedDotStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          animatedScrollX.value,
          [-width + i * width, i * width, width + i * width],
          [-(INDICATOR_WIDTH + GAP), 0, INDICATOR_WIDTH + GAP]
        ),
      },
    ],
  }));
  return (
    <Pressable
      style={styles.dot}
      onPress={()=>gotoIndex(i)}
    >
      <Animated.View style={[styles.activeDot, animatedDotStyle]} />
    </Pressable>
  );
};
export default DotsCarousel;

const styles = StyleSheet.create({
  dot: {
    width: INDICATOR_WIDTH,
    height: INDICATOR_HEIGHT,
    backgroundColor: "#00000044",
    borderRadius: INDICATOR_WIDTH / 2,
    borderWidth: 1,
    borderColor: "gray",
    overflow: "hidden",
  },
  activeDot: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: INDICATOR_WIDTH / 2,
  },
  dotscontainer: {
    position: "absolute",
    top: "-10%",
    alignSelf: "center",
  },
  dotsContentContainer: {
    columnGap: GAP,
  },
});
