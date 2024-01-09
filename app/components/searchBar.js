import { Text, TextInput, View, StyleSheet } from "react-native";
import colors from "../misc/colors";
import { LinearGradient } from "expo-linear-gradient";

const SearchBar = ({ containerStyle }) => {
  return (
    <LinearGradient colors={['#D3CCE3', '#E9E4F0']} style={styles.customGradient} >
      <View style={[styles.container, { ...containerStyle }]}>
        <TextInput style={styles.searchStyle} placeholder="Search Me 🔥🔥🔥" />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  searchStyle: {
    borderWidth: 0.5,
    borderColor: colors.PRIMARY,
    height: 40,
    borderRadius: 40,
    paddingLeft: 15,
    fontSize: 15,
    fontWeight: "bold",
    placeholderTextColor: colors.PLACEHOLDER,
  },
  container: {
    marginBottom: 5,
  },
  customGradient: {
    borderRadius: 40,
    marginTop: 7,
  },
});

export default SearchBar;
