import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YmIxYTNjNDNkNDIxMjJlNTIzODg3MWNlZTgwZjFmYiIsInN1YiI6IjYyMzNkMzU5YzUyNWM0MDAxYzgxOTQxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4RdpKGxqNYkDLYgKlWhU4tOVldALBedAGdC3kmeXICs`
    }
});

export const axios_request = async ( url: string ) => {
    console.log(url);
    try {
        const response = await axiosInstance.request({
          method: 'GET',
          url,
          timeout: 15000,
        })
        return response.data;
    } catch (error: any) {
        console.log(error?.response?.data);
        return error?.response?.data;
    }
}
  