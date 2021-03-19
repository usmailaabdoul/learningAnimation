import React, {useState, useEffect} from 'react'
import { StyleSheet, Button, View, Text } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, interpolate } from 'react-native-reanimated';

function Box() {
  const [data, setData] = useState('');
  const [toggle, setToggle] = useState(false);
  const offset = useSharedValue(0);
  const height = useSharedValue(100)
  // const width = useSharedValue(100)

  const animatedStyles = useAnimatedStyle(() => {
    const HEIGHT = interpolate(offset.value, [0, 1], [0, 100])
    return {
      transform: [{ translateX: withSpring(offset.value * 255) }],
      height: withTiming(HEIGHT),
      // opacity: withTiming(offset.value),
    };
  });

  const addDataAndAnimation = () => {
    console.log('running')
    // height.value = 'auto'
    setToggle(!toggle);
    offset.value = 1;
  }
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyles]}>
        <Text style={styles.boxText}>Esse sunt tempor</Text>
        {toggle && (
          <Text style={styles.boxText}>Ea dolor do dolore et Ea dolor do dolore et</Text>
        )}
      </Animated.View>
      <View style={styles.button}>
        <Button onPress={() => addDataAndAnimation()} title="Move" />
      </View>
    </View>
  );
}

export default Box;

const styles = StyleSheet.create({
  box: {
    width: 100,
    // height: 'auto',
    backgroundColor: '#4565ec',
    borderRadius: 12,
    padding: 5,
    // flexGrow: 1,
  },
  container: {
    marginHorizontal: 20,
    marginVertical: 20
  },
  button: {
    marginTop: 50
  },
  boxText: {
    fontSize: 20,
    color: '#fcfbfb',
    textAlign: 'center'
  }
})