import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Button,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolateColors,
  interpolate,
  Extrapolate,
  withTiming,
} from 'react-native-reanimated';

import {mixColor} from 'react-native-redash';

function ButtonAnimation() {
  const toggle = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => {
    const t = toggle.value ? 30 : 0;
    const scaleButton = toggle.value ? 1.5 : 1;

    return {
      transform: [
        {translateX: withTiming(t)},
        {scale: withTiming(scaleButton)},
      ],
    };
  });

  const backgroundColor = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        mixColor(toggle.value, '#fcfbfb', '#02d7ff50'),
      ),
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.bodyText}>
        welcome button will animate when clicked
      </Text>
      <Animated.View style={[styles.buttonWrapper, backgroundColor]}>
        <Animated.View style={[styles.buttonCap, animatedStyle]} />
      </Animated.View>

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.pressableButton}
        onPress={() => {
          toggle.value = !toggle.value;
        }}>
        <Text>Toggle Button</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default ButtonAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    marginTop: '20%',
    width: 50,
    height: 20,
    borderRadius: 12,
    justifyContent: 'center',
  },
  bodyText: {
    color: '#fff',
  },
  buttonCap: {
    width: 21,
    height: 21,
    backgroundColor: '#02d7ff',
    borderRadius: 12,
  },
  pressableButton: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 8,
    marginTop: '10%',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#4565ec',
    borderRadius: 12,
    padding: 5,
  },
  button: {
    marginTop: 50,
  },
  boxText: {
    fontSize: 20,
    color: '#fcfbfb',
    textAlign: 'center',
  },
});
