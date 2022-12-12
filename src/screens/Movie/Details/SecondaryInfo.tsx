import { FlatList, HStack, Image, Pressable, Text, View, VStack } from 'native-base';
import React, { useCallback, useState } from 'react';
import { NativeSyntheticEvent, TextLayoutEventData } from 'react-native';

import { IMAGE_BASE_URL } from '../../../services/tmdb';
import { MoviePropsExtended } from '../../../types/components';
import { PersonProps } from '../../../types/dto';

const SecondaryInfo = ({
  movie,
  credits,
}: {
  movie: MoviePropsExtended;
  credits: PersonProps[];
}) => {
  const NUM_OF_LINES = 3;
  const [loadMore, setLoadMore] = useState(false);
  const [numOfLines, setNumOfLines] = useState(0);

  const onTextLayout = useCallback((event: NativeSyntheticEvent<TextLayoutEventData>) => {
    if (numOfLines === 0) setNumOfLines(event.nativeEvent.lines.length);
  }, []);

  const onLoadMoreToggle = () => {
    setLoadMore(!loadMore);
  };
  return (
    <>
      <Text color={'gray.900'} fontFamily="mono" fontSize={16} mb={3}>{`Genre: ${movie?.genres
        .map((genre) => genre.name)
        .join(', ')}`}</Text>
      <Text
        numberOfLines={numOfLines == 0 ? undefined : loadMore ? numOfLines : NUM_OF_LINES}
        onTextLayout={onTextLayout}
        color={'gray.900'}
        fontFamily="body"
        fontSize={'sm'}
        mb={numOfLines > NUM_OF_LINES ? 0 : 5}
      >
        {movie?.overview}
      </Text>
      {numOfLines > NUM_OF_LINES && (
        <Pressable onPress={onLoadMoreToggle} mb={5}>
          <Text color={'primary.500'} fontFamily="mono" fontSize={16}>{`View ${
            loadMore ? 'Less' : 'More'
          }`}</Text>
        </Pressable>
      )}

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={credits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <HStack mr={6}>
            {item?.profile_path ? (
              <Image
                mr={2}
                w={12}
                h={12}
                source={{ uri: IMAGE_BASE_URL + item.profile_path }}
                alt={item.name}
                borderRadius="full"
              />
            ) : (
              <View mr={2} w={12} h={12} bg="black" borderRadius="full" />
            )}
            <VStack>
              <Text color={'gray.900'} fontFamily="mono" fontSize={12} lineHeight={'xs'} mb={1}>{`${
                item.name.split(' ')[0]
              }\n${item.name.split(' ')[1]}`}</Text>
              <Text color={'gray.500'} fontFamily="body" fontSize={12}>
                {item?.job ? item.job : 'Cast'}
              </Text>
            </VStack>
          </HStack>
        )}
      />
    </>
  );
};

export default SecondaryInfo;
