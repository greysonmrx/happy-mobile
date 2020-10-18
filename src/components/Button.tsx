import React from 'react';

import { StyleSheet } from 'react-native';
import { RectButton, BaseButtonProperties } from 'react-native-gesture-handler';

interface ButtonProps extends BaseButtonProperties {
  disabled?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, style, disabled = false, loading = false, ...props
}) => {
  return (
    <RectButton 
      {...props}
      enabled={!disabled}
      style={[
        styles.container, 
        disabled && styles.containerDisabled,
        style,
      ]}
    >
      {children}
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#15c3d6",
    flexDirection: 'row',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    opacity: 1,
  },

  containerDisabled: {
    opacity: 0.5,
  },
});

export default Button;