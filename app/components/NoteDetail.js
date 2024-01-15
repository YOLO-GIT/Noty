import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import React from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import colors from "../misc/colors";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RoundIconbtn from "./roundIconbtn";
import { useNoty } from "../contexts/NotyProvider";

const formatDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hrs = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  return `${day}/${month}/${year} at ${hrs}:${min}:${sec}`;
};

const NoteDetail = (props) => {
  const { note } = props.route.params;
  const headerHeight = useHeaderHeight();
  const { setNotes } = useNoty();

  const deleteNoty = async () => {
    const result = await AsyncStorage.getItem("notes");
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNoty = notes.filter((n) => n.id !== note.id);
    setNotes(newNoty);
    await AsyncStorage.setItem("notes", JSON.stringify(newNoty));
    props.navigation.goBack();
  };

  // To delete the note.
  const displayDeleteAlert = () => {
    Alert.alert(
      "Are you sure? :(",
      "This action will delete your note permanently!",
      [
        {
          text: "Delete",
          onPress: deleteNoty,
        },
        {
          text: "Canceel",
          onPress: () => "",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <>
      <LinearGradient colors={colors.CUSTOM_TWO} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={[
            styles.container,
            { paddingTop: headerHeight },
          ]}
        >
          <Text style={styles.styleTime}>{`Viewing now at ${formatDate(
            note.time
          )}`}</Text>
          <Text style={styles.title}>{note.title}</Text>
          <Text style={styles.desc}>{note.desc}</Text>
        </ScrollView>
      </LinearGradient>
      <View style={styles.btnContainer}>
        <RoundIconbtn
          antIconName="delete"
          style={{ backgroundColor: colors.ERROR, marginBottom: 15 }}
          onPress={displayDeleteAlert}
        />
        <RoundIconbtn antIconName="edit" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    // flex: 1
  },
  title: {
    fontSize: 30,
    color: colors.LIGHT,
    fontWeight: "bold",
  },
  desc: {
    fontSize: 20,
    opacity: 0.6,
  },
  styleTime: {
    textAlign: "center",
    fontSize: 12,
    opacity: 0.5,
    color: colors.LIGHT,
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "bold",
  },
  btnContainer: {
    position: "absolute",
    right: 15,
    bottom: 15,
  },
});

export default NoteDetail;
