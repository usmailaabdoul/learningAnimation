import React from 'react'
import {View, Text, StyleSheet} from 'react-native';

import Card from './Card';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 20
  },
});

function CardLists() {
  const cards = Array(4).fill();

  return (
    <View style={styles.container}>
      {cards.map((_, key) => (
        <Card key={key} />
      ))}
    </View>
  )
}

export default CardLists
