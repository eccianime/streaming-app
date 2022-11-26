import { createContext, useContext, useState } from 'react';
import { getFromMovies, IMAGE_BASE_URL } from '../services/tmdb';
import { MoviePropsExtended } from '../types/components';
import { MovieContextProps, ProviderProps } from '../types/context';
import { CreditResultProps, ImageResultProps, PersonProps } from '../types/dto';
import { useAppContext } from './app';

const MovieContext = createContext({} as MovieContextProps);

const MovieProvider = ({ children }: ProviderProps) => {
    const { setLoading } = useAppContext();
    
    const [ currentMovie, setCurrentMovie ] = useState<MoviePropsExtended | undefined>(undefined);
    const [ backdropImage, setBackdropImage ] = useState<string>('');
    const [ credits, setCredits ] = useState<PersonProps[]>([]);
    
    const getMovieDetails = async ( movie_id: string ) => {
        setCurrentMovie(undefined);
        setLoading(true);
        const detailsResult = await getFromMovies(`${movie_id}?append_to_response=images,credits`);
        
        const targetImage = (detailsResult.images as ImageResultProps).backdrops.find( (image) => image.iso_639_1 === 'en' )?.file_path;

        const { cast, crew } = detailsResult.credits as CreditResultProps;

        const all = [...cast.slice(0,10), ...crew.slice(0,10)];

        
        all.forEach(item => {
            const targetIndex = all.findIndex( person => person.id === item.id );
            if( targetIndex > -1 ){
                all.splice(targetIndex, 1)
            }
        });
        
        setCredits(all)
        setBackdropImage(IMAGE_BASE_URL + (targetImage ? targetImage : detailsResult.poster_path) );
        setCurrentMovie(detailsResult);
        setLoading(false);
    }

    return (
        <MovieContext.Provider value={{
            getMovieDetails,
            currentMovie,
            backdropImage,
            credits,
        }}>
            {children}
        </MovieContext.Provider>
    )
}

function useMovieContext(): MovieContextProps {
    return useContext(MovieContext);
}

export { MovieProvider, useMovieContext };

