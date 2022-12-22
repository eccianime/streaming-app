import { HStack, Pressable, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { Button, SimpleHeader } from '../../components';
import { THEME } from '../../config/theme';
import { useAuthContext } from '../../contexts/auth';
import { useHomeContext } from '../../contexts/home';
import { GenreProps } from '../../types/components';
import { AccountSetupRouting, useAppNavigation } from '../../types/navigation';

const ChooseInterest = ({ route }: { route: AccountSetupRouting<'Choose Interest'> }) => {
  const navigation = useAppNavigation();
  const { genres } = useHomeContext();
  const { addInterests } = useAuthContext();

  const [selectedGenres, setSelectedGenres] = useState<GenreProps[]>([]);
  const { colors } = THEME;

  const addRemoveGenre = (genre: GenreProps) => {
    const targetIndex = selectedGenres.findIndex((innerGenre) => innerGenre === genre);
    if (targetIndex > -1) {
      setSelectedGenres(selectedGenres.filter((innerGenre) => innerGenre !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };
  const navigateToHome = () => navigation.navigate('Account', { screen: 'Home' });

  const navigateToLogin = () => navigation.navigate('Auth', { screen: 'Login' });
  return (
    <VStack px={5} py={8}>
      <SimpleHeader title="Choose Your Interest" hasBackButton={navigateToLogin} />
      <Text fontFamily={'body'} color={'gray.900'} fontSize={'md'} mb={6}>
        {
          "Choose your interests and get the best movie recommendations. Don't worry, you can always change change it later."
        }
      </Text>
      <HStack flexWrap={'wrap'} mb={6}>
        {genres.map((genre) => (
          <Pressable
            onPress={() => addRemoveGenre(genre)}
            key={Math.random()}
            px={4}
            justifyContent="center"
            borderRadius={'full'}
            borderWidth={2}
            mb={4}
            mr={3}
            h={10}
            bg={selectedGenres.some((innerGenre) => innerGenre === genre) ? 'primary.500' : 'white'}
            borderColor={colors.primary[500]}
          >
            <Text
              fontFamily="mono"
              fontSize={'18'}
              color={
                selectedGenres.some((innerGenre) => innerGenre === genre) ? 'white' : 'primary.500'
              }
            >
              {genre.name}
            </Text>
          </Pressable>
        ))}
      </HStack>
      <HStack mb={5} justifyContent="space-between">
        <Button w={'45%'} bg={colors.primary[100]} shadow="0" onPress={navigateToHome}>
          <Text color={'primary.500'} fontFamily="heading" fontSize="lg">
            Skip
          </Text>
        </Button>
        <Button w={'45%'} onPress={() => addInterests(selectedGenres)}>
          <Text color="white" fontFamily="heading" fontSize="lg">
            Continue
          </Text>
        </Button>
      </HStack>
    </VStack>
  );
};

export default ChooseInterest;
