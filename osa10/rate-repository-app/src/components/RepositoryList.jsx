import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TextInput } from 'react-native';
import { useDebounce } from "use-debounce";
import { RepositoryItem } from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Sorter from './Sorter';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8'
  },
  listHeaderComponent: {
    backgroundColor: '#e1e4e8',
  },
  input: {
    backgroundColor: '#ffffff'
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT" || "RATING_AVERAGE");
  const [orderDirection, setOrderDirection] = useState("DESC" || "ASC");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 100);
  const { repositories } = useRepositories(orderBy, orderDirection, debouncedSearchKeyword);

  const repositoryNodes = repositories && repositories.edges ? repositories.edges.map(edge => edge.node) : [];

  return (
    <>
      <View style={styles.listHeaderComponent}>
        <TextInput
          style={styles.input}
          inlineImageLeft='search_icon'
          placeholder='Search'
          value={searchKeyword}
          onChangeText={(text) => setSearchKeyword(text)}
        />
        <Sorter
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          orderDirection={orderDirection}
          setOrderDirection={setOrderDirection}
        />
      </View>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
            <RepositoryItem item={item}/>
        )}
        keyExtractor={(item) => item.id}
      />
    </>
    
  );
};

export default RepositoryList;