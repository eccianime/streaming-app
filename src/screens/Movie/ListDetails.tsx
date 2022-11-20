import { Image, Pressable, ScrollView, VStack } from 'native-base'
import React from 'react'
import { Dimensions } from 'react-native';

import { SimpleHeader } from '../../components'
import { THEME } from '../../config/theme'
import { useAppNavigation } from '../../types/navigation'
import { ListDetailsProps } from '../../types/screens'

const { width } = Dimensions.get('screen');

const ListDetails = ({ route }: ListDetailsProps) => {
  const { title, movies } = route.params;
  const navigation = useAppNavigation();
  const { space, colors } = THEME;
  const imageWidth = width / 2 - 25;
  const imageHeight = imageWidth * 4/3
  return (
    <VStack flexGrow={1} px={5} pt={5}>
      <SimpleHeader title={title} hasBackButton />
      <ScrollView flex={1} showsVerticalScrollIndicator={false} contentContainerStyle={{
        flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingBottom: space[4]
      }}>
      {
        movies.map( (movie, index) => (
          <Pressable 
            mb={2}
            onPress={() => {
              navigation.navigate('Movie', { screen: 'Details', params: { movie } })
            }}
              android_ripple={{ foreground: true, color: colors.black }}
              _pressed={{
                bg: colors.backdrop
              }} 
              key={Math.random()}>
              <Image source={movie.imageUrl} w={imageWidth} h={imageHeight} alt='movie' borderRadius={'xl'} />
          </Pressable>
        ) )
      }
      </ScrollView>
    </VStack>
  )
}

export default ListDetails