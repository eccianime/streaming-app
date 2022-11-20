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
  
  const currentMovie = {
    title: 'MovieTitle',
    tags: ['movie_tag 1', 'movie_tag 2','movie_tag 3', 'movie_tag 4', 'movie_tag 5'],
  }
  const top10Movies = [
    {  imageUrl: MockMovie02, rating: 5.4 },
    {  imageUrl: MockMovie03, rating: 1.4 },
    {  imageUrl: MockMovie04, rating: 2.4 },
    {  imageUrl: MockMovie05, rating: 3.4 },
    {  imageUrl: MockMovie06, rating: 4.4 },
    {  imageUrl: MockMovie07, rating: 5.4 },
    {  imageUrl: MockMovie08, rating: 6.4 },
    {  imageUrl: MockMovie09, rating: 7.4 },
    {  imageUrl: MockMovie10, rating: 8.4 },
    {  imageUrl: MockMovie11, rating: 9.4 },
  ]

  const newReleases = [
    {  imageUrl: MockMovie12, rating: 5.4 },
    {  imageUrl: MockMovie13, rating: 1.4 },
    {  imageUrl: MockMovie14, rating: 2.4 },
    {  imageUrl: MockMovie15, rating: 3.4 },
    {  imageUrl: MockMovie16, rating: 4.4 },
  ]
  return (
    <Screen contentContainerStyle={{ paddingBottom: space[5] }}>
      <VStack justifyContent={'flex-end'}>
        <Image source={MockMovie01} w={width} h={width * 3/4} alt={currentMovie.title} />
        <View position={'absolute'} left={0} top={0} bg={colors.backdrop} w={width} h={width * 3/4} />
        <Header />
        
        <VStack position={'absolute'} left={0} bottom={0} p={5} w={'60%'}>
          <Text color={colors.white} fontFamily='heading' fontSize={'3xl'}>{currentMovie.title}</Text>
          <Text mb={'3'} numberOfLines={1} color={colors.white} fontFamily='body' fontSize={'md'}>{currentMovie.tags.join(', ')}</Text>
          
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
      
      <MovieHList movies={top10Movies} title='Top 10 Movies This Week' />
      <MovieHList movies={newReleases} title='New Releases' />
    </Screen>
  )
}

export default Home