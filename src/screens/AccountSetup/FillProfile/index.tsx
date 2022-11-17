import { FontAwesome } from '@expo/vector-icons';
import { HStack, Icon, Text, View, VStack } from 'native-base';
import React from 'react';
import { UserImage } from '../../../assets/svg';
import { Button, Input, Screen, SimpleHeader } from '../../../components';
import { useAppNavigation } from '../../../types/navigation';

const FillProfile = () => {
    const navigation = useAppNavigation();
    const navigateToAccount = () => navigation.navigate('Account', { screen: 'Home', params: { screen: 'Base' } })
    const navigateToCreatePIN  = () => navigation.navigate('Account Setup', { screen: 'Create PIN' })
    return (
        <Screen>
            <VStack justifyContent='center' px={'5'} pt='8' pb='8' flex={1}>
              <SimpleHeader title='Fill Your Profile' />
              <View mb='5' alignSelf='center'>
                  <UserImage width={120} height={120} />
                  <Icon as={<FontAwesome name='pencil-square' />} size='xl' color='primary.500' position='absolute' right='0' bottom='0' />
              </View>

              <Input
                  placeholder='Full Name'
              />
              <Input
                  placeholder='Nickname'
              />
              <Input
                  placeholder='Email'
              />
              <Input
                  placeholder='Phone Number'
                  keyboardType='number-pad'
              />

              <VStack flex={1} justifyContent={'flex-end'}>
                <HStack>
                    <Button onPress={navigateToAccount} flex='1' mr='2' bg='primary.100' shadow='none'>
                        <Text color='primary.500' fontSize='lg' fontFamily='heading'>Skip</Text>
                    </Button>
                    <Button onPress={navigateToCreatePIN} flex='1' ml='2' shadow='none'>
                        <Text color='white' fontSize='lg' fontFamily='heading'>Continue</Text>
                    </Button>
                </HStack>
              </VStack>
            </VStack>
        </Screen>
    );
}

export default FillProfile;