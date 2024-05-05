import React from 'react';
import { useParams } from 'react-router-native';
import useItem from '../hooks/useItem';
import RepositoryView from './RepositoryInfo';

const DetailedRepositoryItem = () => {
  const { id } = useParams();
  const { repository } = useItem(id);

  console.log(repository);

  return (
    <RepositoryView repository={repository} />
  );
};

export default DetailedRepositoryItem;