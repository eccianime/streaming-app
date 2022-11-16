import { Input as NBInput, Text, View } from 'native-base';
import React from 'react';
import { THEME } from '../../config/theme';
import { InputProps } from '../../types/components';

const Input = ({ label, viewStyle, ...props}: InputProps) => {
    const { colors } = THEME;
    return (
        <View style={viewStyle}>
            {
                !!label && <Text fontFamily='heading' color='black.900' fontSize='md' mb='4'>{label}</Text>
            }
            <NBInput
                h='12'
                borderRadius='lg'
                borderWidth='0'
                _focus={{
                    borderWidth: 1,
                    borderColor: colors.primary[600]
                }}
                bg='gray.50'
                size='lg'
                fontFamily='body'
                mb={'5'} 
                {...props}
            />        
        </View>
    );
}

export default Input;