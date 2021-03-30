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
  const translateValue = useDerivedValue(() => {
    // return animatedValue.value * -100;
    return interpolate(animatedValue.value, [0, 1], [0, -100]);
  });

  const micStyle = useAnimatedStyle(() => {
    console.log({translateValue});
    const transform = [
      {
        translateY: withSequence(
          withTiming(translateValue.value),
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
      <TrashIcon trashIcons={TrashIcons} translateValue={translateValue} />
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

const TrashIcon = ({trashIcons, translateValue}) => {
  const animate = useSharedValue(0);

  const Console = val => {
    return console.log('starting trash', val);
  };

  useDerivedValue(() => {
    runOnJS(Console)(translateValue.value);
    if (translateValue.value === -100) {
      animate.value = 1;
    }
  }, [translateValue.value]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      display: animate.value === 1 ? 'flex' : 'none',
    };
  });

  const trashStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSequence(
            withTiming(animate.value * -20),
            withTiming(animate.value * 30),
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={animatedStyles}>
      <Animated.Image
        source={trashIcons[0].path}
        style={[styles.leftIcon, trashStyle]}
      />
    </Animated.View>
  );
};
