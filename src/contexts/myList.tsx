import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { database } from '../config/firebaseConfig';
import { MoviePropsExtended } from '../types/components';
import { MyListContextProps, ProviderProps } from '../types/context';
import { useAppContext } from './app';
import { useAuthContext } from './auth';

const MyListContext = createContext({} as MyListContextProps);

const MyListProvider = ({ children }: ProviderProps) => {
  const [myList, setMyList] = useState<MoviePropsExtended[]>([]);
  const { user } = useAuthContext();
  const { setLoading } = useAppContext();

  const getMyList = async () => {
    console.log('Executa');
    setLoading(true);
    const snapshot = await getDocs(collection(database, 'users', user.id, 'movie_list'));
    const movieList: DocumentData[] = [];
    snapshot.forEach((doc) => {
      movieList.push(doc.data());
    });
    setMyList(movieList as MoviePropsExtended[]);
    setLoading(false);
  };

  const addOrRemoveFromMyList = async (movie: MoviePropsExtended) => {
    setLoading(true);
    const docRef = doc(database, 'users', user.id, 'movie_list', movie.id.toString());
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await deleteDoc(docRef);
    } else {
      await setDoc(docRef, movie);
    }
    await getMyList();
    setLoading(false);
  };

  useEffect(() => {
    if (user.id) {
      getMyList();
    }
  }, [user]);

  return (
    <MyListContext.Provider
      value={{
        myList,
        addOrRemoveFromMyList,
      }}
    >
      {children}
    </MyListContext.Provider>
  );
};

function useMyListContext(): MyListContextProps {
  return useContext(MyListContext);
}

export { MyListProvider, useMyListContext };
