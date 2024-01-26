import * as React from "react";
import { View, StyleSheet, Button } from "react-native";
import { Video, ResizeMode } from "expo-av";
import colors from "../misc/colors.js";
import RoundIconbtn from "../components/roundIconbtn.js";
import testVideo from "../../assets/test.mp4";

const VideoScreen = ({navigation}) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const openAboutUsPage = () => {
    navigation.navigate("AboutUs");
  };

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={testVideo}
        useNativeControls={false}
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <RoundIconbtn
          style={styles.StyleBtn}
          antIconName={status.isPlaying ? "pause" : "play"}
          title={status.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        />
      </View>
      <RoundIconbtn
        onPress={() => openAboutUsPage()}
        antIconName="book"
        style={styles.aboutBtn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  video: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  StyleBtn: {
    top: 300,
  },
  aboutBtn: {
    position: "absolute",
    right: 15,
    bottom: 20,
    zIndex: 1,
  },
});

export default VideoScreen;
