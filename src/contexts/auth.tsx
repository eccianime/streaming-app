import { createContext, useContext, useState } from 'react';
import { AuthContextProps, AuthProviderProps, UserProps } from '../types/context';
// import * as AuthSession from 'expo-auth-session';
// import * as WebBroser from 'expo-web-browser';
// import * as Google from 'expo-auth-session/providers/google'

// WebBroser.maybeCompleteAuthSession();

const AuthContext = createContext({} as AuthContextProps);

const AuthProvider = ({ children }: AuthProviderProps) => {
    // const [ request, response, promptAsync ] = Google.useAuthRequest({
    //     clientId: '104388373474-di84679dehgiac0d7fak84dre3uamd5b.apps.googleusercontent.com',
    //     redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    //     scopes: ['profile', 'email']
        
    // })
    const [ isUserLoading, setUserLoading ] = useState(false);
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
            signIn, user, isUserLoading
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuthContext(): AuthContextProps {
    return useContext(AuthContext);
}

export { AuthProvider, useAuthContext };