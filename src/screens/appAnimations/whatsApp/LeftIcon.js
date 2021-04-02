import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  withSpring,
  interpolate,
  Extrapolate,
  useDerivedValue,
  runOnJS,
} from 'react-native-reanimated';
import {mix} from 'react-native-redash';

const TrashIcons = [
  {id: 1, path: require('../../../../res/img/trashClose.png')},
  {id: 2, path: require('../../../../res/img/trashOpenLid.png')},
  {id: 3, path: require('../../../../res/img/trashOpen.png')},
];

const LeftIcon = ({animatedValue, isRecording}) => {
  const micStyle = useAnimatedStyle(() => {
    const transform = [
      {
        translateY: withSequence(
          withTiming(animatedValue.value * -100),
          withTiming(animatedValue.value * 0),
        ),
      },
      {
        rotate: withSpring(`${animatedValue.value * 360}deg`),
      },
      {
        scale: withSequence(
          withTiming(interpolate(animatedValue.value, [0, 1], [1, 1.5])),
          withTiming(interpolate(animatedValue.value, [0, 1], [1.5, 1])),
          withTiming(interpolate(animatedValue.value, [0, 1], [1, 1])),
        ),
      },
    ];

    return {
      // display: recordAudio.value ? 'flex' : 'none',
      transform: transform,
    };
  });

  const smilyStyle = useAnimatedStyle(() => ({
    display: isRecording.value ? 'none' : 'flex',
  }));

  const micDisplayStyle = useAnimatedStyle(() => ({
    display: isRecording.value ? 'flex' : 'none',
  }));

  return (
    <View>
      <Animated.Image
        source={require('../../../../res/img/microphone.png')}
        style={[
          styles.leftIcon,
          {tintColor: '#d63343'},
          micDisplayStyle,
          micStyle,
        ]}
      />
      <Animated.Image
        source={require('../../../../res/img/smilyFace.png')}
        style={[styles.leftIcon, smilyStyle]}
      />
      <View style={[{...StyleSheet.absoluteFillObject}, {}]}>
        {TrashIcons.map((icon, index) => (
          <TrashIcon
            key={index}
            index={index}
            icon={icon}
            animatedValue={animatedValue}
          />
        ))}
      </View>
      {/* <TrashIcon trashIcons={TrashIcons} translateValue={translateY} /> */}
    </View>
  );
};

export default LeftIcon;

const styles = StyleSheet.create({
  leftIcon: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
    tintColor: '#656566',
  },
});

const TrashIcon = ({icon, animatedValue, index}) => {
  const animateTrash = useSharedValue(0);

  useDerivedValue(() => {
    if (animatedValue.value === 1) {
      animateTrash.value = 1;
    }
  }, [animatedValue.value]);

  const style = useAnimatedStyle(() => {
    const opacity = interpolate(
      animateTrash.value,
      [0.5, 0.7, 1],
      [1, 1, 1],
      Extrapolate.CLAMP,
    );
    return {
      opacity,
    };
  });
  return (
    <Animated.View style={[{...StyleSheet.absoluteFillObject}, style]}>
      <Animated.Image source={icon.path} style={[styles.leftIcon]} />
    </Animated.View>
  );
};
