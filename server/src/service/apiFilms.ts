import axios from 'axios';

export const apiFilms = axios.create({
  baseURL: 'https://ghibliapi.herokuapp.com/',
});
