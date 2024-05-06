import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { RepositoryItem } from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Sorter from './Sorter';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8'
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT" || "RATING_AVERAGE");
  const [orderDirection, setOrderDirection] = useState("DESC" || "ASC");
  const { repositories } = useRepositories(orderBy, orderDirection);

  const repositoryNodes = repositories && repositories.edges ? repositories.edges.map(edge => edge.node) : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
            <RepositoryItem item={item}/>
      )}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => (
        <Sorter
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          orderDirection={orderDirection}
          setOrderDirection={setOrderDirection}
        />
      )}
    />
  );
};

export default RepositoryList;