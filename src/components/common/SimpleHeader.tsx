import { HStack, Icon, Pressable, Text } from 'native-base';
import React from 'react';
import { SimpleHeaderProps } from '../../types/components';
import { useAppNavigation } from '../../types/navigation';
import { Ionicons } from '@expo/vector-icons';

const SimpleHeader = ({ title, hasBackButton = true, ...rest }: SimpleHeaderProps) => {
  const navigation = useAppNavigation();
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
          <Icon as={<Ionicons name="arrow-back-outline" />} size={'xl'} color="gray.900" />
        </Pressable>
      )}
      <Text fontFamily="heading" fontSize="xl" color="gray.900">
        {title}
      </Text>
    </HStack>
  );
};

export default SimpleHeader;
