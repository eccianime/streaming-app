import { Ionicons } from '@expo/vector-icons';
import { HStack, Icon, Pressable } from 'native-base';
import React from 'react';
import { THEME } from '../../config/theme';
import { useAppContext } from '../../contexts/app';
import { SimpleHeaderProps } from '../../types/components';
import { useAppNavigation } from '../../types/navigation';
import Text from '../inputs/Text';

const SimpleHeader = ({ title, hasBackButton = true, ...rest }: SimpleHeaderProps) => {
  const navigation = useAppNavigation();
  const { isDarkMode } = useAppContext();
  const { colors } = THEME;
  const handleGoBack = () => {
    if (hasBackButton && typeof hasBackButton === 'boolean') {
      navigation.goBack();
    } else if (typeof hasBackButton === 'function') {
      hasBackButton();
    }
  };
  return (
    <HStack alignItems={'center'} mb={6} {...rest}>
      {hasBackButton && (
        <Pressable onPress={handleGoBack} mr={2}>
          <Icon
            as={<Ionicons name="arrow-back-outline" />}
            size={'xl'}
            color={colors.textColor[isDarkMode ? 'dark' : 'light']}
          />
        </Pressable>
      )}
      <Text fontFamily="heading" fontSize="xl">
        {title}
      </Text>
    </HStack>
  );
};

export default SimpleHeader;
