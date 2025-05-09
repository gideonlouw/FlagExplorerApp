
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { getCountries } from '../services/api';

function Home() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

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
        
        <div key={country.id} className="border rounded p-2 text-center">
          <Link
  to={`/country/${country.id}`}
  state={{
    name: country.name,
    capital: country.capital,
    population: country.population,
  }}
>
            <div>{country.name}</div>
            <img
              src={country.flagUrl}
              alt={country.name}
              className="w-full h-24 object-cover mb-2"
            />
          </Link>
          
        </div>
      ))}
    </div>
  );

}

export default Home;


