import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import MapView, { MapEvent, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Button from '../../components/Button';
import MapTip from '../../components/MapTip';
import Header from '../../components/Header';

import mapMarkerImg from '../../images/map-marker.png';
import { StatusBar } from 'expo-status-bar';

interface Position {
  latitude: number;
  longitude: number;
}

const SelectMapPosition: React.FC = () => {
  const { navigate, setOptions } = useNavigation();

  const [position, setPosition] = useState<Position | undefined>(undefined);
  const [showMapTip, setShowMapTip] = useState(false);

  function handleSelectMapPosition(event: MapEvent) {
    setPosition(event.nativeEvent.coordinate);
  }

  function handleNextStep() {
    navigate('OrphanageData', { position });
  }

  async function handleHideMapTip() {
    await AsyncStorage.setItem("@Happy:MapTip", "true");

    setShowMapTip(false);
  }

  useEffect(() => {
    if (showMapTip) {
      setOptions({ header: () => null });
    } else {
      setOptions({ header: () => <Header title="Informe os dados" /> });
    }
  }, [showMapTip]);

  useEffect(() => {
    (async () => {
      const response = await AsyncStorage.getItem("@Happy:MapTip");

      setShowMapTip(!Boolean(response));
    })()
  }, []);

  return (
    <View style={styles.container}>
      <MapView 
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -9.414112,
          longitude: -36.6328008,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        onPress={handleSelectMapPosition}
        style={styles.mapStyle}
      >
        {
          position && (
            <Marker 
              icon={mapMarkerImg}
              coordinate={position}
            />
          )
        }        
      </MapView>

      {
        position && (
          <Button 
            style={styles.nextButton} 
            onPress={handleNextStep}
          >
            <Text style={styles.nextButtonText}>Próximo</Text>
          </Button>
        )
      }

      {
        showMapTip ? (
          <>
            <StatusBar backgroundColor="rgba(21, 214, 214, 0.5)" style="light" />
            <MapTip onPress={handleHideMapTip}/>
          </>
        ) : (
          <StatusBar backgroundColor="#f9fafc" style="dark" />
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
});

export default SelectMapPosition;