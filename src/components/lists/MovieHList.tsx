import { Button, HStack, ScrollView, Text, View, VStack } from 'native-base'
import React from 'react'
import { THEME } from '../../config/theme'
import { MovieHListProps } from '../../types/components'
import Movie from '../common/Movie'

const MovieHList = ({ movies, title, goToDetails }: MovieHListProps) => {
    const { colors } = THEME;

    const navigateToListDetails = () => {
        goToDetails(title);
    }
    return (
        <VStack bg={'white'} flex={1} pt={3}>
            <HStack px={5} pb={3} justifyContent={'space-between'} alignItems='center'>
                <Text
                    color={'gray.900'}
                    fontFamily='heading'
                    fontSize={'lg'}>{title}</Text>
                <Button
                    bg={colors.white}
                    _pressed={{
                        bg: colors.primary[100]
                    }}
                    onPress={navigateToListDetails}>
                    <Text
                        color={'primary.500'}
                        fontFamily='mono'
                        fontSize={'sm'}>See All</Text>
                </Button>
            </HStack>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {
                movies.map( (movie, index) => (
                    <View key={movie.id} mr={2} ml={!index ? 5 : 0 }>
                        <Movie data={movie} />
                    </View>
                ) )
                }
            </ScrollView>
        </VStack>
    )
}

export default MovieHList