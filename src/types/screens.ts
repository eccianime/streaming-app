import { RouteProp } from '@react-navigation/native';
import { MovieNavigationParams } from './navigation';

export type ListDetailsProps = {
  route: RouteProp<MovieNavigationParams, 'List Details'>;
};

export type MovieDetailsProps = {
  route: RouteProp<MovieNavigationParams, 'Details'>;
};
