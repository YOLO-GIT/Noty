import { Text, TextInput, View, StyleSheet } from "react-native";
import colors from "../misc/colors";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";

const SearchBar = ({ containerStyle, value, onclear, onChangeText }) => {
  return (
    <LinearGradient
      colors={["#D3CCE3", "#E9E4F0"]}
      style={styles.customGradient}
    >
      <View style={[styles.container, { ...containerStyle }]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={styles.searchStyle}
          placeholder="Search Me 🔥🔥🔥"
        />
        {value ? (
          <AntDesign
            name="close"
            size={20}
            color={colors.ERROR}
            onPress={onclear}
            style={styles.clearIcon}
          />
        ) : null}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  searchStyle: {
    borderWidth: 3,
    borderColor: colors.DARK,
    height: 40,
    borderRadius: 40,
    paddingLeft: 15,
    fontSize: 15,
    fontWeight: "bold",
    zIndex: 1,
  },
  container: {
    justifyContent: "center",
  },
  customGradient: {
    borderRadius: 40,
  },
  clearIcon:{
    position: 'absolute',
    right: 10, 
    zIndex: 1,
  }
});

export default SearchBar;
