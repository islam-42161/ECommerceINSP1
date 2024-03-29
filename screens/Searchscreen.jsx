import { Keyboard, Pressable, StyleSheet } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setScreen } from "../redux/slices/bottomsheetSlice";
import BottomSheet from "../components/BottomSheet";
import { EvilIcons } from "@expo/vector-icons";
import SearchBar from "../components/SearchBar";
import { Image } from "expo-image";

const Searchscreen = ({showPreference=true}) => {
  const dispatch = useDispatch();
  // const keyboardref = useRef();
  const { screen } = useSelector((state) => ({
    screen: state.bottomsheet_states.screen
  }));
  
  return screen === 'search'?(
    <BottomSheet>
      <Pressable
        style={styles.bottomSheetContentStyle}
        onPress={() => Keyboard.dismiss()}
      >
        <EvilIcons
          name="close"
          style={styles.closebutton}
          onPress={() => dispatch(setScreen('none'))}
        />
        <SearchBar showPreference={showPreference} searchable={true} />
        <Image
          source={{
            uri: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/e3b670100497525.5f0a205f0a3fb.gif",
          }}
          style={{
            height: 500,
            width: 300,
            alignSelf: "center",
          }}
          contentFit="contain"
        />
      </Pressable>
    </BottomSheet>
  ):null;
};

export default Searchscreen;

const styles = StyleSheet.create({
  bottomSheetContentStyle: {
    rowGap: 20,
    backgroundColor: "#151515",
    padding: 20,
    flex: 1,
  },
  closebutton: {
    width: 30,
    height: 30,
    backgroundColor: "#343434",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 16,
    borderRadius: 15,
    color: "white",
    elevation: 5,
    alignSelf: "flex-end",
  },
});
