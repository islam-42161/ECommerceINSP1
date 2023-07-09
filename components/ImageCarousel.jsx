import { Dimensions, StyleSheet, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

const { height, width } = Dimensions.get("window");

const ImageCarousel = ({
  images = [
    "https://images.pexels.com/photos/2421953/pexels-photo-2421953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/276092/pexels-photo-276092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/9365820/pexels-photo-9365820.jpeg?auto=compress&cs=tinysrgb&w=600",
  ],
  animatedScrollX,
  animatedRef,
}) => {
  const placeholder_blurhash =
    "|6PZfSi_.AyE8^m+%gt,o~_3t7t7R*WBs,ofR-a#*0o#DgR4.Tt,ITVYZ~_3R*D%xt%MIpRj%0oJMcV@%itSI9R5x]tRbcIot7-:IoM{%LoeIVjuNHoft7M{RkxuozM{ae%1WBg4tRV@M{kCxuog?vWB9Et7-=NGM{xaae";

  const animatedScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      animatedScrollX.value = e.contentOffset.x;
    },
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate={"fast"}
        onScroll={animatedScrollHandler}
        ref={animatedRef}
      >
        <LinearGradient
          style={{
            position: "absolute",
            width: "100%",
            height: "25%",
            zIndex: 1,
            bottom: 0,
          }}
          colors={["transparent", "#151515"]}
        />
        {/* '#151515' */}
        {images.map((uri, key) => (
          // image container
          <View key={key} style={{ width: width, overflow: "hidden" }}>
            <Image
              source={{ uri }}
              placeholder={placeholder_blurhash}
              style={{ flex: 1 }}
              transition={1000}
              contentFit="contain"
            />
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default ImageCarousel;

const styles = StyleSheet.create({
  container: {
    // width:width,
    height: "70%",
    alignItems: "center",
    overflow: "hidden",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});
