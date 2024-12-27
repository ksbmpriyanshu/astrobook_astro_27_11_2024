import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import CountDown from './CountDown';
import { Colors, Fonts, Sizes } from '../../../assets/style';
import { navigate } from '../../../navigations/NavigationServices';
import { connect } from 'react-redux';

const Timer = ({requestedData, dispatch}) => {
  return (
    <View
      style={[
        styles.row,
        {
          padding: Sizes.fixPadding * 1,
          backgroundColor: Colors.greenLight,
          elevation: 2,
        },
      ]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigate('intakeDetails')}
        style={{
          paddingHorizontal: 10,
          borderRightWidth: 1,
          borderColor: Colors.gray,
        }}>
        <Text style={{ ...Fonts.white14RobotoMedium }}>Intake Details</Text>
      </TouchableOpacity>
      <View
        style={{
          paddingHorizontal: 10,
          borderRightWidth: 1, 
          borderColor: Colors.gray,
        }}>
        <Text style={{ ...Fonts.white14RobotoMedium }}>
          Rate : ₹ {requestedData?.chatPrice}/min
        </Text>
      </View>
      <View style={[styles.row, { paddingHorizontal: 10 }]}>
        {/* <Image
          source={require('../../assets/images/icons/timer.png')}
          resizeMode="contain"
          style={{
            width: 14,
            height: 14,
            marginBottom: 3,
            tintColor: Colors.blackTwo,
          }}
        /> */}
        <View style={{ paddingHorizontal: 5 }}>
          <Text style={{ ...Fonts.white14RobotoMedium }}>
            <CountDown />
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.whiteDark,
    borderTopLeftRadius: Sizes.fixPadding * 4,
    elevation: 8,
  },
});
