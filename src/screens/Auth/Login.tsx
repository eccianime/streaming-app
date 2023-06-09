import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Checkbox, HStack, Icon, View, VStack } from 'native-base';
import React, { useState } from 'react';
import { Pressable } from 'react-native';

import { FacebookLogo, GoogleLogo, Logo } from '../../assets/svg';
import { Button, ClearButton, Input, Screen, Text } from '../../components';
import { THEME } from '../../config/theme';
import { useAuthContext } from '../../contexts/auth';
import { AppNavigation } from '../../types/navigation';

const Login = () => {
  const navigation = useNavigation<AppNavigation>();
  const { signIn } = useAuthContext();
  const { colors } = THEME;
  const [loginForm, setLoginForm] = useState({
    email: '',
    pass: '',
  });

  const navigateToSignUp = () => navigation.navigate('Auth', { screen: 'Create Account' });

  const [isVisiblePassword, setVisiblePassword] = useState<boolean>(false);
  const [isRemembering, setRemember] = useState<boolean>(false);

  const navigateToFacebook = () => navigation.navigate('Auth', { screen: 'Login' });
  const navigateToGoogle = () => navigation.navigate('Auth', { screen: 'Login' });
  const navigateToForgot = () => navigation.navigate('Auth', { screen: 'Forgot Password' });

  return (
    <Screen>
      <VStack justifyContent="center" px={'5'} pt="16" pb="8">
        <View alignSelf={'center'}>
          <Logo width={80} height={80} />
        </View>
        <Text textAlign={'center'} fontSize="3xl" fontFamily="heading" my={'6'}>
          {'Login to your account'}
        </Text>

        <Input
          value={loginForm.email}
          onChangeText={(email: string) => setLoginForm({ ...loginForm, email })}
          placeholder="Email"
          keyboardType="email-address"
          leftElement={
            <Icon as={<Ionicons name="mail" />} size={5} ml="4" color={colors.gray[400]} />
          }
        />
        <Input
          value={loginForm.pass}
          onChangeText={(pass: string) => setLoginForm({ ...loginForm, pass })}
          placeholder="Password"
          leftElement={
            <Icon as={<Ionicons name="lock-closed" />} size={5} ml="4" color={colors.gray[400]} />
          }
          rightElement={
            <Pressable onPress={() => setVisiblePassword(!isVisiblePassword)}>
              <Icon
                as={<Ionicons name={isVisiblePassword ? 'eye-off' : 'eye'} />}
                size={5}
                mr="4"
                color={colors.gray[400]}
              />
            </Pressable>
          }
          secureTextEntry={!isVisiblePassword}
        />

        <Checkbox
          borderColor="primary.500"
          _checked={{
            backgroundColor: colors.primary[500],
            borderColor: colors.primary[500],
          }}
          borderRadius={'md'}
          alignSelf="center"
          mb="5"
          value="remember"
          isChecked={isRemembering}
          onChange={(isSelected) => setRemember(isSelected)}
        >
          <Text fontFamily="heading" fontSize="sm">
            Remember me
          </Text>
        </Checkbox>
        <Button onPress={() => signIn(loginForm.email, loginForm.pass)} mb={'4'}>
          <Text color="white" fontFamily="heading" fontSize="lg">
            Sign In
          </Text>
        </Button>

        <Pressable onPress={navigateToForgot}>
          <Text textAlign="center" fontFamily="mono" color="primary.500" fontSize="md">
            Forgot the password?
          </Text>
        </Pressable>

        <HStack alignItems="center" mt={'6'} mb={'7'}>
          <View h={'0.5'} flex={1} bg="gray.100" />
          <Text mx="5" color="gray.600" fontFamily="mono" fontSize="lg">
            or continue with
          </Text>
          <View h={'0.5'} flex={1} bg="gray.100" />
        </HStack>

        <HStack justifyContent="center" mb={'7'}>
          <ClearButton mx={10} onPress={navigateToFacebook} height={'16'} width={'16'}>
            <FacebookLogo height={25} />
          </ClearButton>
          <ClearButton mx={10} onPress={navigateToGoogle} height={'16'} width={'16'}>
            <GoogleLogo height={25} />
          </ClearButton>
        </HStack>

        <Pressable onPress={navigateToSignUp}>
          <Text textAlign="center" color="gray.300" fontFamily="body" fontSize="md">
            {"Don't have an account?"}{' '}
            <Text fontFamily="heading" color="primary.500">
              Sign up
            </Text>
          </Text>
        </Pressable>
      </VStack>
    </Screen>
  );
};

export default Login;
