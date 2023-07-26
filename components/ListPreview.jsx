import {
  View,
  Text,
  SectionList,
  Pressable,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { AntDesign } from "@expo/vector-icons";
const ITEM_WIDTH = 150;
const PreviewItem = ({ item, navigation }) => {
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("item_details", {
          item: item,
        })
      }
      style={[styles.itemContainer]}
    >
      <View style={styles.imageContainer}>
        <Image
          style={StyleSheet.absoluteFillObject}
          // placeholder={"L6Pj0^jE.AyE_3t7t7R**0o#DgR4"}
          transition={500}
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
      </View>
      <Text numberOfLines={2} style={styles.title}>
        {item.title} • ${item.price}
      </Text>
    </Pressable>
  );
};
const ListPreview = ({
  preview_items,
  all_items,
  title = "Hot Deals",
  icon = "fire",
  color = "red",
  navigation,
}) => {
  return (
    <View style={styles.container}>
      {/* header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.headerTitleSection}>
          {icon ? (
            <MaterialCommunityIcons size={24} color={color} name={icon} />
          ) : null}
          <Text
            style={{
              fontSize: 18,
              color: "lightgray",
              fontWeight: "bold",
            }}
          >
            {title}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "gray",
            backgroundColor: "rgba(255,255,255,0.1)",
          }}
          onPress={() =>
            navigation.navigate("complete_list", {
              all_items: all_items,
            })
          }
        >
          <Text
            style={{
              fontSize: 10,
              color: "lightgray",
              fontWeight: "500",
            }}
          >
            See All
          </Text>
        </TouchableOpacity>
      </View>
      {/* items */}

      <ScrollView
        horizontal
        contentContainerStyle={styles.listContaienrStyle}
        showsHorizontalScrollIndicator={false}
      >
        {preview_items.map((value, index) => (
          <PreviewItem key={index} item={value} navigation={navigation} />
        ))}

        {/* see more button - scroll item */}
        <Pressable
          style={{
            justifyContent: "center",
            alignItems: "center",
            rowGap: 10,
            marginLeft: 10,
          }}
          onPress={() =>
            navigation.navigate("complete_list", {
              all_items: all_items,
            })
          }
        >
          <AntDesign
            name="arrowright"
            style={{
              height: 60,
              width: 60,
              fontSize: 32,
              borderRadius: 30,
              color: "lightgray",
              borderWidth: 2,
              borderColor: "lightgray",
              textAlign: "center",
              textAlignVertical: "center",
            }}
          />
          <Text style={{ color: "lightgray" }}>See more</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default ListPreview;

const styles = StyleSheet.create({
  container: {
    rowGap: 20,
  },
  headerTitleSection: {
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
    flex: 1,
  },
  itemContainer: {
    rowGap: 10,
  },
  imageContainer: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    borderRadius: ITEM_WIDTH * 0.12,
    overflow: "hidden",
    justifyContent: "space-between",
  },
  listContaienrStyle: {
    columnGap: 20,
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
    fontSize: ITEM_WIDTH * 0.08,
    fontWeight: "bold",
    color: "lightgray",
    textTransform: "capitalize",
    textAlignVertical: "center",
    // padding: IMAGE_WIDTH * 0.06,
    width: ITEM_WIDTH,
  },
});
