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
  const { repository } = useItem(id);
  const reviews = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <Review review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
          <RepositoryView repository={repository} />
      )}
    />
  );
};

export default DetailedRepositoryItem;