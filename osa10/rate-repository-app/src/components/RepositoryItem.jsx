import * as Linking from 'expo-linking';
import React from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';
import { Link } from 'react-router-native';

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

export const RepositoryItem = ({ item, showButton }) => {
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
              {showButton ?
                <Text style={styles.fullName}>
                  {item.fullName}
                </Text>
                :
                <Link to={`/repositories/${item.id}`}>
                  <Text style={styles.fullName}>
                    {item.fullName}
                  </Text>
                </Link>}
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
          {showButton && (
            <Button title="Open in GitHub" onPress={() => Linking.openURL(item.url)} />
          )}
        </View>
      );
}