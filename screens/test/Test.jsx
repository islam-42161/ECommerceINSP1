import { StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import TagsScrollView from '../../components/TagsScrollView'

const Test = () => {

  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
    <TagsScrollView/>
    </View>
  )
}

export default Test

const styles = StyleSheet.create({})