import { VStack } from 'native-base';
import React from 'react';
import { Screen, SimpleHeader } from '../../components';
import { THEME } from '../../config/theme';
import { useAppNavigation } from '../../types/navigation';

const Security = () => {
  const { colors } = THEME;
  const navigation = useAppNavigation();
  return (
    <Screen contentContainerStyle={{ backgroundColor: colors.white }}>
      <VStack flexGrow={1} py={'10'} px={'5'}>
        <SimpleHeader hasBackButton title="Security" />
      </VStack>
    </Screen>
  );
};

export default Security;
