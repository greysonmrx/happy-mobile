import React from 'react';

import LottieView from 'lottie-react-native';
import { 
  StyleSheet, 
  TouchableOpacity, 
  Text, 
  Platform, 
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import tapImg from '../images/tap.png';

import tapAnimation from '../animations/tap.json';

const { height, width } = Dimensions.get('window');

interface MapTipProps {
  onPress(): void;
}

const MapTip: React.FC<MapTipProps> = ({ onPress }) => {
  return (
    <LinearGradient
      colors={["rgba(21, 214, 214, 0.8)", "rgba(21, 182, 214, 0.8)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <TouchableOpacity 
        style={styles.content}
        onPress={onPress}
      >
        {
          Platform.OS === "ios" ? (
            <LottieView 
              source={tapAnimation}
              loop
              autoPlay
              style={styles.tapAnimation}
            />
          ) : (
            <Image style={styles.tapImg} source={tapImg} />
          )
        }
            
        <Text style={styles.text}>Toque no mapa para adicionar um orfanato</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width,
    height,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 100,
  },

  tapImg: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },

  tapAnimation: {
    width: 250,
    marginTop: -30,
    marginBottom: -90
  },

  text: {
    fontFamily: "Nunito_800ExtraBold",
    color: "#FFFFFF",
    fontSize: 24,
    lineHeight: 34,
    textAlign: "center",
  }
});

export default MapTip;