import {
  NavigationProp,
  NavigatorScreenParams,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MovieProps, MoviePropsExtended } from './components';
import { PersonProps } from './dto';

// ========== Home ==========

export type ProfileNavigationParams = {
  'Option List': undefined;
  Subscribe: undefined;
  Payment: undefined;
  'Card Details': undefined;
  Edit: undefined;
  Notification: undefined;
  Download: undefined;
  Security: undefined;
  Language: undefined;
  'Privacy Policy': undefined;
  'Help Center': undefined;
};

// ========== Account ==========

export type AccountNavigationParams = {
  Home: undefined;
  Explore: undefined;
  'My List': undefined;
  Download: undefined;
  Profile: NavigatorScreenParams<ProfileNavigationParams>;
};

export type AccountNavigation = NavigationProp<AccountNavigationParams>;

// ========== Auth ==========

export type AuthNavigationParams = {
  'Lets In': undefined;
  'Create Account': undefined;
  Login: undefined;
  'Forgot Password': undefined;
  'Code Sent': undefined;
  'Create Password': undefined;
};

// ========== Account Setup ==========

export type AccountSetupNavigationParams = {
  'Choose Interest': { userId: string };
  'Fill Profile': { userId: string };
  'Create PIN': undefined;
  'Set Fingerprint': undefined;
};

export type AccountSetupRouting<Screen extends keyof AccountSetupNavigationParams> = RouteProp<
  AccountSetupNavigationParams,
  Screen
>;

// ========== Movie Details ==========

export type MovieNavigationParams = {
  'List Details': { movies: MovieProps[]; title: string };
  Details: { movie: MoviePropsExtended; credits: PersonProps[]; image?: string };
  'Comment List': undefined;
  Player: undefined;
};

// ========== App ==========

export type AppNavigationParams = {
  Onboarding: undefined;
  Auth: NavigatorScreenParams<AuthNavigationParams>;
  'Account Setup': NavigatorScreenParams<AccountSetupNavigationParams>;
  Account: NavigatorScreenParams<AccountNavigationParams>;
  Notifications: undefined;
  Movie: NavigatorScreenParams<MovieNavigationParams>;
};

export type AppNavigation = StackNavigationProp<AppNavigationParams>;

export const useAppNavigation = () => useNavigation<AppNavigation>();
