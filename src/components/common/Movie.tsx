import { StackActions } from '@react-navigation/native';
import { Center, Image, Pressable, Text } from 'native-base';
import React from 'react';
import { Logo } from '../../assets/svg';
import { THEME } from '../../config/theme';
import { useAppContext } from '../../contexts/app';
import { getFromMovies, IMAGE_BASE_URL } from '../../services/tmdb';
import { MovieItemProps } from '../../types/components';
import { CreditResultProps, ImageResultProps } from '../../types/dto';
import { useAppNavigation } from '../../types/navigation';

const Movie = ({ data, h, w }: MovieItemProps) => {
  const { setLoading } = useAppContext();
  const { colors } = THEME;
  const navigation = useAppNavigation();

  const handleGetMovieDetails = async () => {
    setLoading(true);

    setLoading(true);
    const detailsResult = await getFromMovies(`${data.id}?append_to_response=images,credits`);

    const targetImage = (detailsResult.images as ImageResultProps).backdrops.find(
      (image) => image.iso_639_1 === 'en'
    )?.file_path;

    const { cast } = detailsResult.credits as CreditResultProps;

    setLoading(false);

    navigation.dispatch(
      StackActions.push('Movie', {
        screen: 'Details',
        params: {
          movie: detailsResult,
          image: IMAGE_BASE_URL + (targetImage ? targetImage : detailsResult.poster_path),
          credits: cast.slice(0, 10),
        },
      })
    );
  };
  return (
    <Pressable
      w={w || 36}
      h={h || 48}
      onPress={handleGetMovieDetails}
      android_ripple={{ foreground: true, color: colors.black }}
      _pressed={{
        bg: colors.backdrop,
      }}
    >
      {!!data?.poster_path ? (
        <Image
          source={{ uri: IMAGE_BASE_URL + data.poster_path }}
          w={w || 36}
          h={h || 48}
          alt="movie"
          borderRadius={'xl'}
        />
      ) : (
        <Center w={w || 36} h={h || 48} borderRadius={'xl'}>
          <Logo width={100} height={100} />
        </Center>
      )}
      <Center
        position={'absolute'}
        top={3}
        left={3}
        w="10"
        h="6"
        bg={'primary.500'}
        borderRadius="md"
      >
        <Text fontSize={'sm'} fontFamily="body" color={'white'}>
          {parseInt((data.vote_average * 100).toFixed(0)) / 100}
        </Text>
      </Center>
    </Pressable>
  );
};

export default Movie;
