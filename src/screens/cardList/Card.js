import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
// import {Ionicons} from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e5f1f6',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  headerText: {
    fontSize: 20,
    color: '#000000aa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

function Card() {
  const [height, setHeight] = useState(null);
  const animatedValue = new Animated.Value(0);

  const changeHeight = () => {
    if (height === 100) {
      return setHeight(null);
    }
    setHeight(100);

    animatedValue.setValue(height);

    Animated.spring(animatedValue, {
      toValue: height,
      duration: 5000,
      useNativeDriver: true,
    }).start();

    animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, height],
    });
  };

  console.log({animatedValue});
  return (
    <View
      onLayout={e => setHeight(e.nativeEvent.layout.height)}
      style={[styles.container, {height}]}>
      <TouchableOpacity onPress={() => changeHeight()} style={styles.header}>
        <Text style={styles.headerText}>Title</Text>
        {/* <Ionicons name="chevron-forward" size={18} /> */}
      </TouchableOpacity>
    </View>
  );
}

export default Card;
