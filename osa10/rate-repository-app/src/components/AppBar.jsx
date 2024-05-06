import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import { useApolloClient } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';
import useUser from '../hooks/useUser';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 10,
    paddingBottom: 10,
    backgroundColor: '#24292e',
  },
});

const AppBar = () => {
  const { user } = useUser();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const handleSignOut = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
        <ScrollView horizontal>
            <Link to="/">
                <AppBarTab text={'Repositories'}/>
            </Link>
            <Link to="/review">
                <AppBarTab text={'Create a review'}/>
            </Link>
            {user ? (
              <Pressable onPress={handleSignOut}>
                <AppBarTab text={'Sign out'} />
              </Pressable>
            ) : (
              <Link to="/signin">
                <AppBarTab text={'Sign in'}/>
              </Link>
            )}
            
        </ScrollView>
    </View>
  );
};

export default AppBar;