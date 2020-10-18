import React from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const OrphanageCancelCreation: React.FC = () => {
  const { goBack, navigate } = useNavigation();

  function handleNavigateToOrphanagesMap() {
    navigate('OrphanagesMap');
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Feather 
            name="x"
            size={32}
            color="#FF669D"
          />
        </View>
        <Text style={styles.title}>Cancelar cadastro</Text>
        <Text style={styles.text}>Tem certeza que quer cancelar esse cadastro?</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            onPress={goBack} 
            style={[styles.button, styles.outlineButton]}
          >
            <Text style={styles.textButton}>Não</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={handleNavigateToOrphanagesMap} 
            style={[styles.button, styles.defaultButton]}
          >
            <Text style={styles.textButton}>Sim</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar backgroundColor="#ff669d" style="dark"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF669D',
    justifyContent: "center",
    padding: 70,
  },

  content: {
    alignItems: 'center',
  },

  iconContainer: {
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 24,
  },

  title: {
    fontFamily: "Nunito_800ExtraBold",
    color: "#FFFFFF",
    fontSize: 32,
    marginBottom: 24,
  },

  text: {
    fontFamily: "Nunito_600SemiBold",
    color: "#FFFFFF",
    fontSize: 20,
    lineHeight: 30,
    textAlign: "center",
    marginBottom: 32,
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
  },

  textButton: {
    fontFamily: "Nunito_800ExtraBold",
    color: "#FFFFFF",
    fontSize: 15,
  },

  outlineButton: {
    borderWidth: 2,
    borderColor: "#D6487B",
    backgroundColor: '#FF669D',
    marginRight: 4,
  },

  defaultButton: {
    backgroundColor: '#D6487B',
    marginLeft: 4,
  }
});

export default OrphanageCancelCreation;