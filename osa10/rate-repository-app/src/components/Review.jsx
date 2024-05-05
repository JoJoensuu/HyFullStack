import React from "react";
import { View, StyleSheet, Text } from "react-native";
import theme from "../theme";
import { formatDate } from "../utils";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.itemBackground,
    flexDirection: "row",
    padding: 20,
  },
  ratingContainer: {
    borderStyle: "solid",
    borderColor: theme.colors.primary,
    borderRadius: 25,
    borderWidth: 2,
    width: 50,
    height: 50,
    justifyContent: "center",
  },
  ratingText: {
    textAlign: "center",
  },
  reviewInfoContainer: {
    marginLeft: 20,
    flexShrink: 1,
  },
  reviewInfoText: {
    marginTop: 10,
  },
});

const Review = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text fontWeight={"bold"} style={styles.ratingText}>
          {review.rating}
        </Text>
      </View>
      <View style={styles.reviewInfoContainer}>
        <Text fontWeight={"bold"}>{review.user.username}</Text>
        <Text color={"textSecondary"}>{formatDate(review.createdAt)}</Text>
        <View style={styles.reviewInfoText}>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

export default Review;