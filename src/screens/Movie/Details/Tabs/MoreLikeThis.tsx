import { Center, ScrollView, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { Movie } from '../../../../components';
import { MiniLoading } from '../../../../components/common/MiniLoading';

import { THEME } from '../../../../config/theme';
import { getFromMovies } from '../../../../services/tmdb';
import { MovieProps, MoviePropsExtended } from '../../../../types/components';

const MoreLikeThis = ({ movie }: { movie: MoviePropsExtended }) => {
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
        <MiniLoading />
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

export default MoreLikeThis;
