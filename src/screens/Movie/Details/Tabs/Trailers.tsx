import { Ionicons } from '@expo/vector-icons';
import { DateTime } from 'luxon';
import { Center, HStack, Icon, Image, Pressable, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { MiniLoading } from '../../../../components/common/MiniLoading';

import { THEME } from '../../../../config/theme';
import { getFromMovies } from '../../../../services/tmdb';
import { MoviePropsExtended } from '../../../../types/components';
import { VideoProps } from '../../../../types/dto';

const { width } = Dimensions.get('screen');
const { colors } = THEME;

const Trailers = ({ movie }: { movie: MoviePropsExtended }) => {
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
        <MiniLoading />
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
      ) : (
        <Center flexGrow={1}>
          <Text color={'gray.900'} fontSize={'md'} fontFamily={'heading'}>
            There are no related videos
          </Text>
        </Center>
      )}
    </>
  );
};

export default Trailers;
