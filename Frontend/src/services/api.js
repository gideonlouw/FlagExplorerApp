import axios from 'axios';

const API_BASE_URL = 'https://localhost:7175/api'; 

export const getCountries = () => axios.get(`${API_BASE_URL}/Countries`);
export const getCountryByName = (name) => axios.get(`${API_BASE_URL}/Countries/${name}`);
