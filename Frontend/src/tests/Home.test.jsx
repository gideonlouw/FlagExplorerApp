import { render, screen, waitFor } from '@testing-library/react';
import Home from '../pages/Home';
import { getCountries } from '../services/api';

// Mock the API call to return fake data
vi.mock('../services/api', () => ({
  getCountries: vi.fn(),
}));

// Updated mock data to include flagUrl
const mockCountries = [
  { 
    id: '1', 
    name: 'Botswana', 
    capital: 'Gaborone', 
    population: 2351625,
    flagUrl: 'https://flagcdn.com/w320/bw.png' 
  },
  { 
    id: '2', 
    name: 'Namibia', 
    capital: 'Windhoek', 
    population: 2540905, 
    flagUrl: 'https://flagcdn.com/w320/na.png' 
  },
];

test('renders country list page with flags', async () => {
  // Mock the API response to return mockCountries
  getCountries.mockResolvedValue(mockCountries);

  // Render the Home component
  render(<Home />);

  // Wait for the API call to finish and the countries to be rendered
  await waitFor(() => screen.getByText(/Botswana/i));

  // Assert that the country names are rendered
  expect(screen.getByText(/Botswana/i)).toBeInTheDocument();
  expect(screen.getByText(/Namibia/i)).toBeInTheDocument();

  // Assert that the flag images are rendered
  expect(screen.getByAltText('Flag of Botswana')).toBeInTheDocument();
  expect(screen.getByAltText('Flag of Namibia')).toBeInTheDocument();

  // Assert that the flag images have correct URLs
  expect(screen.getByAltText('Flag of Botswana').src).toBe('https://flagcdn.com/w320/bw.png');
  expect(screen.getByAltText('Flag of Namibia').src).toBe('https://flagcdn.com/w320/na.png');
});
