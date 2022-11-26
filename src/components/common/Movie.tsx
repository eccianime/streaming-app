import { Center, Image, Pressable, Text } from 'native-base';
import React from 'react';
import { Logo } from '../../assets/svg';
import { THEME } from '../../config/theme';
import { IMAGE_BASE_URL } from '../../services/tmdb';
import { MovieItemProps } from '../../types/components';
import { useAppNavigation } from '../../types/navigation';

const Movie = ({ data, h, w }: MovieItemProps) => {
    const { colors } = THEME;
    const navigation = useAppNavigation();
    return (
        <Pressable
            w={w || 36} h={h || 48}
            onPress={() => {
                navigation.navigate('Movie', { screen: 'Details', params: { movie: data } })
            }}
            android_ripple={{ foreground: true, color: colors.black }}
            _pressed={{
                bg: colors.backdrop
            }}>
            {
                !!data?.backdrop_path ?
                <Image
                    source={{ uri: IMAGE_BASE_URL + data.backdrop_path }}
                    shadow={9}
                    w={w || 36} 
                    h={h || 48} 
                    alt='movie' 
                    borderRadius={'xl'}
                /> :
                <Center w={w || 36} h={h || 48} bg={'white'} shadow={9} borderRadius={'xl'}>
                    <Logo width={100} height={100} />
                </Center>
            }
            <Center position={'absolute'} top={3} left={3} w='10' h='6' bg={'primary.500'} borderRadius='md'>
                <Text fontSize={'sm'} fontFamily='body' color={'white'}>{data.vote_average}</Text>
            </Center>
        </Pressable>
    )
}

export default Movie