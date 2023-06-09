import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { createContext, useContext, useState } from 'react';
import { Alert } from 'react-native';
import { auth, database } from '../config/firebaseConfig';
import { GenreProps } from '../types/components';
import firebaseErrorCodes from '../config/firebaseAuthErrorCodes.json';

import { AuthContextProps, ProviderProps, UserProps } from '../types/context';
import { AppNavigation } from '../types/navigation';
import { useAppContext } from './app';

const AuthContext = createContext({} as AuthContextProps);

const AuthProvider = ({ children }: ProviderProps) => {
  const { setLoading } = useAppContext();
  const navigation = useNavigation<AppNavigation>();

  const [user, setUser] = useState({} as UserProps);

  const signIn = async (email: string, pass: string) => {
    setLoading(true);
    try {
      const {
        user: { uid },
      } = await signInWithEmailAndPassword(auth, email, pass);
      const docRef = doc(database, 'users', uid);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      setUser(data as UserProps);
      if (data) {
        if (!data?.interest) {
          navigation.navigate('Account Setup', {
            screen: 'Choose Interest',
            params: { userId: uid },
          });
        } else if (!data?.name) {
          navigation.navigate('Account Setup', { screen: 'Fill Profile', params: { userId: uid } });
        } else {
          navigation.navigate('Account', { screen: 'Home' });
        }
      }
    } catch (error: any) {
      console.log(error.code);
      Alert.alert('Error', 'Invalid Credentials');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, pass: string) => {
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, pass);
      await setDoc(doc(database, 'users', user.uid), {
        email: email,
        id: user.uid,
      });

      navigation.navigate('Account Setup', {
        screen: 'Choose Interest',
        params: { userId: user.uid },
      });
    } catch (error: any) {
      const targetError = firebaseErrorCodes.find((item) => item.code === error.code);
      Alert.alert('Error', targetError?.description || error.code);
    } finally {
      setLoading(false);
    }
  };

  const addInterests = async (userId: string, selectedGenres: GenreProps[]) => {
    setLoading(true);
    try {
      await setDoc(
        doc(database, 'users', userId),
        {
          interest: selectedGenres,
        },
        { merge: true }
      );
      const docSnap = await getDoc(doc(database, 'users', userId));
      const data = docSnap.data();
      setUser(data as UserProps);
      if (data) {
        if (!data?.name) {
          navigation.navigate('Account Setup', {
            screen: 'Fill Profile',
            params: { userId: userId },
          });
        } else {
          navigation.navigate('Account', { screen: 'Home' });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fillProfile = async (profileForm: { [x: string]: string }) => {
    const blank = Object.values(profileForm).some((item) => item === '');
    if (blank) {
      Alert.alert('Erro', 'Deve preencher todos os campos');
    } else {
      try {
        setLoading(true);
        await setDoc(
          doc(database, 'users', user.id),
          {
            name: profileForm.name,
            nickName: profileForm.nickName,
            phoneNumber: profileForm.phoneNumber,
          },
          { merge: true }
        );
        navigation.navigate('Account', { screen: 'Home' });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        user,
        addInterests,
        fillProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext: () => AuthContextProps = () => useContext(AuthContext);

export { AuthProvider, useAuthContext };
