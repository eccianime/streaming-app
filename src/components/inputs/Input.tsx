import { Input as NBInput, View } from 'native-base';
import React from 'react';
import { THEME } from '../../config/theme';
import { useAppContext } from '../../contexts/app';
import { InputProps } from '../../types/components';
import Text from './Text';

const Input = ({ label, viewStyle, value, onChangeText, ...props }: InputProps) => {
  const { isDarkMode } = useAppContext();
  const { colors } = THEME;
  return (
    <View style={viewStyle}>
      {!!label && (
        <Text fontFamily="heading" fontSize="md" mb="4">
          {label}
        </Text>
      )}
      <NBInput
        h="12"
        borderRadius="xl"
        borderWidth="0"
        _focus={{
          borderWidth: 1,
          borderColor: colors.primary[500],
        }}
        _input={{
          fontFamily: 'heading',
        }}
        color={colors.textColor[isDarkMode ? 'dark' : 'light']}
        bg={isDarkMode ? 'gray.800' : 'gray.50'}
        borderColor={'gray.100'}
        size="lg"
        fontFamily="body"
        mb={'5'}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
    </View>
  );
};

export default Input;
