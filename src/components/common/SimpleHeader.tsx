import { HStack, Icon, Pressable, Text } from 'native-base'
import React from 'react'
import { SimpleHeaderProps } from '../../types/components'
import { useAppNavigation } from '../../types/navigation'
import { Ionicons } from '@expo/vector-icons';

const SimpleHeader = ({ title, hasBackButton = true }: SimpleHeaderProps) => {
    const navigation = useAppNavigation();
    const handleGoBack = () => {
        if( hasBackButton && typeof hasBackButton === 'boolean' ){
            navigation.goBack();
        }else if( typeof hasBackButton === 'function' ){
            hasBackButton();
        }
         
    }
    return (
        <HStack alignItems={'center'} mb={6}>
            {
                hasBackButton &&
                <Pressable onPress={handleGoBack} mr={2}>
                    <Icon as={<Ionicons name='arrow-back-outline' />} size={'2xl'} color='gray.900' />
                </Pressable>
            }
            <Text fontFamily='heading' fontSize='2xl' color='gray.900'>{title}</Text>
        </HStack>
    )
}

export default SimpleHeader