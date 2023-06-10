import { Pressable, StyleSheet, StatusBar, View } from "react-native";
import React, { useState } from "react";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { setVisible } from "../redux/slices/bottomsheetSlice";

const AniamtedPressable = Animated.createAnimatedComponent(Pressable);
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const BottomSheet = ({ children,contentContainerStyle,topPosition=STATUSBAR_HEIGHT}) => {


    const { visible } = useSelector((state) => ({
        visible: state.bottomsheet_states.visible
      }));

//   const [show, setShow] = useState(visible);
const dispatch = useDispatch();
  return visible ? (
    <View style={styles.container}>
      <AniamtedPressable
        entering={FadeIn}
        exiting={FadeOut}
        style={[StyleSheet.absoluteFillObject, styles.backdrop]}
        onPress={() => dispatch(setVisible(!visible))}
      />
      {/* children */}
      <Animated.View
        entering={SlideInDown}
        exiting={SlideOutDown}
        style={[{...styles.bottomsheetcontainer,top:topPosition},contentContainerStyle]}
      >
        {children}
      </Animated.View>
    </View>
  ) : null;
};

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position:'absolute',
    height:'100%',
    width:'100%',
  },
  backdrop: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  bottomsheetcontainer: {
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    // top: STATUSBAR_HEIGHT,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    // backgroundColor: "white",
    overflow:'hidden'
  },
});
