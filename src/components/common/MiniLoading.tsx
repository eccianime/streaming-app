import { Center, Spinner, Text } from 'native-base';
import React from 'react';

export const MiniLoading = () => (
  <Center flexGrow={1}>
    <Spinner color="primary.500" size={40} />
    <Text color={'gray.900'} fontFamily="heading" fontSize={'md'}>
      Loading...
    </Text>
  </Center>
);
