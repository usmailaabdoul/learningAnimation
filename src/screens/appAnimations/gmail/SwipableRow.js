import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import {snapPoint} from 'react-native-redash';

const width = Dimensions.get('window').width;
const finalDestination = width;
const editWidth = width - 250;
const snapPoints = [-editWidth, 0, finalDestination];

const SwipableRow = ({children, onDelete, archive}) => {
  const translateX = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
    },
    onActive: ({translationX}, ctx) => {
      translateX.value = ctx.x + translationX;
    },
    onEnd: ({velocityX}) => {
      const dest = snapPoint(translateX.value, velocityX, snapPoints);
      translateX.value = withSpring(
        dest,
        {
          overshootClamping: true,
        },
        () => {
          if (dest === finalDestination) {
            runOnJS(onDelete)(dest, finalDestination);
          }
        },
      );
    },
  });
  const style = useAnimatedStyle(() => ({
    backgroundColor: 'white',
    transform: [{translateX: translateX.value}],
    borderRadius: translateX.value ? 10 : 0,
    elevation: translateX.value ? 1.5 : 0,
  }));

  const archiveStyle = useAnimatedStyle(() => ({
    opacity: translateX.value < 0 ? 1 : 0,
  }));

  const deleteStyle = useAnimatedStyle(() => ({
    opacity: translateX.value > 0 ? 1 : 0,
  }));

  return (
    <View>
      <Animated.View style={[StyleSheet.absoluteFill, deleteStyle]}>
        <View style={[StyleSheet.absoluteFill, styles.delete]}>
          <Text style={styles.deleteText}>Delete</Text>
        </View>
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFill, archiveStyle]}>
        <View style={[StyleSheet.absoluteFill, styles.archive]}>
          <TouchableWithoutFeedback onPress={() => archive()}>
            <Image
              source={require('../../../../res/img/archive.png')}
              style={styles.archiveImg}
            />
          </TouchableWithoutFeedback>
        </View>
      </Animated.View>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={style}>{children}</Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default SwipableRow;

const styles = StyleSheet.create({
  archive: {
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
    paddingRight: 20,
  },
  archiveImg: {
    width: 30,
    height: 30,
    tintColor: 'white',
  },
  delete: {
    backgroundColor: '#ff0000bb',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  deleteText: {
    fontSize: 20,
    color: 'white',
  },
});
