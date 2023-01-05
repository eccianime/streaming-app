import { Button, HStack, ScrollView, View, VStack } from 'native-base';
import React from 'react';
import { THEME } from '../../config/theme';
import { useAppContext } from '../../contexts/app';
import { MovieHListProps } from '../../types/components';
import Movie from '../common/Movie';
import Text from '../inputs/Text';

const MovieHList = ({ movies, title, goToDetails, isSeries }: MovieHListProps) => {
  const { colors } = THEME;
  const { isDarkMode } = useAppContext();

  const navigateToListDetails = () => {
    goToDetails(title);
  };
  return (
    <VStack bg={colors.background[isDarkMode ? 'dark' : 'light']} flex={1} pt={3}>
      <HStack px={5} pb={3} justifyContent={'space-between'} alignItems="center">
        <Text fontFamily="heading" fontSize={'lg'}>
          {title}
        </Text>
        <Button
          bg={isDarkMode ? colors.background.dark : colors.white}
          _pressed={{
            bg: isDarkMode ? colors.background.dark : colors.primary[100],
          }}
          onPress={navigateToListDetails}
        >
          <Text color={'primary.500'} fontFamily="mono" fontSize={'sm'}>
            See All
          </Text>
        </Button>
      </HStack>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {movies.map((movie, index) => (
          <View key={movie.id} mr={2} ml={!index ? 5 : 0}>
            <Movie data={movie} isSeries={isSeries} />
          </View>
        ))}
      </ScrollView>
    </VStack>
  );
};

export default MovieHList;
