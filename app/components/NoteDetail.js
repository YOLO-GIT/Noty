import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import colors from "../misc/colors";
import { LinearGradient } from "expo-linear-gradient";

const NoteDetail = (props) => {
  const { note } = props.route.params;
  const headerHeight = useHeaderHeight();

  return (
    <LinearGradient colors={colors.CUSTOM_TWO} style={{ flex: 1 }}>
      <View style={[styles.container, { paddingTop: headerHeight }]}>
        <Text style={{ color: colors.LIGHT }}>{note.title}</Text>
        <Text style={{ color: colors.LIGHT }}>{note.desc}</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});

export default NoteDetail;
