import React, { useEffect, useState } from 'react';

import OnboardingSwiper from 'react-native-onboarding-swiper';
import AsyncStorage from '@react-native-community/async-storage';
import { Image, StyleSheet, Text, Dimensions, View, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import onboardingImg1 from '../images/onboarding-1.png';
import onboardingImg2 from '../images/onboarding-2.png';

const { width } = Dimensions.get('window');

const Onboarding: React.FC = () => {
  const { navigate } = useNavigation();

  const [pageIndex, setPageIndex] = useState(0);

  async function handleClickNextButton() {
    await AsyncStorage.setItem("@Happy:Onboarding", "true");

    navigate("OrphanagesMap");
  }

  useEffect(() => {
    (async () => {
      const response = await AsyncStorage.getItem("@Happy:Onboarding");

      if (response) {
        navigate("OrphanagesMap");
      }
    })()
  }, []);

  return (
    <View style={styles.container}>
      <OnboardingSwiper
        containerStyles={styles.onboarding}
        showPagination={false}
        pageIndexCallback={(page) => setPageIndex(page)}
        pages={[
          {
            backgroundColor: '#F2F3F5',
            image: <Image style={styles.image_page1} source={onboardingImg1} />,
            title: <Text style={[styles.title, styles.title_page1]}>Leve felicidade para o mundo</Text>,
            subtitle: <Text style={styles.subtitle}>Visite orfanatos e mude o dia de muitas crianças.</Text>,
          },
          {
            backgroundColor: '#F2F3F5',
            image: <Image style={styles.image_page2} source={onboardingImg2} />,
            title: <Text style={[styles.title, styles.title_page2]}>Escolha um orfanato no mapa e faça uma visita</Text>,
            subtitle: '',
          },
        ]}
      />
      <View style={styles.bottomBar}>
        <View style={styles.pagination}>
          <View style={[styles.dot, pageIndex === 0 && styles.dotSelected]} />
          <View style={[styles.dot, pageIndex === 1 && styles.dotSelected]} />
        </View>
        <RectButton style={styles.button} onPress={handleClickNextButton}>
          <Feather 
            name="arrow-right"
            size={24}
            color="#15b6d6"
          />
        </RectButton>
      </View>
      <StatusBar style="dark" backgroundColor="#F2F3F5" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
  },

  onboarding: {
    flex: 1,
    padding: 50,
    paddingTop: 70,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#F2F3F5"
  },

  title: {
    color: "#0089A5",
    fontFamily: "Nunito_800ExtraBold",
    paddingTop: 5,
  },

  title_page1: {
    width: width - 100,
    fontSize: 40,
    lineHeight: 42,
    paddingRight: 70,
    marginBottom: 10,
    textAlign: "left",
  },

  title_page2: {
    fontSize: 30,
    lineHeight: 36,
    textAlign: "right",
    paddingLeft: 40,
  },

  image_page1: {
    height: width * 0.6,
    resizeMode: 'contain',
    marginTop: -100,
    marginBottom: -40,
  },

  image_page2: {
    height: width * 0.9,
    resizeMode: 'contain',
    marginTop: -70,
    marginBottom: -40,
  },

  subtitle: {
    color: "#5C8599",
    fontFamily: "Nunito_600SemiBold",
    fontSize: 20,
    lineHeight: 30,
  },

  bottomBar: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    bottom: 30 + (Platform.OS === "ios" ? 20 : 0),
    right: 50,
    left: 50,
  },

  pagination: {
    flexDirection: "row",
  },

  button: {
    width: 56,
    height: 56,
    backgroundColor: "#D1EDF2",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },

  dot: {
    width: 8,
    height: 4,
    backgroundColor: "#BECFD8",
    borderRadius: 4,
    marginRight: 6,
  },

  dotSelected: {
    width: 16,
    height: 4,
    backgroundColor: "#FFD152",
  },
});

export default Onboarding;