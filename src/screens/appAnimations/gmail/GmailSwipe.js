import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';

import {EMAILS} from './constants';
import SwipableRow from './SwipableRow';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const GmailSwipe = () => {
  return (
    <View style={styles.container}>
      <Text>Gmail header</Text>

      {EMAILS.map((email, index) => (
        <Card key={index} email={email} />
      ))}
    </View>
  );
};

export default GmailSwipe;

const Card = ({email}) => {
  const getFirstLetter = letter => {
    let firstLetter = letter.split('')[0];
    return firstLetter;
  };

  return (
    <SwipableRow>
      <View style={styles.card}>
        <View style={styles.cardWrapper}>
          <View
            style={[styles.cardTxtImgWrapper, {backgroundColor: email.color}]}>
            <Text style={styles.cardTxtImg}>{getFirstLetter(email.title)}</Text>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>{email.title}</Text>
              {email.unreads && (
                <View style={styles.countIndicator}>
                  <Text style={styles.countIndicatorText}>
                    {email.unreads} new
                  </Text>
                </View>
              )}
            </View>
            <Text style={styles.description}>{email.description}</Text>
          </View>
        </View>
      </View>
    </SwipableRow>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    width: width,
    height: 100,
    // backgroundColor: 'red',
    // borderRadius: 10,
  },
  cardWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTxtImgWrapper: {
    // backgroundColor: '#007bff90',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 35,
  },
  cardTxtImg: {
    fontSize: 30,
    color: '#fff',
  },
  cardBody: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  countIndicator: {
    backgroundColor: '#28a745',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  countIndicatorText: {
    color: '#fcfbfb',
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
    color: '#010101',
  },
});
