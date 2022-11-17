import { IButtonProps } from 'native-base';
import React, { ReactElement } from 'react';
import Button from './Button';

const ClearButton = ({ children, ...props }: { children: ReactElement } & IButtonProps) => {
    return (
        <Button 
            borderColor='gray.100'
            borderWidth='1'
            mb={4}
            shadow='none'
            w='full' 
            bg='white' 
            borderRadius={'2xl'}
            _pressed={{
                bg: 'gray.100'
            }}
            {...props}
        >{children}</Button>
    );
}

export default ClearButton;