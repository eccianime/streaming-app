import { Center, Spinner } from 'native-base';
import React from 'react';
import Text from '../inputs/Text';

export const MiniLoading = () => (
  <Center flexGrow={1}>
    <Spinner color="primary.500" size={40} />
    <Text fontFamily="heading" fontSize={'md'}>
      Loading...
    </Text>
  </Center>
);
