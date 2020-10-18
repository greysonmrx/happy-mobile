import React, { useEffect, useState } from 'react';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Image, 
  View, 
  ScrollView, 
  Text, 
  StyleSheet, 
  Dimensions, 
  Alert, 
  ActivityIndicator, 
  Linking 
} from 'react-native';

import api from '../services/api';

import mapMarkerImg from '../images/map-marker.png';
import Button from '../components/Button';

type OrphanageImage = {
  id: number;
  url: string;
}

interface Orphanage {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  whatsapp: string;
  about: string;
  open_on_weekends: boolean;
  opening_hours: string;
  instructions: string;
  images: Array<OrphanageImage>;
}

interface OrphanageDetailsParams {
  id: number;
}

const OrphanageDetails: React.FC = () => {
  const { params } = useRoute<RouteProp<Record<string, OrphanageDetailsParams>, string>>();

  const [orphanage, setOrphanage] = useState<Orphanage>();

  function handleOpenWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=+55${orphanage?.whatsapp}&text=Olá! Gostaria de saber mais sobre o ${orphanage?.name}. Podemos conversar?`
    );
  }

  function handleOpenGoogleMapsRoutes() {
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${orphanage?.latitude},${orphanage?.longitude}`
    );
  }

  async function handleFetchOrphanage(id: number) {
    try {
      const response = await api.get(`/orphanages/created/${id}`);

      setOrphanage(response.data);
    } catch(err) {
      Alert.alert('Eita!', 'Ocorreu um erro!');
    }
  }

  useEffect(() => {
    handleFetchOrphanage(params.id);
  }, [params]);

  if (!orphanage) {
    return ( 
      <View style={styles.loadingContainer}>
        <ActivityIndicator 
          color="#15f6d6"
          size={30}
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imagesContainer}>
        <ScrollView horizontal pagingEnabled>
          {
            orphanage.images.map(image => (
              <Image 
                key={image.id} 
                style={styles.image} 
                source={{ uri: image.url }} 
              />
            ))
          }
        </ScrollView>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{orphanage.name}</Text>
        <Text style={styles.description}>{orphanage.about}</Text>
      
        <View style={styles.mapContainer}>
          <MapView 
            initialRegion={{
              latitude: parseFloat(orphanage.latitude),
              longitude: parseFloat(orphanage.longitude),
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }} 
            provider={PROVIDER_GOOGLE}
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            style={styles.mapStyle}
          >
            <Marker 
              icon={mapMarkerImg}
              coordinate={{ 
                latitude: parseFloat(orphanage.latitude),
                longitude: parseFloat(orphanage.longitude)
              }}
            />
          </MapView>

          <BorderlessButton onPress={handleOpenGoogleMapsRoutes} style={styles.routesContainer}>
            <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
          </BorderlessButton>
        </View>
      
        <View style={styles.separator} />

        <Text style={styles.title}>Instruções para visita</Text>
        <Text style={styles.description}>{orphanage.instructions}</Text>

        <View style={styles.scheduleContainer}>
          <LinearGradient
            style={[styles.scheduleItem, styles.scheduleItemBlue]}
            colors={["#E6F7FB", "#FFFFFF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Feather name="clock" size={40} color="#2AB5D1" />
            <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>Segunda à Sexta {orphanage.opening_hours}</Text>
          </LinearGradient>
          <LinearGradient
            style={[
              styles.scheduleItem,
              orphanage.open_on_weekends ? styles.scheduleItemGreen : styles.scheduleItemRed
            ]}
            colors={[orphanage.open_on_weekends ? "#EDFFF6" : "#FCF0F4", "#FFFFFF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Feather name="info" size={40} color={orphanage.open_on_weekends ? "#39CC83" : "#FF669D"} />
            <Text style={[
              styles.scheduleText, 
              orphanage.open_on_weekends ? styles.scheduleTextGreen : styles.scheduleTextRed
            ]}>
              { 
                orphanage.open_on_weekends ? "Atendemos fim de semana" : "Não atendemos fim de semana"
              }
            </Text>
          </LinearGradient>
        </View>

        <Button 
          style={styles.contactButton}
          onPress={handleOpenWhatsapp}
        >
          <FontAwesome name="whatsapp" size={24} color="#FFF" />
          <Text style={styles.contactButtonText}>Entrar em contato</Text>
        </Button>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    flex: 1,
  },

  imagesContainer: {
    height: 240,
  },

  image: {
    width: Dimensions.get('window').width,
    height: 240,
    resizeMode: 'cover',
  },

  detailsContainer: {
    padding: 24,
  },

  title: {
    color: '#4D6F80',
    fontSize: 30,
    fontFamily: 'Nunito_700Bold',
  },

  description: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#5c8599',
    lineHeight: 24,
    marginTop: 16,
  },

  mapContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1.2,
    borderColor: '#B3DAE2',
    marginTop: 40,
    backgroundColor: '#E6F7FB',
  },

  mapStyle: {
    width: '100%',
    height: 150,
  },

  routesContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  routesText: {
    fontFamily: 'Nunito_700Bold',
    color: '#0089a5'
  },

  separator: {
    height: 0.8,
    width: '100%',
    backgroundColor: '#D3E2E6',
    marginVertical: 40,
  },

  scheduleContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  scheduleItem: {
    width: '48%',
    padding: 20,
  },

  scheduleItemBlue: {
    borderWidth: 1,
    borderColor: '#B3DAE2',
    borderRadius: 20,
  },

  scheduleItemGreen: {
    borderWidth: 1,
    borderColor: '#A1E9C5',
    borderRadius: 20,
  },

  scheduleItemRed: {
    borderWidth: 1,
    borderColor: '#FFBCD4',
    borderRadius: 20,
  },

  scheduleText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
  },

  scheduleTextBlue: {
    color: '#5C8599'
  },

  scheduleTextGreen: {
    color: '#37C77F'
  },

  scheduleTextRed: {
    color: '#FF669D'
  },

  contactButton: {
    backgroundColor: '#3CDC8C',
    marginTop: 40,
  },

  contactButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 16,
  }
});

export default OrphanageDetails;