import { createContext, useContext, useEffect, useState } from 'react';
import { getFromMovies, getGenres } from '../services/tmdb';
import { GenreProps, MovieProps } from '../types/components';
import { HomeContextProps, ProviderProps } from '../types/context';
import { useAppContext } from './app';

const HomeContext = createContext({} as HomeContextProps);

const HomeProvider = ({ children }: ProviderProps) => {
    const { setLoading } = useAppContext();
    
    const [genres, setGenres] = useState<GenreProps[]>([]);
    const [popularMovies, setPopularMovies] = useState<MovieProps[]>([]);
    const [topRatedMovies, setTopRatedMovies] = useState<MovieProps[]>([]);
    const [latestMovie, setLatestMovie] = useState<MovieProps | undefined>(undefined);

    const getHomeInfo = async () => {
        setLoading(true);
        const [ genresResult, popularMovies, topRatedMovies, latestMovie ] = await Promise.all([
            getGenres(),
            getFromMovies('popular'),
            getFromMovies('top_rated'),
            getFromMovies('now_playing'),
        ])
        setLoading(false);
        setGenres(genresResult.genres as GenreProps[]);
        setPopularMovies(attachGenreName(popularMovies.results, genresResult.genres) as MovieProps[]);
        setTopRatedMovies(attachGenreName(topRatedMovies.results, genresResult.genres) as MovieProps[])
        setLatestMovie(attachGenreName(latestMovie.results, genresResult.genres)[0] as MovieProps);
    }

    const attachGenreName = ( movies: MovieProps[], genres: GenreProps[] ) => {
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
        getHomeInfo();
    }, [] )
    
    return (
        <HomeContext.Provider value={{
            genres,
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

