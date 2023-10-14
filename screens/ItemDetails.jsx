import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import ImageCarousel from "../components/ImageCarousel";
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import DotsCarousel from "../components/DotsCarousel";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveColorIndex,
  toggleWishlisted,
} from "../redux/slices/ItemDetailsStates";
import ColorPick from "../components/ColorPick";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
const { height, width } = Dimensions.get("window");

const ItemDetails = ({ navigation, route }) => {
  const { item } = route.params;
  const pan = Gesture.Pan();
  // image scrollx value
  const animatedScrollX = useSharedValue(0);
  const imageCarouselRef = useAnimatedRef();

  const { wishlisted, activeColorIndex } = useSelector((state) => ({
    wishlisted: state.item_details_states.wishlisted,
    activeColorIndex: state.item_details_states.activeColorIndex,
  }));
  const dispatch = useDispatch();

  const backgroundColorAnimated = useSharedValue("#151515");
  const ambienceStyle = useAnimatedStyle(() => ({
    backgroundColor: backgroundColorAnimated.value,
  }));

  return (
    <Animated.View style={[styles.container, ambienceStyle]}>
      <View style={styles.headerBar}>
        <Ionicons
          name="chevron-back-sharp"
          onPress={() => navigation.goBack()}
          style={[styles.headerButtons]}
        />
        <Ionicons
          name={wishlisted ? "md-heart" : "md-heart-outline"}
          onPress={() => dispatch(toggleWishlisted(!wishlisted))}
          style={[styles.headerButtons]}
        />
      </View>
      <ImageCarousel
        animatedScrollX={animatedScrollX}
        animatedRef={imageCarouselRef}
        ambienceColor={backgroundColorAnimated}
        images={item.images}
      />

      {/* Bottom Info */}
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.bottomInfo]}>
          <DotsCarousel
            items={item.images.map((_, index) => index)}
            animatedRef={imageCarouselRef}
            animatedScrollX={animatedScrollX}
          />

          {/* title */}
          <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit>
            {item.title}
          </Text>
          {/* description */}
          <Text style={styles.subTitle} numberOfLines={3}>
            {item.description}
          </Text>

          {/* choice section */}
          <View style={styles.choice}>
            {item.colors === undefined ? null : (
              <ColorPick
                colors={item.colors}
                backgroundColorAnimated={backgroundColorAnimated}
              />
            )}
            <View style={styles.addremoveCart}>
              <AntDesign
                name="minus"
                style={{ padding: 10, borderRadius: width / 8, fontSize: 10 }}
              />
              <Text style={{ fontSize: 14 }}>2</Text>
              <AntDesign
                name="plus"
                style={[
                  {
                    padding: 10,
                    backgroundColor: "#1A1A1A",
                    borderRadius: width / 8,
                    color: "white",
                    marginLeft: 8,
                    fontSize: 10,
                  },
                ]}
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
              ${item.price.toFixed(2)}
            </Text>

            {/* cart button */}

            <Animated.Text
              onPress={() => console.log("add to cart")}
              style={[styles.addTOCartButton]}
            >
              Add to cart
            </Animated.Text>
          </View>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
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
    // zIndex:10
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
  },
});
