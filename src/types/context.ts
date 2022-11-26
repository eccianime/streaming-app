import { ReactNode } from 'react';
import { GenreProps, MovieProps } from './components';

export type UserProps = {
    name: string;
    avatarUrl: string;
}

export type ProviderProps = {
    children: ReactNode;
}

export type AuthContextProps = {
    user: UserProps;
    signIn: () => Promise<void>;
    isUserLoading: boolean;
}

export type HomeContextProps = {
    latestMovie?: MovieProps;
    popularMovies: MovieProps[];
    topRatedMovies: MovieProps[];
}

export type AppContextProps = {
    genres: GenreProps[];
    attachGenreName: (movies: MovieProps[]) => MovieProps[]
}
