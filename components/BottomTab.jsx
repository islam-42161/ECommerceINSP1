import { StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeInDown,
  FadeOutDown,
  SlideInDown,
  SlideInUp,
  SlideOutDown,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);
const BottomTab = ({ state, descriptors, navigation }) => {
  const listScrollY = useSharedValue(0);
  const bottomPosition = useSharedValue(20);
  const { screen } = useSelector((state) => ({
    screen: state.bottomsheet_states.screen,
  }));
  useDerivedValue(() => {
    if (screen === "none") {
      bottomPosition.value = withTiming(20);
    } else {
      bottomPosition.value = withTiming(-100);
    }
  }, [screen]);

  const bottomStyle = useAnimatedStyle(() => ({
    bottom: bottomPosition.value,
  }));

  return (
    <Animated.View style={[styles.container, bottomStyle]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <AnimatedIcon
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            key={index}
            onLongPress={onLongPress}
            // name={`ios-${label.toLowerCase()}-outline`}
            name={route.params?.name}
            style={[
              styles.bottomButtons,
              {
                color: isFocused ? "lightgray" : "gray",
              },
            ]}
          />
        );
      })}
    </Animated.View>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 20,
    right: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    padding: 20,
    columnGap: 20,
    backgroundColor: "#343434",
    borderRadius: 20,
  },
  bottomButtons: {
    width: 40,
    height: 40,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 24,
    // borderRadius: 15,
    color: "white",
    // elevation: 5,
  },
});
