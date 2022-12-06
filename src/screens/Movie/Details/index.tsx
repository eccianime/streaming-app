import { Center, HStack, Image, Text, VStack } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';

import { DownloadFillIcon, Logo, PlayIcon } from '../../../assets/svg';
import { Button, Screen } from '../../../components';
import { THEME } from '../../../config/theme';
import { useMovieContext } from '../../../contexts/movie';
import BasicInfo from './BasicInfo';
import MovieTab from './MovieTab';
import SecondaryInfo from './SecondaryInfo';

const { width } = Dimensions.get('screen');

const Details = () => {
  const { colors, sizes } = THEME;
  const { backdropImage, currentMovie } = useMovieContext();

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
        <BasicInfo />
        
        <HStack mb={4}>
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

        <SecondaryInfo />
        <MovieTab />
      </VStack>
    </Screen>
  )
}

export default Details