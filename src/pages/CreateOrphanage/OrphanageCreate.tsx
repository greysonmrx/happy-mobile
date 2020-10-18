import React from 'react';

import { StyleSheet, View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import Button from '../../components/Button';

import orphanageDoneImg from '../../images/orphanage-done.png';

const OrphanageCreate: React.FC = () => {
  const { navigate } = useNavigation();

  function handleNavigateToOrphanagesMap() {
    navigate('OrphanagesMap');
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image style={styles.image} source={orphanageDoneImg}/>
        <Text style={styles.title}>Ebaaa!</Text>
        <Text style={styles.text}>O cadastro deu certo e foi enviado ao administrador para ser aprovado. Agora é só esperar :)</Text>
        <Button onPress={handleNavigateToOrphanagesMap} style={styles.button}>
          <Text style={styles.buttonText}>Ok</Text>
        </Button>
      </View>
      <StatusBar backgroundColor="#39CC83" style="dark"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#39CC83",
    justifyContent: "center",
    padding: 30,    
  },

  content: {
    alignItems: 'center',
  },

  image: {
    width: '100%',
    resizeMode: 'contain',
    marginBottom: 32,
  },

  title: {
    fontFamily: "Nunito_800ExtraBold",
    color: "#FFFFFF",
    fontSize: 40,
    marginBottom: 18,
  },

  text: {
    fontFamily: "Nunito_600SemiBold",
    color: "#FFFFFF",
    fontSize: 20,
    lineHeight: 30,
    textAlign: "center",
    marginBottom: 24,
  },

  button: {
    width: 120,
    backgroundColor: "#19C06D"
  },

  buttonText: {
    fontFamily: "Nunito_800ExtraBold",
    color: "#FFFFFF",
    fontSize: 15,
  },
});

export default OrphanageCreate;