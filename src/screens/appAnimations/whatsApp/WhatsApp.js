import React from 'react';
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
} from 'react-native-reanimated';

import LeftIcon from './LeftIcon';

function WhatsApp() {
  const recordAudio = useSharedValue(false);
  const animatedValue = useSharedValue(0);

  const textInputStyle = useAnimatedStyle(() => ({
    display: recordAudio.value ? 'none' : 'flex',
  }));

  const cancelTextStyle = useAnimatedStyle(() => {
    const display = recordAudio.value ? 'flex' : 'none';
    return {
      display,
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.bottomMessageInput}>
        <View style={styles.textInputContainer}>
          <LeftIcon animatedValue={animatedValue} isRecording={recordAudio} />

          <View style={styles.textInputWrapper}>
            <Animated.View style={cancelTextStyle}>
              <TouchableOpacity
                onPress={() => {
                  animatedValue.value = 1;
                }}
                style={styles.cancelTextWrapper}>
                <Text style={styles.cancelText}>CANCEL</Text>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View style={textInputStyle}>
              <TextInput
                style={styles.input}
                placeholder="Type a message"
                placeholderTextColor="#656566"
              />
            </Animated.View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => (recordAudio.value = true)}
          style={styles.button}>
          <Image
            style={styles.sendIcon}
            source={require('../../../../res/img/microphone.png')}
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
