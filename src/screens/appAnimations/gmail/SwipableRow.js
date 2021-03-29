import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

const SwipableRow = ({children}) => {
  const translateX = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler({
    onActive: ({translationX}) => {
      translateX.value = translationX;
    },
  });
  const style = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={style}>{children}</Animated.View>
    </PanGestureHandler>
  );
};

export default SwipableRow;

const styles = StyleSheet.create({});
