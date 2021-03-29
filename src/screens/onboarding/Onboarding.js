import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedRef,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolate,
  useAnimatedStyle,
  useDerivedValue,
  multiply,
} from 'react-native-reanimated';
import {} from 'react-native-redash';
import Svg, {Circle, G} from 'react-native-svg';

import {ONBOARDING} from './constants';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const {PI} = Math;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Onboarding = () => {
  const x = useSharedValue(0);
  const scrollRef = useAnimatedRef();

  const scrollHandler = useAnimatedScrollHandler(event => {
    x.value = event.contentOffset.x;
  });

  const currentIndex = useDerivedValue(() => {
    return x.value / WIDTH;
  }, [x.value]);

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
          onScroll={scrollHandler}>
          {ONBOARDING.map((onboarding, index) => {
            return <OnboardingCard key={index} onboarding={onboarding} />;
          })}
        </Animated.ScrollView>
      </View>
      <Animated.View style={styles.footer}>
        <Footer
          onboardings={ONBOARDING}
          {...{currentIndex, x}}
          onPress={() => {
            if (scrollRef.current) {
              scrollRef.current.scrollTo({
                x: WIDTH * (x.value / WIDTH + 1),
                animated: true,
              });
            }
          }}
        />
      </Animated.View>
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

const Footer = ({onboardings, onPress, x, currentIndex}) => {
  const size = WIDTH - 32;
  const STROKE_WIDTH = 5;
  const r = PixelRatio.roundToNearestPixel(size / 5.5);

  return (
    <>
      <Animated.View style={styles.footerWrapper}>
        {onboardings.map((_, index) => {
          console.log({x});
          return <Dot key={index} {...{index, currentIndex}} />;
        })}
      </Animated.View>
      <View style={styles.svgWrapper}>
        <View style={{width: r * 2, height: r * 2}}>
          <Animated.View style={StyleSheet.absoluteFill}>
            <CircularProgress
              strokeWidth={STROKE_WIDTH}
              color="#d3368a"
              {...{r, currentIndex}}
            />
          </Animated.View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => onPress()}
        style={[StyleSheet.absoluteFillObject, styles.footerBtn]}>
        <Image
          source={require('../../../res/img/arrow.png')}
          style={styles.btnImg}
        />
      </TouchableOpacity>
    </>
  );
};

const Dot = ({index, currentIndex}) => {
  const style = useAnimatedStyle(() => {
    const opacity = interpolate(
      currentIndex.value,
      [index - 1, index, index + 1],
      [0.5, 1, 0.5],
      Extrapolate.CLAMP,
    );
    const scale = interpolate(
      currentIndex.value,
      [index - 1, index, index + 1],
      [1, 1.25, 1],
      Extrapolate.CLAMP,
    );
    const width = interpolate(
      currentIndex.value,
      [index - 1, index, index + 1],
      [8, 15, 8],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
      transform: [{scale}],
      width,
    };
  });

  return <Animated.View key={index} style={[styles.pagination, style]} />;
};

const CircularProgress = ({currentIndex, r, color, strokeWidth}) => {
  const radius = r - strokeWidth / 2;
  const theta = useDerivedValue(() => {
    console.log('number', (currentIndex.value / 33.33) * 10);
    return (currentIndex.value / 33.33) * 10 * radius;
  }, [currentIndex.value]);

  const strokeDashoffset = multiply(0.7, radius);
  const circumference = radius * 2 * PI;
  return (
    <Svg style={StyleSheet.absoluteFill}>
      <Circle
        cx={r}
        cy={r}
        fill="transparent"
        stroke={color}
        strokeOpacity={0.2}
        r={radius}
        {...{strokeWidth}}
      />
      <AnimatedCircle
        cx={r}
        cy={r}
        fill="transparent"
        stroke={color}
        r={radius}
        strokeDasharray={`${circumference}, ${circumference}`}
        {...{strokeWidth}}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
      />
    </Svg>
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
    height: 7,
    backgroundColor: '#d3368a',
    margin: 5,
    marginBottom: '10%',
    borderRadius: 10,
  },
  footerWrapper: {
    flex: 0.62,
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
    top: '55%',
    left: '39.5%',
  },
  svgWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{rotate: '-90deg'}],
  },
  btnImg: {
    width: 40,
    height: 40,
    tintColor: '#fff',
  },
});
