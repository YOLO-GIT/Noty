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
import VideoScreen from "./app/screens/VideoScreen";
import AboutUs from "./app/components/AboutUs";
import ToDoList from "./app/components/ToDoList";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#fff",
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Drawer.Navigator
        initialRouteName="Main"
        screenOptions={{
          drawerStyle: { backgroundColor: colors.NIGHT },
          headerStyle: { backgroundColor: colors.NIGHT },
          headerTitleStyle: { color: colors.LIGHT },
          headerTintColor: colors.LIGHT,
        }}
      >
        <Drawer.Screen
          name="NoteScren"
          title="Note Page"
          component={MainNavigator}
          options={{
            drawerLabel: ({ focused }) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    color: focused ? "green" : "white",
                    fontWeight: "bold",
                  }}
                >
                  Note
                </Text>
                <Text
                  style={{
                    color: "white",
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
          name="MotivatePage"
          title="Motivational Page"
          component={SecondNavigator}
          options={{
            drawerLabel: ({ focused }) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    color: focused ? "green" : "white",
                    fontWeight: "bold",
                  }}
                >
                  Motivate
                </Text>
                <Text
                  style={{
                    color: "white",
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
          name="ToDoList"
          title="To Do List Page"
          component={ThirdNavigator}
          options={{
            drawerLabel: ({ focused }) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    color: focused ? "green" : "white",
                    fontWeight: "bold",
                  }}
                >
                  Reminding
                </Text>
                <Text
                  style={{
                    color: "white",
                    marginLeft: 5,
                    fontWeight: focused ? "bold" : null,
                  }}
                >
                  You
                </Text>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="About Us"
          title="About Us Page"
          component={FourthNavigator}
          options={{
            drawerLabel: ({ focused }) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    color: focused ? "green" : "white",
                    fontWeight: "bold",
                  }}
                >
                  About
                </Text>
                <Text
                  style={{
                    color: "white",
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

  const RenderNoteScreen = (props) => <NoteScreen {...props} user={user} />;

  if (isAppFirstTimeOpen) return <Intro onFinish={findUser} />;
  return (
    <NotyProvider>
      <Stack.Navigator
        screenOptions={{ headerTitle: "", headerTransparent: true }}
      >
        <Stack.Screen component={RenderNoteScreen} name="NoteScreen" />
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

const ThirdNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerTitle: "", headerTransparent: true }}
    >
      <Stack.Screen component={ToDoList} name="ToDoList" />
    </Stack.Navigator>
  );
};

const FourthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerTitle: "", headerTransparent: true }}
    >
      <Stack.Screen
        name="VideoScreen"
        // component={({ navigation }) => <VideoScreen navigation={navigation} />}
      >
        {({ navigation }) => <VideoScreen navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen component={AboutUs} name="AboutUs" />
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
