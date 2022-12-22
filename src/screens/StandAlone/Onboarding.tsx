import { Text, View, VStack, Image } from 'native-base';
import React, { useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Button } from '../../components';
import { useAppNavigation } from '../../types/navigation';
import SplashImage from '../../assets/images/splashdark.png';

const { width, height } = Dimensions.get('screen');

const Onboarding = () => {
  const slides = [
    { title: 'Welcome to Mova', subtitle: 'This is a simple Movie and Series trailer app' },
    {
      title: 'Movies And Series Trailers',
      subtitle: 'In here you can watch movies and series trailers directly on your phone',
    },
    {
      title: 'Downloads soon',
      subtitle: "In the next releases, you'll be able to download videos",
    },
  ];
  const AppIntroSliderRef = useRef<typeof AppIntroSlider>(null);
  const [currentScreen, setCurrentScreen] = useState<number>(0);
  const navigation = useAppNavigation();
  return (
    <>
      <Image
        position={'absolute'}
        left={0}
        top={0}
        w={width}
        h={height}
        source={SplashImage}
        alt={'Background Image'}
      />
      <AppIntroSlider
        ref={AppIntroSliderRef}
        style={{ flexGrow: 1 }}
        onSlideChange={(to: number) => setCurrentScreen(to)}
        data={slides}
        renderPagination={() => null}
        renderItem={({
          item,
          index,
        }: {
          item: { title: string; subtitle: string };
          index: number;
        }) => (
          <VStack flexGrow={1} alignItems="center" justifyContent="center" p={5}>
            <Text textAlign="center" fontSize="4xl" fontFamily="heading" color={'white'}>
              {item.title}
            </Text>
            <Text textAlign="center" fontSize="lg" fontFamily="heading" mt="8" color={'white'}>
              {item.subtitle}
            </Text>
            <View flexDirection="row" alignSelf="center" pt={'5'}>
              <View
                mr={1}
                h={2.5}
                w={index === 0 ? 8 : 2.5}
                bg={index === 0 ? 'primary.500' : 'gray.200'}
                borderRadius={20}
              />
              <View
                mr={1}
                h={2.5}
                w={index === 1 ? 8 : 2.5}
                bg={index === 1 ? 'primary.500' : 'gray.200'}
                borderRadius={20}
              />
              <View
                mr={1}
                h={2.5}
                w={index === 2 ? 8 : 2.5}
                bg={index === 2 ? 'primary.500' : 'gray.200'}
                borderRadius={20}
              />
            </View>
            <Button
              mt={'8'}
              onPress={() => {
                if (currentScreen < 2) {
                  AppIntroSliderRef.current?.goToSlide(currentScreen + 1);
                  setCurrentScreen(currentScreen + 1);
                } else {
                  navigation.navigate('Auth', { screen: 'Lets In' });
                }
              }}
            >
              <Text color="white" fontFamily="heading" fontSize="lg">
                Get Started
              </Text>
            </Button>
          </VStack>
        )}
      />
    </>
  );
};

export default Onboarding;
