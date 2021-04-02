import React, {useState} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
} from 'react-native-reanimated';

import {CARDS} from './constants';

const {width} = Dimensions.get('window');
const CARD_HEIGHT = (width * 1564) / 1274;
const CARD_WIDTH = width - 100;

const Carousel = () => {
  const [cards, setCards] = useState(CARDS);
  const translateX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      translateX.value = event.contentOffset.x;
    },
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={width}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {cards.map((card, index) => (
          <Card key={index} index={index} card={card} x={translateX} />
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default Carousel;

const Card = ({card, x, index}) => {
  const style = useAnimatedStyle(() => {
    const translateX = interpolate(
      x.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [width / 2, 0, -width / 2],
    );

    const scale = interpolate(
      x.value,
      [(index - 1) * CARD_WIDTH, index * CARD_WIDTH, (index + 1) * CARD_WIDTH],
      [0.6, 1, 0.6],
    );

    return {
      transform: [{scale}],
    };
  });

  return (
    <Animated.View style={[styles.card, style]}>
      <View style={[styles.cardWrapper]}>
        <Text>card list</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    alignSelf: 'center',
  },
  cardWrapper: {
    borderRadius: 16,
    // margin: 32,
    flex: 1,
    backgroundColor: 'cyan',
    padding: 16,
    justifyContent: 'space-between',
  },
});
