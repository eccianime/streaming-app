import { HStack, Icon, Image, Pressable, Text, View, VStack } from 'native-base'
import React from 'react'
import { BellIcon, Logo, SearchIcon } from '../../assets/svg'
import { Button, MovieHList, Screen } from '../../components'
import { Dimensions } from 'react-native';
import { THEME } from '../../config/theme';
import { Ionicons } from '@expo/vector-icons';
import { 
  MockMovie01, MockMovie02, MockMovie03, MockMovie04, MockMovie05, 
  MockMovie06, MockMovie07, MockMovie08, MockMovie09, MockMovie10, 
  MockMovie11, MockMovie12, MockMovie13, MockMovie14, MockMovie15, 
  MockMovie16 
} from '../../assets/images';
import { useHomeContext } from '../../contexts/home';
import { IMAGE_BASE_URL } from '../../services/tmdb';
import { useAppNavigation } from '../../types/navigation';
import { MovieProps } from '../../types/components';

const { width } = Dimensions.get('screen');

const Header = () => {
  const { colors } = THEME;
  return (
    <HStack justifyContent={'space-between'} position={'absolute'} left={0} top={0} p={5} w='full'>
      <Logo width={30} height={30} />
      <HStack>
        <Pressable mr={'5'}>
          <SearchIcon width={30} height={30} color={colors.white} />
        </Pressable>
        <Pressable>
          <BellIcon width={30} height={30} color={colors.white} />
        </Pressable>
      </HStack>
    </HStack>
  )
}

const Home = () => {
  const { colors, space } = THEME;
  const { latestMovie, topRatedMovies, popularMovies } = useHomeContext();
  const navigation = useAppNavigation();
  
  const navigateToListDetails = (title: string, movies: MovieProps[]) => {
    navigation.navigate('Movie', { screen: 'List Details', params: { movies, title }})
  }
  return (
    <Screen contentContainerStyle={{ paddingBottom: space[5] }}>
      <VStack justifyContent={'flex-end'}>
        {!!latestMovie?.backdrop_path && <Image source={{ uri: IMAGE_BASE_URL + latestMovie.backdrop_path }} w={width} h={width * 3/4} alt={latestMovie?.title} />}
        <View position={'absolute'} left={0} top={0} bg={colors.backdrop} w={width} h={width * 3/4} />
        <Header />
        
        <VStack position={'absolute'} left={0} bottom={0} p={5} w={'60%'}>
          <Text color={colors.white} fontFamily='heading' fontSize={'3xl'}>{latestMovie?.title}</Text>
          {
            latestMovie?.genre_names?.length &&
            <Text mb={'3'} numberOfLines={1} color={colors.white} fontFamily='body' fontSize={'md'}>{latestMovie.genre_names.join(', ')}</Text>
          }
          
          <HStack>
            <Button
              leftIcon={
                <Icon color={colors.white} size={'md'} as={<Ionicons name='md-play-circle' />} />
              }
              shadow='none'
              h='10'
              w={'22'}
              mr='5'> 
              <Text fontSize={'md'} color={colors.white} fontFamily='heading' lineHeight={20}>Play</Text>
            </Button>

            <Button
              leftIcon={
                <Icon color={colors.white} size={'md'} as={<Ionicons name='md-add' />} />
              }
              shadow='none'
              h='10'
              w={'28'}
              bg={colors.transparent}
              borderWidth={2}
              borderColor={colors.white}
              _pressed={{
                bg: 'gray.900'
              }}>
              <Text fontSize={'md'} color={colors.white} fontFamily='heading' lineHeight={16}>My List</Text>
            </Button>

          </HStack>

        </VStack>
      </VStack>
      
      <MovieHList
        movies={topRatedMovies.slice(0,5)}
        title='Top Rated Movies'
        goToDetails={(title) => navigateToListDetails(title, topRatedMovies)}
      />
      <MovieHList
        movies={popularMovies.slice(0,5)}
        title='New Releases'
        goToDetails={(title) => navigateToListDetails(title, popularMovies)}
      />
    </Screen>
  )
}

export default Home