import { VStack } from 'native-base';
import React from 'react';
import { Screen, SimpleHeader } from '../../components';
import { THEME } from '../../config/theme';
import { useAppNavigation } from '../../types/navigation';

const PrivacyPolicy = () => {
  const { colors } = THEME;
  const navigation = useAppNavigation();
  return (
    <Screen contentContainerStyle={{ backgroundColor: colors.white }}>
      <VStack flexGrow={1} py={'10'} px={'5'}>
        <SimpleHeader hasBackButton title="PrivacyPolicy" />
      </VStack>
    </Screen>
  );
};

export default PrivacyPolicy;
