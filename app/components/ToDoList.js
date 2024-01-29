import { View, Text, StyleSheet } from "react-native";
import React from "react";

const ToDoList = () => {
  return (
    <View style={styles.container}>
      <Text>ToDoList</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
});

export default ToDoList;
