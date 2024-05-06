import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import DetailedRepositoryItem from './DetailedRepositoryItem';
import CreateReview from './CreateReview';
import SignUp from './SignUp';

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#e1e4e8',
  }
});

const Main = () => {
  return (
    <View style={styles.main}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/repositories/:id" element={<DetailedRepositoryItem />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/review" element={<CreateReview />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </View>
  );
};

export default Main;