import { Button as NBButton, IButtonProps } from 'native-base';
import React, { ReactElement } from 'react';
import { THEME } from '../../config/theme';

const Button = ({ children, ...props }: { children: ReactElement } & IButtonProps) => {
    const { colors } = THEME;
    return (
        <NBButton 
            style={{
                shadowColor: colors.primary[500]
            }}
            shadow='9'
            w='full' 
            bg='primary.500' 
            borderRadius={'3xl'}
            _pressed={{
                bg: 'primary.600'
            }}
            {...props}
        >{children}</NBButton>
    );
}

export default Button;