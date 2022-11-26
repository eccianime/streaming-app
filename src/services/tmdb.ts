import { axios_request } from '../config/axios';

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

// MOVIES
export const getFromMovies = async (target: string) => await axios_request(`/movie/${target}`);

// GENRES
export const getGenres = async () => await axios_request('/genre/movie/list');
