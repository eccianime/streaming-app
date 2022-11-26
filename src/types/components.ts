import { IInputProps } from 'native-base';
import { IViewProps } from 'native-base/lib/typescript/components/basic/View/types';
import { StyleProp, ViewStyle } from 'react-native';
import { ImageResultProps } from './dto';

export type InputProps =  IInputProps & {
    label?: string;
    viewStyle?: StyleProp<ViewStyle>;
}

export type SimpleHeaderProps = IViewProps & {
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

export type MoviePropsExtended = MovieProps & {
    // belongs_to_collection: null,
    budget: number;
    genres: GenreProps[];
    homepage: string;
    imdb_id: string;
    production_companies: ProducerProps[];
    revenue: number;
    runtime: number;
    spoken_languages: LanguageProps[],
    status: 'Rumored' | 'Planned' | 'In Production' | 'Post Production' | 'Released' | 'Canceled';
    tagline: string;
    images: ImageResultProps;
}

export type ProducerProps = {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
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

export type LanguageProps = {
    iso_639_1: string;
    name: string;
}