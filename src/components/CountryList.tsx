import React, { useEffect, useState } from 'react';
import { graphqlClient } from '../api/graphqlClient';
import { Country } from '../types/Country';
import { COUNTRY_DETAILS_QUERY } from '../queries/countryQuery';
import CountrySelector from './CountrySelector';
import { Box, Card, CardContent, Typography, CircularProgress } from '@mui/material';

const CountryList: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCountrySelect = async (countryCode: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await graphqlClient<{ country: Country }>(COUNTRY_DETAILS_QUERY, {
        code: countryCode,
      });
      setSelectedCountry(data.country);
    } catch (err) {
      setError('Failed to fetch country details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Select a Country
      </Typography>

      <CountrySelector onSelect={handleCountrySelect} />

      {loading && <CircularProgress sx={{ marginTop: 2 }} />}
      {error && <Typography color="error" variant="body1" sx={{ marginTop: 2 }}>{error}</Typography>}

      {selectedCountry && (
        <Card sx={{ marginTop: 4 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {selectedCountry.name} {selectedCountry.emoji}
            </Typography>
            <Typography variant="body1">
              <strong>Capital:</strong> {selectedCountry.capital}
            </Typography>
            <Typography variant="body1">
              <strong>Currency:</strong> {selectedCountry.currency}
            </Typography>
            <Typography variant="body1">
              <strong>Languages:</strong> {selectedCountry.languages.map(lang => lang.name).join(', ')}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default CountryList;
