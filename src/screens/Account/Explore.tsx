import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { Center, HStack, Icon, Pressable, View, VStack } from 'native-base';
import React, { useEffect, useState, useCallback } from 'react';
import { Dimensions } from 'react-native';
import { EqualizerIcon, NotFound } from '../../assets/svg';
import { Input, Movie, Screen, Text } from '../../components';
import { MiniLoading } from '../../components/common/MiniLoading';
import { THEME } from '../../config/theme';
import { useAppContext } from '../../contexts/app';
import useDebounce from '../../hooks/useDebounce';
import { getFromDiscover, getFromMovies, getFromSearch } from '../../services/tmdb';
import { MoviePropsExtended } from '../../types/components';

const Explore = () => {
  const { colors, space } = THEME;
  const { width } = Dimensions.get('screen');
  const imageWidth = width / 2 - space[5] * 1.5;
  const imageHeight = (imageWidth * 4) / 3;

  const { isDarkMode } = useAppContext();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [discovery, setMovieDiscovery] = useState<MoviePropsExtended[]>([]);

  const [searchText, setSearchText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<MoviePropsExtended[]>([]);

  const debouncedText = useDebounce(searchText, 1000);

  const getDiscovery = async () => {
    setLoading(true);
    const { results } = await getFromDiscover('movie');
    setMovieDiscovery(results);
    setLoading(false);
  };

  const getSearchResults = async (searchValue: string) => {
    setLoading(true);
    if (searchValue.length < 3) {
      setSearchResults([]);
    } else {
      const { results } = await getFromSearch('movie', searchValue);
      setSearchResults(
        results.filter(
          (item: MoviePropsExtended) => item.genre_ids.length > 0 && item.vote_average > 0
        )
      );
    }
    setLoading(false);
  };

  const renderMovieList = useCallback(
    (movies: MoviePropsExtended[]) => (
      <HStack flexWrap={'wrap'} justifyContent="space-between">
        {movies.map((movie) => (
          <View mb={2} key={movie.id}>
            <Movie data={movie} w={imageWidth} h={imageHeight} />
          </View>
        ))}
      </HStack>
    ),
    []
  );

  useEffect(() => {
    if (!discovery.length) {
      getDiscovery();
    }
  }, [discovery]);

  useEffect(() => {
    if (debouncedText.length > 3) {
      getSearchResults(debouncedText);
    }
  }, [debouncedText]);

  useFocusEffect(
    useCallback(() => {
      setSearchText('');
      setSearchResults([]);
    }, [])
  );

  return (
    <Screen>
      <VStack flexGrow={1} py={'10'} px={'5'}>
        <HStack w="full" justifyContent={'space-between'}>
          <VStack flex={1} mr="2">
            <Input
              leftElement={
                <Icon
                  as={<Ionicons name="search-outline" />}
                  size={5}
                  ml="4"
                  color={isDarkMode ? colors.primary[500] : colors.gray[400]}
                />
              }
              value={searchText}
              onChangeText={(value: string) => setSearchText(value)}
              placeholder="Search"
            />
          </VStack>
          <Pressable
            android_ripple={{ foreground: true, color: colors.white }}
            h={'12'}
            w={'12'}
            rounded="xl"
            bg={isDarkMode ? 'primary.900' : 'primary.100'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <EqualizerIcon width={20} height={20} color={colors.primary[500]} />
          </Pressable>
        </HStack>
        {isLoading && <MiniLoading />}
        {!isLoading && searchText.length < 3 && renderMovieList(discovery)}
        {!isLoading &&
          searchText.length >= 3 &&
          searchResults.length > 0 &&
          renderMovieList(searchResults)}
        {!isLoading && searchText.length >= 3 && !searchResults.length && (
          <Center flexGrow={1}>
            <NotFound color={colors.primary[500]} width={width * 0.6} height={width * 0.6} />
            <Text fontSize={'2xl'} fontFamily="heading" color={'primary.600'} mb="2">
              Not Found
            </Text>
            <Text fontSize={'xl'} fontFamily="body" textAlign="center">
              Sorry, the keyword you entered could not be found. Try to check again or search with
              other keywords
            </Text>
          </Center>
        )}
      </VStack>
    </Screen>
  );
};

export default Explore;
