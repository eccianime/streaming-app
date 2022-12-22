import { IButtonProps } from 'native-base';
import React, { ReactElement } from 'react';
import { THEME } from '../../config/theme';
import Button from './Button';

const ClearButton = ({ children, ...props }: { children: ReactElement } & IButtonProps) => {
  const { colors } = THEME;
  return (
    <Button
      borderColor="gray.100"
      borderWidth="1"
      mb={4}
      shadow="none"
      w="full"
      bg="white"
      borderRadius={'2xl'}
      _pressed={{
        bg: 'gray.100',
      }}
      android_ripple={{
        color: colors.gray[100],
        foreground: true,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ClearButton;
