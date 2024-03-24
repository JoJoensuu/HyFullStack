import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { RepositoryItem } from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8'
  },
});

interface IRepository {
  id: string;
  fullName: string;
  description: string;
  language: string;
  stargazersCount: number;
  forksCount: number;
  reviewCount: number;
  ratingAverage: number;
  ownerAvatarUrl: string;
}

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();

  const repositoryNodes = repositories && repositories.edges ? repositories.edges.map((edge: { node: any; }) => edge.node) : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }: { item: IRepository}) => (
        <RepositoryItem item={item}/>
      )}
    />
  );
};

export default RepositoryList;