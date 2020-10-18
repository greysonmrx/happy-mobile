import React, { useState, useImperativeHandle, forwardRef, useCallback } from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export interface SwitchHandles {
  getValue(): boolean;
}

const Switch: React.ForwardRefRenderFunction<SwitchHandles> = (props, ref) => {
  const [value, setValue] = useState(true);

  const getValue = useCallback(() => value, [value]);

  useImperativeHandle(ref, () => ({
    getValue,
  }));

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={() => setValue(true)}
        style={[styles.button, styles.yesButton, value && styles.yesButtonActive]}
      >
        <Text style={[styles.buttonText, value && styles.yesButtonTextActive]}>Sim</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => setValue(false)}
        style={[styles.button, styles.noButton, !value && styles.noButtonActive]}
      >
        <Text style={[styles.buttonText, !value && styles.noButtonTextActive]}>Não</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: "row",
  },

  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",    
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDE3F0",
  },

  buttonText: {
    fontFamily: 'Nunito_600SemiBold',
    color: "#5C8599",
  },
  
  yesButton: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },

  noButton: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },

  yesButtonActive: {
    backgroundColor: "#EDFFF6",
    borderColor: "#A1E9C5",
  },

  noButtonActive: {
    backgroundColor: "#FBF0F4",
    borderColor: "#ECB4B7",
  },

  yesButtonTextActive: {
    color: "#39CC83",
  },

  noButtonTextActive: {
    color: "#FF669D",
  },
});

export default forwardRef(Switch);