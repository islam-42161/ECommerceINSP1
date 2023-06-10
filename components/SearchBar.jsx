import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setScreen } from "../redux/slices/bottomsheetSlice";

const SearchBar = ({ showPreference = true, searchable = true }) => {
  const dispatch = useDispatch();
  const keyboardref = useRef();
  const handlePress = () => {
    if (searchable) {
      keyboardref.current.focus();
    } else {
      dispatch(setScreen("search"));
    }
  }

  const handlePreferencePress =()=>{
    if(searchable){
      dispatch(setScreen("preference-search"));
    }
    else{
      dispatch(setScreen("preference-home"));
    }
  }
    const { screen } = useSelector((state) => ({
    screen: state.bottomsheet_states.screen,
  }));

  return (
    <View style={styles.searchsection}>
      <Pressable style={styles.textinput} onPress={handlePress}>
        <EvilIcons style={styles.searchicon} name="search" />
        <TextInput
          placeholder="Search"
          placeholderTextColor={"gray"}
          style={{ padding: 5, flex: 1, color: "white" }}
          ref={keyboardref}
          cursorColor={"gray"}
          selectionColor={"gray"}
          autoCorrect={false}
          editable={searchable}
        />
      </Pressable>
      {showPreference ? (
        <FontAwesome name="sliders" style={styles.preferenceicon} onPress={handlePreferencePress} />
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
    paddingVertical: 5,
    alignItems: "center",
    flex: 1,
    columnGap: 10,
  },
  searchsection: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  preferenceicon: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: "#343434",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 16,
    color: "white",
    elevation: 0,
  },
});
