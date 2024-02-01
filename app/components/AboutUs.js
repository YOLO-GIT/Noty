import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../misc/colors";

const githubLogo = require("../assets/github_536452.png");
const twitterLogo = require("../assets/twitter_5968830.png");
const tiktokLogo = require("../assets/tik-tok_3046126.png");

const AboutUs = () => {
  const headerHeight = useHeaderHeight();
  // Function to open social media profiles in browser
  const openSocialMedia = (url) => {
    Linking.openURL(url);
  };

  return (
    <LinearGradient colors={colors.CUSTOM_THREE} style={{ flex: 1 }}>
      <View style={[styles.container, { paddingTop: headerHeight }]}>
        <Text style={styles.title}>Welcome to Noty!</Text>
        <Text style={styles.description}>
          Noty is a simple yet powerful note-taking app designed to help you
          stay organized and productive. With Noty, you can easily create, edit,
          and organize your notes, whether it's for work, school, or personal
          use.
        </Text>
        <Text style={styles.description}>Connect with us on social media :D</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => openSocialMedia("https://github.com/YOLO-GIT")}
        >
          <Image source={githubLogo} style={styles.socialLogo} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            openSocialMedia("https://twitter.com/YOLO_LV9999999")
          }
        >
          <Image source={twitterLogo} style={styles.socialLogo} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            openSocialMedia("https://www.tiktok.com/@glacierzpole")
          }
        >
          <Image source={tiktokLogo} style={styles.socialLogo} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff", // Footer background color
    borderTopWidth: 1,
    borderTopColor: "#ddd", // Border color
  },
  socialLogo: {
    width: 40,
    height: 40,
  },
});

export default AboutUs;
