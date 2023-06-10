import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomSheet from './BottomSheet'
import { useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';

const ChangeHomeView = () => {
    const { screen } = useSelector((state) => ({
        screen: state.bottomsheet_states.screen,
      }));
      const views = ['view-agenda','view-carousel','view-quilt','grid-view','list']
  return screen === 'change_home_list_view'? (
    <BottomSheet topPosition={"80%"} contentContainerStyle={styles.container}>
    <Text style={{color:'white',fontSize:24,fontWeight:'400'}}>Choose Layout</Text>
    <View style={styles.buttonsContainer}>
    {views.map((value,index)=>(
        <MaterialIcons key={index} name={value} style={styles.headerbuttons}/>
    ))}
    </View>
    </BottomSheet>
  ):null
}

export default ChangeHomeView

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#151515',
        rowGap:20
    },
    buttonsContainer:{
        flexDirection:'row',
        columnGap:20
    }
    ,
    headerbuttons: {
        width: 40,
        height: 40,
        backgroundColor: "#343434",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 24,
        borderRadius: 20,
        color: "white",
        elevation: 5,
      },
})