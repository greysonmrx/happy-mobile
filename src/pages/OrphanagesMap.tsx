import React, { useCallback, useState, useEffect } from 'react';

import * as ExpoLocation from 'expo-location'; 
import * as Permissions from 'expo-permissions';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { Dimensions, StyleSheet, Text, View, ActivityIndicator, Alert, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import api from '../services/api';

import mapMarkerImg from '../images/map-marker.png';
import noPermissionImg from '../images/no-permission.png';
import Button from '../components/Button';

interface Orphanage {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
}

const OrphanagesMap: React.FC = () => {
  const navigation = useNavigation();

  const [orphanages, setOrphanages] = useState<Array<Orphanage>>([]);
  const [loading, setLoading] = useState(true);
  const [userPosition, setUserPosition] = useState<ExpoLocation.LocationObject>();

  function handleNavigateToOrphanageDetails(id: number) {
    navigation.navigate('OrphanageDetails', { id });
  }

  function handleNavigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition');
  }

  async function handleFetchOrphanages() {
    setLoading(true);
  
    try {
      const response = await api.get('/orphanages/created');

      setOrphanages(response.data);
    } catch(err) {
      Alert.alert('Eita!', 'Ocorreu um erro!');
    }

    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      handleFetchOrphanages();
    }, []),
  );

  async function handleGetUserPosition() {
    const response = await ExpoLocation.getCurrentPositionAsync();
    
    setUserPosition(response);
  }
  
  async function handleGetLocationPermission() {
    const permission = await Permissions.getAsync(Permissions.LOCATION);
    
    if (permission.granted) {
      handleGetUserPosition();
    }
  }

  async function handleAskPermission() {
    const permission = await Permissions.askAsync(Permissions.LOCATION);    

    if (permission.granted) {
      handleGetUserPosition();
    }
  }
  
  useEffect(() => {
    handleGetLocationPermission();
  }, []);
    
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator 
          color="#15f6d6"
          size={30}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {
        userPosition ? (
          <>
            <MapView 
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={{
                latitude: userPosition.coords.latitude,
                longitude: userPosition.coords.longitude,
                latitudeDelta: 0.008,
                longitudeDelta: 0.008,
              }}
            >
              {
                orphanages.map(orphanage => (
                  <Marker 
                    key={orphanage.id}
                    icon={mapMarkerImg}
                    calloutAnchor={{
                      x: 2.7,
                      y: 0.8,
                    }}
                    coordinate={{
                      latitude: parseFloat(orphanage.latitude),
                      longitude: parseFloat(orphanage.longitude),
                    }}
                  >
                    <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
                      <View style={styles.calloutContainer}>
                        <Text style={styles.calloutText}>{orphanage.name}</Text>
                      </View>
                    </Callout>
                  </Marker>
                ))
              }
            </MapView>

            <View style={styles.footer}>
              <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>
              <RectButton 
                style={styles.createOrphanageButton}
                onPress={handleNavigateToCreateOrphanage}
              >
                <Feather 
                  name="plus"
                  size={20}
                  color="#FFFFFF"
                />
              </RectButton>
            </View>
          </>
        ) : (
          <View style={styles.noPermissionContainer}>
            <Image source={noPermissionImg}/>
            <Text style={styles.noPermissionText}>Você nao tem permissão.</Text>
            <Button 
              style={styles.onPermissionButton} 
              onPress={handleAskPermission}
            >
              <Text style={styles.onPermissionButtonText}>Habilitar localização</Text>
            </Button>
          </View>
        )
      }
      <StatusBar backgroundColor="#f9fafc" style="dark"/>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 16,
    justifyContent: "center",
  },

  calloutText: {
    fontFamily: "Nunito_700Bold",
    color: "#0089A5",
    fontSize: 14
  },

  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    elevation: 3,
  },

  footerText: {
    fontFamily: "Nunito_700Bold",
    color: "#8fa7b3"
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: "#15c3d6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },  

  noPermissionContainer: {
    alignItems: "center",
  },

  noPermissionText: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 20,
    color: "#8FA7B2",
    marginTop: 16,
  },

  onPermissionButton: {
    paddingHorizontal: 20,
    backgroundColor: "#8FA7B2",
    marginTop: 30
  },

  onPermissionButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    color: '#FFFFFF',
    fontSize: 16,
  },  
});


export default OrphanagesMap;