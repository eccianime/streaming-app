import { ScrollView, View, VStack } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';

import { Movie, SimpleHeader } from '../../components';
import { THEME } from '../../config/theme';
import { ListDetailsProps } from '../../types/screens';

const { width } = Dimensions.get('screen');

const ListDetails = ({ route }: ListDetailsProps) => {
  const { title, movies } = route.params;
  const { space } = THEME;
  const imageWidth = width / 2 - 25;
  const imageHeight = imageWidth * 4/3
  return (
    <VStack flexGrow={1} px={5} pt={5}>
      <SimpleHeader title={title} hasBackButton />
      <ScrollView flex={1} showsVerticalScrollIndicator={false} contentContainerStyle={{
        flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingBottom: space[4]
      }}>
      {
        movies.map( (movie) => (
          <View mb={2} key={movie.id} >
            <Movie data={movie} w={imageWidth} h={imageHeight} />
          </View>
        ) )
      }
      </ScrollView>
    </VStack>
  )
}

export default ListDetails