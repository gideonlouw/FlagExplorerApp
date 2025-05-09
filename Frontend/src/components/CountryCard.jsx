import { Link } from 'react-router-dom';

const CountryCard = ({ country }) => (
  <Link to={`/country/${country.name}`}>
    <div className="border rounded shadow p-2 text-center">
      <img src={country.flagUrl} alt={`Flag of ${country.name}`} className="w-full h-32 object-contain" />
      <h2 className="text-lg font-bold mt-2">{country.name}</h2>
    </div>
  </Link>
);

export default CountryCard;
