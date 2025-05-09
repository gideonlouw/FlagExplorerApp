import axios from 'axios';

//const API_BASE_URL = 'https://localhost:7175/api'; 
//const API_BASE_URL = 'http://localhost:5285/api'
//const API_BASE_URL = 'http://topglad-001-site9.anytempurl.com/api';
const API_BASE_URL = '/api'; // now proxied

export const getCountries = () => axios.get(`${API_BASE_URL}/Countries`);
export const getCountryByName = (name) => axios.get(`${API_BASE_URL}/Countries/${name}`);
