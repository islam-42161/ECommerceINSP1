import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import ImageCarousel from "../components/ImageCarousel";
import { useAnimatedRef, useSharedValue } from "react-native-reanimated";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import DotsCarousel from "../components/DotsCarousel";
const { height, width } = Dimensions.get("window");
const ItemDetails = () => {
  // image scrollx value
  const animatedScrollX = useSharedValue(0);
const imageCarouselRef = useAnimatedRef()

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <Ionicons
          name="chevron-back-sharp"
          onPress={() => console.log("pressed back button")}
          style={styles.headerButtons}
        />
        <Ionicons
          name="md-heart-outline"
          onPress={() => console.log("pressed heart button")}
          style={styles.headerButtons}
        />
      </View>
      <ImageCarousel animatedScrollX={animatedScrollX} aniamtedRef={imageCarouselRef}/>

      {/* Bottom Info */}
      <View style={styles.bottomInfo}>

        <DotsCarousel items={[1, 2, 3]} aniamtedRef={imageCarouselRef} animatedScrollX={animatedScrollX} />

        {/* title */}
        <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit>
          Bottle
        </Text>
        <Text style={styles.subTitle} numberOfLines={3}>
          Water Bottle - what you need for training. Stylish, comfortable and
          practical to use. Suitable for men and women.
        </Text>

        {/* choice section */}
        <View style={styles.choice}>
          <LinearGradient
            style={styles.colorChoice}
            colors={["white", "transparent", "white"]}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 5 }}
            >
              <View
                style={{
                  padding: 3,
                  borderWidth: 2,
                  borderRadius: 20,
                  borderColor: "dodgerblue",
                }}
              >
                <View
                  style={{
                    backgroundColor: "black",
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                  }}
                />
              </View>
              <View style={{ padding: 3 }}>
                <View
                  style={{
                    backgroundColor: "lightgreen",
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                  }}
                />
              </View>
              <View style={{ padding: 3 }}>
                <View
                  style={{
                    backgroundColor: "lightgray",
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                  }}
                />
              </View>
            </ScrollView>
          </LinearGradient>

          <View style={styles.addremoveCart}>
            <AntDesign
              name="minus"
              style={{ padding: 10, borderRadius: width / 8, fontSize: 10 }}
            />
            <Text style={{ fontSize: 14 }}>2</Text>
            <AntDesign
              name="plus"
              style={{
                padding: 10,
                backgroundColor: "#1A1A1A",
                borderRadius: width / 8,
                color: "white",
                marginLeft: 8,
                fontSize: 10,
              }}
            />
          </View>
        </View>

        {/* price and cart button */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* price */}
          <Text
            style={{
              fontSize: 24,
              fontWeight: "700",
              letterSpacing: 0,
              color: "#1A1A1A",
            }}
          >
            $123.54
          </Text>

          {/* cart button */}

          <Text style={styles.addTOCartButton}>Add to cart</Text>
        </View>
      </View>
    </View>
  );
};

export default ItemDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "flex-end",
    backgroundColor: "#151515",
  },
  bottomInfo: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    height: height * 0.4,
    backgroundColor: "white",
    gap: 10,
    borderRadius: width / 8,
    elevation: 5,
    padding: 20,
    margin: 10,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 12 * 4,
    letterSpacing: 0.5,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  subTitle: {
    color: "gray",
    lineHeight: 20,
    letterSpacing: 0.5,
  },
  choice: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-between",
  },
  colorChoice: {
    flexDirection: "row",
  },
  addremoveCart: {
    padding: 5,
    backgroundColor: "#F1F1F1",
    borderRadius: width / 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  addTOCartButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1A1A1A",
    color: "white",
    textAlignVertical: "center",
    borderRadius: width / 8,
    paddingVertical: 20,
    paddingHorizontal: 40,
    fontWeight: "500",
  },
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    paddingVertical: 40,
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1,
  },
  headerButtons: {
    width: 24 + 16,
    height: 24 + 16,
    padding: 8,
    backgroundColor: "#343434",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 16,
    borderRadius: 14,
    color: "white",
    elevation: 5,
  },
});
