import { HStack, Pressable, Text, VStack } from 'native-base';
import { useState } from 'react';
import { THEME } from '../../../config/theme';
import { Comments, MoreLikeThis, Trailers } from './TabBar';

const MovieTab = () => {
    const { colors } = THEME;
    const [currentTab, setCurrentTab] = useState(0);
    const tabs = [
        'Trailers',
        'More Like This',
        'Reviews'
    ]
    return (
        <VStack>
            <HStack mb={5} my={3} w='full' justifyContent={'space-between'}>
                {
                    tabs.map( (item, index) => (
                        <Pressable
                            android_ripple={{
                                color: colors.primary[500],
                                foreground: true,
                            }} 
                            py={2}
                            flex={1}
                            borderBottomColor={index === currentTab ? 'primary.500' : 'gray.400'}
                            borderBottomWidth={index === currentTab ? 3 : 1}
                            key={Math.random()}
                            onPress={() => setCurrentTab(index)}>
                            <Text
                                color={index === currentTab ? 'primary.500' : 'gray.400'}
                                fontFamily={'heading'}
                                textAlign='center'
                                fontSize={'md'}>{item}</Text>
                        </Pressable>
                    ) )
                }
            </HStack>
            {
                currentTab === 0 ? <Trailers /> : 
                currentTab === 1 ? <MoreLikeThis /> :
                <Comments />
            }
        </VStack>
    );
}

export default MovieTab;
