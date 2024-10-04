import axios from 'axios';

const GRAPHQL_API_URL = 'https://countries.trevorblades.com/';

interface GraphQLResponse<T> {
  data: T;
}

interface GraphQLRequest {
  query: string;
  variables?: Record<string, any>;
}

export const graphqlClient = async <T>(query: string, variables?: Record<string, any>): Promise<T> => {
  const response = await axios.post<GraphQLResponse<T>>(GRAPHQL_API_URL, {
    query,
    variables, // Add variables to the request
  });

  return response.data.data;
};
