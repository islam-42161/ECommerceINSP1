import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import HomeHeader from "../components/HomeHeader";
import UserProfileView from "../components/UserProfileView";
import TagsScrollView from "../components/TagsScrollView";
import Animated, {
  Easing,
  Extrapolate,
  FadeOutUp,
  SlideOutUp,
  interpolate,
  measure,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
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
  const [homescreenItems, setHomescreenItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [greetingsShow, setGreetingsShow] = useState(true);

  const getItemsData = () => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((response) => response.json())
      .then((json) => {
        setHomescreenItems(json.products);
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
        setCategories(json);
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
  const scrollHandler = useAnimatedScrollHandler((event) => {
    const deltaY = event.contentOffset.y - lastY.value;
    console.log(headerPositionY.value, deltaY);
    if (deltaY > 0) {
      headerPositionY.value = Math.max(
        headerPositionY.value - deltaY,
        -searchBarHeight.value - 30
      );
    } else {
      if (event.contentOffset.y <= 0) {
        headerPositionY.value = 0;
      } else {
        headerPositionY.value = Math.min(headerPositionY.value - deltaY, 0);
      }
    }

    lastY.value = event.contentOffset.y;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setGreetingsShow(false);
    }, 5000);
    return () => clearTimeout(timer); // This will clear the timer when the component unmounts
  }, []);

  const greetingsStyle = useAnimatedStyle(() => ({
    color: "white",
    paddingHorizontal: "6%",
    fontSize: 20,
    fontWeight: "bold",
  }));

  return (
    <View style={styles.container}>
      {/* <MasonryGridFlashlist
        lastContentOffset={lastContentOffset}
        headerPositionY={headerPositionY}
        data={homescreenItems}
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

      {homescreenItems && headerHeight.value != 0 ? (
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={scrollHandler}
          contentContainerStyle={{
            paddingBottom: 150,
            rowGap: 30,
            paddingTop: headerHeight.value + 15,
          }}
        >
          {greetingsShow && (
            <Animated.Text style={[greetingsStyle]} exiting={SlideOutUp}>
              Good Morning, {person_name}
            </Animated.Text>
          )}
          <ListPreview
            title="Hot Deals"
            preview_items={homescreenItems.slice(0, 9)}
            color="red"
            navigation={navigation}
            welcome_text={welcome_text}
          />
          <ListPreview
            title="Recently Viewed"
            color="white"
            preview_items={homescreenItems.slice(9, 18)}
            navigation={navigation}
            welcome_text={welcome_text}
          />
          <ListPreview
            title="Suggested"
            color="lightblue"
            preview_items={homescreenItems.slice(18, 27)}
            navigation={navigation}
            welcome_text={welcome_text}
          />
          <ListPreview
            title="Top Trends"
            color="lightblue"
            preview_items={homescreenItems.slice(27, 36)}
            navigation={navigation}
            welcome_text={welcome_text}
          />
          <ListPreview
            title="Discounts"
            color="lightblue"
            preview_items={homescreenItems.slice(36, 45)}
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
    rowGap: 30,
  },
});
