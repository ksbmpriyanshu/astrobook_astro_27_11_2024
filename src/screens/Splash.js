import { View, Text, Dimensions, Image, ImageBackground, Alert, BackHandler  } from 'react-native';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as SettingActions from '../redux/actions/SettingActions'
import socketServices from '../utils/socket';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen';
import { colors } from '../config/Constants';
import MyStatusBar from '../components/MyStatusbar';

const { width, height } = Dimensions.get('screen');

const Splash = ({ navigation, dispatch,customerData }) => {
  
 console.log("customerData?._id::>..",customerData)
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    setTimeout(() => {
      dispatch(SettingActions.getSplash(dispatch))
      socketServices.initializeSocket(dispatch,customerData?._id)
    }, 4000);
  }, []);

  return (
    <View style={{backgroundColor:colors.statusbar,flex:1}}>

    
    <ImageBackground 
    source={require('../assets/images/AstroBookSplash.png')}
    style={{ justifyContent: 'center', alignItems: 'center',height:SCREEN_HEIGHT ,width:SCREEN_WIDTH }} resizeMode='contain'>
      <MyStatusBar
        backgroundColor={''}
        barStyle="light-content"
        translucent={true}
      />
      {/* {imageview()} */}
    </ImageBackground>
    </View>
  );
  // function imageview() {
  //   return (
  //     <View style={{ height: SCREEN_WIDTH * 0.4, width: SCREEN_WIDTH * 0.6, borderRadius: 100, overflow: 'hidden' }}>
  //       <Image source={require('../assets/images/newlogo.png')} style={{ height: SCREEN_WIDTH * 0.5, width: SCREEN_WIDTH * 0.6, resizeMode: 'contain', }} />
  //     </View>
  //   )
  // }
};

const mapStateToProps = state => ({
  providerData: state.provider.providerData,
  customerData: state.customer.customerData,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
