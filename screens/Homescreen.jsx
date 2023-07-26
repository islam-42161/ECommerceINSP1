import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState, useRef } from "react";
import HomeHeader from "../components/HomeHeader";
import Searchscreen from "./Searchscreen";
import PreferenceScreen from "../components/PreferenceScreen";
import ChangeHomeView from "../components/ChangeHomeView";
import UserProfileView from "../components/UserProfileView";
import TagsScrollView from "../components/TagsScrollView";
import MasonryGridFlashlist from "../components/MasonryGridFlashlist";
import { useAnimatedRef, useSharedValue } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategories,
  setHomescreenItems,
} from "../redux/slices/HomeScreenSlice";
import ListPreview from "../components/ListPreview";

const person_name = "Muaz";
welcome_messages = [
  `Hi, ${person_name}! Shop with endless possibilities! 🛍️`,
  `Hi, ${person_name}! Discover limitless shopping! 🌟`,
  `Hi, ${person_name}! Step into convenience and endless possibilities! 🚀`,
  `Hi, ${person_name}! Explore limitless shopping! 🌈`,
  `Hi, ${person_name}! Embark on a shopping adventure! 🎁`,
  `Hi, ${person_name}! Get ready for an extraordinary shopping experience! 🌟`,
  `Hi, ${person_name}! Get ready for the ultimate shopping journey! ⭐`,
  `Hi, ${person_name}! Indulge in seamless shopping! 🌟`,
  `Hi, ${person_name}! Unleash your shopping desires! 🛍️`,
];

const welcome_text =
  welcome_messages[Math.floor(Math.random() * welcome_messages.length)];

const Homescreen = ({ navigation, route }) => {
  const lastContentOffset = useSharedValue(0);
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

  return (
    <View style={styles.container}>
      <HomeHeader
        lastContentOffset={lastContentOffset}
        headerPositionY={headerPositionY}
        welcome_message={welcome_text}
        categories={categories}
        navigation={navigation}
      />
      {/* <MasonryGridFlashlist
        lastContentOffset={lastContentOffset}
        headerPositionY={headerPositionY}
        data={homescreen_items}
        navigation={navigation}
      /> */}
      {homescreen_items ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 150, rowGap: 30 }}
        >
          <ListPreview
            title="Hot Deals"
            // data={homescreen_items.slice(0, 9)}
            preview_items={homescreen_items.slice(0, 9)}
            color="red"
            navigation={navigation}
          />
          <ListPreview
            title="Recently Viewed"
            icon="clock"
            color="white"
            // data={homescreen_items.slice(9, 18)}
            preview_items={homescreen_items.slice(9, 18)}
            navigation={navigation}
          />
          <ListPreview
            title="Suggested"
            icon="thumb-up"
            color="lightblue"
            // data={homescreen_items.slice(18, 27)}
            preview_items={homescreen_items.slice(18, 27)}
            navigation={navigation}
          />
        </ScrollView>
      ) : null}
      <>
        <ChangeHomeView />
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
    paddingHorizontal: "6%",
    rowGap: 30,
  },
});
