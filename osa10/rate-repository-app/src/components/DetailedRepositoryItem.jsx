import React from 'react';
import { useParams } from 'react-router-native';
import useItem from '../hooks/useItem';
import RepositoryView from './RepositoryInfo';
import { StyleSheet, View, FlatList } from 'react-native';
import Review from './Review';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const DetailedRepositoryItem = () => {
  const { id } = useParams();
  const first = 3;
  const { repository, reviews, fetchMore } = useItem(id, first);

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <Review review={item} />}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.5}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
          <RepositoryView repository={repository} />
      )}
    />
  );
};

export default DetailedRepositoryItem;