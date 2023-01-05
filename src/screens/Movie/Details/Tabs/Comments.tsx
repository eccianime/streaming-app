import { Center, HStack, Image, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Text } from '../../../../components';
import { MiniLoading } from '../../../../components/common/MiniLoading';

import { getFromMovies, IMAGE_BASE_URL } from '../../../../services/tmdb';
import { MoviePropsExtended, ReviewProps } from '../../../../types/components';

const Comments = ({ movie }: { movie: MoviePropsExtended }) => {
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
        <MiniLoading />
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
              <Text ml={5} fontFamily="heading" fontSize={'md'}>
                {review.author}
              </Text>
            </HStack>
            <Text fontFamily="body" fontSize={'xs'} mb={5}>
              {review.content}
            </Text>
          </VStack>
        ))
      ) : (
        <Center>
          <Text fontSize={'md'} fontFamily={'heading'}>
            There are no reviews for this movie
          </Text>
        </Center>
      )}
    </VStack>
  );
};

export default Comments;
