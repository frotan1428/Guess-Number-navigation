import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../contants/colors'

const Header = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.color1,
        padding:10,
        alignItems:"center"
    },
    title: {
        color: colors.color2,
        fontSize:20
    }
})