import React from 'react';
import { LatestMovie, MovieHList, Screen } from '../../components';
import { THEME } from '../../config/theme';
import { useHomeContext } from '../../contexts/home';
import { MovieProps } from '../../types/components';
import { useAppNavigation } from '../../types/navigation';

const Home = () => {
  const { space } = THEME;
  const { topRatedMovies, popularMovies } = useHomeContext();
  const navigation = useAppNavigation();
  
  const navigateToListDetails = (title: string, movies: MovieProps[]) => {
    navigation.navigate('Movie', { screen: 'List Details', params: { movies, title }})
  }
  return (
    <Screen contentContainerStyle={{ paddingBottom: space[5] }}>
      <LatestMovie />
      <MovieHList
        movies={topRatedMovies.slice(0,5)}
        title='Top Rated Movies'
        goToDetails={(title) => navigateToListDetails(title, topRatedMovies)}
      />
      <MovieHList
        movies={popularMovies.slice(0,5)}
        title='New Releases'
        goToDetails={(title) => navigateToListDetails(title, popularMovies)}
      />
    </Screen>
  )
}

export default Home