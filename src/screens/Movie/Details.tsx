import { Center, FlatList, HStack, IconButton, Image, Text, View, VStack } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';

import { BookmarkIcon, DownloadFillIcon, Logo, PlayIcon, SendIcon } from '../../assets/svg';
import { Button, Screen } from '../../components';
import { THEME } from '../../config/theme';
import { useMovieContext } from '../../contexts/movie';
import { IMAGE_BASE_URL } from '../../services/tmdb';

const { width } = Dimensions.get('screen');

const Details = () => {
  const { colors, sizes } = THEME;
  const { credits, backdropImage, currentMovie } = useMovieContext();

  return (
    <Screen>
      {
        !!backdropImage ?
        <Image
            source={{ uri: backdropImage }}
            w={width}
            h={width * 9/16}
            alt={currentMovie?.title} 
        /> : 
        <Center w={width} h={width}>
          <Logo width={width / 2} height={width / 2} />
        </Center>
      }
      <VStack p={5}>
        <HStack alignItems={'center'} justifyContent='space-between'>
          <Text
            flex={1}
            numberOfLines={1}
            color={colors.gray[900]}
            fontSize='2xl'
            fontFamily={'heading'}>{currentMovie?.title}</Text>
            <HStack>
              <IconButton
                icon={<BookmarkIcon width={20} height={20} color={colors.gray[900]} />}
                borderRadius="full"
              />
              <IconButton
                icon={<SendIcon width={20} height={20} color={colors.gray[900]} />}
                borderRadius="full"
              />
            </HStack>
        </HStack>
        <HStack>
          <Text>{currentMovie?.vote_average}</Text>
          <Text>{currentMovie?.release_date}</Text>
          <Text>{currentMovie?.original_language}</Text>
        </HStack>
        
        <HStack>
            <Button
              leftIcon={
                <PlayIcon color={colors.white} width={sizes[5]} height={sizes[5]} /> 
              }
              shadow='none'
              h='10'
              flex={1}
              mr='2'> 
              <Text fontSize={'lg'} color={colors.white} fontFamily='heading' lineHeight={20}>Play</Text>
            </Button>
  
            <Button
              leftIcon={
                <DownloadFillIcon color={colors.primary[500]} width={sizes[5]} height={sizes[5]} /> 
              }
              shadow='none'
              h='10'
              flex={1}
              bg={colors.transparent}
              borderWidth={2}
              borderColor={colors.primary[500]}
              _pressed={{
                bg: 'primary.100'
              }}>
              <Text fontSize={'lg'} color={colors.primary[500]} fontFamily='heading' lineHeight={20}>Download</Text>
            </Button>
  
          </HStack>
          <Text>{`Genre: ${currentMovie?.genres.map( genre => genre.name ).join(', ')}`}</Text>
          <Text>{currentMovie?.overview}</Text>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={credits}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <HStack>
                {
                  item?.profile_path ?
                  <Image w={12} h={12} source={{ uri: IMAGE_BASE_URL + item.profile_path }} alt={item.name} borderRadius='full' /> :
                  <View w={12} h={12} bg='black' borderRadius='full'  />
                }
                <VStack>
                  <Text>{`${item.name.split(' ')[0]}\n${item.name.split(' ')[1]}`}</Text>
                  <Text>{item?.job ? item.job : 'Cast'}</Text>
                </VStack>
              </HStack>
            )}
          />
      </VStack>
    </Screen>
  )
}

export default Details