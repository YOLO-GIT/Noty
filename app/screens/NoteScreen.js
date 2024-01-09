import { View, Text, StatusBar, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../misc/colors";
import SearchBar from "../components/searchBar";
import RoundIconbtn from "../components/roundIconbtn";
import { LinearGradient } from "expo-linear-gradient";

const NoteScreen = ({ user }) => {
  const [greet, setGreet] = useState("Evening");
  const findGreet = () => {
    const hours = new Date().getHours();
    if (hours === 0 || hours < 12) return setGreet("Morning");
    if (hours === 1 || hours < 17) return setGreet("Afternoon");
    setGreet("Evening");
  };

  useEffect(() => {
    findGreet();
  }, []);

  return (
    <>
      <LinearGradient colors={["#4CA1AF", "#C4E0E5"]} style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.LIGHT} />
        <View>
          <Text style={styles.headerText}>
            {`Good ${greet} `}
            <Text style={styles.customGreet}>{`${user.name}`}</Text>
          </Text>
          <SearchBar containerStyle={{ marginVertical: 1 }} />
        </View>
        <View
          style={[StyleSheet.absoluteFillObject, styles.emptyHeadingContainer]}
        >
          <Text style={styles.emptyHeading}> Add Notes </Text>{" "}
          <RoundIconbtn antIconName="plus" style={styles.StyleBtn} />{" "}
        </View>
      </LinearGradient>
    </>
  );
};

// To Store CSS
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 6,
    marginBottom: 6,
  },
  customGreet:{
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
});

export default NoteScreen;
