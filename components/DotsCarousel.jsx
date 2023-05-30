import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  interpolate,
  scrollTo,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

const INDICATOR_HEIGHT = 5;
const INDICATOR_WIDTH = 20;
const GAP = 10;
const DotsCarousel = ({ items, animatedScrollX, style, animatedRef}) => {


  // useDerivedValue(() => {
  //   const index = Math.floor(animatedScrollX/width)
  //   scrollTo(animatedRef, index * width,0, true)
  // })

  const gotoIndex=(index)=>{
    console.log(index)
    scrollTo(animatedRef, index * width,0, true)
  }
  

  return (
    <View style={[styles.dotscontainer, style]} pointerEvents="none">
      {items.map((element, index) => (
        <Dot i={index} key={index} gotoIndex={gotoIndex} animatedScrollX={animatedScrollX} />
      ))}
    </View>
  );
};
const Dot = ({ i, animatedScrollX,gotoIndex}) => {
  
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
    <Pressable style={styles.dot} onLayout={()=>console.log("loaded")} onPress={()=>{console.log(i)}}>
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
    borderRadius: INDICATOR_WIDTH/2,
    elevation: 1,
    borderWidth:1,
    borderColor:'gray',
    overflow: "hidden",
    // zIndex:5
  },
  activeDot: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: INDICATOR_WIDTH / 2,
    // position:'absolute'
  },
  dotscontainer: {
    flexDirection: "row",
    alignSelf: "center",

    columnGap: GAP,
    position: "absolute",
    top: "-10%",
    // zIndex:1
    // backgroundColor:'pink'
  },
});
