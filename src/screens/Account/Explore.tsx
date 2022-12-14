import { Ionicons } from '@expo/vector-icons';
import { Center, HStack, Icon, Pressable, Text, View, VStack } from 'native-base';
import React, { useEffect, useState, useCallback } from 'react';
import { Dimensions } from 'react-native';
import { EqualizerIcon, NotFound } from '../../assets/svg';
import { Input, Movie, Screen } from '../../components';
import { MiniLoading } from '../../components/common/MiniLoading';
import { THEME } from '../../config/theme';
import { useAppContext } from '../../contexts/app';
import useDebounce from '../../hooks/useDebounce';
import { getFromDiscover, getFromMovies, getFromSearch } from '../../services/tmdb';
import { MoviePropsExtended } from '../../types/components';

const { colors, space } = THEME;
const { width } = Dimensions.get('screen');
const imageWidth = width / 2 - space[5] * 1.5;
const imageHeight = (imageWidth * 4) / 3;

const Explore = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [discovery, setDiscovery] = useState<MoviePropsExtended[]>([]);

  const [searchText, setSearchText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<MoviePropsExtended[]>([]);

  const debouncedText = useDebounce(searchText, 1000);

  const getNowPlaying = async () => {
    setLoading(true);
    const { results } = await getFromDiscover('movie');
    setDiscovery(results);
    setLoading(false);
  };

  const getSearchResults = async (searchValue: string) => {
    setLoading(true);
    if (searchValue.length < 3) {
      setSearchResults([]);
    } else {
      const { results } = await getFromSearch('movie', searchValue);
      setSearchResults(results);
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
      getNowPlaying();
    }
  }, [discovery]);

  useEffect(() => {
    getSearchResults(debouncedText);
  }, [debouncedText]);

  return (
    <Screen contentContainerStyle={{ backgroundColor: colors.white }}>
      <VStack flexGrow={1} py={'10'} px={'5'}>
        <HStack w="full" justifyContent={'space-between'}>
          <VStack flex={1} mr="2">
            <Input
              leftElement={
                <Icon
                  as={<Ionicons name="search-outline" />}
                  size={5}
                  ml="4"
                  color={colors.gray[400]}
                />
              }
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search"
            />
          </VStack>
          <Pressable
            android_ripple={{ foreground: true, color: colors.white }}
            h={'12'}
            w={'12'}
            rounded="xl"
            bg="primary.100"
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
            <Text fontSize={'xl'} fontFamily="body" color={'gray.900'} textAlign="center">
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
