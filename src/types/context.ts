import { ReactNode } from 'react';
import { GenreProps, MovieProps, MoviePropsExtended } from './components';
import { PersonProps } from './dto';

export type UserProps = {
  id: string;
  name: string;
  nickName: string;
  email: string;
  interest: GenreProps[];
  phoneNumber: string;
  avatarUrl: string;
};

export type ProviderProps = {
  children: ReactNode;
};

export type AuthContextProps = {
  user: UserProps;
  signIn: (email: string, pass: string) => Promise<void>;
  addInterests: (interest: GenreProps[]) => Promise<void>;
  fillProfile: (profileForm: { [x: string]: string }) => Promise<void>;
};

export type HomeContextProps = {
  genres: GenreProps[];
  latestMovie?: MovieProps;
  popularMovies: MovieProps[];
  popularSeries: MovieProps[];
  topRatedMovies: MovieProps[];
  topRatedSeries: MovieProps[];
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

export type MyListContextProps = {
  myList: MoviePropsExtended[];
  addOrRemoveFromMyList: (movie: MoviePropsExtended) => Promise<void>;
};
