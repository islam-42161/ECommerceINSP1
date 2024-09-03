import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { AntDesign, Foundation } from "@expo/vector-icons";
const ITEM_WIDTH = 100;
const { width } = Dimensions.get("window");
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
          name="heart-outline"
          style={styles.wishlistIcon}
        />
      </View>
      <View style={styles.details}>
        <Text numberOfLines={2} style={styles.title}>
          {item.title}
        </Text>
        <Text numberOfLines={1} style={[styles.subtitle]}><Foundation name="dollar" style={styles.subtitle} /> {item.price}</Text>
      </View>
    </Pressable>
  );
};
const ListPreview = ({
  preview_items,
  all_items,
  title = "Hot Deals",
  icon = null,
  color = "red",
  navigation,
  welcome_text,
}) => {
  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerTitleSection}>
          {icon ? (
            <MaterialCommunityIcons size={24} color={color} name={icon} />
          ) : null}
          <Text
            style={{
              fontSize: 18,
              color: "lightgray",
              fontWeight: "500",
            }}
          >
            {title}
          </Text>
        </View>

        <AntDesign
          onPress={() =>
            navigation.navigate("complete_list", {
              all_items: all_items,
              welcome_text: title,
            })
          }
          name="arrowright"
          size={24}
          color="lightgray"
        />
      </View>
      {/* items */}

      <ScrollView
        horizontal
        contentContainerStyle={styles.listContaienrStyle}
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + 20}
        decelerationRate={"fast"}
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
              welcome_text: title,
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
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "6%",
  },
  itemContainer: {
    rowGap: 10,
    width: ITEM_WIDTH,
  },
  imageContainer: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    borderRadius: ITEM_WIDTH * 0.2,
    overflow: "hidden",
    justifyContent: "space-between",
  },
  listContaienrStyle: {
    columnGap: 20,
    paddingHorizontal: "6%",
  },
  wishlistIcon: {
    height: 20,
    width: 20,
    fontSize: 14,
    textAlignVertical: "center",
    textAlign: "center",
    color: "lightgray",
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 10,
    margin: 5,
    alignSelf: "flex-end",
    // elevation: 5,
  },
  title: {
    fontSize: ITEM_WIDTH * 0.12,
    // fontWeight: "900",
    color: "lightgray",
    textTransform: "capitalize",
    // textAlignVertical: "center",
    // padding: IMAGE_WIDTH * 0.06,
    // width: ITEM_WIDTH,
    // backgroundColor: "yellow",
  },
  subtitle: {
    fontSize: ITEM_WIDTH * 0.12,
    // fontWeight: "bold",
    color: "gray",
    textTransform: "capitalize",
    // textAlignVertical: "center",
    // padding: IMAGE_WIDTH * 0.06,
    // width: ITEM_WIDTH,
    // backgroundColor: "red",
  },
  details: {
    rowGap: 5,
  },
});
