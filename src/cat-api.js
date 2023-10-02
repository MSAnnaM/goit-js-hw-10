import axios from 'axios';
axios.defaults.headers.common["x-api-key"] = "live_wCmYpNSxcmhHUHWKlAlt8qXfujiGR66uJDcmjcbE9eYPLpnvJ77FTzUu7skcwjJb";
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
    return axios.get('/breeds').then(response => response.data)
}

export function fetchCatByBreed(breedId){
    return axios.get(`/images/search?breed_ids=${breedId}`).then(response => response.data)
}