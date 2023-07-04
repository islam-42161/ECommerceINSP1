import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FlashList, MasonryFlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import TagsScrollView from "./TagsScrollView";
import Animated, {
  useAnimatedScrollHandler,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

const AnimatedMasonry = Animated.createAnimatedComponent(MasonryFlashList);

const { width, height } = Dimensions.get("window");
const COL_NUM = 2;
const IMAGE_WIDTH = width / COL_NUM;
const item_image_heights = [IMAGE_WIDTH * 0.7, IMAGE_WIDTH * 1.4];
const MasonryGridFlashlist = ({ data, listScrollY, bottomPosition }) => {
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      listScrollY.value = event.contentOffset.y;
      if (event.velocity?.y > 0.5) {
        bottomPosition.value = withTiming(-100);
      } else {
        bottomPosition.value = withTiming(20);
      }
    },
  });

  return data ? (
    <View style={styles.container}>
      <AnimatedMasonry
        onScroll={scrollHandler}
        data={data}
        estimatedItemSize={200}
        keyExtractor={(_, index) => index}
        numColumns={COL_NUM}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        ListFooterComponentStyle={{ padding: 60 }}
        renderItem={({ item }) => (
          <Pressable
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
                  uri: item.thumbnail,
                }}
              />
              <Text numberOfLines={2} style={styles.title}>
                {item.title} • ${item.price}
              </Text>
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
  },
  indicator: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
  itemContainer: {
    width: IMAGE_WIDTH,
    padding: IMAGE_WIDTH * 0.03,
  },
  item: {
    flex: 1,
    borderRadius: IMAGE_WIDTH * 0.12,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: IMAGE_WIDTH * 0.06,
    fontWeight: "bold",
    color: "lightgray",
    textTransform: "capitalize",
    padding: IMAGE_WIDTH * 0.06,
    // paddingVertical: IMAGE_WIDTH * 0.06,
    // paddingHorizontal: IMAGE_WIDTH * 0.03,
    backgroundColor: "rgba(52,52,52,0.7)",
    textAlignVertical: "center",
  },
});
