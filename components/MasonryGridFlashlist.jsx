import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { MasonryFlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const AnimatedMasonry = Animated.createAnimatedComponent(MasonryFlashList);

const { width } = Dimensions.get("window");
const COL_NUM = 2;
const IMAGE_WIDTH = width / COL_NUM;
const item_image_heights = [IMAGE_WIDTH * 0.7, IMAGE_WIDTH * 1.4];

const MasonryGridFlashlist = ({ data, navigation, lastContentOffset }) => {
  const scrollHandler = useAnimatedScrollHandler({
    onBeginDrag: (e) => {
      lastContentOffset.value = e.contentOffset.y;
    },
    onEndDrag: (e) => {
      // console.log(e.contentOffset.y - lastContentOffset.value);
      lastContentOffset.value = e.contentOffset.y - lastContentOffset.value;
      if (lastContentOffset.value > 0) {
        console.log("scrolling down");
      } else {
        console.log("scrolling up");
      }
    },
  });

  return data ? (
    <View style={styles.container}>
      <AnimatedMasonry
        onScroll={scrollHandler}
        data={data}
        estimatedItemSize={IMAGE_WIDTH * 0.7}
        keyExtractor={(_, index) => index}
        numColumns={COL_NUM}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        ListFooterComponentStyle={{ padding: 60 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate("item_details", {
                item: item,
              })
            }
            style={[
              styles.itemContainer,
              {
                height:
                  item_image_heights[
                    Math.floor(Math.random() * item_image_heights.length)
                  ],
              },
            ]}
          >
            <View style={styles.item}>
              <Image
                style={StyleSheet.absoluteFillObject}
                source={{
                  // uri: item.images[0],
                  uri: item.thumbnail,
                }}
              />
              <Ionicons
                onPress={() => console.log("pressed wishlist")}
                name="ios-heart-outline"
                style={styles.wishlistIcon}
              />
              <LinearGradient
                // style={{ flex: 1, justifyContent: "flex-end" }}
                style={{ padding: IMAGE_WIDTH * 0.06 }}
                colors={["transparent", "black"]}
              >
                <Text numberOfLines={2} style={styles.title}>
                  {item.title} • ${item.price}
                </Text>
              </LinearGradient>
            </View>
          </Pressable>
        )}
      />
    </View>
  ) : (
    <ActivityIndicator
      size={"large"}
      color={"lightgreen"}
      style={styles.indicator}
    />
  );
};

export default MasonryGridFlashlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "6%",
  },
  indicator: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
  itemContainer: {
    width: "94%",
    alignSelf: "center",
    paddingVertical: IMAGE_WIDTH * 0.03,
    paddingHorizontal: IMAGE_WIDTH * 0.015,
  },
  item: {
    flex: 1,
    borderRadius: IMAGE_WIDTH * 0.12,
    overflow: "hidden",
    justifyContent: "space-between",
  },
  wishlistIcon: {
    height: 30,
    width: 30,
    fontSize: 16,
    textAlignVertical: "center",
    textAlign: "center",
    color: "lightgray",
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 15,
    margin: 10,
    alignSelf: "flex-end",
    // elevation: 5,
  },
  title: {
    fontSize: IMAGE_WIDTH * 0.06,
    fontWeight: "bold",
    color: "lightgray",
    textTransform: "capitalize",
    textAlignVertical: "center",
    // padding: IMAGE_WIDTH * 0.06,
  },
});
