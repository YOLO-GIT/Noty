import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import colors from "../misc/colors";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RoundIconbtn from "./roundIconbtn";
import { useNoty } from "../contexts/NotyProvider";
import NoteInput from "./NoteInput";

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
  const [note, setNote] = useState(props.route.params.note);
  const headerHeight = useHeaderHeight();
  const { setNotes } = useNoty();
  const [showModal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

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

  // Edit Function
  const handleUpdate = async (title, desc, time) => {
    const editResult = await AsyncStorage.getItem("notes");
    if (editResult !== null) notes = JSON.parse(editResult);

    const newEditNotes = notes.filter((n) => {
      if (n.id === note.id) {
        n.title = title;
        n.desc = desc;
        n.isUpdated = true;
        n.time = time;

        setNote(n);
      }
      return n;
    });

    setNotes(newEditNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(newEditNotes));
  };

  // Function Close
  const handleClose = () => setModal(false);

  // Function Open Edit
  const openEditModal = () => {
    setIsEdit(true);
    setModal(true);
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
          <Text className="text-red-100 text-center font-bold italic">
            {note.isUpdated
              ? `Updated At ${formatDate(note.time)}`
              : `Viewing now at ${formatDate(note.time)}`}
          </Text>
          <View className="mt-10 rounded-lg bg-yellow-700 border-6">
            <Text style={styles.title} className="text-center border-6">
              {note.title}
            </Text>
            <Text style={styles.desc} className="p-4 bg-amber-200 rounded-b-lg">
              {note.desc}
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
      <View className="absolute bottom-5 right-5">
        <RoundIconbtn
          antIconName="delete"
          style={{ backgroundColor: colors.ERROR, marginBottom: 15 }}
          onPress={displayDeleteAlert}
        />
        <RoundIconbtn antIconName="edit" onPress={openEditModal} />
      </View>
      <NoteInput
        isEdit={isEdit}
        note={note}
        onClose={handleClose}
        onsubmit={handleUpdate}
        visible={showModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 30,
    color: colors.LIGHT,
    fontWeight: "bold",
  },
  desc: {
    fontSize: 20,
    opacity: 0.8,
    color: colors.DARK,
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
});

export default NoteDetail;
