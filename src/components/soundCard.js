import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  AppState,
} from 'react-native';
import Sound from 'react-native-sound';
import Slider from '@react-native-community/slider';
import {CustomIcon} from './customIcon';
import Play from '@iconscout/react-native-unicons/icons/uil-play';
import Pause from '@iconscout/react-native-unicons/icons/uil-pause';
import Cancel from '@iconscout/react-native-unicons/icons/uil-times';

const SoundPlayer = ({audioURL, handleClose}) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    const loadSound = async () => {
      const newSound = new Sound(audioURL, null, error => {
        if (error) {
          console.log('Error loading sound:', error);
        } else {
          setSound(newSound);
          setTotalDuration(newSound.getDuration());
        }
      });
    };

    loadSound();

    return () => {
      if (sound) {
        sound.release();
      }
    };
  }, [audioURL]);

  useEffect(() => {
    if (sound && isPlaying) {
      const interval = setInterval(() => {
        sound.getCurrentTime(seconds => {
          setCurrentTime(seconds);
        });
      }, 500);

      const backAction = () => {
        setCurrentTime(0);
        setIsPlaying(false);
        sound.stop();
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      const handleAppStateChange = nextAppState => {
        if (nextAppState === 'background') {
          // Pause or stop audio playback here
          sound.stop(); // Pause the audio when the app goes to the background
          setIsPlaying(false);
          setCurrentTime(0);
        }
      };

      const Appsubscription = AppState.addEventListener(
        'change',
        handleAppStateChange,
      );

      return () => {
        clearInterval(interval);
        backHandler.remove();
        Appsubscription.remove('change', handleAppStateChange);
      };
    }
  }, [sound, isPlaying]);

  const togglePlayback = () => {
    if (sound) {
      if (isPlaying) {
        sound.pause();
      } else {
        sound.play(success => {
          if (success) {
            setCurrentTime(0);
            setIsPlaying(false);
            console.log('Sound played successfully');
          } else {
            console.log('Playback failed');
          }
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleClose = () => {
    if (sound) {
      setCurrentTime(0);
      setIsPlaying(false);
      sound.stop();
      handleClose();
    } else {
      handleClose();
    }
  };

  const onSliderValueChange = value => {
    if (sound) {
      sound.setCurrentTime(value);
      setCurrentTime(value);
    }
  };

  return (
    <View style={styles.cardContainer}>
      <Text>{isPlaying ? 'Playing' : 'Paused'}</Text>
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={togglePlayback}>
          <CustomIcon Icon={isPlaying ? Pause : Play} color={'#000000'} />
        </TouchableOpacity>

        <Slider
          value={currentTime}
          maximumValue={totalDuration}
          onValueChange={onSliderValueChange}
          style={styles.slider}
        />
        <TouchableOpacity onPress={toggleClose}>
          <CustomIcon Icon={Cancel} color={'#000000'} />
        </TouchableOpacity>
      </View>
      {/* <Button title={isPlaying ? 'Pause' : 'Play'} onPress={togglePlayback} />
      <Button
          title="Cancel"
          onPress={() => {
            setCurrentTime(0);
            setIsPlaying(false);
            sound.stop();
          }}
        /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    elevation: 3,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    padding: 10,
  },
  slider: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
});
export default SoundPlayer;
