import { doc, getDoc, setDoc } from 'firebase/firestore';
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
    setLoading(true);
    setMyList([]);
    const docRef = doc(database, 'users', user.id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    if (data && !!data?.movieList) {
      setMyList(data.movieList);
    }
    setLoading(false);
  };

  const addOrRemoveFromMyList = async (movie: MoviePropsExtended) => {
    setLoading(true);
    let myListupdated = [...myList];
    if (myListupdated.some((listedMovie) => listedMovie.id === movie.id)) {
      myListupdated = myListupdated.filter((listedMovie) => listedMovie.id !== movie.id);
    } else {
      myListupdated.push(movie);
    }
    await setDoc(
      doc(database, 'users', user.id),
      {
        movieList: myListupdated,
      },
      { merge: true }
    );
    setMyList(myListupdated);
    setLoading(false);
  };

  useEffect(() => {
    if (!myList.length) {
      getMyList();
    }
  }, [myList]);

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
