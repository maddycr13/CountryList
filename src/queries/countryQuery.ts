export const COUNTRY_QUERY = `
  query {
    countries {
      code
      name
      capital
      emoji
    }
  }
`;

export const COUNTRY_DETAILS_QUERY = `
  query getCountry($code: ID!) {
    country(code: $code) {
      code
      name
      capital
      emoji
      currency
      languages {
        name
      }
    }
  }
`;