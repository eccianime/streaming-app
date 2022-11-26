import { createContext, useContext, useState } from 'react';
import { AuthContextProps, ProviderProps, UserProps } from '../types/context';
// import * as AuthSession from 'expo-auth-session';
// import * as WebBroser from 'expo-web-browser';
// import * as Google from 'expo-auth-session/providers/google'

// WebBroser.maybeCompleteAuthSession();

const AuthContext = createContext({} as AuthContextProps);

const AuthProvider = ({ children }: ProviderProps) => {
    const [user, setUser] = useState({} as UserProps)

    const signIn = async () => {
        // try {
        //     setUserLoading(true);
        //     await promptAsync();
        // } catch (error) {
        //     console.log(error);
        //     throw error;
        // } finally {
        //     setUserLoading(false);
        // }
    }

    const signInWithGoogle = (access_token: string) => {
        // console.log(access_token);
    }

    // useEffect( () => {
    //     if( response?.type === 'success' && response.authentication?.accessToken ){
    //         signInWithGoogle(response.authentication.accessToken)
    //     }
    // }, [response] )
    
    return (
        <AuthContext.Provider value={{
            signIn, user,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuthContext(): AuthContextProps {
    return useContext(AuthContext);
}

export { AuthProvider, useAuthContext };
