import { View, Text, Modal, ActivityIndicator, Animated, Easing } from 'react-native';
import React, { useState, useEffect } from 'react';
import { colors } from '../config/Constants';
import { connect } from 'react-redux';

const MyLoader = ({isLoading}) => {

  const fadeAnim = new Animated.Value(0); // Initial value for opacity

  useEffect(() => {
    const animate = () => {
      Animated.timing(
        fadeAnim, // The animated value to drive
        {
          toValue: 1, // Target value
          duration: 1000, // Animation duration in milliseconds
          easing: Easing.ease, // Easing function (optional)
          useNativeDriver: true, // Use the native driver for performance
        }
      ).start(); // Start the animation
    };

    animate();

    // You can also add more animations or any other logic here

    return () => {
      // Clean up any resources (if needed)
    };
  }, [fadeAnim]);


  return (
    <Modal visible={isLoading} transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.background_theme2 + '10',
        }}>
        <View style={{ backgroundColor: 'white', 
        padding: 15, 
        flexDirection: 'row', 
        alignItems: 'center', 
        borderRadius: 100, elevation: 10, justifyContent: 'space-around' }}>
          <ActivityIndicator size="large" color={colors.background_theme2} />
          
        </View>
      </View>
    </Modal>
  );
};

const mapStateToProps = state =>({
  isLoading: state.setting.isLoading
})

export default connect(mapStateToProps, null)(MyLoader);
