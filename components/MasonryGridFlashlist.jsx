import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FlashList, MasonryFlashList } from "@shopify/flash-list";
import { Image } from "expo-image";

const { width, height } = Dimensions.get("window");
const IMAGE_WIDTH = width * 0.5;
const MasonryGridFlashlist = ({ items }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("https://dummyjson.com/products/")
      .then((response) => response.json())
      .then((json) => {
        console.log(json.products.length);
        setData(json.products);
      });
  }, []);
  return (
    data && (
      <View style={styles.container}>
        <MasonryFlashList
          data={data}
          renderItem={({ item }) => (
            <Pressable
              style={[
                styles.itemContainer,
                {
                  height: Math.floor(Math.random() * 50) + 200,
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
          estimatedItemSize={200}
          keyExtractor={(_, index) => index}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          ListFooterComponentStyle={{ padding: 60 }}
          // snapToOffsets={data.map((_, index) => index * 200)}
        />
      </View>
    )
  );
};

export default MasonryGridFlashlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  itemContainer: {
    width: IMAGE_WIDTH - 20,
    padding: 5,
  },
  item: {
    justifyContent: "flex-end",
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    textTransform: "capitalize",
    padding: 5,
  },
});
