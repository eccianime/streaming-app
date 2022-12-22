import React, { useState } from 'react';
import { Movie, Screen } from '../../components';
import { Center, HStack, IconButton, ScrollView, Text, View, VStack } from 'native-base';
import { Logo, NotFound, SearchIcon } from '../../assets/svg';
import { THEME } from '../../config/theme';
import { Dimensions } from 'react-native';
import { MoviePropsExtended } from '../../types/components';
import { useMyListContext } from '../../contexts/myList';
import { useAppNavigation } from '../../types/navigation';

const { colors, space } = THEME;
const { width } = Dimensions.get('screen');
const imageWidth = width / 2 - space[5] * 1.5;
const imageHeight = (imageWidth * 4) / 3;

const MyList = () => {
  const { myList } = useMyListContext();
  const navigation = useAppNavigation();

  const goToSearch = () => {
    navigation.navigate('Account', { screen: 'Explore' });
  };

  return (
    <Screen contentContainerStyle={{ backgroundColor: colors.white }}>
      <VStack flexGrow={1} py={'10'} px={'5'}>
        <HStack justifyContent={'space-between'} alignItems="center" w="full" mb={5}>
          <HStack>
            <Logo width={30} height={30} />
            <Text ml="5" color={'gray.900'} fontFamily="heading" fontSize={'2xl'}>
              My List
            </Text>
          </HStack>
          <IconButton
            onPress={goToSearch}
            icon={<SearchIcon width={30} height={30} color={colors.gray[900]} />}
            borderRadius="full"
          />
        </HStack>
        {!!myList.length ? (
          <HStack flexWrap={'wrap'} justifyContent="space-between">
            {myList.map((movie) => (
              <View mb={2} key={movie.id}>
                <Movie data={movie} w={imageWidth} h={imageHeight} />
              </View>
            ))}
          </HStack>
        ) : (
          <Center flexGrow={1}>
            <NotFound color={colors.primary[500]} width={width * 0.6} height={width * 0.6} />
            <Text fontSize={'2xl'} fontFamily="heading" color={'primary.600'} mb="2">
              Your List is Empty
            </Text>
            <Text fontSize={'xl'} fontFamily="body" color={'gray.900'} textAlign="center">
              It seems that you haven't added{'\n'}any movies to the list
            </Text>
          </Center>
        )}
      </VStack>
    </Screen>
  );
};

export default MyList;
