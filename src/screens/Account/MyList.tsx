import { Center, HStack, IconButton, View, VStack } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';
import { Logo, NotFound, SearchIcon } from '../../assets/svg';
import { Movie, Screen, Text } from '../../components';
import { THEME } from '../../config/theme';
import { useAppContext } from '../../contexts/app';
import { useMyListContext } from '../../contexts/myList';
import { useAppNavigation } from '../../types/navigation';

const { colors, space } = THEME;
const { width } = Dimensions.get('screen');
const imageWidth = width / 2 - space[5] * 1.5;
const imageHeight = (imageWidth * 4) / 3;

const MyList = () => {
  const { myList } = useMyListContext();
  const navigation = useAppNavigation();
  const { isDarkMode } = useAppContext();

  const goToSearch = () => {
    navigation.navigate('Account', { screen: 'Explore' });
  };

  return (
    <Screen>
      <VStack flexGrow={1} py={'10'} px={'5'}>
        <HStack justifyContent={'space-between'} alignItems="center" w="full" mb={5}>
          <HStack>
            <Logo width={30} height={30} />
            <Text ml="5" fontFamily="heading" fontSize={'2xl'}>
              My List
            </Text>
          </HStack>
          <IconButton
            onPress={goToSearch}
            icon={
              <SearchIcon
                width={30}
                height={30}
                color={isDarkMode ? colors.white : colors.gray[900]}
              />
            }
            borderRadius="full"
          />
        </HStack>
        {!!myList.length ? (
          <HStack flexWrap={'wrap'} justifyContent="space-between">
            {myList.map((movie) => (
              <View mb={2} key={movie.id}>
                <Movie
                  data={movie}
                  w={imageWidth}
                  h={imageHeight}
                  isSeries={Boolean(movie?.number_of_episodes)}
                />
              </View>
            ))}
          </HStack>
        ) : (
          <Center flexGrow={1}>
            <NotFound color={colors.primary[500]} width={width * 0.6} height={width * 0.6} />
            <Text fontSize={'2xl'} fontFamily="heading" color={'primary.600'} mb="2">
              Your List is Empty
            </Text>
            <Text fontSize={'xl'} fontFamily="body" textAlign="center">
              It seems that you haven't added{'\n'}any movies to the list
            </Text>
          </Center>
        )}
      </VStack>
    </Screen>
  );
};

export default MyList;
