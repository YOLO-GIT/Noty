import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import colors from '../misc/colors';

const SaveNote = ({item}) => {
    const {title, desc} = item;
  return (
    <View style={styles.container}>
      <Text style={styles.title} numberOfLines={2}>{title}</Text>
      <Text numberOfLines={3} style={{padding: 8,}}>{desc}</Text>
    </View>
  )
}

const width = Dimensions.get('window').width - 40;

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.PRIMARY,
        width: width / 2 - 10,
        // padding: 8,
        borderRadius: 10,
    },
    title:{
        fontWeight: 'bold',
        fontSize: 16,
        color: colors.LIGHT,
        backgroundColor: colors.DARK,
        textAlign: 'center',
        // borderBottomLeftRadius: 10,
        // borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    }
})



export default SaveNote