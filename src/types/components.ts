import { IInputProps } from 'native-base';
import { StyleProp, ViewStyle, ImageSourcePropType } from 'react-native';

export type InputProps =  IInputProps & {
    label?: string;
    viewStyle?: StyleProp<ViewStyle>;
}

export type SimpleHeaderProps = {
    title: string;
    hasBackButton?: boolean | (() => void);
}

export type MovieProps = {
    imageUrl: ImageSourcePropType,
    rating: number;
}

export type MovieHListProps = {
    movies: MovieProps[];
    title: string;
}