import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MyStatusBar from '../../components/MyStatusbar';
import {
  add_or_update_device_token,
  api_url,
  astrologer_dashboard,
  astrologer_login,
  base_url,
  colors,
  fonts,
  vedic_images,
  getFontSize
} from '../../config/Constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ProviderActions from '../../redux/actions/ProviderActions';
import axios from 'axios';
import { connect } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';
import MyLoader from '../../components/MyLoader';
import { Switch } from 'react-native-switch';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Colors, Sizes } from '../../assets/style';
import * as AuthActions from '../../redux/actions/AuthActions'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';

const { width, height } = Dimensions.get('screen');

const AstrologerLogin = ({ dispatch, navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authemail, setAuthEmail] = useState('');
  const [rememberMe, setRemember] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    getCredentials();
  }, []);


  const email_validation = e => {
    let email = e;
    let filter =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(email.value)) {
      // Yay! valid
      return true;
    } else {
      return false;
    }
  };

  const validation = () => {
    if (email.length == 0) {
      Alert.alert('Please enter your email');
    } else if (email_validation(email)) {
      Alert.alert('Please enter correct email address.');
    } else if (password.length == 0) {
      Alert.alert('Please enter your password.');
    } else {
      const data = {
        email: email.toLowerCase(),
        password,
      }
      const payload = {
        data: data,
        dispatch: dispatch
      }

      dispatch(AuthActions.onLogin(payload))
    }
  };


  const rememberUser = async (rem) => {
    try {
      const credentials = JSON.stringify({ email, password, rememberMe });
      console.log(credentials);
      await AsyncStorage.setItem('astrologerCredentials', credentials);
      console.log('Credentials saved successfully');
    } catch (error) {
      console.error('Error saving credentials:', error);
    }
  };

  const getCredentials = async () => {
    const fcm = await messaging().getToken();
    console.log('fcm', fcm)
    try {
      const storedCredentials = await AsyncStorage.getItem('astrologerCredentials');
      if (storedCredentials) {
        const { email: storedEmail, password: storedPassword, rememberMe: storedRememberMe } = JSON.parse(
          storedCredentials
        );
        console.log('aaaa', storedEmail, storedPassword, storedRememberMe);
        // Use the stored values
        setEmail(storedEmail);
        setPassword(storedPassword);
        setRemember(storedRememberMe);
      }
    } catch (error) {
      console.error('Error retrieving credentials:', error);
    }
  };

  const forgetUser = async () => {
    try {
      await AsyncStorage.removeItem('astrologer_login_save');
    } catch (error) {
      // Error removing
      console.log(error);
    }
  };

  return (
    // <View style={{ flex: 1, backgroundColor: colors.white_color }}>
    //   <MyStatusBar
    //     backgroundColor={colors.background_theme2}
    //     barStyle="light-content"
    //     translucent={true}
    //   />
    //   <MyLoader isVisible={isLoading} />
    //   <KeyboardAvoidingView
    //     behavior={Platform.OS == 'android' ? 'height' : 'padding'}
    //     style={{ flex: 1 }}>
    //     <ScrollView style={{ flex: 0 }}>
    //       {/* <Image source={require('../../assets/images/astrologers.png')} style={{ position: 'absolute', width: '100%', height: '45%' }} /> */}
    //       <View style={{ padding: 20, paddingBottom: 20 }}>
    //         <View style={{ padding: 5, borderRadius: 20, paddingTop: 75,  alignSelf:'center' }}>
    //           <Image source={require('../../assets/images/newlogo.png')} style={{ width:SCREEN_WIDTH * 0.3, height:SCREEN_WIDTH * 0.3, resizeMode:'contain'}}/>

    //           {/* <Text style={{ color: 'black', paddingLeft: 30, paddingRight: 30, paddingTop: 15, paddingBottom: 10, fontSize: getFontSize(1.7), textAlign: 'justify', fontWeight: 'bold', color: 'black' }}>
    //             "Join us on a journey where your astrological brilliance not only earns respect but also unlocks unparalleled prosperity."
    //           </Text> */}
    //           {/* <Text style={{color:'black',paddingLeft:30,paddingRight:30,paddingBottom:10,fontSize:18,textAlign:'justify',color:'#ff3c38',fontWeight:'bold'}}>
    //         "हमारे साथ जुड़ें एक ऐसे सफर पर, जहां आपकी ज्योतिषीय चमक न केवल सम्मान प्राप्त करती है, बल्कि असाधारण समृद्धि का दरवाजा भी खुलता है।"
    //         </Text> */}
    //         </View>
    //       </View>
    //       <View
    //         style={{
    //           flex: 0,
    //           width: width * 0.8,
    //           alignSelf: 'center',
    //           marginTop: 0,
    //         }}>
    //         <Text
    //           style={{
    //             fontSize: 15,
    //             color: colors.new_color,
    //             fontFamily: fonts.bold,
    //             textAlign: 'center',
    //           }}>
    //          Astrologer Login 
    //         </Text>


    //         <View style={{ flex: 0 }}>
    //           <View style={styles.inputContainer}>
    //             <MaterialCommunityIcons
    //               name="email"
    //               color={colors.black_color8}
    //               size={20}
    //             />
    //             <TextInput
    //               value={email}
    //               placeholder="Enter email address"
    //               keyboardType="email-address"
    //               placeholderTextColor={colors.black_color5}

    //               onChangeText={text => {
    //                 setEmail(text);
    //               }}
    //               style={{
    //                 flex: 0,
    //                 width: '80%',
    //                 marginLeft: 5,
    //                 color: colors.black_color9,
    //                 fontFamily: fonts.medium,
    //                 paddingVertical: 10,
    //               }}
    //             />

    //           </View>
    //           <View style={styles.inputContainer}>
    //             <MaterialCommunityIcons
    //               name="lock"
    //               color={colors.black_color8}
    //               size={20}
    //             />
    //             <TextInput
    //               value={password}
    //               placeholder="Password"
    //               placeholderTextColor={colors.black_color5}
    //               secureTextEntry={passwordVisible}
    //               onChangeText={text => {
    //                 setPassword(text);
    //               }}
    //               style={{
    //                 flex: 0,
    //                 width: '80%',
    //                 marginLeft: 5,
    //                 color: colors.black_color9,
    //                 fontFamily: fonts.medium,
    //                 paddingVertical: 10
    //               }}
    //             />
    //             <TouchableOpacity
    //             activeOpacity={0.8}
    //             onPress={()=>setPasswordVisible(prevState=>!prevState)}
    //             >
    //               <Ionicons name={!passwordVisible ? 'eye' : 'eye-off-sharp'} color={Colors.blackLight} size={22} />
    //             </TouchableOpacity>
    //           </View>
    //           {/* <View style={{ flexDirection: 'row', marginTop: Sizes.fixPadding }}>

    //             <BouncyCheckbox
    //               size={getFontSize(1.8)}
    //               fillColor={colors.background_theme4}
    //               onPress={(value) => setRemember(value)}
    //               innerIconStyle={{
    //                 borderRadius: 5,
    //                 backgroundColor: rememberMe
    //                   ? colors.background_theme4
    //                   : colors.background_theme1,
    //               }}
    //               isChecked={rememberMe}
    //             />
    //             <Text style={{ color: 'black' }}>Remember Me</Text>
    //           </View> */}
    //           <TouchableOpacity
    //             onPress={() => navigation.navigate('forgetPassword')}
    //             style={{ flex: 0, marginTop: 10,width:SCREEN_WIDTH * 0.3,alignSelf:'flex-end' , }}>
    //             <Text
    //               style={{
    //                 fontSize: 11,
    //                 color:"blue",
    //                 fontFamily: fonts.medium,
    //                 textAlign:'right'
    //               }}>
    //               Forgot Password ?
    //             </Text>
    //           </TouchableOpacity>
    //           <TouchableOpacity
    //             onPress={() => validation()}
    //             style={{
    //               flex: 0,
    //               justifyContent: 'center',
    //               alignItems: 'center',
    //               marginTop: 25,
    //               borderRadius: width * 0.55,
    //               backgroundColor: colors.new_color,
    //               paddingVertical: 10,
    //             }}>
    //             <Text
    //               style={{
    //                 fontSize: 15,
    //                 color: colors.white_color,
    //                 fontWeight: 'normal',
    //               }}>
    //               LOGIN
    //             </Text>
    //           </TouchableOpacity>
    //           <TouchableOpacity
    //             onPress={() => navigation.navigate('astrologerSignUp')}
    //             activeOpacity={1}
    //             style={{
    //               flex: 0,
    //               width: '100%',
    //               alignSelf: 'center',
    //               flexDirection: 'row',
    //               alignItems: 'center',
    //               justifyContent: 'space-between',
    //               borderWidth: 2,
    //               borderRadius: 10000,
    //               borderColor: colors.pink_color3,
    //               marginVertical: 15,
    //               backgroundColor: colors.new_color,
    //               shadowColor: colors.black_color5,
    //               shadowOffset: { width: 0, height: 1 },
    //               shadowOpacity: 0.3,
    //               shadowRadius: 5,
    //               marginTop: 30
    //             }}>
    //             <View
    //               style={{
    //                 flex: 0,
    //                 alignSelf: 'center',
    //                 justifyContent: 'center',
    //                 alignItems: 'center',
    //                 width: 50,
    //                 height: SCREEN_HEIGHT*0.054,
    //                 borderWidth: 1.5,
    //                 borderColor: colors.pink_color3,
    //                 borderRadius: 30,
    //                 right: 1,
    //               }}>
    //               <MaterialCommunityIcons
    //                 name="account-check"
    //                 color={colors.white_color}
    //                 size={25}
    //               />
    //             </View>
    //             <Text
    //               style={{
    //                 flex: 1,
    //                 fontSize: 15,
    //                 color: colors.white_color,
    //                 fontFamily: fonts.medium,
    //                 textAlign: 'center',
    //                 right:Sizes.fixPadding * 2.4
    //               }}>

    //             Astrologer Sign Up
    //             </Text>
    //           </TouchableOpacity>
    //         </View>
    //       </View>
    //     </ScrollView>
    //   </KeyboardAvoidingView>
    // </View>
   
        <View style={{ flex: 1 }}>
        <MyStatusBar
        backgroundColor={colors.background_theme2}
        barStyle="light-content"
        translucent={true}
      />
          {topContent()}
          {Inputs()}
          {forget()}
          {buttonLogin()}
          {verified()}
        </View>
     

  );
  function topContent() {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          style={{ height: SCREEN_HEIGHT * 0.4, width: SCREEN_WIDTH * 1 }}
          source={require('../../assets/images/bookanuj.png')} />
      </View>
    )

  }
  function Inputs() {
    return (
      <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.035, paddingTop: SCREEN_HEIGHT * 0.015 }}>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="email"
            color={colors.black_color8}
            size={20}
          />
          <TextInput
            value={email}
            placeholder="Enter email address"
            keyboardType="email-address"
            placeholderTextColor={colors.black_color5}

            onChangeText={text => {
              setEmail(text);
            }}
            style={{
              flex: 0,
              width: '80%',
              marginLeft: 5,
              color: colors.black_color9,
              fontFamily: fonts.medium,
              paddingVertical: 10,
            }}
          />

        </View>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="lock"
            color={colors.black_color8}
            size={20}
          />
          <TextInput
            value={password}
            placeholder="Password"
            placeholderTextColor={colors.black_color5}
            secureTextEntry={passwordVisible}
            onChangeText={text => {
              setPassword(text);
            }}
            style={{
              flex: 0,
              width: '80%',
              marginLeft: 5,
              color: colors.black_color9,
              fontFamily: fonts.medium,
              paddingVertical: 10
            }}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setPasswordVisible(prevState => !prevState)}
          >
            <Ionicons name={!passwordVisible ? 'eye' : 'eye-off-sharp'} color={Colors.blackLight} size={22} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  function forget() {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('forgetPassword')}
        style={{ paddingTop: SCREEN_HEIGHT * 0.01, width: SCREEN_WIDTH * 0.3, alignSelf: 'flex-end', paddingHorizontal: SCREEN_WIDTH * 0.02 }}>
        <Text
          style={{
            fontSize: 11,
            color: "blue",
            fontFamily: fonts.medium,
            textAlign: 'right'
          }}>
          Forgot Password ?
        </Text>
      </TouchableOpacity>)
  }
  function buttonLogin() {
    return (
      <TouchableOpacity
        onPress={() => validation()}
        style={{ paddingTop: SCREEN_HEIGHT * 0.03, paddingHorizontal: SCREEN_WIDTH * 0.03 }}>
        <View style={{ paddingVertical: SCREEN_HEIGHT * 0.019, borderRadius: 25, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: SCREEN_WIDTH * 0.04, backgroundColor: colors.black_color9 }}>
          <Text style={{ fontSize: Sizes.fixPadding * 1.5, fontWeight: "500", color: colors.white_color }}>Login</Text>
          <AntDesign name='arrowright' color={colors.white_color} size={20} />
        </View>
      </TouchableOpacity>
    )
  }
  function verified() {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('astrologerSignUp')}
        style={{ justifyContent: "center", alignItems: "center", paddingTop: SCREEN_HEIGHT * 0.015 }}>
        <Text style={{ color: colors.black_color6, fontSize: Sizes.fixPadding * 1.3 }}>Verified Astrologer</Text>
      </TouchableOpacity>
    )
  }
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(null, mapDispatchToProps)(AstrologerLogin);

const styles = StyleSheet.create({
  inputContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    borderWidth: 1,
    borderColor: colors.black_color5,
    borderRadius: 10,
    marginTop: SCREEN_HEIGHT * 0.01,
    fontFamily: fonts.medium,
    paddingLeft: 10
  },
});
