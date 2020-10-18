import React from 'react';

import { AppLoading } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { LogBox } from 'react-native';
import { Nunito_400Regular, Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';

import Routes from './src/routes';

LogBox.ignoreLogs([
  'Cannot update a component from inside'
])

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold, 
    Nunito_700Bold, 
    Nunito_800ExtraBold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <Routes />
      <StatusBar style="dark" backgroundColor="#f9fafc" />
    </>
  );
}

export default App;