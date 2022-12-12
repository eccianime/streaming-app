import { ReactNode } from 'react';
import { GenreProps, MovieProps, MoviePropsExtended } from './components';
import { PersonProps } from './dto';

export type UserProps = {
  name: string;
  avatarUrl: string;
};

export type ProviderProps = {
  children: ReactNode;
};

export type AuthContextProps = {
  user: UserProps;
  signIn: () => Promise<void>;
};

export type HomeContextProps = {
  genres: GenreProps[];
  latestMovie?: MovieProps;
  popularMovies: MovieProps[];
  topRatedMovies: MovieProps[];
};

export type AppContextProps = {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
};

export type MovieContextProps = {
  getMovieDetails: (movie_id: string) => Promise<MoviePropsExtended>;
  backdropImage: string;
  credits: PersonProps[];
};
