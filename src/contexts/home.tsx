import { createContext, useContext, useEffect, useState } from 'react';
import { getFromMovies } from '../services/tmdb';
import { MovieProps } from '../types/components';
import { HomeContextProps, ProviderProps } from '../types/context';
import { useAppContext } from './app';

const HomeContext = createContext({} as HomeContextProps);

const HomeProvider = ({ children }: ProviderProps) => {
    const { attachGenreName } = useAppContext();

    const [popularMovies, setPopularMovies] = useState<MovieProps[]>([]);
    const [topRatedMovies, setTopRatedMovies] = useState<MovieProps[]>([]);
    const [latestMovie, setLatestMovie] = useState<MovieProps | undefined>(undefined);

    const getHomeInfo = async () => {
        const [ popularMovies, topRatedMovies, latestMovie ] = await Promise.all([
            getFromMovies('popular'),
            getFromMovies('top_rated'),
            getFromMovies('now_playing'),
        ])
        setPopularMovies(attachGenreName(popularMovies.results) as MovieProps[]);
        setTopRatedMovies(attachGenreName(topRatedMovies.results) as MovieProps[])
        setLatestMovie(attachGenreName(latestMovie.results)[0] as MovieProps);
    }

    useEffect(() => {
        getHomeInfo();
    }, [] )
    
    return (
        <HomeContext.Provider value={{
            latestMovie, popularMovies, topRatedMovies
        }}>
            {children}
        </HomeContext.Provider>
    )
}

function useHomeContext(): HomeContextProps {
    return useContext(HomeContext);
}

export { HomeProvider, useHomeContext };

