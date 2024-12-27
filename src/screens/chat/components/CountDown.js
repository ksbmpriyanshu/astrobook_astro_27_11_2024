import {View, Text} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';


const CountDown = ({chatTimerCountDown}) => {
  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return (
      String(minutes).padStart(2, '0') +
      ':' +
      String(remainingSeconds).padStart(2, '0')
    );
  };
  return <Text>{chatTimerCountDown ? formatTime(chatTimerCountDown) : '00:00'}</Text>;
};

const mapStateToProps = state => ({
  chatTimerCountDown: state.chat.chatTimerCountDown,
});

const mapDispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, mapDispatchToProps)(CountDown);
