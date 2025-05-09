import { useLocation, useParams } from 'react-router-dom';

function CountryDetail() {
  const { state } = useLocation();

  if (!state) {
    return <div>No data provided.</div>;
  }

  const { name, capital, population } = state;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{name}</h1>
      <p><strong>Capital:</strong> {capital}</p>
      <p><strong>Population:</strong> {population.toLocaleString()}</p>
    </div>
  );
}

export default CountryDetail;
