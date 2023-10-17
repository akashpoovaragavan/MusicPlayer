import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import TrackPlayer, {
  usePlaybackState,
  useTrackPlayerProgress,
} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
const AudioPlayerCard = ({track}) => {
  const playbackState = usePlaybackState();
  //const {position, duration} = useTrackPlayerProgress();
  const duration = 90;
  const [seek, setSeek] = useState(0);

  useEffect(() => {
    if (playbackState === 'playing') {
      // Start playing the track
      TrackPlayer.play();
    } else if (playbackState === 'paused') {
      // Pause the track
      TrackPlayer.pause();
    }
  }, [playbackState]);

  const handlePause = async () => {
    await TrackPlayer.pause();
  };

  const handleCancel = async () => {
    await TrackPlayer.stop();
  };

  const handleSeek = value => {
    setSeek(value);
  };

  const handleSeekComplete = async () => {
    await TrackPlayer.seekTo(seek);
  };

  return (
    <View>
      <Text>{track.title}</Text>
      <Slider
        value={seek}
        minimumValue={0}
        maximumValue={duration}
        onValueChange={handleSeek}
        onSlidingComplete={handleSeekComplete}
      />
      {playbackState === 'playing' ? (
        <Button title="Pause" onPress={handlePause} />
      ) : (
        <Button title="Play" onPress={() => TrackPlayer.play()} />
      )}
      <Button title="Cancel" onPress={handleCancel} />
    </View>
  );
};

export default AudioPlayerCard;
