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
// const Tag = ({ value, containerRef, indicatorPosition, tagsScrollX }) => {
//   const ref = useRef();
//   const handlePress = () => {
//     ref.current.measureLayout(containerRef.current, (x, _, tag_width, __) => {
//       indicatorPosition.value = withTiming(x, {
//         duration: 500,
//       });
//       // scroll to middle of the page, minus columngap
//       runOnUI(scrollTo)(containerRef, x - width * 0.33, 0, true);
//     });

//     // if (indicatorPosition.value < tagsScrollX.value + width / 3) {
//     //   scrollTo(containerRef, indicatorPosition.value - width / 3, 0, true);
//     // }
//     //set tag index here
//   };
//   return (
//     <Text ref={ref} onPress={handlePress} style={styles.text}>
//       {value}
//     </Text>
//   );
// };

const Tag = ({ value, containerRef, indicatorPosition, tagsScrollX }) => {
  const ref = useRef();
  const handlePress = () => {
    ref.current.measureLayout(containerRef.current, (x, _, tag_width, __) => {
      indicatorPosition.value = withTiming(x, {
        duration: 500,
      });
      // scroll to middle of the page, minus columngap
      runOnUI(scrollTo)(containerRef, x - width * 0.33, 0, true);
    });
  };

  return (
    <Text ref={ref} onPress={handlePress} style={styles.text}>
      {typeof value === "object" ? value.name : value}
    </Text>
  );
};


const Preloader = () => {
  return (
    <View style={styles.mainContainer}>
      <Animated.ScrollView
        style={{ width: "100%" }}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tagsConainerStyle}
      >
        {new Array(6).fill("loader").map((_, index) => {
          return (
            <View
              key={index}
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                width: 80,
                height: 12,
                borderRadius: 10,
                // marginHorizontal: 10,
              }}
            />
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

const TagsScrollView = ({
  categories = [
    "Newest",
    "Popular",
    "Men",
    "Women",
    "Kids",
    "Electronics & Gadgets",
    "Fashion & Apparel",
    "Home & Decor",
    "Health & Beauty",
    "Sports & Fitness",
    "Books & Stationery",
    "Toys & Games",
  ],
}) => {
  const indicatorPosition = useSharedValue(0 + width * 0.06);
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
  const tagsScrollX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    tagsScrollX.value = event.contentOffset.x;
  });

  const tags = categories ? ["All", ...categories] : undefined;

  return tags ? (
    <View style={styles.mainContainer}>
      <Animated.ScrollView
        style={{ width: "100%" }}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tagsConainerStyle}
        onScroll={scrollHandler}
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
              tagsScrollX={tagsScrollX}
            />
          );
        })}
      </Animated.ScrollView>
    </View>
  ) : (
    <Preloader />
  );
};

export default TagsScrollView;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-evenly",
    // backgroundColor: "red",
  },
  tagsConainerStyle: {
    columnGap: 20,
    paddingHorizontal: "6%",
    // justifyContent: "space-evenly",
  },
  text: {
    fontSize: FONT_SIZE,
    flex: 1,
    fontWeight: "bold",
    textTransform: "capitalize",
    paddingLeft: 10,
    color: "gray",
  },
});
