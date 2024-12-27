import {View, Text} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {Colors, Fonts, Sizes} from '../../assets/style';
import database from '@react-native-firebase/database';

let database_interval = null;

const Timer = ({time, liveID, onStopCall}) => {
  const [timeCount, setTimeCount] = useState(time);
  useEffect(() => {
    let interVal = setInterval(() => {
      if (timeCount > 0) {
        setTimeCount(prevState => {
          const newData = prevState - 1;
          database().ref(`LiveStreaming/${liveID}`).update({
            time: newData, // Update the database with the current timeCount value
          });
          if(prevState - 1 <= 0){
            clearInterval(interVal);
            onStopCall()
          }
          return newData;
        });
      }
    }, 1000);
    return () => {
      clearInterval(interVal);
    };
  }, []);

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return (
      String(minutes).padStart(2, '0') +
      ':' +
      String(remainingSeconds).padStart(2, '0')
    );
  };

  return (
    <View
      style={{
        marginHorizontal: Sizes.fixPadding,
        backgroundColor: Colors.primaryLight,
        alignSelf: 'flex-start',
        marginTop: Sizes.fixPadding * 0.5,
        paddingHorizontal: Sizes.fixPadding * 0.5,
        paddingVertical: Sizes.fixPadding * 0.1,
        borderRadius: 1000,
        elevation: 8,
      }}>
      <Text style={{...Fonts.white12RobotoMedium, fontSize: 11}}>
        {formatTime(timeCount)} min
      </Text>
    </View>
  );
};

export default Timer;
