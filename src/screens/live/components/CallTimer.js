import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import { duration } from 'moment';
import { secondsToHMS } from '../../../utils/services';
import {Colors, Sizes, Fonts} from '../../../assets/style';

const CallTimer = ({totalDuration}) => {
  const [timer, setTimer] = useState(totalDuration);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev - 1 <= 0) {
          clearInterval(interval);
          console.log('Ended');
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return <Text style={{...Fonts.black11InterMedium}}>{secondsToHMS(timer)}</Text>;
};

export default CallTimer;
