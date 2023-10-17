/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import AudioPlayer from './src/screens/audioPlayer';
import TrackPlayer from 'react-native-track-player';
import AudioPlayerCard from './src/components/audioCard';
import SoundPlayer from './src/components/soundCard';
import Pdf from 'react-native-pdf';
import {Platform} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {CustomIcon} from './src/components/customIcon';
import Cancel from '@iconscout/react-native-unicons/icons/uil-times';
type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };
  const [isAudio, setIsAudio] = useState(false);
  const [isPDf, setIsPDf] = useState(false);

  const track = {
    id: '1',
    url: 'https://audio-previews.elements.envatousercontent.com/files/103682271/preview.mp3',
    type: 'default',
    title: 'My Title',
    album: 'My Album',
    artist: 'Rohan Bhatia',
    artwork: 'https://picsum.photos/100',
  };

  const setupTrack = async () => {
    await TrackPlayer.add({
      id: track.id,
      url: track.url,
      title: track.title,
      artist: track.artist,
      artwork: track.artwork,
    });
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {/* <AudioPlayer /> */}
      {/* <AudioPlayerCard track={track} /> */}
      {/* <Button title="Setup Track" onPress={setupTrack} /> */}
      <View style={{margin: 10}}>
        {!isAudio && (
          <Button
            title="Setup Audio"
            onPress={() => {
              setIsAudio(true);
            }}
          />
        )}
        <View style={{margin: 10}}></View>
        {!isPDf && (
          <Button
            title="Setup Pdf"
            onPress={() => {
              setIsPDf(true);
            }}
          />
        )}
      </View>

      {isAudio && (
        <>
          <SoundPlayer
            audioURL={
              'https://audio-previews.elements.envatousercontent.com/files/103682271/preview.mp3'
            }
            handleClose={() => {
              setIsAudio(false);
            }}
          />
        </>
      )}
      {isPDf && (
        <>
          <TouchableOpacity
            onPress={() => {
              setIsPDf(false);
            }}>
            <CustomIcon Icon={Cancel} color={'#000000'} />
          </TouchableOpacity>
          <Pdf
            trustAllCerts={Platform.OS === 'ios'}
            source={{
              uri: 'https://www.africau.edu/images/default/sample.pdf',
              cache: true,
            }} // Replace with your PDF URL
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={error => {
              console.log('PDF Error', error);
            }}
            style={styles.pdf}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  pdf: {
    flex: 1,

    margin: 10,
  },
});

export default App;
