import { HStack, Text, View, VStack } from 'native-base';
import React from 'react';
import { Pressable, Dimensions } from 'react-native';
import { FacebookAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

import { FacebookLogo, GoogleLogo, LetsInImage } from '../../assets/svg';
import { Button, ClearButton } from '../../components';
import { useAppNavigation } from '../../types/navigation';
import { auth } from '../../config/firebaseConfig';

const { width } = Dimensions.get('screen');

const LestIn = () => {
  const navigation = useAppNavigation();

  const loginWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const user = result.user;
    console.log(user);
  };
  const navigateToGoogle = () => navigation.navigate('Auth', { screen: 'Login' });
  const navigateToPassword = () => navigation.navigate('Auth', { screen: 'Login' });
  const navigateToSignUp = () => navigation.navigate('Auth', { screen: 'Create Account' });
  return (
    <VStack flexGrow={1} alignItems="center" justifyContent={'center'} px={'5'}>
      <LetsInImage width={width * 0.5} height={width * 0.5} />
      <Text textAlign="center" fontSize="5xl" fontFamily="heading" mb={'8'}>
        {"Let's you in"}
      </Text>
      <ClearButton onPress={loginWithFacebook} leftIcon={<FacebookLogo width={20} height={20} />}>
        <Text ml={2} color="gray.900" fontFamily="mono" fontSize="lg">
          Continue with Facebook
        </Text>
      </ClearButton>
      <ClearButton onPress={navigateToGoogle} leftIcon={<GoogleLogo width={20} height={20} />}>
        <Text ml={2} color="gray.900" fontFamily="mono" fontSize="lg">
          Continue with Google
        </Text>
      </ClearButton>
      <HStack alignItems="center" mt={'3'} mb={'5'}>
        <View h={'1px'} flex={1} bg="gray.100" />
        <Text mx="5" color="gray.500" fontFamily="heading" fontSize="lg">
          or
        </Text>
        <View h={'1px'} flex={1} bg="gray.100" />
      </HStack>
      <Button onPress={navigateToPassword} mb={'8'}>
        <Text color="white" fontFamily="heading" fontSize="lg">
          Sign in with password
        </Text>
      </Button>
      <Pressable onPress={navigateToSignUp}>
        <Text color="gray.300" fontFamily="body" fontSize="md">
          {"Don't have and account"}{' '}
          <Text fontFamily="mono" color="primary.500">
            Sign up
          </Text>
        </Text>
      </Pressable>
    </VStack>
  );
};

export default LestIn;
