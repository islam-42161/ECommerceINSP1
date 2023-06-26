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

const { width, height } = Dimensions.get("window");
const COL_NUM = 2;
const IMAGE_WIDTH = width / COL_NUM;
const MasonryGridFlashlist = ({ items }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("https://dummyjson.com/products/")
      .then((response) => response.json())
      .then((json) => {
        setData(json.products);
      });
  }, []);
  return data ? (
    <View style={styles.container}>
      <MasonryFlashList
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
                  Math.floor(Math.random() * IMAGE_WIDTH * 0.4) +
                  IMAGE_WIDTH * 0.8,
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
    // paddingHorizontal: 20,
    // paddingHorizontal: IMAGE_WIDTH * 0.01,
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
    // padding: IMAGE_WIDTH * 0.04,
    backgroundColor: "rgba(52,52,52,0.7)",
    textAlignVertical: "center",
  },
});
