import { HStack, Image, Pressable, ScrollView, Text, VStack, Button } from 'native-base'
import React from 'react'
import { THEME } from '../../config/theme'
import { MovieHListProps } from '../../types/components'
import { useAppNavigation } from '../../types/navigation'

const MovieHList = ({ movies, title }: MovieHListProps) => {
    const { colors } = THEME;
    const navigation = useAppNavigation();

    const navigateToListDetails = () => {
        navigation.navigate('Movie', { screen: 'List Details', params: { movies, title }})
    }
    return (
        <VStack bg={'white'} flex={1} pt={5}>
            <HStack px={5} pb={5} justifyContent={'space-between'} alignItems='center'>
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
                    <Pressable 
                        onPress={() => {
                            navigation.navigate('Movie', { screen: 'Details', params: { movie } })
                        }}
                        android_ripple={{ foreground: true, color: colors.black }}
                        _pressed={{
                            bg: colors.backdrop
                        }} 
                        key={Math.random()} 
                        mr='2' ml={!index ? 5 : 0 }>
                        <Image source={movie.imageUrl} w={36} h={48} alt='movie' borderRadius={'xl'} />
                    </Pressable>
                ) )
                }
            </ScrollView>
        </VStack>
    )
}

export default MovieHList