import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {secondsToHMS} from '../../../utils/services';

const WaitingTimer = ({joingTime}) => {
  const [timer, setTimer] = useState(joingTime);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevState => {
        return prevState + 1;
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <Text>{secondsToHMS(timer)}</Text>;
};

export default WaitingTimer;
