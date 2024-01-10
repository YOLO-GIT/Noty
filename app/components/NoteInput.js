import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import colors from "../misc/colors";
import RoundIconbtn from "./roundIconbtn";
import { LinearGradient } from "expo-linear-gradient";

const NoteInput = ({ visible, onClose, onsubmit }) => {
  // To hold the value
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  // To Dismiss the keyboard
  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  // To change the value
  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === "title") setTitle(text);
    if (valueFor === "desc") setDesc(text);
  };

  // To submit the value
  const handleSubmit = () => {
    if (!title.trim() && !desc.trim()) return onClose();
    onsubmit(title, desc);
    setTitle("");
    setDesc("");
    onClose();
  };

  const closeModal = () => {
    setTitle("");
    setDesc("");
    onClose();
  };

  return (
    <>
      <StatusBar hidden />
      <Modal visible={visible} animationType="fade">
        <LinearGradient colors={colors.CUSTOM_TWO} style={{ flex: 1 }}>
          <View style={styles.container}>
            <TextInput
              value={title}
              onChangeText={(text) => handleOnChangeText(text, "title")}
              placeholder="Title E.G: YOLO IS NUMBER ONE"
              style={[styles.input, styles.title]}
            />
            <TextInput
              value={desc}
              multiline
              placeholder="Description E.G: Lorem Ipsum is YOLO 🐍🗿🔥"
              style={[styles.input_two, styles.desc]}
              onChangeText={(text) => handleOnChangeText(text, "desc")}
            />
            <View style={styles.CustomSubmit}>
              <RoundIconbtn
                antIconName="check"
                size={15}
                style={styles.customCheck}
                onPress={handleSubmit}
              />
              {title.trim() || desc.trim() ? (
                <RoundIconbtn
                  antIconName="close"
                  size={15}
                  style={styles.customCancel}
                  onPress={closeModal}
                />
              ) : null}
            </View>
          </View>
          {/* To close the description Line */}
          <TouchableWithoutFeedback onPress={handleModalClose}>
            <View style={[styles.modalBg, StyleSheet.absoluteFillObject]} />
          </TouchableWithoutFeedback>
        </LinearGradient>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 2,
    borderBottomColor: colors.PRIMARY,
  },
  input_two: {
    borderWidth: 2,
    borderBottomColor: colors.PRIMARY,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  title: {
    height: 40,
    marginBottom: 15,
    fontWeight: "bold",
    placeholderTextColor: colors.PLACEHOLDER,
  },
  desc: {
    height: 100,
    fontStyle: "italic",
    placeholderTextColor: colors.PLACEHOLDER,
  },
  modalBg: {
    flex: 1,
    zIndex: -1,
  },
  CustomSubmit: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 5,
    marginTop: 5,
  },
  customCancel: {
    marginLeft: 15,
    marginTop: 5,
  },
});

export default NoteInput;
