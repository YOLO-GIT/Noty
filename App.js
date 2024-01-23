import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Intro from "./app/screens/intro";
import { useEffect, useState } from "react";
import colors from "./app/misc/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import NoteScreen from "./app/screens/NoteScreen";
import NoteDetail from "./app/components/NoteDetail";
import NotyProvider from "./app/contexts/NotyProvider";
import MotivateYou from "./app/components/MotivateYou";
import AboutUs from "./app/components/AboutUs";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(251 191 36)",
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Drawer.Navigator initialRouteName="Main">
        <Drawer.Screen
          name="Note Screen"
          component={MainNavigator}
          options={{
            drawerLabel: ({ focused }) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    color: focused ? "green" : "black",
                    fontWeight: "bold",
                  }}
                >
                  Note
                </Text>
                <Text
                  style={{
                    marginLeft: 5,
                    fontWeight: focused ? "bold" : null,
                  }}
                >
                  Page
                </Text>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="Motivational Screen"
          component={SecondNavigator}
          options={{
            drawerLabel: ({ focused }) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    color: focused ? "green" : "black",
                    fontWeight: "bold",
                  }}
                >
                  Motivate
                </Text>
                <Text
                  style={{
                    marginLeft: 5,
                    fontWeight: focused ? "bold" : null,
                  }}
                >
                  Page
                </Text>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="About Us"
          component={AboutUs}
          options={{
            drawerLabel: ({ focused }) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    color: focused ? "green" : "black",
                    fontWeight: "bold",
                  }}
                >
                  About
                </Text>
                <Text
                  style={{
                    marginLeft: 5,
                    fontWeight: focused ? "bold" : null,
                  }}
                >
                  Us
                </Text>
              </View>
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const MainNavigator = () => {
  const [user, setUser] = useState({});
  const [isAppFirstTimeOpen, setIsAppFirstTimeOpen] = useState(false);

  const findUser = async () => {
    const result = await AsyncStorage.getItem("user");

    if (result === null) return setIsAppFirstTimeOpen(true);

    setUser(JSON.parse(result));
    setIsAppFirstTimeOpen(false);
  };

  useEffect(() => {
    findUser();
  }, []);

  const renderNoteScreen = (props) => <NoteScreen {...props} user={user} />;

  if (isAppFirstTimeOpen) return <Intro onFinish={findUser} />;
  return (
    <NotyProvider>
      <Stack.Navigator
        screenOptions={{ headerTitle: "", headerTransparent: true }}
      >
        <Stack.Screen component={renderNoteScreen} name="NoteScreen" />
        <Stack.Screen component={NoteDetail} name="NoteDetail" />
      </Stack.Navigator>
    </NotyProvider>
  );
};

const SecondNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerTitle: "", headerTransparent: true }}
    >
      <Stack.Screen component={MotivateYou} name="MotivateYou" />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
  },
});
