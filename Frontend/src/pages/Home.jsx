import { useEffect, useState } from 'react';
import { getCountries } from '../services/api';
import CountryCard from '../components/CountryCard';

const Home = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries().then(res => setCountries(res.data)).catch(console.error);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {countries.map(country => (
        <CountryCard key={country.name} country={country} />
      ))}
    </div>
  );
};

export default Home;
