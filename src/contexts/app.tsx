import { createContext, useContext, useEffect, useState } from 'react';
import { getGenres } from '../services/tmdb';
import { GenreProps, MovieProps } from '../types/components';
import { AppContextProps, ProviderProps } from '../types/context';

const AppContext = createContext({} as AppContextProps);

const AppProvider = ({ children }: ProviderProps) => {
    const [genres, setGenres] = useState<GenreProps[]>([]);

    const getMovieGenres = async () => {
        const results = await getGenres();
        setGenres(results.genres as GenreProps[]);
    }

    const attachGenreName = ( movies: MovieProps[] ) => {
        let moviesCopy = [...movies];
        moviesCopy = moviesCopy.map( movie => ({
            ...movie,
            genre_names: movie.genre_ids.map( genre => {
                const targetGenre = genres.find( innerGenre => innerGenre.id === genre )
                return targetGenre ? targetGenre.name : 'GENRE_NOT_FOUND';
            })
        }) )
        return moviesCopy;
    }

    useEffect(() => {
        getMovieGenres();
    }, [] )
    
    return (
        <AppContext.Provider value={{
            genres, attachGenreName
        }}>
            {children}
        </AppContext.Provider>
    )
}

function useAppContext(): AppContextProps {
    return useContext(AppContext);
}

export { AppProvider, useAppContext };

