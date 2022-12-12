import { Ionicons } from '@expo/vector-icons';
import { DateTime } from 'luxon';
import {
  Center,
  HStack,
  Icon,
  Image,
  Pressable,
  Spinner,
  Text,
  View,
  VStack,
  ScrollView,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { Movie } from '../../../components';

import { THEME } from '../../../config/theme';
import { getFromMovies, IMAGE_BASE_URL } from '../../../services/tmdb';
import { MovieProps, MoviePropsExtended, ReviewProps } from '../../../types/components';
import { VideoProps } from '../../../types/dto';

const { width } = Dimensions.get('screen');
const { colors } = THEME;

export const Trailers = ({ movie }: { movie: MoviePropsExtended }) => {
  const [currentVideos, setCurrentVideos] = useState<VideoProps[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (movie?.id) {
        setLoading(true);
        const response = await getFromMovies(`${movie?.id}/videos`);
        setCurrentVideos(response.results);
        setLoading(false);
      }
    })();
  }, [movie]);

  return (
    <>
      {isLoading ? (
        <Center flexGrow={1}>
          <Spinner color="primary.500" size={40} />
        </Center>
      ) : !!currentVideos.length ? (
        currentVideos.map((video) => (
          <Pressable
            android_ripple={{
              color: colors.white,
              foreground: true,
            }}
            key={video.id}
            mb={3}
          >
            <HStack>
              <Center>
                <Image
                  rounded={'md'}
                  w={width * 0.3}
                  h={(width * 0.3 * 9) / 16}
                  alt={video.name}
                  source={{ uri: `https://img.youtube.com/vi/${video.key}/default.jpg` }}
                />
                <Icon
                  as={<Ionicons name="play-circle" />}
                  color="white"
                  size={8}
                  position={'absolute'}
                />
              </Center>
              <VStack ml={5} justifyContent="space-between" flex={1}>
                <Text
                  color={'gray.900'}
                  fontFamily="heading"
                  fontSize={'sm'}
                  lineHeight={'xs'}
                  numberOfLines={2}
                >
                  {video.name}
                </Text>
                <HStack justifyContent={'space-between'} w="full" alignItems={'center'}>
                  <Text color={'gray.700'} fontFamily="body" fontSize={'sm'}>
                    {DateTime.fromISO(video.published_at).toFormat('dd/LL/yyyy')}
                  </Text>
                  {video.official && (
                    <Text
                      bg="primary.500"
                      color={'white'}
                      fontFamily="heading"
                      fontSize={'xs'}
                      px={2}
                      py={1}
                      rounded="full"
                    >
                      Official
                    </Text>
                  )}
                </HStack>
              </VStack>
            </HStack>
          </Pressable>
        ))
      ) : null}
    </>
  );
};

export const MoreLikeThis = ({ movie }: { movie: MoviePropsExtended }) => {
  const [similar, setSimilar] = useState<MovieProps[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (movie?.id) {
        setLoading(true);
        const response = await getFromMovies(`${movie?.id}/similar`);
        setSimilar(response.results);
        setLoading(false);
      }
    })();
  }, [movie]);

  const { space } = THEME;
  const { width } = Dimensions.get('screen');
  const imageWidth = width / 2 - 25;
  const imageHeight = (imageWidth * 4) / 3;
  return (
    <ScrollView
      flex={1}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingBottom: space[5],
      }}
    >
      {isLoading ? (
        <Center flexGrow={1}>
          <Spinner color="primary.500" size={40} />
        </Center>
      ) : !!similar.length ? (
        similar.map((movie) => (
          <View mb={2} key={movie.id}>
            <Movie data={movie} w={imageWidth} h={imageHeight} />
          </View>
        ))
      ) : (
        <Center>
          <Text color={'gray.900'} fontSize={'md'} fontFamily={'heading'}>
            There are no related movies
          </Text>
        </Center>
      )}
    </ScrollView>
  );
};

export const Comments = ({ movie }: { movie: MoviePropsExtended }) => {
  const [reviews, setReviews] = useState<ReviewProps[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (movie?.id) {
        setLoading(true);
        const response = await getFromMovies(`${movie?.id}/reviews`);
        setReviews(response.results);
        setLoading(false);
      }
    })();
  }, [movie]);

  return (
    <VStack>
      {isLoading ? (
        <Center flexGrow={1}>
          <Spinner color="primary.500" size={40} />
        </Center>
      ) : reviews.length ? (
        reviews.map((review, index) => (
          <VStack key={review.id}>
            <HStack alignItems={'center'}>
              <Image
                w={'12'}
                h={'12'}
                rounded={'full'}
                source={{ uri: IMAGE_BASE_URL + review.author_details.avatar_path }}
                alt={review.author}
              />
              <Text ml={5} fontFamily="heading" fontSize={'md'} color={'gray.900'}>
                {review.author}
              </Text>
            </HStack>
            <Text color={'gray.900'} fontFamily="body" fontSize={'xs'} mb={5}>
              {review.content}
            </Text>
          </VStack>
        ))
      ) : (
        <Center>
          <Text color={'gray.900'} fontSize={'md'} fontFamily={'heading'}>
            There are no reviews for this movie
          </Text>
        </Center>
      )}
    </VStack>
  );
};
