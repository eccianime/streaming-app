import { HStack, Text, VStack } from 'native-base';
import React from 'react';
import { Logo } from '../../assets/svg';
import { Screen } from '../../components';
import { THEME } from '../../config/theme';
import { useAppNavigation } from '../../types/navigation';

const ProfileOptionList = () => {
  const { colors } = THEME;
  const navigation = useAppNavigation();
  return (
    <Screen contentContainerStyle={{ backgroundColor: colors.white }}>
      <VStack flexGrow={1} py={'10'} px={'5'}>
        <HStack alignItems="center" w="full" mb={5}>
          <Logo width={30} height={30} />
          <Text ml="5" color={'gray.900'} fontFamily="heading" fontSize={'2xl'}>
            Profile
          </Text>
        </HStack>
      </VStack>
    </Screen>
  );
};

export default ProfileOptionList;
