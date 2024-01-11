import { View, Text, StatusBar, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../misc/colors";
import SearchBar from "../components/searchBar";
import RoundIconbtn from "../components/roundIconbtn";
import { LinearGradient } from "expo-linear-gradient";
import NoteInput from "../components/NoteInput";
const NoteScreen = ({ user }) => {
  const [greet, setGreet] = useState("Evening");
  const [time_color, setColor] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const findGreet = () => {
    const hours = new Date().getHours();
    if (hours === 0 || hours < 12) return setGreet("Morning:");
    if (hours === 1 || hours < 17) return setGreet("Afternoon:");
    setGreet("Evening:");
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
  }, []);

  useEffect(() => {
    findTime();
  }, []);

  // Call the Value on the OnSUbmit in the NoteInput
  const handleOnSubmit = (title, desc) => {};

  return (
    <>
      <LinearGradient colors={colors.CUSTOM_TWO} style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.LIGHT} />
        <View style={styles.customBar}>
          <Text style={[styles.headerText, { color: `${time_color}` }]}>
            {`Good ${greet}  `}
            <Text style={styles.customGreet}>{`${user.name}`}</Text>
          </Text>
        </View>
        <View style={styles.container_two}>
          <SearchBar containerStyle={{ marginVertical: 1 }} />
          <View
            style={[
              StyleSheet.absoluteFillObject,
              styles.emptyHeadingContainer,
            ]}
          >
            <Text style={styles.emptyHeading}> Add Notes </Text>
            <RoundIconbtn
              onPress={() => setModalVisible(true)}
              antIconName="plus"
              style={styles.StyleBtn}
            />
          </View>
        </View>
      </LinearGradient>
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
    bottom: 50,
  },
  gradientCustom: {
    colors: ["#4c669f", "#3b5998", "#192f6a"],
  },
  customBar: {
    backgroundColor: colors.DARK,
  },
});

export default NoteScreen;
