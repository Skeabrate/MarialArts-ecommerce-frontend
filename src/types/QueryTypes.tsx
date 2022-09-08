import { ApolloError } from '@apollo/client';

export type QueryTypes = {
  loading: boolean | undefined;
  error?: ApolloError | undefined;
};
