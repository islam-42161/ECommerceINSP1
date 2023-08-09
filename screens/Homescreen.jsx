import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import React, { useEffect, useRef } from "react";
import HomeHeader from "../components/HomeHeader";
import UserProfileView from "../components/UserProfileView";
import TagsScrollView from "../components/TagsScrollView";

import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  measure,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategories,
  setHomescreenItems,
} from "../redux/slices/HomeScreenSlice";
import ListPreview from "../components/ListPreview";

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const person_name = "Muaz";

const welcome_messages = [
  "Find what you need",
  "Search for products",
  "Enter your query here",
  "Discover amazing deals",
  "Explore our catalog",
  "Shop with ease",
  "What are you looking for?",
];
const welcome_text =
  welcome_messages[Math.floor(Math.random() * welcome_messages.length)];
const Homescreen = ({ navigation, route }) => {
  const headerPositionY = useSharedValue(0);
  const dispatch = useDispatch();
  const { homescreen_items, categories } = useSelector((state) => ({
    homescreen_items: state.homescreen_states.homescreen_items,
    categories: state.homescreen_states.categories,
  }));
  const getItemsData = () => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((response) => response.json())
      .then((json) => {
        dispatch(setHomescreenItems(json.products));
      })
      .catch((reason) => {
        console.log(reason);
        getItemsData();
      });
  };
  const getCategoriesData = () => {
    fetch("https://dummyjson.com/products/categories")
      .then((response) => response.json())
      .then((json) => {
        // console.log(json);
        dispatch(setCategories(json));
      })
      .catch((reason) => {
        console.log(reason);
        getCategoriesData();
      });
  };
  useEffect(() => {
    getItemsData();
    getCategoriesData();
  }, []);
  const searchBarHeight = useSharedValue(0);
  const headerHeight = useSharedValue(0);
  const lastY = useSharedValue(0);
  // const scrollHandler = useAnimatedScrollHandler({
  //   onEndDrag: (e) => {
  //     lastY.value = e.contentOffset.y;
  //   },
  //   onScroll: (event) => {
  //     // console.log(event.contentOffset.y);
  //     if (event.contentOffset.y > lastY.value) {
  //       console.log("scrolling down");
  //     } else {
  //       console.log("scrolling up");
  //     }
  //     headerPositionY.value = event.contentOffset.y - lastY.value;
  //     //headerPositionY.value = event.contentOffset.y - lastY.value; this might work but conditional approach is left...
  //   },
  // });

  const scrollHandler = useAnimatedScrollHandler((event) => {
    const deltaY = event.contentOffset.y - lastY.value;

    if (deltaY > 0) {
      headerPositionY.value = Math.max(
        headerPositionY.value - deltaY,
        -searchBarHeight.value - 30
      );
    } else {
      // Adjust the threshold for a smoother hiding effect
      const hideThreshold = 0;
      headerPositionY.value = Math.min(
        headerPositionY.value - deltaY,
        hideThreshold
      );
    }

    lastY.value = event.contentOffset.y;
  });

  return (
    <View style={styles.container}>
      {/* <MasonryGridFlashlist
        lastContentOffset={lastContentOffset}
        headerPositionY={headerPositionY}
        data={homescreen_items}
        navigation={navigation}
      /> */}
      <HomeHeader
        headerPositionY={headerPositionY}
        welcome_message={welcome_text}
        navigation={navigation}
        searchBarHeight={searchBarHeight}
        headerHeight={headerHeight}
      >
        <TagsScrollView categories={categories} />
      </HomeHeader>
      {homescreen_items && headerHeight.value != 0 ? (
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={scrollHandler}
          contentContainerStyle={{
            paddingBottom: 150,
            rowGap: 30,
            paddingTop: headerHeight.value + 15,
            // paddingHorizontal: "6%",
          }}
        >
          <ListPreview
            title="Hot Deals"
            // data={homescreen_items.slice(0, 9)}
            preview_items={homescreen_items.slice(0, 9)}
            color="red"
            // icon="fire"
            navigation={navigation}
            welcome_text={welcome_text}
          />
          <ListPreview
            title="Recently Viewed"
            // icon="clock"
            color="white"
            // data={homescreen_items.slice(9, 18)}
            preview_items={homescreen_items.slice(9, 18)}
            navigation={navigation}
            welcome_text={welcome_text}
          />
          <ListPreview
            title="Suggested"
            // icon="thumb-up"
            color="lightblue"
            // data={homescreen_items.slice(18, 27)}
            preview_items={homescreen_items.slice(18, 27)}
            navigation={navigation}
            welcome_text={welcome_text}
          />
          <ListPreview
            title="Top Trends"
            // icon="thumb-up"
            color="lightblue"
            // data={homescreen_items.slice(18, 27)}
            preview_items={homescreen_items.slice(27, 36)}
            navigation={navigation}
            welcome_text={welcome_text}
          />
          <ListPreview
            title="Discounts"
            // icon="thumb-up"
            color="lightblue"
            // data={homescreen_items.slice(18, 27)}
            preview_items={homescreen_items.slice(36, 45)}
            navigation={navigation}
            welcome_text={welcome_text}
          />
        </Animated.ScrollView>
      ) : null}

      <>
        <UserProfileView />
      </>
    </View>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151515",
    // paddingHorizontal: "6%",
    rowGap: 30,
  },
});
