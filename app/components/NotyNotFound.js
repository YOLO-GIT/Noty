import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { AntDesign } from "@expo/vector-icons";

const NotyNotFound = () => {
  return (
    <View className="flex-1 justify-center items-center opacity-50 -z-1" style={[StyleSheet.absoluteFillObject]}>
      <AntDesign name='frowno' size={90} color='black'/>
      <Text className="mt-5 text-2xl">what are you searching blud?</Text>
    </View>
  )
}

export default NotyNotFound