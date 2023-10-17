import {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import TrackPlayer from 'react-native-track-player';
const trackPlayerInit = async () => {
  await TrackPlayer.setupPlayer();
  await TrackPlayer.add({
    id: '1',
    url: 'https://audio-previews.elements.envatousercontent.com/files/103682271/preview.mp3',
    type: 'default',
    title: 'My Title',
    album: 'My Album',
    artist: 'Rohan Bhatia',
    artwork: 'https://picsum.photos/100',
  });
  return true;
};
const AudioPlayer = () => {
  const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
  useEffect(() => {
    const startPlayer = async () => {
      let isInit = await trackPlayerInit();
      setIsTrackPlayerInit(isInit);
    };
    startPlayer();
  }, []);
  const onButtonPressed = () => {
    TrackPlayer.play();
  };
  return (
    <View>
      <Text>Music Player</Text>
      <Button
        title="Play"
        onPress={onButtonPressed}
        disabled={!isTrackPlayerInit}
      />
    </View>
  );
};
export default AudioPlayer;
