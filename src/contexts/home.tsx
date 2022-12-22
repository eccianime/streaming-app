import { createContext, useContext, useEffect, useState } from 'react';
import { getFromMovies, getFromSeries, getGenres } from '../services/tmdb';
import { GenreProps, MovieProps } from '../types/components';
import { HomeContextProps, ProviderProps } from '../types/context';
import { useAppContext } from './app';

const HomeContext = createContext({} as HomeContextProps);

const HomeProvider = ({ children }: ProviderProps) => {
  const { setLoading } = useAppContext();

  const [genres, setGenres] = useState<GenreProps[]>([]);
  const [popularMovies, setPopularMovies] = useState<MovieProps[]>([]);
  const [popularSeries, setPopularSeries] = useState<MovieProps[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<MovieProps[]>([]);
  const [topRatedSeries, setTopRatedSeries] = useState<MovieProps[]>([]);
  const [latestMovie, setLatestMovie] = useState<MovieProps | undefined>(undefined);

  const getHomeInfo = async () => {
    setLoading(true);
    const [
      movieGenreResult,
      tvGenreResult,
      popularMovies,
      popularSeries,
      topRatedMovies,
      topRatedSeries,
      latestMovie,
    ] = await Promise.all([
      getGenres('movie'),
      getGenres('tv'),
      getFromMovies('popular'),
      getFromSeries('popular'),
      getFromMovies('top_rated'),
      getFromSeries('top_rated'),
      getFromMovies('now_playing'),
    ]);
    const genresResult = [...movieGenreResult.genres, ...tvGenreResult.genres];
    setLoading(false);
    setGenres(genresResult as GenreProps[]);
    setPopularMovies(attachGenreName(popularMovies.results, genresResult) as MovieProps[]);
    setPopularSeries(attachGenreName(popularSeries.results, genresResult) as MovieProps[]);
    setTopRatedMovies(attachGenreName(topRatedMovies.results, genresResult) as MovieProps[]);
    setTopRatedSeries(attachGenreName(topRatedSeries.results, genresResult) as MovieProps[]);
    setLatestMovie(attachGenreName(latestMovie.results, genresResult)[0] as MovieProps);
  };

  const attachGenreName = (movies: MovieProps[], genres: GenreProps[]) => {
    let moviesCopy = [...movies];
    moviesCopy = moviesCopy.map((movie) => ({
      ...movie,
      genre_names: movie.genre_ids.map((genre) => {
        const targetGenre = genres.find((innerGenre) => innerGenre.id === genre);
        return targetGenre ? targetGenre.name : 'GENRE_NOT_FOUND';
      }),
    }));
    return moviesCopy;
  };

  useEffect(() => {
    getHomeInfo();
  }, []);

  return (
    <HomeContext.Provider
      value={{
        genres,
        latestMovie,
        popularMovies,
        topRatedMovies,
        popularSeries,
        topRatedSeries,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

function useHomeContext(): HomeContextProps {
  return useContext(HomeContext);
}

export { HomeProvider, useHomeContext };
