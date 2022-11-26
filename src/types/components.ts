import { IInputProps } from 'native-base';
import { StyleProp, ViewStyle } from 'react-native';

export type InputProps =  IInputProps & {
    label?: string;
    viewStyle?: StyleProp<ViewStyle>;
}

export type SimpleHeaderProps = {
    title: string;
    hasBackButton?: boolean | (() => void);
}

export type MovieProps = {
    poster_path: string | null;
    adult: boolean;
    overview: string;
    release_date: string;
    genre_ids: number[];
    genre_names?: string[];
    id: number;
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path: string | null;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
}

export type GenreProps = {
    id: number;
    name: string;
}

export type MovieItemProps = {
    data: MovieProps;
    h?: number;
    w?: number;
}

export type MovieHListProps = {
    movies: MovieProps[];
    title: string;
    goToDetails: (title: string) => void;
}