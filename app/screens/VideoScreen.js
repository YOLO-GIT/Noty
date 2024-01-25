import * as React from "react";
import { View, StyleSheet, Button } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../misc/colors.js";
import RoundIconbtn from "../components/roundIconbtn.js";

const VideoScreen = () => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  return (
    <LinearGradient colors={colors.CUSTOM_THREE} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: "../../assets/test.mp4",
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
        <View style={styles.buttons}>
          <RoundIconbtn
          style={styles.StyleBtn}
            antIconName={status.isPlaying ? "Pause" : "Play"}
            title={status.isPlaying ? "Pause" : "Play"}
            onPress={() =>
              status.isPlaying
                ? video.current.pauseAsync()
                : video.current.playAsync()
            }
          />
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
});

export default VideoScreen;
