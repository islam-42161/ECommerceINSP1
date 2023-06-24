import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";

const { width, height } = Dimensions.get("window");
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const FlashListTest = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => {
        console.log(json.length);
        setData(json);
      });
  }, []);
  return (
    data && (
      <View style={styles.container}>
        <FlashList
          data={data}
          renderItem={({ item }) => (
            <Pressable style={styles.itemContainer}>
              <View style={styles.item}>
                <Image
                  style={StyleSheet.absoluteFillObject}
                  source={{
                    uri: "https://imagesvibe.com/wp-content/uploads/2023/03/Cute-Panda-Images4.jpg",
                  }}
                />
                <Text numberOfLines={2} style={styles.title}>
                  {item.title}
                </Text>
              </View>
            </Pressable>
          )}
          estimatedItemSize={200}
          keyExtractor={(_, index) => index}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          snapToOffsets={data.map((_, index) => index * 200)}
        />
      </View>
    )
  );
};

export default FlashListTest;

const styles = StyleSheet.create({
  container: {
    paddingTop: STATUSBAR_HEIGHT,
    flex: 1,
  },
  itemContainer: {
    width: width / 2,
    height: 200,
    padding: 10,
  },
  item: {
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 5,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
    padding: 5,
    backgroundColor: "rgba(0,0,0,0.7)",
    width: "100%",
    height: 50,
    textTransform: "capitalize",
  },
});
