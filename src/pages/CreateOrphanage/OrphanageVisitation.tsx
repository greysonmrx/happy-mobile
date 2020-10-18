import React, { useRef, useState } from 'react';

import { ScrollView, View, StyleSheet, Text, TextInput, Alert } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import Button from '../../components/Button';
import Switch, { SwitchHandles } from '../../components/Switch';

import { ImageProps, Position } from './OrphanageData';

import api from '../../services/api';

interface OrphanageVisitationParams {
  name: string;
  about: string;
  whatsapp: string;
  images: Array<ImageProps>;
  position: Position;
}

const OrphanageVisitation: React.FC = () => {
  const { params } = useRoute<RouteProp<Record<string, OrphanageVisitationParams>, string>>();
  const { navigate } = useNavigation();

  const switchRef = useRef<SwitchHandles>(null);

  const [instructions, setInstructions] = useState('');
  const [openingHours, setOpeningHours] = useState('');

  async function handleCreateOrphanage() {
    try {
      const data = new FormData();

      const { 
        name, 
        about, 
        images, 
        position: { latitude, longitude }, 
        whatsapp 
      } = params;

      data.append('name', name);
      data.append('about', about);
      data.append('instructions', instructions);
      data.append('whatsapp', whatsapp);
      data.append('latitude', String(latitude));
      data.append('longitude', String(longitude));
      data.append('opening_hours', openingHours);
      data.append('open_on_weekends', String(switchRef.current?.getValue()))

      images.forEach(image => { 
        data.append('images', {
          name: image.title,
          type: 'images/jpg',
          uri: image.src,
        } as any)
      });

      await api.post('/orphanages', data);

      navigate('OrphanageCreate');
    } catch(err) {
      Alert.alert('Eita!', 'Ocorreu um erro!');
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <View style={styles.titleHeader}>
        <Text style={styles.title}>Visitação</Text>
        <View style={styles.pagination}>
          <Text style={styles.page}>01</Text>
          <Text style={styles.page}> - </Text>
          <Text style={styles.activePage}>02</Text>
        </View>
      </View>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        value={instructions}
        onChangeText={setInstructions}
        style={[styles.input, { height: 110 }]}
        multiline
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        value={openingHours}
        onChangeText={setOpeningHours}
        style={styles.input}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch ref={switchRef}/>
      </View>

      <Button style={styles.nextButton} onPress={handleCreateOrphanage}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </Button>
      <StatusBar backgroundColor="#f9fafc" style="dark"/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  titleHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },

  pagination: {
    flexDirection: "row",
    alignItems: "center",
  },
  
  page: {
    fontFamily: 'Nunito_400Regular',
    color: "#8FA7B2",
  },

  activePage: {
    fontFamily: 'Nunito_800ExtraBold',
    color: "#5C8599",
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  
  switchContainer: {
    marginTop: 16,
  },

  nextButton: {
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
});

export default OrphanageVisitation;