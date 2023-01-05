import { Ionicons } from '@expo/vector-icons';
import { HStack, Pressable, VStack } from 'native-base';
import React from 'react';
import { SvgProps } from 'react-native-svg';
import {
  AlertIcon,
  BellIcon,
  DownloadIcon,
  EyeIcon,
  InfoIcon,
  Logo,
  ShieldIcon,
  UserIcon,
  UserImage,
  WorldIcon,
} from '../../assets/svg';
import { Screen, Switch, Text } from '../../components';
import { THEME } from '../../config/theme';
import { useAppContext } from '../../contexts/app';
import { useAuthContext } from '../../contexts/auth';
import { ProfileNavigationParams, useAppNavigation } from '../../types/navigation';

const ProfileOptionList = () => {
  const { colors } = THEME;
  const { isDarkMode, setDarkMode } = useAppContext();
  const { user } = useAuthContext();
  const navigation = useAppNavigation();
  const options: {
    text: keyof ProfileNavigationParams | 'Dark Mode';
    Icon: React.FC<SvgProps>;
  }[] = [
    {
      text: 'Edit Profile',
      Icon: UserIcon,
    },
    {
      text: 'Notification',
      Icon: BellIcon,
    },
    {
      text: 'Download',
      Icon: DownloadIcon,
    },
    {
      text: 'Security',
      Icon: ShieldIcon,
    },
    {
      text: 'Language',
      Icon: WorldIcon,
    },
    {
      text: 'Dark Mode',
      Icon: EyeIcon,
    },
    {
      text: 'Help Center',
      Icon: InfoIcon,
    },
    {
      text: 'Privacy Policy',
      Icon: AlertIcon,
    },
  ];
  return (
    <Screen>
      <VStack flexGrow={1} py={'10'} px={'5'}>
        <HStack alignItems="center" w="full" mb={5}>
          <Logo width={30} height={30} />
          <Text ml="5" fontFamily="heading" fontSize={'2xl'}>
            Profile
          </Text>
        </HStack>

        <VStack alignItems={'center'} mb={10}>
          <UserImage width={120} height={120} />
          <Text fontFamily="heading" fontSize={'xl'}>
            {user.name}
          </Text>
          <Text fontFamily="body" fontSize={'md'}>
            {user.email}
          </Text>
        </VStack>
        {options.map(({ text, Icon }) => (
          <Pressable
            key={Math.random()}
            justifyContent={'space-between'}
            alignItems="center"
            flexDir="row"
            mb={5}
            onPress={() => {
              if (text !== 'Dark Mode') {
                navigation.navigate('Account', { screen: 'Profile', params: { screen: text } });
              }
            }}
          >
            <HStack alignItems={'center'}>
              <Icon
                color={colors.textColor[isDarkMode ? 'dark' : 'light']}
                width={25}
                height={25}
              />
              <Text ml={5} fontFamily="mono" fontSize={'md'}>
                {text}
              </Text>
            </HStack>
            {text === 'Dark Mode' ? (
              <Switch initialState={isDarkMode} onChange={(value) => setDarkMode(value)} />
            ) : (
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color={colors.textColor[isDarkMode ? 'dark' : 'light']}
              />
            )}
          </Pressable>
        ))}
      </VStack>
    </Screen>
  );
};

export default ProfileOptionList;
