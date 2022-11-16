import { ReactNode } from 'react';

export type UserProps = {
    name: string;
    avatarUrl: string;
}

export type AuthContextProps = {
    user: UserProps;
    signIn: () => Promise<void>;
    isUserLoading: boolean;
}

export type AuthProviderProps = {
    children: ReactNode;
}
