import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedRef,
} from 'react-native-reanimated';

import {ONBOARDING} from './constants';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Onboarding = () => {
  const animatedValue = useSharedValue(0);
  const scrollRef = useAnimatedRef();
  // const onScroll = onScr
  return (
    <View style={styles.container}>
      <View style={styles.slider}>
        <Animated.ScrollView
          ref={scrollRef}
          decelerationRate="fast"
          bounces={false}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={WIDTH}
          scrollEventThrottle={16}
          // {...{onScroll}}
        >
          {ONBOARDING.map((onboarding, index) => {
            return <OnboardingCard key={index} onboarding={onboarding} />;
          })}
        </Animated.ScrollView>
      </View>
      <View style={styles.footer}>
        <Footer
          onboardings={ONBOARDING}
          onPress={() => {
            console.log(scrollRef.current);
            if (scrollRef.current) {
              scrollRef.current.scrollTo({
                x: WIDTH * (animatedValue.value + 1),
                animated: true,
              });
            }
          }}
        />
      </View>
    </View>
  );
};

export default Onboarding;

const OnboardingCard = ({onboarding}) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardImgWrapper}>
        <Image style={styles.cardImg} source={onboarding.img} />
      </View>
      <Text style={styles.title}>{onboarding.title}</Text>
      <Text style={styles.subTitle}>{onboarding.subTitle}</Text>
    </View>
  );
};

const Footer = ({onboardings, onPress}) => {
  return (
    <>
      <View style={styles.footerWrapper}>
        {onboardings.map((_, index) => (
          <View key={index} style={styles.pagination} />
        ))}
      </View>

      <TouchableOpacity onPress={() => onPress()} style={styles.footerBtn}>
        <Text>next</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slider: {
    height: 0.61 * HEIGHT,
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: WIDTH,
  },
  cardImgWrapper: {
    borderBottomWidth: 2,
    borderBottomColor: '#2f3be9',
    marginHorizontal: 5,
  },
  cardImg: {
    width: WIDTH,
    height: WIDTH + -100,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    color: '#2f3be9',
    textAlign: 'center',
    marginVertical: 20,
    marginHorizontal: 10,
  },
  subTitle: {
    fontSize: 18,
    color: '#a5a5ad',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  pagination: {
    width: 7,
    height: 7,
    backgroundColor: '#a5a5ad',
    margin: 5,
    marginBottom: '10%',
    borderRadius: 10,
  },
  footerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  footerBtn: {
    width: 75,
    height: 75,
    borderRadius: 75,
    backgroundColor: '#d3368a',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
