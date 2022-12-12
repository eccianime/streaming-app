import { Center, HStack, Image, Text, VStack } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';

import { DownloadFillIcon, Logo, PlayIcon } from '../../../assets/svg';
import { Button, Screen } from '../../../components';
import { THEME } from '../../../config/theme';
import { MovieDetailsProps } from '../../../types/screens';
import BasicInfo from './BasicInfo';
import MovieTab from './MovieTab';
import SecondaryInfo from './SecondaryInfo';

const { width } = Dimensions.get('screen');

const Details = ({ route }: MovieDetailsProps) => {
  const { movie, image, credits } = route.params;
  return (
    <Screen>
      {!!image ? (
        <Image
          source={{ uri: image }}
          w={width}
          h={(width * 9) / 16}
          alt={movie?.title || 'Movie Image'}
        />
      ) : (
        <Center w={width} h={width}>
          <Logo width={width / 2} height={width / 2} />
        </Center>
      )}
      <VStack p={5}>
        <BasicInfo movie={movie} />

        {/* <HStack mb={4}>
          <Button
            leftIcon={<PlayIcon color={colors.white} width={sizes[5]} height={sizes[5]} />}
            shadow="none"
            h="10"
            flex={1}
            mr="2"
          >
            <Text fontSize={'lg'} color={colors.white} fontFamily="heading" lineHeight={20}>
              Play
            </Text>
          </Button>

          <Button
            leftIcon={
              <DownloadFillIcon color={colors.primary[500]} width={sizes[5]} height={sizes[5]} />
            }
            shadow="none"
            h="10"
            flex={1}
            bg={colors.transparent}
            borderWidth={2}
            borderColor={colors.primary[500]}
            _pressed={{
              bg: 'primary.100',
            }}
          >
            <Text fontSize={'lg'} color={colors.primary[500]} fontFamily="heading" lineHeight={20}>
              Download
            </Text>
          </Button>
        </HStack> */}

        <SecondaryInfo movie={movie} credits={credits} />
        <MovieTab movie={movie} />
      </VStack>
    </Screen>
  );
};

export default Details;
