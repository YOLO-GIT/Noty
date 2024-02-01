import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Task from "./Task";

const ToDoList = () => {
  return (
    <View style={styles.container}>
      <View style={styles.tastWrapper}>
        <Text style={styles.sectionTitle}>ToDoList</Text>

        <View style={styles.item}>
          <Task text={'task 1'}/>
          <Task text={'task 2'}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  tastWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  item: {
    marginTop: 30,
  },
});

export default ToDoList;
