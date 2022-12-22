import React from 'react';
import { LatestMovie, MovieHList, Screen } from '../../components';
import { THEME } from '../../config/theme';
import { useAppContext } from '../../contexts/app';
import { useHomeContext } from '../../contexts/home';
import { MovieProps } from '../../types/components';
import { useAppNavigation } from '../../types/navigation';

const Home = () => {
  const { space } = THEME;
  const { topRatedMovies, popularMovies, popularSeries, topRatedSeries } = useHomeContext();
  const { isLoading } = useAppContext();
  const navigation = useAppNavigation();

  const navigateToListDetails = (title: string, movies: MovieProps[]) => {
    navigation.navigate('Movie', { screen: 'List Details', params: { movies, title } });
  };
  if (isLoading) {
    return null;
  }
  return (
    <Screen contentContainerStyle={{ paddingBottom: space[5] }}>
      <LatestMovie />
      <MovieHList
        movies={popularMovies.slice(0, 5)}
        title="New Movie Releases"
        goToDetails={(title) => navigateToListDetails(title, popularMovies)}
      />
      <MovieHList
        movies={popularSeries.slice(0, 5)}
        title="New Series Releases"
        goToDetails={(title) => navigateToListDetails(title, popularSeries)}
        isSeries
      />
      <MovieHList
        movies={topRatedMovies.slice(0, 5)}
        title="Top Rated Movies"
        goToDetails={(title) => navigateToListDetails(title, topRatedMovies)}
      />
      <MovieHList
        movies={topRatedSeries.slice(0, 5)}
        title="Top Rated Series"
        goToDetails={(title) => navigateToListDetails(title, topRatedSeries)}
        isSeries
      />
    </Screen>
  );
};

export default Home;
