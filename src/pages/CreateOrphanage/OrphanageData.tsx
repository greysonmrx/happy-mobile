import React, { useState } from 'react';

import * as ImagePicker from 'expo-image-picker';
import { 
  ScrollView, 
  View, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  Image,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import Button from '../../components/Button';
import { BorderlessButton } from 'react-native-gesture-handler';
import formatSize from '../../utils/formatSize';
import { LinearGradient } from 'expo-linear-gradient';

export type Position = {
  latitude: number;
  longitude: number;
}

interface OrphanageDataRouteParams {
  position: Position;
}

export interface ImageProps {
  src: string;
  title: string;
  size: string;
}

const OrphanageData: React.FC = () => {
  const { params } = useRoute<RouteProp<Record<string, OrphanageDataRouteParams>, string>>();
  const { navigate } = useNavigation();

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [images, setImages] = useState<Array<ImageProps>>([]);

  function handleValidateForm() {
    if (name && about && whatsapp && images.length) {
      return true;
    }

    return false;
  }

  function handleRemoveImage(src: string) {
    setImages(oldState => oldState.filter(image => image.src !== src));
  }

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Eita!', 'Precisamos de acesso às suas fotos...');
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      exif: true,
      base64: true,
    });

    if (result.cancelled) {
      return;
    }

    const { uri, height, width } = result;

    const image: ImageProps = {
      src: uri,
      size: formatSize(height * width * 16 / 8),
      title: uri.split('/')[uri.split('/').length - 1],
    }

    setImages(oldState => [...oldState, image]);
  }

  function handleNextStep() {
    navigate('OrphanageVisitation', { 
      name,
      about, 
      whatsapp, 
      images, 
      position: params.position 
    });
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <View style={styles.titleHeader}>
        <Text style={styles.title}>Dados</Text>
        <View style={styles.pagination}>
          <Text style={styles.activePage}>01</Text>
          <Text style={styles.page}> - </Text>
          <Text style={styles.page}>02</Text>
        </View>
      </View>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        value={about}
        onChangeText={setAbout}
        style={[styles.input, { height: 110 }]}
        multiline
      />

      <Text style={styles.label}>Whatsapp</Text>
      <TextInput
        value={whatsapp}
        onChangeText={setWhatsapp}
        style={styles.input}
      />

      <Text style={styles.label}>Fotos</Text>
      <View style={styles.uploadedImagesContainer}>
        {
          images.map(image => (
            <LinearGradient 
              key={image.src}
              colors={["#EDFFF6", "#FCF0F4"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.uploadedImageContainer}
            >
              <View style={styles.uploadedImageContainerBorder}>
                <View style={styles.uploadedImageLeftSide}>
                  <Image style={styles.uploadedImage} source={{ uri: image.src }} />
                  <View style={styles.uploadedImageDetails}>
                    <Text numberOfLines={1} style={styles.uploadedImageTitle}>{image.title}</Text>
                    <Text numberOfLines={1} style={styles.uploadedImageSize}>{image.size}</Text>
                  </View>
                </View>
                <BorderlessButton onPress={() => handleRemoveImage(image.src)} style={styles.removeUploadedImage}>
                  <Feather 
                    name="x"
                    size={24}
                    color="#FF669D"
                  />
                </BorderlessButton>
              </View>
            </LinearGradient>
          ))
        }
      </View>

      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Button 
        disabled={!handleValidateForm()}
        style={styles.nextButton} 
        onPress={handleNextStep}
      >
        <Text style={styles.nextButtonText}>Próximo</Text>
      </Button>
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
    backgroundColor: '#ffffff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },

  uploadedImagesContainer: {},

  uploadedImageContainer: {
    height: 72,
    borderRadius: 20,
    marginBottom: 8,
  },

  uploadedImageContainerBorder: {
    height: "100%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 6,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "rgba(0, 0, 0, 0.07)"
  },

  uploadedImageLeftSide: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  uploadedImage: {
    width: 60,
    height: 60,
    borderRadius: 16
  },

  uploadedImageDetails: {
    flex: 1,
    marginLeft: 16
  },

  uploadedImageTitle: {
    color: '#37C77F',
    fontFamily: 'Nunito_600SemiBold',
  },

  uploadedImageSize: {
    color: '#8FA7B2',
    fontFamily: 'Nunito_600SemiBold',
  },

  removeUploadedImage: {
    marginHorizontal: 18
  },
  
  nextButton: {
    marginTop: 40,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFFFFF',
  }
});

export default OrphanageData;