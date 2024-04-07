import { useApolloClient, useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const credentials = { username, password };

    const response = await mutate({ variables: { credentials } });

    if (response.data) {
      const token = response.data?.authenticate?.accessToken;
      console.log('new token retrieved: ', token);

      await authStorage.setAccessToken(token);

      apolloClient.resetStore();

      return true;
    }

    return false;
    
  };

  return [signIn, result];
};

export default useSignIn;