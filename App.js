import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Intro from "./app/screens/intro";
import { useEffect, useState } from "react";
import colors from "./app/misc/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoteScreen from "./app/screens/NoteScreen";

export default function App() {
  const [user, setUser] = useState({});
  const findUser = async () => {
    const result = await AsyncStorage.getItem("user");
    setUser(JSON.parse(result));
  };

  useEffect(() => {
    findUser();
  }, []);
  return <NoteScreen user={user} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
  },
});
