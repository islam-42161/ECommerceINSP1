import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  findNodeHandle,
  Pressable,
} from "react-native";
import Animated, {
  event,
  interpolate,
  useAnimatedProps,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const images = {
  man: "https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  women:
    "https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  kids: "https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  skullcandy:
    "https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  help: "https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
};
const data = Object.keys(images).map((i) => ({
  key: i,
  title: i,
  image: images[i],
  ref: React.createRef(),
}));
const { width, height } = Dimensions.get("window");
const Tab = React.forwardRef(({ item }, ref) => {
  return (
    <Pressable ref={ref}>
      <Text style={[styles.text, { fontSize: 84 / data.length }]}>
        {item.title}
      </Text>
    </Pressable>
  );
});
const Indicator = ({ measures, scrollX }) => {
  const animatedWidth = interpolate(
    scrollX.value,
    data.map((_, i) => i * width),
    measures.map((m, _) => m.width)
  );
  const translateX = interpolate(
    scrollX.value,
    data.map((_, i) => i * width),
    measures.map((m, _) => m.x)
  );
  const indicatorStyle = useAnimatedStyle(() => ({
    position: "absolute",
    height: 4,
    width: animatedWidth,
    backgroundColor: "white",
    bottom: -10,
    transform: [{ translateX }],
  }));
  return <Animated.View style={indicatorStyle} />;
};
const Tabs = ({ data, scrollX }) => {
  console.log(scrollX.value);
  const containerRef = React.useRef();
  const [measures, setMeasures] = useState([]);
  React.useEffect(() => {
    const m = [];
    data.forEach((item) => {
      item.ref.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          //   console.log(x, y, width, height);
          m.push({
            x,
            y,
            width,
            height,
          });
          if (m.length === data.length) {
            setMeasures(m);
            // console.log(measures);
          }
        }
      );
    });
  }, []);
  return (
    <View style={{ position: "absolute", width, top: 70 }} ref={containerRef}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainerStyle}
      >
        {data.map((item, index) => (
          <Tab key={index} item={item} ref={item.ref} />
        ))}
      </ScrollView>
      {measures.length > 0 && (
        <Indicator measures={measures} scrollX={scrollX} />
      )}
    </View>
  );
};
export default function TagsScrollView1() {
  const scrollX = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
      // console.log(Math.round(scrollX.value / width));
    },
  });
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.FlatList
        horizontal
        onScroll={scrollHandler}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        data={data}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => {
          return (
            <View style={{ width, height }}>
              <Image
                source={{ uri: item.image }}
                style={{ flex: 1 }}
                contentFit="cover"
              />
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  { backgroundColor: "rgba(0,0,0,0.3)" },
                ]}
              />
            </View>
          );
        }}
      />
      <Tabs scrollX={scrollX} data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tabsContainerStyle: {
    justifyContent: "space-evenly",
    flex: 1,
    flexDirection: "row",
  },
  text: {
    color: "white",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
