import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import colors from "../misc/colors";

const SaveNote = ({ item, onPress }) => {
  const { title, desc } = item;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Text numberOfLines={3} style={{ padding: 8 }}>
        {desc}
      </Text>
    </TouchableOpacity>
  );
};

const width = Dimensions.get("window").width - 40;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.LIGHT,
    width: width / 2 - 10,
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.LIGHT,
    backgroundColor: colors.DARK,
    textAlign: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default SaveNote;
