import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from 'react-native-reanimated';
import {mix} from 'react-native-redash';

function Intro() {
  const grow = useSharedValue(0);

  useEffect(() => {
    grow.value = withRepeat(withTiming(1, {duration: 3000}), -1, true);
  }, [grow]);

  const imageStyles = useAnimatedStyle(() => {
    const WIDTH = mix(grow.value, 100, 250);
    const HEIGHT = mix(grow.value, 100, 250);
    return {
      width: WIDTH,
      height: HEIGHT,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{
          uri:
            'https://i.pinimg.com/originals/ca/76/0b/ca760b70976b52578da88e06973af542.jpg',
        }}
        style={[styles.image, imageStyles]}
      />
    </View>
  );
}

export default Intro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 12,
  },
});
