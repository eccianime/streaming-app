import { Ionicons } from '@expo/vector-icons';
import { Checkbox, HStack, Icon, Text, theme, View, VStack } from 'native-base';
import React, { useState } from 'react';
import { Pressable } from 'react-native';

import { AppleLogo, FacebookLogo, GoogleLogo, Logo } from '../../../assets/svg';
import { Button, ClearButton, Input, Screen } from '../../../components';
import { THEME } from '../../../config/theme';
import { useAppNavigation } from '../../../types/navigation';

const CreateAccount = () => {
    const navigation = useAppNavigation();
    const { colors } = THEME;
    
    const createAccount = () => navigation.navigate('Account Setup', { screen: 'Choose Interest' })
    const navigateToSignIn = () => navigation.navigate('Auth', { screen: 'Login' })

    const [isVisiblePassword, setVisiblePassword] = useState<boolean>(false);
    const [isRemembering, setRemember] = useState<boolean>(false);

    const navigateToFacebook = () => navigation.navigate('Auth', { screen: 'Login' })
    const navigateToGoogle = () => navigation.navigate('Auth', { screen: 'Login' })
    const navigateToApple = () => navigation.navigate('Auth', { screen: 'Login' })
    
    return (
        <Screen>
            <VStack justifyContent='center' px={'5'} pt='16' pb='8'>
                <View alignSelf={'center'}>
                  <Logo width={80} height={80} />
                </View>
                <Text
                  textAlign={'center'} 
                  color='gray.900' 
                  fontSize='4xl' 
                  fontFamily='heading' 
                  my={'6'}>{'Create your Account'}</Text>
                
                <Input
                    placeholder='Email'
                    keyboardType='email-address'
                    leftElement={<Icon as={<Ionicons name='mail' />} size={5} ml='4' color={theme.colors.gray[400]} />}
                />
                <Input
                    placeholder='Password'
                    leftElement={<Icon as={<Ionicons name='lock-closed' />} size={5} ml='4' color={theme.colors.gray[400]} />}
                    rightElement={
                        <Pressable onPress={() => setVisiblePassword(!isVisiblePassword)}>
                            <Icon as={<Ionicons name={ isVisiblePassword ? 'eye-off' : 'eye'} />} size={5} mr='4' color={theme.colors.gray[400]} />
                        </Pressable>
                    }
                    secureTextEntry={!isVisiblePassword}
                />

                <Checkbox
                  borderColor='primary.500'
                  _checked={{
                    backgroundColor: colors.primary[500],
                    borderColor: colors.primary[500],
                  }}
                  borderRadius={'md'} 
                  alignSelf='center' 
                  mb='5' 
                  value='remember' 
                  isChecked={isRemembering} 
                  onChange={(isSelected) => setRemember(isSelected)}>
                    <Text color='gray.900' fontFamily='heading' fontSize='sm'>Remember me</Text>
                </Checkbox>
                <Button onPress={createAccount} mb={'10'}>
                    <Text color='white' fontFamily='heading' fontSize='lg'>Sign Up</Text>
                </Button>
                
                <HStack alignItems='center' mb={'7'}>
                    <View h={'0.5'} flex={1} bg='gray.100' />
                    <Text mx='5' color='gray.600' fontFamily='mono' fontSize='lg'>or continue with</Text>
                    <View h={'0.5'} flex={1} bg='gray.100' />
                </HStack>

                <HStack justifyContent='space-between' px={'5'} mb={'7'}>
                    <ClearButton flex={1} onPress={navigateToFacebook} height={'16'}>
                        <FacebookLogo height={25} />
                    </ClearButton>
                    <ClearButton flex={1} mx={10} onPress={navigateToGoogle} height={'16'}>
                        <GoogleLogo height={25} />
                    </ClearButton>
                    <ClearButton flex={1} onPress={navigateToApple} height={'16'}>
                        <AppleLogo height={25} />
                    </ClearButton>
                </HStack>

                <Pressable onPress={navigateToSignIn}>
                    <Text textAlign='center' color='gray.300' fontFamily='body' fontSize='md'>Already have an account? <Text fontFamily='heading' color='primary.500'>Sign in</Text></Text>
                </Pressable>
            </VStack>
        </Screen>
    );
}

export default CreateAccount;