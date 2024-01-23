import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker"; // Import ImagePicker from Expo
import colors from "../misc/colors";
import Clipboard from "@react-native-community/clipboard";

const MotivateYou = () => {
  const [quote, setQuote] = useState("");
  const [selectedImage, setSelectedImage] = useState(
    require("../assets/uweee.jpg")
  ); // Initial image

  useEffect(() => {
    fetchQuoteFunction();
  }, []);

  const fetchQuoteFunction = async () => {
    try {
      const res = await axios.get("https://type.fit/api/quotes");
      const quotes = res.data;
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const randomQuote = quotes[randomIndex].text;
      await AsyncStorage.setItem("lastQuote", randomQuote);
      setQuote(randomQuote);
    } catch (error) {
      console.error("Error fetching quotes:", error.message);
    }
  };

  const newQuoteFunction = () => {
    fetchQuoteFunction();
  };

  const copyFunction = () => {
    try {
      Clipboard.setString(quote);
      Toast.show({
        type: "success",
        text1: "Quote Copied",
        text2: "The quote has been copied to the clipboard!",
      });
    } catch (error) {
      console.error("Error copying to clipboard:", error.message);
    }
  };

  const handlePress = () => {
    newQuoteFunction();
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage({ uri: result.uri });
    }
  };

  return (
    <LinearGradient colors={colors.CUSTOM_ONE} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header}>Motivational Page</Text>
        <TouchableOpacity onPress={pickImage}>
          <Image source={selectedImage} style={styles.image} />
        </TouchableOpacity>
        <Text style={styles.quote}>"{quote}"</Text>
        <View style={styles.buttonPos}>
          <TouchableOpacity onPress={handlePress} style={styles.button}>
            <Text style={styles.buttonText}>New Quote</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={copyFunction} style={styles.button}>
            <Text style={styles.buttonText}>Copy to Clipboard</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.LIGHT,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100, // Make it a circle
    marginBottom: 20,
  },
  quote: {
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "center",
    color: colors.LIGHT,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4CAF50", // Green button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 5,
  },
  buttonPos: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 5,
    marginTop: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default MotivateYou;
