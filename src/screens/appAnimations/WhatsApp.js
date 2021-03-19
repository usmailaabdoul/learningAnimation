import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  runOnJS,
} from 'react-native-reanimated';
import {mix} from 'react-native-redash';

function WhatsApp() {
  const [recordAudio, setRecordAudio] = useState(false);

  const animatedValue = useSharedValue(0);

  const updateState = () => {
    console.log('it stop');
    setTimeout(() => {
      setRecordAudio(false);
    }, 2000);
  };

  const micStyle = useAnimatedStyle(() => {
    return {
      transform: [
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
            withTiming(mix(animatedValue.value, 1, 1.5)),
            withTiming(mix(animatedValue.value, 1.5, 1)),
          ),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.bottomMessageInput}>
        <View style={styles.textInputContainer}>
          {recordAudio ? (
            <Animated.Image
              source={require('../../../res/img/microphone.png')}
              style={[styles.leftIcon, {tintColor: '#d63343'}, micStyle]}
            />
          ) : (
            <Image
              source={require('../../../res/img/smilyFace.png')}
              style={styles.leftIcon}
            />
          )}
          <View style={styles.textInputWrapper}>
            {recordAudio ? (
              <TouchableOpacity
                onPress={() => (animatedValue.value = 1)}
                style={styles.cancelTextWrapper}>
                <Text style={styles.cancelText}>CANCEL</Text>
              </TouchableOpacity>
            ) : (
              <TextInput
                style={styles.input}
                placeholder="Type a message"
                placeholderTextColor="#656566"
              />
            )}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => setRecordAudio(true)}
          style={styles.button}>
          <Image
            style={styles.sendIcon}
            source={require('../../../res/img/microphone.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default WhatsApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomMessageInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#c1c1c1',
    marginVertical: 5,
    marginHorizontal: 10,
    height: 45,
    alignItems: 'center',
    borderRadius: 100,
  },
  leftIcon: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
    tintColor: '#656566',
  },
  button: {
    backgroundColor: '#02d7ff',
    borderRadius: 100,
    height: 45,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  sendIcon: {
    width: 30,
    height: 30,
    marginLeft: -2,
    marginBottom: -2,
    tintColor: '#fcfdfd',
  },
  textInputWrapper: {
    flex: 1,
  },
  input: {
    color: '#656566',
    fontSize: 16,
  },
  cancelTextWrapper: {
    marginRight: 20,
  },
  cancelText: {
    color: '#d63343',
    textAlign: 'right',
    fontWeight: '700',
  },
});
