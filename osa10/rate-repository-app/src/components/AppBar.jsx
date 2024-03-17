import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 10,
    paddingBottom: 10,
    backgroundColor: '#24292e',
  },
  text: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  }
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
        <AppBarTab />
    </View>
  );
};

export default AppBar;