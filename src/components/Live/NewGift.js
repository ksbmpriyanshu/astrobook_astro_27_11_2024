import {View, Text, Animated, Image} from 'react-native';
import React, { useEffect, useRef } from 'react';
import { SCREEN_WIDTH } from '../../config/Screen';

const NewGift = ({newGiftData}) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 3,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        width: SCREEN_WIDTH * 0.15,
        height: SCREEN_WIDTH * 0.15,
        transform: [{scale: fadeAnim}],
        alignSelf: 'center'
      }}>
      <Image
        source={{uri: newGiftData?.imageUrl}}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </Animated.View>
  );
};

export default NewGift;
