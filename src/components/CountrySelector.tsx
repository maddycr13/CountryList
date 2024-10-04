import React, { useEffect, useState } from 'react';
import { graphqlClient } from '../api/graphqlClient';
import { COUNTRY_QUERY } from '../queries/countryQuery';
import { FormControl, InputLabel, MenuItem, Select, CircularProgress, SelectChangeEvent } from '@mui/material';

interface CountryOption {
  code: string;
  name: string;
}

interface CountrySelectorProps {
  onSelect: (countryCode: string) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ onSelect }) => {
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await graphqlClient<{ countries: CountryOption[] }>(COUNTRY_QUERY);
        setCountries(data.countries);
      } catch (err) {
        setError('Failed to fetch countries');
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const code = event.target.value;
    setSelectedCountry(code);
    onSelect(code);
  };

  if (loading) return <CircularProgress />;
  if (error) return <p>{error}</p>;

  return (
    <FormControl fullWidth>
      <InputLabel>Select a Country</InputLabel>
      <Select value={selectedCountry} onChange={handleChange} label="Select a Country">
        {countries.map((country) => (
          <MenuItem key={country.code} value={country.code}>
            {country.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CountrySelector;
