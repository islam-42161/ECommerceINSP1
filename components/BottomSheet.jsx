import { Pressable, StyleSheet, StatusBar, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { setScreen } from "../redux/slices/bottomsheetSlice";

const AniamtedPressable = Animated.createAnimatedComponent(Pressable);
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const {width,height} = Dimensions.get('window')
const BottomSheet = ({ children,contentContainerStyle,closePressOutside = true,topPosition=STATUSBAR_HEIGHT}) => {


    const { screen } = useSelector((state) => ({
        screen: state.bottomsheet_states.screen,
      }));
      const onClose = ()=>{
        if(closePressOutside){
          dispatch(setScreen('none'))
        }
      }
      useEffect(() => {
        // Anything in here is fired on component mount.
        return () => {
            if(screen==='preference-search'){
        dispatch(setScreen('search'))

            }
        }
    }, [])
const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <AniamtedPressable
        entering={FadeIn}
        exiting={FadeOut}
        style={[StyleSheet.absoluteFillObject, styles.backdrop]}
        onPress={onClose}
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
  )
};

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    position:'absolute',
    height:height,
    width:width,
  },
  backdrop: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  bottomsheetcontainer: {
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    // backgroundColor: "white",
    overflow:'hidden'
  },
});
