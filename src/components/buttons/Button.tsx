import { Button as NBButton, IButtonProps } from 'native-base';
import React, { ReactElement } from 'react';
import { THEME } from '../../config/theme';

const Button = ({ children, ...props }: { children?: ReactElement } & IButtonProps) => {
  const { colors } = THEME;
  return (
    <NBButton
      style={{
        shadowColor: colors.primary[500],
      }}
      h={14}
      android_ripple={{
        color: colors.primary[500],
        foreground: true,
        radius: 50,
      }}
      shadow="9"
      w="full"
      bg="primary.500"
      borderRadius={'full'}
      _pressed={{
        bg: 'primary.800',
      }}
      {...props}
    >
      {children}
    </NBButton>
  );
};

export default Button;
