import {StyleSheet, Text, View, Animated, Easing, Image} from 'react-native';
import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SCREEN_HEIGHT} from '../../config/Screen';
const animationEndY = Math.ceil(SCREEN_HEIGHT * 0.7);
const negativeEndY = animationEndY * -1;

export class AnimatedHeart extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          {this.props.hearts &&
            this.props.hearts.map(heart => {
              return (
                <HeartContainer
                  key={heart.id}
                  style={{right: heart.right}}
                  onComplete={() => this.props.removeHeart(heart.id)}
                  color={heart.color}
                />
              );
            })}
        </View>
        {/* <TouchableOpacity onPress={this.props.addHeart} style={styles.addButton}>
          <Image
            source={require('../../assets/images/icons/heart_live.png')}
            style={{
              width: SCREEN_WIDTH * 0.1,
              height: SCREEN_WIDTH * 0.1,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity> */}
      </View>
    );
  }
}

class HeartContainer extends Component {
  constructor() {
    super();
    this.yAnimation = this.state.position.interpolate({
      inputRange: [negativeEndY, 0],
      outputRange: [animationEndY, 0],
    });

    this.opacityAnimation = this.yAnimation.interpolate({
      inputRange: [0, animationEndY],
      outputRange: [1, 0],
    });

    this.scaleAnimation = this.yAnimation.interpolate({
      inputRange: [0, 15, 30],
      outputRange: [0, 1.4, 1],
      extrapolate: 'clamp',
    });

    this.xAnimation = this.yAnimation.interpolate({
      inputRange: [
        0,
        animationEndY / 6,
        animationEndY / 3,
        animationEndY / 2,
        animationEndY,
      ],
      outputRange: [0, 25, 15, 0, 10],
    });

    this.rotateAnimation = this.yAnimation.interpolate({
      inputRange: [
        0,
        animationEndY / 6,
        animationEndY / 3,
        animationEndY / 2,
        animationEndY,
      ],
      outputRange: ['0deg', '-5deg', '0deg', '5deg', '0deg'],
    });
  }
  state = {
    position: new Animated.Value(0),
  };

  static defaultProps = {
    onComplete() {},
  };

  componentDidMount() {
    Animated.timing(this.state.position, {
      duration: 2000,
      toValue: negativeEndY,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(this.props.onComplete);
  }

  getHeaderStyle() {
    return {
      transform: [
        {translateY: this.state.position},
        {scale: this.scaleAnimation},
        {translateX: this.xAnimation},
        {rotate: this.rotateAnimation},
      ],
      opacity: this.opacityAnimation,
    };
  }

  render() {
    return (
      <Animated.View
        style={[
          styles.heartContainer,
          this.getHeaderStyle(),
          this.props.style,
        ]}>
        <Heart color={this.props.color} />
      </Animated.View>
    );
  }
}

const Heart = props => (
  <View {...props} style={[styles.heart, props.style]}>
    <AntDesign name="heart" size={36} color={props.color} />
  </View>
);

export default AnimatedHeart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 5,
    left: 10,
  },
  heartContainer: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: 'transparent',
  },
  heart: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
