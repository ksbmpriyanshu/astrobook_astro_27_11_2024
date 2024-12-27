import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  ScrollView,
  Pressable,
  Linking,
  PermissionsAndroid,
  Alert
} from 'react-native';
import React, {useEffect} from 'react';
import MyStatusBar from '../components/MyStatusbar';
import {api_url, colors, fonts, user_web_api_login,signup_google,api2_get_profile,getFontSize} from '../config/Constants';
import {useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import MyLoader from '../components/MyLoader';
import axios from 'axios';
import {CommonActions} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as CustomerActions from '../redux/actions/CustomerActions';
import { connect } from 'react-redux';
import {success_toast, warnign_toast} from '../components/MyToastMessage';
import Ionicons from 'react-native-vector-icons/Ionicons'

const {width, height} = Dimensions.get('screen');
const Login = props => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isAstrodate, setIsAstroDate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validation, setValidation] = useState(false);
  const [verificationId, setVerificationId] = useState('');
  const [code, setCode] = useState({callingCode: '91', cca2: 'IN'});
  const [passwordVisible, setPasswordVisible] = useState(false)
  
  useEffect(() => {

    // const checkApplicationPermission = async () => {
    //   if (Platform.OS === 'android') {
    //     try {
    //       await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    //       );
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    // };

    // checkApplicationPermission();

    

    props.navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const number_validation = () => {
    if (phoneNumber.length != 10) {
      
      warnign_toast('Please Enter Mobile Number');
      return false;
    } else if (!isChecked) {
      warnign_toast('Please check terms and conditions box.');
      return false;
    } else {
      return true;
    }
  };

  const google_validation = () => {
    if (!isChecked) {
      warnign_toast('Please check terms and conditions box.');
      return false;
    } else {
      return true;
    }
  }

  const login = async () => {
    if (number_validation()) {
      setIsLoading(true);
      let fcm_token = await messaging().getToken();
      // let fcm_token = 'skdfkljsdkfjhjsdhf'
      await axios({
        method: 'get',
        url:
          api_url +
          user_web_api_login +
          `number=${phoneNumber}&token=${fcm_token}`,
      })
        .then(res => {
          console.log(res.data);
          setIsLoading(false);
          if (res.data.status == 1) {
            if (res.data.new_user == 0) {
              props.navigation.navigate('otp', {
                phone_number: phoneNumber,
                otp: res.data.otp,
                flag: isAstrodate ? 1 : 0,
                // code: confirmation.verificationId,
              });
            } else {
              go_home();
            }
          } else {
            warnign_toast(res.data.msg);
          }
        })
        .catch(err => {
          setIsLoading(false);
          console.log(err);
        });
    }
  };

  const signInWithPhoneNumber = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(
        `+91${phoneNumber}`,
      );
      setVerificationId(confirmation.verificationId);
      props.navigation.navigate('otp', {
        phone_number: phoneNumber,
        otp: 1234,
        code: confirmation.verificationId,
      });
    } catch (error) {
      console.log(error);
      warnign_toast(
        'We have blocked all requests from this device due to unusual activity. Try again later.',
      );
    }
  };

  const handle_phone_number = text => {
    setPhoneNumber(text);
    setValidation(false);
  };

  const openWhatsApp = () => {
    const phoneNumber = '+916371133825'; // Replace with the desired phone number
    const text = 'Hello Astrokunj\nI need some help.'; // Replace with the desired pre-filled text

    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      text,
    )}`;

    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          console.log('WhatsApp is not installed on this device');
          warnign_toast('WhatsApp is not installed on this device');
        }
      })
      .catch(error => console.log(error));
  };

  const google_login = () => {
    if(google_validation()) {
      GoogleSignin.configure({
        androidClientId: '349953920310-stuttllabmvnoo5vc1j6gae225mqft1l.apps.googleusercontent.com',
    });
        GoogleSignin.hasPlayServices().then((hasPlayService) => {
              if (hasPlayService) {
                  GoogleSignin.signIn().then((userInfo) => {
                            
                            console.log(userInfo.user);
                            google_register(userInfo.user.name,userInfo.user.email,userInfo.user.givenName,userInfo.user.familyName)
  
                  }).catch((e) => {
                  console.log("ERROR IS: " + JSON.stringify(e));
                  // Alert.alert('erropr',JSON.stringify(e));
                  })
              }
        }).catch((e) => {
          console.log("ERROR IS: " + JSON.stringify(e));
          // Alert.alert('erropr',JSON.stringify(e));
        })
    }
    
  }


  const google_register = async (gname, mail, fname, lname) => {
    setIsLoading(true);
    let fcm_token = await messaging().getToken();
    let type = 'google_login';
    await axios({
      method: 'get',
      url:
        `${api_url}${signup_google}?name=${encodeURIComponent(gname)}&email=${encodeURIComponent(mail)}&first_name=${encodeURIComponent(fname)}&last_name=${encodeURIComponent(lname)}&type=${encodeURIComponent(type)}&fcm=${encodeURIComponent(fcm_token)}`,
    })
      .then(res => {
        setIsLoading(false);
        if (res.data?.is_new_user == '0') {
          customer_profile(res.data.id);
        } else {
          create_user_firebase_accout(res.data.id,res.data.email);
        }
        
      })
      .catch(err => {
        setIsLoading(false);
        console.log('Error:', err);
        Alert('error',err);
      });
  }

  const customer_profile = async id => {
    let data = new FormData();
    data.append('user_id', id);
    await axios({
      method: 'post',
      url: api_url + api2_get_profile,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: data,
    })
      .then(async res => {
        await AsyncStorage.setItem(
          'customerData',
          JSON.stringify(res.data.user_details[0]),
        );
        props.dispatch(
          CustomerActions.setCustomerData(res.data.user_details[0]),
        );
        props.dispatch(
          CustomerActions.setWallet(res.data.user_details[0].wallet),
        );
        // onUserLogin(
        //   res.data.user_details[0].id,
        //   res.data.user_details[0].username,
        // );
        get_customer_firebase_id(id);
        gohome();
        success_toast('You are logged successfully.');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const get_customer_firebase_id = id => {
    database()
      .ref(`UserId/${id}`)
      .on('value', snapchat => {
        console.log('firebase Id otp up',snapchat?.val());
        props.dispatch(CustomerActions.setFirebaseId(snapchat?.val()));
      });
  };

  const gohome = () => {
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'home',
            state: {
              routes: [
                {name: 'home2', params: {flag: props.route.params?.flag}},
              ],
            },
          },
        ],
      }),
    );
  };

  const create_user_firebase_accout = async (id,mail) => {
    await auth()
      .createUserWithEmailAndPassword(
        `${mail}`,
        '12345678',
      )
      .then(response => {
        props.dispatch(CustomerActions.setFirebaseId(response.user.uid));
        database()
          .ref(`/UserId/${id}`)
          .set(response.user.uid)
          .then(res => {
            console.log('test_data');
            customer_profile(id);
          })
          .catch(err => {
            console.log('test failed');
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
        customer_profile(id);
      });
  };

  const go_home = () => {
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'home'}],
      }),
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.background_theme2}}>
      <MyStatusBar
        backgroundColor={colors.background_theme2}
        barStyle="light-content"
      />
      <MyLoader isVisible={isLoading} />
      <ScrollView showsVerticalScrollIndicator={false}>
      <View 
      style={{
        backgroundColor:'white',
        marginTop:125,
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity:  0.20,
        shadowRadius: 5.62,
        elevation: 7
        }}>
      
        <Image source={require('../assets/images/Logo2.png')}
        style={{width:85,height:85,alignSelf:'center',marginTop:20}} />
          <Text
            style={{
              textAlign: 'center',
              fontSize: getFontSize(2.5),
              paddingTop:20,
              color: colors.black_color8,
              fontFamily: fonts.bold,
            }}>
            Welcome To
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: getFontSize(2.5),
              color: colors.background_theme4,
              fontFamily: fonts.bold,
              marginTop: 2,
              marginBottom: 2,
            }}>
            {/* {isAstrodate ? 'Astrodate' : 'Astrokunj'} */}
            AstroKunj
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: getFontSize(1.5),
              color: colors.black_color8,
              fontFamily: fonts.medium,
              marginVertical: 10,
            }}>
            Enter Your Mobile Number To Continue
          </Text>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'android' ? 'padding' : 'height'}>
            <View
              style={{
                flex: 1,
                width: '85%',
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: colors.background_theme4,
                borderRadius: 25,
                marginBottom: 5,
                marginTop:30
              }}>
              
              <Text style={{fontSize: getFontSize(1.4),fontWeight:'bold',paddingRight:5,paddingLeft:10, color: colors.black_color7, fontFamily: fonts.medium}}>
                {` +${code.callingCode}`}
              </Text>
              <View><Text style={{borderRightWidth:1,borderColor:colors.background_theme4,height:getFontSize(1.8)}}></Text></View>
              <TextInput
                placeholder="Enter Your Mobile Number"
                placeholderTextColor={colors.black_color6}
                keyboardType="numeric"
                onChangeText={handle_phone_number}
                style={{width: '80%', fontSize: getFontSize(1.4), padding: 8,color:'black'}}
                maxLength={10}
              />              
            </View>
          </KeyboardAvoidingView>
          <View
            style={{
              flex: 0,
              flexDirection: 'row',
              width:'90%',
              alignSelf: 'center',
              alignItems:'center',
              justifyContent:'center',
              marginTop:10
            }}>
            <BouncyCheckbox
              size={getFontSize(1.8)}
              fillColor={colors.background_theme4}
              onPress={() => setIsChecked(!isChecked)}
              innerIconStyle={{
                borderRadius: 5,
                backgroundColor: isChecked
                  ? colors.background_theme4
                  : colors.background_theme1,
              }}
            />
            <Text
              style={{
                fontSize: getFontSize(1.2),
                color: 'black',
                fontFamily: 'medium',
                marginTop: 2,
                textAlign: 'center',
              }}>
              By Signing up, you agree to our{' '}
              <Text
                style={{ fontSize: getFontSize(1.2), color: 'red', paddingTop: 10 }}
                // onPress={() => Linking.openURL('https://astrokunj.com/Terms-Conditions-user.html')}
                >
                Terms And Conditions
              </Text>{' '}
              and{' '}
              <Text
                style={{ fontSize: getFontSize(1.2), color: 'red' }}
                onPress={() => Linking.openURL('https://astrokunj.com/Privacy-Policy.html')}>
                Privacy Policy
              </Text>
  </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={login}
            style={{
              flex: 0,
              width: '80%',
              alignSelf: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 25,
              marginBottom: height * 0.02,
              paddingVertical: 10,
              backgroundColor: colors.background_theme2,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop:10
            }}>
            <Text style={{fontSize: getFontSize(1.8),paddingRight:20,fontWeight:'bold', color: colors.black_color}}>
              SUBMIT OTP
            </Text>
            <AntDesign
              name="arrowright"
              color={colors.black_color}
              size={20}
            />
          </TouchableOpacity>
          <View style={{flex:0,alignItems:'center'}}>
            <TouchableOpacity onPress={() => google_login()} style={{borderWidth:1,
              borderColor:colors.background_theme2,
              borderRadius:50,padding:10,flexDirection:'row',marginBottom:10}}>
              <Image source={require('../assets/images/icon/google.png')} style={{width:20,height:20}} />
              <Text style={{color:'black',paddingLeft:10,fontSize:getFontSize(1.5)}}>Google Login</Text>
            </TouchableOpacity>
            {/* <View style={{borderWidth:1,
              borderColor:colors.background_theme2,
              borderRadius:50,padding:10,flexDirection:'row',marginBottom:10}}>
              <Image source={require('../assets/images/icon/facebook.png')} style={{width:20,height:20}} />
              <Text style={{color:'black',paddingLeft:10}}>Facebook Login</Text>
            </View> */}
            
          </View>
          <View style={{padding:10}}>
              <Text style={{borderTopWidth:1,borderColor:colors.background_theme4}}></Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginBottom: height * 0.05,
            }}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('astrologerLogin')}
              style={styles.loginButtonContainer}>
              <Text style={styles.loginButtonText}>Astrologer Login</Text>
            </TouchableOpacity>
            
          </View>
          
      
      </View>
      </ScrollView>
    </View>
  );
};

const mapDispatchToProps = dispatch => ({dispatch});

export default connect(null, mapDispatchToProps)(Login);


const styles = StyleSheet.create({
  loginButtonContainer: {
    flex: 0,
    width: '40%',
    paddingVertical: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white_color,
    borderWidth:1,
    borderColor:colors.background_theme4
  },
  loginButtonText: {
    fontSize: getFontSize(1.4),
    color: colors.background_theme4,
    fontFamily: fonts.medium,
  },
});
