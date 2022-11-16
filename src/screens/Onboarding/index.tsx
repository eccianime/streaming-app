import { Text, View, VStack } from 'native-base';
import React, { useRef, useState } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Button } from '../../components';
import { useAppNavigation } from '../../types/navigation';

const Onboarding = () => {
  const slides = [
      { title: 'Welcome to Mova', subtitle: 'The best movie streaming app of the century\nto make your days great' },
      { title: 'Welcome to Mova', subtitle: 'The best movie streaming app of the century\nto make your days great' },
      { title: 'Welcome to Mova', subtitle: 'The best movie streaming app of the century\nto make your days great' },
  ]
  const AppIntroSliderRef = useRef<AppIntroSlider>(null);
  const [currentScreen, setCurrentScreen] = useState<number>(0);
  const navigation = useAppNavigation();
  return (
      <AppIntroSlider
          ref={AppIntroSliderRef}
          style={{ flexGrow: 1 }}
          onSlideChange={(to: number) => setCurrentScreen(to)}
          data={slides}
          renderPagination={(activeIndex: number) => (
              <View flexDirection='row' alignSelf='center' position='absolute' bottom={'24'}>
                  <View mr={1} h={2.5} w={activeIndex === 0 ? 8 : 2.5} bg={ activeIndex === 0 ? 'primary.500' : 'gray.200'} borderRadius={20} />
                  <View mr={1} h={2.5} w={activeIndex === 1 ? 8 : 2.5} bg={ activeIndex === 1 ? 'primary.500' : 'gray.200'} borderRadius={20} />
                  <View mr={1} h={2.5} w={activeIndex === 2 ? 8 : 2.5} bg={ activeIndex === 2 ? 'primary.500' : 'gray.200'} borderRadius={20} />
              </View>
          )}
          renderItem={({ item }: { item: { title: string; subtitle: string } }) => (
              <VStack bg='black' flexGrow={1} alignItems='center' justifyContent='flex-end' p={5}>
                  {/* <Image source={item.image} style={{ width, height: width * 2/3, }} alt={item.text} /> */}
                  <Text textAlign='center' fontSize='4xl' fontFamily='heading' color={'white'} >{item.title}</Text>
                  <Text textAlign='center' fontSize='md' fontFamily='body' mt='8' color={'white'} >{item.subtitle}</Text>
                  <Button
                      mt={'16'}
                      onPress={() => {
                          if( currentScreen < 2 ){
                              AppIntroSliderRef.current?.goToSlide(currentScreen + 1)
                              setCurrentScreen(currentScreen + 1)
                          }else{
                              navigation.navigate('Auth', { screen: 'Lets In' })
                          }
                      }}
                  ><Text color='white' fontFamily='heading' fontSize='lg'>Get Started</Text></Button>
              </VStack>
          )}
      />
  )
}

export default Onboarding