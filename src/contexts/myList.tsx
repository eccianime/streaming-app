import { createContext, useContext, useEffect, useState } from 'react';
import { AsyncGet, AsyncStore } from '../hooks/useAsync';
import { getFromMovies, getGenres } from '../services/tmdb';
import { GenreProps, MovieProps, MoviePropsExtended } from '../types/components';
import { MyListContextProps, ProviderProps } from '../types/context';
import { useAppContext } from './app';

const MyListContext = createContext({} as MyListContextProps);

const MyListProvider = ({ children }: ProviderProps) => {
  const [myList, setMyList] = useState<MoviePropsExtended[]>([]);

  const getMyList = async () => {
    const movies = await AsyncGet('myListItems');
    if (!!movies) {
      setMyList(movies as MoviePropsExtended[]);
    }
  };

  const addOrRemoveFromMyList = async (movie: MoviePropsExtended) => {
    let myListupdated = [...myList];
    if (myListupdated.some((listedMovie) => listedMovie.id === movie.id)) {
      myListupdated = myListupdated.filter((listedMovie) => listedMovie.id !== movie.id);
    } else {
      myListupdated.push(movie);
    }
    setMyList(myListupdated);
    await AsyncStore('myListItems', myListupdated);
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
