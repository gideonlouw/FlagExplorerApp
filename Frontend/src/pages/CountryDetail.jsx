import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCountryByName } from '../services/api';

const CountryDetail = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    getCountryByName(name).then(res => setCountry(res.data)).catch(console.error);
  }, [name]);

  if (!country) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <img src={country.flagUrl} alt={`Flag of ${country.name}`} className="w-64 mb-4" />
      <h1 className="text-3xl font-bold">{country.name}</h1>
      <p><strong>Capital:</strong> {country.capital}</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
    </div>
  );
};

export default CountryDetail;
