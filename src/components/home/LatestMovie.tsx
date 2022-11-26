import { Ionicons } from '@expo/vector-icons';
import { HStack, Icon, Image, Text, View, VStack } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';
import Button from '../../components/buttons/Button';
import { THEME } from '../../config/theme';
import { useHomeContext } from '../../contexts/home';
import { IMAGE_BASE_URL } from '../../services/tmdb';
import Header from './Header';

const { width } = Dimensions.get('screen');

const LatestMovie = () => {
    const { latestMovie } = useHomeContext();
    const { colors } = THEME;
    return (
      <VStack justifyContent={'flex-end'}>
        {
            !!latestMovie?.backdrop_path && 
            <Image
                source={{ uri: IMAGE_BASE_URL + latestMovie.backdrop_path }}
                w={width}
                h={width}
                alt={latestMovie?.title} 
            />
        }
        <View position={'absolute'} left={0} top={0} bg={colors.backdrop} w={width} h={width} />
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
    )
}

export default LatestMovie;