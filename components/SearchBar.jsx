import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useMemo, useRef } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setScreen } from "../redux/slices/bottomsheetSlice";
import { setSearchText } from "../redux/slices/search_screen_slices";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const SearchBar = ({
  showPreference = true,
  searchable = true,
  focus = false,
  navigation,
  style,
  placeholder_text = "Search",
}) => {
  const { screen, search_text } = useSelector((state) => ({
    screen: state.bottomsheet_states.screen,
    search_text: state.search_screen_states.search_text,
  }));
  const dispatch = useDispatch();
  const keyboardref = useRef();
  const handlePress = () => {
    if (searchable) {
      keyboardref.current.focus();
    } else {
      navigation.navigate("search_screen");
    }
  };

  const handlePreferencePress = () => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    } else {
      if (searchable) {
        dispatch(setScreen("preference-search"));
      } else {
        dispatch(setScreen("preference-home"));
      }
    }
  };
  const handleTextInput = (text) => {
    dispatch(setSearchText(text));
  };
  return (
    <View style={[styles.searchsection, style]}>
      <Pressable style={styles.textinput} onPress={handlePress}>
        <EvilIcons style={styles.searchicon} name="search" />

        <TextInput
          placeholder="Search"
          placeholderTextColor={"gray"}
          style={{
            padding: 5,
            flex: 1,
            color: "white",
            fontWeight: "600",
          }}
          ref={keyboardref}
          cursorColor={"gray"}
          selectionColor={"gray"}
          autoCorrect={false}
          editable={searchable}
          autoFocus={focus}
          onChangeText={handleTextInput}
          value={search_text}
        />

        {searchable && search_text ? (
          <Animated.Text
            entering={FadeIn}
            exiting={FadeOut}
            style={styles.clearTextStyle}
            onPress={() => handleTextInput("")}
          >
            Clear
          </Animated.Text>
        ) : null}
      </Pressable>
      {showPreference ? (
        <FontAwesome
          name="sliders"
          style={[styles.preferenceicon]}
          onPress={handlePreferencePress}
        />
      ) : null}

      {/* <PreferenceScreen/> */}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchicon: {
    width: 24,
    height: 24,
    fontSize: 24,
    color: "white",
  },
  textinput: {
    flexDirection: "row",
    borderRadius: 30,
    backgroundColor: "#343434",
    paddingHorizontal: 10,
    paddingVertical: 2.5,
    alignItems: "center",
    columnGap: 10,
    flex: 1,
  },
  searchsection: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    flex: 1,
  },
  preferenceicon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "#343434",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 12,
    color: "white",
  },
  clearTextStyle: {
    fontSize: 12,
    color: "lightgray",
  },
});
