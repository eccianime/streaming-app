import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { DateTime } from 'luxon';
import { Center, HStack, Icon, Image, Pressable, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Dimensions, Modal } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Text } from '../../../../components';

import { MiniLoading } from '../../../../components/common/MiniLoading';
import { THEME } from '../../../../config/theme';
import { getFromMovies, getFromSeries } from '../../../../services/tmdb';
import { MoviePropsExtended } from '../../../../types/components';
import { VideoProps } from '../../../../types/dto';

const { width, height } = Dimensions.get('screen');
const { colors } = THEME;

const Trailers = ({ movie }: { movie: MoviePropsExtended }) => {
  const [currentVideos, setCurrentVideos] = useState<VideoProps[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [videoModalKey, setVideoModalKey] = useState<undefined | string>(undefined);

  useEffect(() => {
    (async () => {
      if (movie?.id) {
        setLoading(true);
        const response = movie?.number_of_episodes
          ? await getFromSeries(`${movie?.id}/videos`)
          : await getFromMovies(`${movie?.id}/videos`);
        setCurrentVideos(response.results.filter((video: VideoProps) => video.site === 'YouTube'));
        setLoading(false);
      }
    })();
  }, [movie]);

  return (
    <>
      {Boolean(videoModalKey) && (
        <Modal visible>
          <StatusBar hidden />
          <VStack position={'absolute'} left={0} top={0} w={width} h={height}>
            <Pressable bg="black" flexGrow={1} onPress={() => setVideoModalKey(undefined)} />
            <YoutubePlayer
              width={width}
              height={(width * 9) / 16}
              play={true}
              videoId={videoModalKey}
            />
            <Pressable bg="black" flexGrow={1} onPress={() => setVideoModalKey(undefined)} />
          </VStack>
        </Modal>
      )}
      {isLoading ? (
        <MiniLoading />
      ) : !!currentVideos.length ? (
        currentVideos.map((video) => (
          <Pressable
            android_ripple={{
              color: colors.white,
              foreground: true,
            }}
            onPress={() => setVideoModalKey(video.key)}
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
                <Text fontFamily="heading" fontSize={'sm'} lineHeight={'xs'} numberOfLines={2}>
                  {video.name}
                </Text>
                <HStack justifyContent={'space-between'} w="full" alignItems={'center'}>
                  <Text fontFamily="body" fontSize={'sm'}>
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
          <Text fontSize={'md'} fontFamily={'heading'}>
            There are no related videos
          </Text>
        </Center>
      )}
    </>
  );
};

export default Trailers;
