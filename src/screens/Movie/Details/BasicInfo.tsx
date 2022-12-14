import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Center, HStack, Icon, IconButton, Text } from 'native-base';
import React from 'react';

import { BookmarkFillIcon, BookmarkIcon, SendIcon } from '../../../assets/svg';
import { THEME } from '../../../config/theme';
import { useMyListContext } from '../../../contexts/myList';
import { MoviePropsExtended } from '../../../types/components';

const BasicInfo = ({ movie }: { movie: MoviePropsExtended }) => {
  const { colors } = THEME;
  const { myList, addOrRemoveFromMyList } = useMyListContext();
  return (
    <>
      <HStack alignItems={'center'} justifyContent="space-between" mb={2}>
        <Text
          flex={1}
          numberOfLines={1}
          color={colors.gray[900]}
          fontSize="2xl"
          fontFamily={'heading'}
        >
          {movie?.title}
        </Text>
        <HStack>
          <IconButton
            onPress={async () => {
              await addOrRemoveFromMyList(movie);
            }}
            icon={
              myList.some((item) => item.id === movie.id) ? (
                <BookmarkFillIcon width={20} height={20} color={colors.primary[500]} />
              ) : (
                <BookmarkIcon width={20} height={20} color={colors.gray[900]} />
              )
            }
            borderRadius="full"
          />
          <IconButton
            icon={<SendIcon width={20} height={20} color={colors.gray[900]} />}
            borderRadius="full"
          />
        </HStack>
      </HStack>

      <HStack mb={4} alignItems="center">
        <Icon as={<AntDesign name="star" />} size={5} color="primary.500" mr={2} />
        <Text color={'primary.500'} fontFamily="body" fontSize={16} mr={2}>
          {movie?.vote_average.toFixed(1)}
        </Text>
        <Icon
          as={<Ionicons name="chevron-forward-outline" />}
          size={5}
          color="primary.500"
          mr={2}
        />
        <Text color={'gray.900'} fontFamily="mono" fontSize={16} mr={2}>
          {movie?.release_date?.substring(0, 4)}
        </Text>
        <Center borderWidth={2} borderColor={'primary.500'} rounded="lg" px={2}>
          <Text color={'primary.500'} fontFamily="body" fontSize={16}>
            {movie?.original_language.toUpperCase()}
          </Text>
        </Center>
      </HStack>
    </>
  );
};

export default BasicInfo;
