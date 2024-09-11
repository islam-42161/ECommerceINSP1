import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

const { height, width } = Dimensions.get("window");
const IMAGE_WIDTH = width - 40;

const ImageCarousel = ({
  images = [
    "https://images.pexels.com/photos/2421953/pexels-photo-2421953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/276092/pexels-photo-276092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/9365820/pexels-photo-9365820.jpeg?auto=compress&cs=tinysrgb&w=600",
  ],
  animatedScrollX,
  animatedRef,
  navigation
}) => {
  const placeholder_blurhash =
    "|6PZfSi_.AyE8^m+%gt,o~_3t7t7R*WBs,ofR-a#*0o#DgR4.Tt,ITVYZ~_3R*D%xt%MIpRj%0oJMcV@%itSI9R5x]tRbcIot7-:IoM{%LoeIVjuNHoft7M{RkxuozM{ae%1WBg4tRV@M{kCxuog?vWB9Et7-=NGM{xaae";

  const animatedScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      animatedScrollX.value = e.contentOffset.x;
    },
  });

  return (
    <Animated.View style={styles.container}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate={"fast"}
        onScroll={animatedScrollHandler}
        ref={animatedRef}
      >

        {images.map((uri, key) => (
          <View key={key} style={{ width: IMAGE_WIDTH, height: '100%', overflow: "hidden" }}>
            <Image
              source={{ uri }}
              placeholder={placeholder_blurhash}
              style={{ flex: 1, }}
              transition={1000}
              contentFit="contain"
              cachePolicy={"memory-disk"}
            />
          </View>
        ))}
      </Animated.ScrollView>
      <MaterialCommunityIcons
        name="arrow-expand"
        onPress={() => navigation.navigate('gallery_carousel', {
          images: images,
          active_index: Math.round(animatedScrollX.value / width)
        })}
        style={[styles.button]}
      />
    </Animated.View>
  );
};

export default ImageCarousel;

const styles = StyleSheet.create({
  container: {
    width: IMAGE_WIDTH,
    // height: "100%",
    flex: 1,
    // marginHorizontal: 20,
    borderRadius: 20,
    // backgroundColor: '#151515',
    // backgroundColor: 'white',
    backgroundColor: "#343434",
    alignItems: "center",
    overflow: "hidden",
    alignSelf: 'center'
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
  },
  button: {
    width: 24 + 16,
    height: 24 + 16,
    padding: 8,
    backgroundColor: "#151515",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 16,
    borderRadius: 14,
    color: "white",
    position: 'absolute',
    left: 10,
    bottom: 10
  },

});
