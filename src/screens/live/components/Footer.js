import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Input} from '@rneui/themed';
import {Colors, Fonts, Sizes} from '../../../assets/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as LiveActions from '../../../redux/actions/LiveActions';
import {connect} from 'react-redux';
import AnimatedHeart from './AnimatedHeart';
import { colors } from '../../../config/Constants';

const Footer = ({dispatch}) => {
  const [message, setMessage] = useState('');

  const send = () => {
    dispatch(LiveActions.sendComments(message));
    setMessage('');
  };

  return (
    <View>
      <Input
        value={message}
        placeholder="Say Hii..."
        placeholderTextColor={Colors.gray}
        cursorColor={Colors.primaryLight}
        onChangeText={setMessage}
        inputStyle={styles.inputStyle}
        containerStyle={styles.containerStyle}
        style={styles.container}
        inputContainerStyle={styles.inputContainerStyle}
        rightIconContainerStyle={styles.rightIconContainerStyle}
        rightIcon={() => {
          return (
            <View
              style={{flexDirection: 'row', height: 40, alignItems: 'center'}}>
              <TouchableOpacity
                activeOpacity={0.8}
                disabled={message.length == 0}
                onPress={send}
                style={{marginLeft: Sizes.fixPadding}}>
                <Ionicons
                  name="send-sharp"
                  color={colors.new_color}
                  size={36}
                />
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() => dispatch(LiveActions.addHeart())}
                style={{
                  width: 36,
                  height: 36,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 1000,
                  backgroundColor: Colors.primaryLight,
                }}>
                <Ionicons name="call" color={Colors.white} size={22} />
              </TouchableOpacity> */}
            </View>
          );
        }}
      />
    </View>
  );
};

const mapDispatchToProps = dispatch => ({dispatch});

export default connect(null, mapDispatchToProps)(Footer);

const styles = StyleSheet.create({
  container: {},
  inputStyle: {
    backgroundColor: '#2e2e2e',
    borderRadius: 1000,
    ...Fonts.white14RobotoMedium,
    paddingHorizontal: Sizes.fixPadding,
  },
  containerStyle: {
    height: 60,
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
  },
  rightIconContainerStyle: {
    backgroundColor: 'transparent',
  },
});
