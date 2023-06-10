import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomSheet from './BottomSheet'
import { useSelector } from 'react-redux';

const PreferenceScreen = () => {
    const { visible,screen } = useSelector((state) => ({
        visible: state.bottomsheet_states.visible,
        screen: state.bottomsheet_states.screen
      }));
        
  return visible && screen === 'preference' ? (
    <BottomSheet topPosition={"50%"} contentContainerStyle={styles.container}>
    <Text style={{fontSize:48}}>🙈</Text>
    </BottomSheet>
  ):null
}

export default PreferenceScreen

const styles = StyleSheet.create({
    container:{
rowGap:20,
alignItems:'center',
justifyContent:'center',backgroundColor:'#141414'
    }
})