import React from 'react';

import { View, Text, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

interface HeaderProps {
  title: string;
  cancelable?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, cancelable = true }) => {
  const { canGoBack, goBack, navigate } = useNavigation();

  function handleNavigateToOrphanageCancelCreation() {
    navigate('OrphanageCancelCreation');
  }

  return (
    <View style={styles.container}>
      {
        canGoBack() && (
          <BorderlessButton style={styles.leftSide} onPress={goBack}>
            <Feather 
              name="arrow-left"
              size={24}
              color="#15b6d6"
            />
          </BorderlessButton>
        )
      }
      
      <Text style={styles.title}>{title}</Text>

      {
        cancelable ? (
          <BorderlessButton 
            style={styles.rightSide} 
            onPress={handleNavigateToOrphanageCancelCreation}
          >
            <Feather 
              name="x"
              size={24}
              color="#ff669d"
            />
          </BorderlessButton>
        ) : <View style={styles.rightSide} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f9fafc',
    borderBottomWidth: 1,
    borderColor: '#dde3f0',
    paddingTop: 44 + (Platform.OS === "ios" ? getStatusBarHeight() : 0),

    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftSide: {
    width: 24,
    alignItems: "flex-start",
  },

  title: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#8fa7b3',
    fontSize: 16,
  },

  rightSide: {
    width: 24,
    alignItems: "flex-end",
  },
});

export default Header;