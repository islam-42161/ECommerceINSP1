import { Keyboard, Pressable, StyleSheet, View } from 'react-native'
import React, { useRef } from 'react'
import HomeHeader from '../components/HomeHeader'
import Searchscreen from './Searchscreen';
import { useSelector } from 'react-redux';
import PreferenceScreen from '../components/PreferenceScreen';

const Homescreen = () => {
  const { visible } = useSelector((state) => ({
    visible: state.bottomsheet_states.visible
  }));
    
  return (
    <View style={styles.container}>
      <HomeHeader/>
      <Searchscreen enablePreference={false}/>
      <PreferenceScreen/>
    </View>
  )
}

export default Homescreen

const styles = StyleSheet.create({
    container:{
        flex:1,
    backgroundColor: "#151515",
    }
})