import { NavigationProp, NavigatorScreenParams, useNavigation } from "@react-navigation/native";

// ========== Home ==========

export type HomeNavigationParams = {
    Base: undefined;
    'Top 10': undefined;
    'New Releases': undefined;
}

// ========== Home ==========

export type ProfileNavigationParams = {
    Base: undefined;
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
}

// ========== Account ==========

export type AccountNavigationParams = {
    Home: NavigatorScreenParams<HomeNavigationParams>;
    Explore: undefined;
    'My List': undefined;
    Download: undefined;
    Profile: NavigatorScreenParams<ProfileNavigationParams>;
}

export type AccountNavigation = NavigationProp<AccountNavigationParams>

// ========== Auth ==========

export type AuthNavigationParams = {
    'Lets In': undefined;
    'Create Account': undefined;
    'Login': undefined;
    'Forgot Password': undefined;
    'Code Sent': undefined;
    'Create Password': undefined;
}

// ========== Account Setup ==========

export type AccountSetupNavigationParams = {
    'Choose Interest': undefined;
    'Fill Profile': undefined;
    'Create PIN': undefined;
    'Set Fingerprint': undefined;
}

// ========== Movie Details ==========

export type MovieNavigationParams = {
    Details: undefined;
    'Comment List': undefined;
    Player: undefined;
}

// ========== App ==========

export type AppNavigationParams = {
    Onboarding: undefined;
    Auth: NavigatorScreenParams<AuthNavigationParams>;
    'Account Setup': NavigatorScreenParams<AccountSetupNavigationParams>;
    Account: NavigatorScreenParams<AccountNavigationParams>;
    Notifications: undefined;
    Movie: NavigatorScreenParams<MovieNavigationParams>;
}

export type AppNavigation = NavigationProp<AppNavigationParams>

export const useAppNavigation = () => useNavigation<AppNavigation>();