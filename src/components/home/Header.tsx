import { HStack, IconButton } from 'native-base';
import React from 'react';
import { BellIcon, Logo, SearchIcon } from '../../assets/svg';
import { THEME } from '../../config/theme';
import { useAppNavigation } from '../../types/navigation';

const Header = () => {
  const { colors } = THEME;
  const navigation = useAppNavigation();
  const goToSearch = () => {
    navigation.navigate('Account', { screen: 'Explore' });
  };
  return (
    <HStack
      justifyContent={'space-between'}
      alignItems="center"
      position={'absolute'}
      left={0}
      top={5}
      p={5}
      w="full"
    >
      <Logo width={30} height={30} />
      <HStack>
        <IconButton
          onPress={goToSearch}
          icon={<SearchIcon width={30} height={30} color={colors.white} />}
          borderRadius="full"
        />
        <IconButton
          icon={<BellIcon width={30} height={30} color={colors.white} />}
          borderRadius="full"
        />
      </HStack>
    </HStack>
  );
};

export default Header;
