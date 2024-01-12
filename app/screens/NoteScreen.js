import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../misc/colors";
import SearchBar from "../components/searchBar";
import RoundIconbtn from "../components/roundIconbtn";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoteInput from "../components/NoteInput";
import SaveNote from "../components/SaveNote";

const NoteScreen = ({ user, navigation }) => {
  const [greet, setGreet] = useState("Evening");
  const [time_color, setColor] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [notes, setNotes] = useState([]);
  const findGreet = () => {
    const hours = new Date().getHours();
    if (hours === 0 || hours < 12) return setGreet("Morning:");
    if (hours === 1 || hours < 17) return setGreet("Afternoon:");
    setGreet("Evening:");
  };

  const findNotes = async () => {
    const result = await AsyncStorage.getItem("notes");
    if (result !== null) setNotes(JSON.parse(result));
  };

  const findTime = () => {
    const hours = new Date().getHours();
    if (hours >= 0 && hours < 12) {
      setColor("#ffcd80"); // Morning
    } else if (hours >= 12 && hours < 17) {
      setColor("#fff8b6"); // Afternoon
    } else {
      setColor("#131862"); // Evening/Night
    }
  };

  useEffect(() => {
    findGreet();
    findNotes();
    findTime();
  }, []);

  // Call the Value on the OnSubmit in the NoteInput
  const handleOnSubmit = async (title, desc) => {
    // Render note and render it in the AsyncStorage
    const addNote = { id: Date.now(), title, desc, checkTime: Date.now() };
    const updateNote = [...notes, addNote];
    setNotes(updateNote);
    await AsyncStorage.setItem("notes", JSON.stringify(updateNote));
  };

  const openNote = (note) => {
    navigation.navigate("NoteDetail", { note });
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <LinearGradient colors={colors.CUSTOM_TWO} style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor={colors.LIGHT} />
          <View style={styles.customBar}>
            <Text style={[styles.headerText, { color: `${time_color}` }]}>
              {`Good ${greet}  `}
              <Text style={styles.customGreet}>{`${user.name}`}</Text>
            </Text>
          </View>
          <View style={styles.container_two}>
            {notes.length ? (
              <SearchBar containerStyle={{ marginVertical: 1 }} />
            ) : null}
            <FlatList
              data={notes}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: "space-between",
                marginBottom: 5,
                marginTop: 10,
              }}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <SaveNote onPress={() => openNote(item)} item={item} />
              )}
            />
            {!notes.length ? (
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  styles.emptyHeadingContainer,
                ]}
              >
                <Text style={styles.emptyHeading}> Add Notes </Text>
              </View>
            ) : null}
          </View>
        </LinearGradient>
      </TouchableWithoutFeedback>
      <RoundIconbtn
        onPress={() => setModalVisible(true)}
        antIconName="plus"
        style={styles.StyleBtn}
      />
      {/* To Add New Notes */}
      <NoteInput
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onsubmit={handleOnSubmit}
      />
    </>
  );
};

// To Store CSS
const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 20,
    flex: 1,
  },
  container_two: {
    paddingHorizontal: 20,
    flex: 1,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    paddingHorizontal: 20,
    // marginTop: 20,
    marginBottom: 6,
  },
  customGreet: {
    fontSize: 25,
    fontWeight: "bold",
    fontStyle: "italic",
    color: colors.USER,
  },
  emptyHeading: {
    fontSize: 25,
    textTransform: "uppercase",
    fontWeight: "bold",
    opacity: 0.2,
  },
  emptyHeadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },
  StyleBtn: {
    position: "absolute",
    right: 15,
    bottom: 20,
  },
  gradientCustom: {
    colors: ["#4c669f", "#3b5998", "#192f6a"],
  },
  customBar: {
    backgroundColor: colors.DARK,
  },
});

export default NoteScreen;
