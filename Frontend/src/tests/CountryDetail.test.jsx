import { render, screen } from '@testing-library/react';
import CountryDetail from '../pages/CountryDetail';
import { vi } from 'vitest';  // Import `vi` from Vitest

// Mocking the props that would be passed to the CountryDetail component
const mockCountry = {
  name: 'Botswana',
  capital: 'Gaborone',
  population: 2351625,
};

test('renders country details page with passed state', () => {
  // Render the component with the mock country passed as state (using MemoryRouter for routing)
  render(
    <CountryDetail 
      country={mockCountry} 
    />
  );

  // Assert that the country name is displayed
  expect(screen.getByText(/Botswana/i)).toBeInTheDocument();

  // Assert that the country capital is displayed
  expect(screen.getByText(/Gaborone/i)).toBeInTheDocument();

  // Assert that the country population is displayed
  expect(screen.getByText(/2,351,625/i)).toBeInTheDocument();
});
