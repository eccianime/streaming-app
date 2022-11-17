import { Ionicons } from '@expo/vector-icons';
import { HStack, Icon, Text, VStack } from 'native-base';
import React from 'react';
import { Button, Screen, SimpleHeader } from '../../../components';
import { useAppNavigation } from '../../../types/navigation';

const SetFingerprint = () => {
  const navigation = useAppNavigation();
  const navigateToAccount = () => navigation.navigate('Account', { screen: 'Home', params: { screen: 'Base' } })
  const handleShowModal = () => {
    navigateToAccount()
  }
  return (
    <Screen>
      <VStack px={'5'} py='8' flex={1}>
        <SimpleHeader title='Set your fingerprint' />
        <VStack flex={1} justifyContent='center'>
          <Text 
            textAlign={'center'}
            fontFamily='body'
            fontSize='18' 
            mb={'16'}>Add a fingerprint to make your account more secure</Text>
          <Icon as={<Ionicons name='finger-print' />} color='primary.500' size={'250px'} alignSelf='center' />
          <Text 
            textAlign={'center'}
            fontFamily='body'
            fontSize='18' 
            mt={'16'}>Please put your finger on the fingerprint scanner to get started</Text>

        </VStack>
        <VStack flex={1} justifyContent={'flex-end'}>
          <HStack>
              <Button onPress={navigateToAccount} flex='1' mr='2' bg='primary.100' shadow='none'>
                  <Text color='primary.500' fontSize='lg' fontFamily='heading'>Skip</Text>
              </Button>
              <Button onPress={handleShowModal} flex='1' ml='2' shadow='none'>
                  <Text color='white' fontSize='lg' fontFamily='heading'>Continue</Text>
              </Button>
          </HStack>
        </VStack>
      </VStack>
    </Screen>
  )
}

export default SetFingerprint