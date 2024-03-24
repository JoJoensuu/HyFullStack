import { gql } from '@apollo/client';

export const AUTHENTICATE = gql`
    mutation GetAccessToken($credentials: AuthenticateInput){
        authenticate (credentials: $credentials){
        accessToken
        }
    }
`;