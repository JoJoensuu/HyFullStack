import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    padding: 10,
    paddingRight: 20,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  nameBar: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  fullName: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: 5,
  },
  description: {
    color: '#606060',
    paddingBottom: 5,
    paddingRight: 10,
  },
  languageBlock: {
    backgroundColor: '#0366d6',
    padding: 3,
    alignSelf: 'flex-start',
    borderRadius: 4,
  },
  language: {
    color: '#FFF',
    fontSize: 15,
  },
  itemMain: {
    backgroundColor: '#FFF',
  }
})

interface IRepositoryItem {
  item: {
    fullName: string;
    description: string;
    language: string;
    stargazersCount: number;
    forksCount: number;
    reviewCount: number;
    ratingAverage: number;
    ownerAvatarUrl: string;
  }
}

export const RepositoryItem: React.FC<IRepositoryItem> = ({ item }) => {
    return (
        <View testID="repositoryItem" style={styles.itemMain}>
          <View style={styles.topRow}>
            <Image
              style={styles.avatarImage}
              source={{
                uri: item.ownerAvatarUrl,
              }}
            />
            <View style={styles.nameBar}>
              <Text style={styles.fullName}>{item.fullName}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <View style={styles.languageBlock}>
                <Text style={styles.language}>{item.language}</Text>
              </View>
            </View>
            
          </View>
          <View style={styles.bottomRow}>
              <View>
                <Text style={styles.fullName}>{item.stargazersCount}</Text>
                <Text>Stars</Text>
              </View>
              <View>
                <Text style={styles.fullName}>{item.forksCount}</Text>
                <Text>Forks</Text>
              </View>
              <View>
                <Text style={styles.fullName}>{item.reviewCount}</Text>
                <Text>Reviews</Text>
              </View>
              <View>
                <Text style={styles.fullName}>{item.ratingAverage}</Text>
                <Text>Rating</Text>
              </View>
          </View>
        </View>
      );
}