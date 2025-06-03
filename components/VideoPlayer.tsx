// components/VideoPlayer.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

interface VideoPlayerProps {
  videoId: string;
}

const VideoPlayer = ({ videoId }: VideoPlayerProps) => {
  return (
    <View style={styles.container}>
      <YoutubePlayer height={250} play={true} videoId={videoId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default VideoPlayer;
