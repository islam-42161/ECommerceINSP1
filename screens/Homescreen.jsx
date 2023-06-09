import { Keyboard, Pressable, StyleSheet } from 'react-native'
import React, { useRef } from 'react'
import HomeHeader from '../components/HomeHeader'

const Homescreen = () => {
  const keyboardref = useRef();
    
  return (
    <Pressable style={styles.container} onPress={()=>Keyboard.dismiss()}>
      <HomeHeader keyboardref={keyboardref}/>
    </Pressable>
  )
}

export default Homescreen

const styles = StyleSheet.create({
    container:{
        flex:1,
    backgroundColor: "#151515",
    }
})