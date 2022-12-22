import { axios_request } from '../config/axios';

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

// MOVIES
export const getFromMovies = async (target: string) => await axios_request(`/movie/${target}`);

// SERIES
export const getFromSeries = async (target: string) => await axios_request(`/tv/${target}`);

// DISCOVER
export const getFromDiscover = async (target: 'movie' | 'tv') =>
  await axios_request(`/discover/${target}`);

// SEARCH
export const getFromSearch = async (type: string, target: string) =>
  await axios_request(`/search/${type}?query=${encodeURI(target)}`);

// GENRES
export const getGenres = async () => await axios_request('/genre/movie/list');
