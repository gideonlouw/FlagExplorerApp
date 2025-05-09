import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CountryDetail from '../pages/CountryDetail';

test('renders CountryDetail component with mock state', () => {
  const mockState = {
    name: 'Tonga',
    capital: 'Nukuʻalofa',
    population: 105697,
    flagUrl: 'https://flagcdn.com/to.svg'
  };

  render(
    <MemoryRouter initialEntries={[{ pathname: '/country/Tonga', state: mockState }]}>
      <Routes>
        <Route path="/country/:name" element={<CountryDetail />} />
      </Routes>
    </MemoryRouter>
  );

  // Adjust according to what's in your CountryDetail component
  expect(screen.getByText(/Tonga/i)).toBeInTheDocument();
});