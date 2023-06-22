import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Animated, {
  interpolate,
  runOnUI,
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const FONT_SIZE = 12;
const Tag = ({ value, containerRef, indicatorPosition }) => {
  const ref = useRef();
  useDerivedValue(() => {
    scrollTo(containerRef, indicatorPosition.value, 0, true);
  });
  const handlePress = () => {
    ref.current.measureLayout(containerRef.current, (x, _, tag_width, __) => {
      console.log(x, tag_width);
      indicatorPosition.value = withTiming(x, {
        duration: 500,
      });
    });

    //set tag index here
  };
  return (
    <Text ref={ref} onPress={handlePress} style={styles.text}>
      {value}
    </Text>
  );
};
const TagsScrollView3 = ({
  tags = ["All", "Newest", "Popular", "Men", "Women", "Kids", "Mevlana"],
}) => {
  const indicatorPosition = useSharedValue(0);
  const indicatorStyle = useAnimatedStyle(() => ({
    width: FONT_SIZE / 2,
    height: FONT_SIZE / 2,
    borderRadius: FONT_SIZE / 4,
    backgroundColor: "lightgreen",
    position: "absolute",
    alignSelf: "center",
    zIndex: 1,
    bottom: 5,
    transform: [
      {
        translateX: indicatorPosition.value,
      },
    ],
  }));

  const containerRef = useAnimatedRef();

  return (
    <View style={styles.mainContainer}>
      <Animated.ScrollView
        style={{ width: "100%" }}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tagsConainerStyle}
        ref={containerRef}
      >
        <Animated.View style={indicatorStyle} />
        {tags.map((value, index) => {
          return (
            <Tag
              value={value}
              containerRef={containerRef}
              key={index}
              indicatorPosition={indicatorPosition}
            />
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

export default TagsScrollView3;

const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 5,
  },
  tagsConainerStyle: {
    columnGap: 20,
    // justifyContent: "space-evenly",
  },
  text: {
    fontSize: FONT_SIZE,
    flex: 1,
    fontWeight: "bold",
    textTransform: "uppercase",
    paddingLeft: 10,
    color: "gray",
  },
});
