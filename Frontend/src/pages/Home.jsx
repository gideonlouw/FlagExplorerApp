import React from 'react';
import { useEffect, useState } from 'react';
import { getCountries } from '../services/api';

function Home() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCountries();
        setCountries(response.data);
      } catch (error) {
        console.error('Failed to fetch countries:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {countries.map((country) => (
        <div key={country.name.common} className="border rounded p-2 text-center">
          <img src={country.flags?.png} alt={country.name.common} className="w-full h-24 object-cover mb-2" />
          <div>{country.name.common}</div>
        </div>
      ))}
    </div>
  );
}

export default Home;

