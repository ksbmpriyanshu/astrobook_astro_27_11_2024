import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Linking,
  FlatList,
  Alert
} from 'react-native';
import React from 'react';
import { colors, fonts } from '../../config/Constants';
import MyStatusBar from '../../components/MyStatusbar';
import { useState } from 'react';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import moment from 'moment';
import MyHeader from '../../components/MyHeader';
import { Colors, Sizes, Fonts } from '../../assets/style';
import { showToastMessage } from '../../utils/services';
import { connect } from 'react-redux';
import * as AuthActions from '../../redux/actions/AuthActions'
import { Input } from '@rneui/themed';

const AstrologerSignUp = ({ navigation, dispatch }) => {

  const [state, setState] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    countryState: '',
    country: '',
    pincode: '',
    dob: null,
    experience: '',
    gender: 'Male',
    isChecked: false
  })


  const register = async () => {
    const cityRegex = /^[A-Za-z]+$/;
    const nameRegex = /^[A-Za-z]+( [A-Za-z]+)*$/;
    const phoneNumberRegex = /^\+?(\d{1,4})?[-.\s]?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})$/;
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const currentDate = new Date();
    const selectedDate = new Date(dob);
    const age = currentDate.getFullYear() - selectedDate.getFullYear();
    const monthDiff = currentDate.getMonth() - selectedDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < selectedDate.getDate())
    ) {
      age--;
    }

    if (experience > age) {
      console.log('start')
      showToastMessage({ message: 'Experience cannot be greater than age.' })
      updateState({ experience: '' })
      console.log('end')

      return;
    }

    if (name.length == 0) {
      showToastMessage({ message: 'Please enter your name' })
      return
    } else if (name.length > 40) {
      showToastMessage({ message: 'Name can contain only 40 characters.' });
      return false;
    } else if (!nameRegex.test(name.trimEnd())) {
      showToastMessage({ message: 'Name can only contain alphabetic characters ' });
      return false;
    } else if (!phoneNumberRegex.test(phoneNumber.trimEnd())) {
      showToastMessage({ message: 'Please enter a valid mobile number' });
      return false;
    } else if (email.length == 0) {
      showToastMessage({ message: 'Please enter your email' })
      return
    } else if (!emailRegex.test(email)) {
      showToastMessage({ message: 'Please enter correct email' })
      return
    } else if (phoneNumber.length == 0) {
      showToastMessage({ message: 'Please enter your mobile number' })
      return
    } else if (phoneNumber.length != 10) {
      showToastMessage({ message: 'Please enter correct mobile number' })
      return
    } else
      // if(address.length == 0){
      //   showToastMessage({message: 'Please enter your address'})
      //   return
      // }else
      if (city.length == 0) {
        showToastMessage({ message: 'Please enter your city' })
        return
      } else if (!nameRegex.test(city.trimEnd())) {
        showToastMessage({ message: 'Please enter your Correct City' })
        return
      } else if (!nameRegex.test(countryState.trimEnd())) {
        showToastMessage({ message: 'Please enter your Correct State' })
        return
      } else if (countryState.length == 0) {
        showToastMessage({ message: 'Please enter your state' })
        return
      } else if (!nameRegex.test(country.trimEnd())) {
        showToastMessage({ message: 'Please enter your Correct Country' })
        return
      } else if (country.length == 0) {
        showToastMessage({ message: 'Please enter your country' })
        return
      } else
        // if(pincode.length == 0){
        //   showToastMessage({message: 'Please enter your pincode'})
        //   return
        // }else 
        if (!dob) {
          showToastMessage({ message: 'Please select your date of birth' })
          return
        } else if (experience.length == 0) {
          showToastMessage({ message: 'Please enter your experience' })
          return
        } else if (!isChecked) {
          showToastMessage({ message: 'Please accept our term and conditions' })
          return
        } else {
          const payload = {
            astrologerName: name.trimEnd(),
            email,
            phoneNumber,
            address,
            gender,
            experience,
            city,
            state: countryState,
            country,
            pincode,
            dateOfBirth: dob
          }
          dispatch(AuthActions.onApplyAsAnAstrologer(payload))
          console.log(payload);
        }
  }

  const updateState = data => {
    setState(prevState => {
      const newData = { ...prevState, ...data }
      return newData
    })
  }
  const { name, email, phoneNumber, address, city, countryState, country, pincode, dob, experience, gender, isChecked } = state

  console.log(dob,'date')
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <MyStatusBar
        backgroundColor={colors.background_theme2}
        barStyle={'light-content'}
      />
      {/* <MyLoader isVisible={isLoading} /> */}
      <MyHeader title={'Astrologer SignUp'} navigation={navigation} />
      <View style={{ flex: 1,zIndex:-1 }}>
        <FlatList ListHeaderComponent={<>
          {/* {titleInfo()} */}
          {nameInfo()}
          {emailInfo()}
          {phoneNumberInfo()}
          {addressInfo()}
          {cityInfo()}
          {stateInfo()}
          {countryInfo()}
          {pincodeInfo()}
          {dobInfo()}
          {experienceInfo()}
          {genderInfo()}
          {termsInfo()}
          {submitInfo()}
          {noteInfo()}
        </>}
          contentContainerStyle={{ padding: Sizes.fixPadding * 1.5 }}
        />
      </View>

    </View>
  );

  function noteInfo() {
    return (
      <View style={{ flexDirection: 'row' }}>

        <Text style={{ color: 'black', fontSize: 12 }}>
          Note:- We give you outstanding gains as compare to other platforms.
          {'\n'}हम आपको अन्य प्लेटफार्मों की तुलना में उत्कृष्ट लाभ देते हैं
        </Text>
      </View>
    )
  }

  function submitInfo() {
    return (
      <TouchableOpacity
        onPress={() => {
          register();
        }}
        style={{
          flex: 0,
          width: '100%',
          backgroundColor: colors.new_color,
          paddingVertical: 10,
          borderRadius: 5,
          shadowColor: colors.black_color3,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.3,
          shadowRadius: 10,
          marginVertical: 15,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: colors.background_theme1,
            fontFamily: fonts.semi_bold,
            textAlign: 'center',
          }}>
          Submit Request
        </Text>
      </TouchableOpacity>
    )
  }

  function termsInfo() {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, width: 270 }}>
        <BouncyCheckbox
          size={20}
          fillColor={colors.new_color}
          onPress={() => updateState({ isChecked: !isChecked })}
          textComponent={<Text style={{ color: colors.black_color, marginLeft: Sizes.fixPadding }}>By signing-up, you agree to our{' '}
            <Text
              style={{ fontSize: 14, color: 'red', paddingTop: 10 }}
        
            onPress={() => Linking.openURL('https://astroremedy.com/terms-and-conditions')}
            >
              Terms & Conditions.
            </Text>
          </Text>}
          innerIconStyle={{
            borderRadius: 5,
            backgroundColor: isChecked
              ? colors.new_color
              : colors.background_theme1,
          }}
        />
      </View>
    )
  }

  function genderInfo() {
    return (

      <View
        style={{
          flex: 0,
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: 2,
          paddingHorizontal: 2,
          marginTop: 20,
        }}>
        <View
          style={{
            flex: 0.5,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <BouncyCheckbox
            size={20}
            fillColor={colors.new_color}
            unfillColor="#FFFFFF"
            isChecked={gender == 'Male'}
            disableBuiltInState
            text="Male"
            textStyle={styles.checkBoxText}
            onPress={() => {
              updateState({ gender: 'Male' })
            }}
          />
        </View>
        <View
          style={{
            flex: 0.5,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <BouncyCheckbox
            size={20}
            fillColor={colors.new_color}
            unfillColor="#FFFFFF"
            isChecked={gender == 'Female'}
            disableBuiltInState
            text="Female"
            textStyle={styles.checkBoxText}
            onPress={() => {
              updateState({ gender: 'Female' });
            }}
          />
        </View>
      </View>
    )
  }

  function experienceInfo() {
    return (
      // <TextInput
      //   value={experience}
      //   placeholder="Experience *"
      //   placeholderTextColor={colors.black_color5}
      //   style={styles.textInput}
      //   onChangeText={text => updateState({ experience: text })}
      //   keyboardType="number-pad"
      //   maxLength={3}
      // />
      <View style={{marginBottom: Sizes.fixPadding * 0.6 }}>
      <Text style={styles.heading}>Experience <Text style={{color:Colors.red}}>*</Text></Text>
      <Input
          cursorColor={Colors.black}
          value={experience}
          keyboardType="number-pad"
          inputContainerStyle={styles.inputContainer1}
          containerStyle={{ height: 50, paddingHorizontal: 0 }}
          style={{ height: 50, paddingHorizontal: 0 }}
          inputStyle={{ ...Fonts.black14RobotoRegular, marginLeft: 10 }}
          onChangeText={text => updateState({ experience: text })}
          placeholder='Experience '
          maxLength={3}

      />
  </View>
    )
  }

  function dobInfo() {
    const onDobSelect = () => {
      const onChange = (event, date) => {
        if (event.type === 'set') {
          const selectedDate = new Date(date);
          updateState({ dob: selectedDate })
        }
      };

      DateTimePickerAndroid.open({
        value: new Date(),
        display: 'calendar',
        mode: 'date',
        // maximumDate: new Date(
        //   new Date().getFullYear() ,
        //   new Date().getMonth(),
        //   new Date().getDate(),
        // ),
        onChange,
      });
    };
    return (
      <View>
<Text style={styles.heading}>Date of Birth <Text style={{color:Colors.red}}>*</Text></Text>
      <TouchableOpacity
        onPress={() => onDobSelect()}
        style={[styles.inputContainer]}>
        <Text
          style={{
            marginLeft: 5,
            ...Fonts.black14InterMedium,
            color: dob ? Colors.black : Colors.gray
            // paddingVertical: Sizes.fontSize*0.3,
          }}>
          {dob == null
            ? 'Select Date Of Birth *'
            : moment(dob).format('Do MMM YYYY')}
        </Text>
      </TouchableOpacity>
            </View>
    )
  }

  function pincodeInfo() {
    return (
      <View style={{marginBottom: Sizes.fixPadding * 0.6 }}>
      <Text style={styles.heading}>Pincode </Text>
      <Input
          cursorColor={Colors.black}
          value={pincode}
          keyboardType="number-pad"
          inputContainerStyle={styles.inputContainer1}
          containerStyle={{ height: 50, paddingHorizontal: 0 }}
          style={{ height: 50, paddingHorizontal: 0 }}
          inputStyle={{ ...Fonts.black14RobotoRegular, marginLeft: 10 }}
          onChangeText={text => updateState({ pincode: text })}
          placeholder='Pincode'
          maxLength={6}

      />
  </View>
    )
  }

  function countryInfo() {
    return (
      <View style={{marginBottom: Sizes.fixPadding * 0.6 }}>
      <Text style={styles.heading}>Country <Text style={{color:Colors.red}}>*</Text></Text>
      <Input
          cursorColor={Colors.black}
          value={country}
          inputContainerStyle={styles.inputContainer1}
          containerStyle={{ height: 50, paddingHorizontal: 0 }}
          style={{ height: 50, paddingHorizontal: 0 }}
          inputStyle={{ ...Fonts.black14RobotoRegular, marginLeft: 10 }}
          onChangeText={text => updateState({ country: text })}
          placeholder='Country'

      />
  </View>
    )
  }

  function stateInfo() {
    return (
      <View style={{marginBottom: Sizes.fixPadding * 0.6 }}>
      <Text style={styles.heading}>State <Text style={{color:Colors.red}}>*</Text></Text>
      <Input
          cursorColor={Colors.black}
          value={countryState}
          inputContainerStyle={styles.inputContainer1}
          containerStyle={{ height: 50, paddingHorizontal: 0 }}
          style={{ height: 50, paddingHorizontal: 0 }}
          inputStyle={{ ...Fonts.black14RobotoRegular, marginLeft: 10 }}
          onChangeText={text => updateState({ countryState: text })}
          placeholder='State'

      />
  </View>
    )
  }

  function cityInfo() {
    return (
      <View style={{marginBottom: Sizes.fixPadding * 0.6 }}>
      <Text style={styles.heading}>City <Text style={{color:Colors.red}}>*</Text></Text>
      <Input
          cursorColor={Colors.black}
          value={city}
          inputContainerStyle={styles.inputContainer1}
          containerStyle={{ height: 50, paddingHorizontal: 0 }}
          style={{ height: 50, paddingHorizontal: 0 }}
          inputStyle={{ ...Fonts.black14RobotoRegular, marginLeft: 10 }}
          onChangeText={text => updateState({ city: text })}
          placeholder='City'

      />
  </View>
    )
  }

  function addressInfo() {
    return (
      <View style={{marginBottom: Sizes.fixPadding * 0.6 }}>
      <Text style={styles.heading}>Address</Text>
      <Input
          cursorColor={Colors.black}
          value={address}
          inputContainerStyle={styles.inputContainer1}
          containerStyle={{ height: 50, paddingHorizontal: 0 }}
          style={{ height: 50, paddingHorizontal: 0 }}
          inputStyle={{ ...Fonts.black14RobotoRegular, marginLeft: 10 }}
          onChangeText={text => updateState({ address: text })}
          placeholder='Address'

      />
  </View>
    )
  }

  function phoneNumberInfo() {
    return (
      <View style={{marginBottom: Sizes.fixPadding * 0.6 }}>
      <Text style={styles.heading}>Phone Number <Text style={{color:Colors.red}}>*</Text></Text>
      <Input
          cursorColor={Colors.black}
          keyboardType='number-pad'
          value={phoneNumber}
          inputContainerStyle={styles.inputContainer1}
          containerStyle={{ height: 50, paddingHorizontal: 0 }}
          style={{ height: 50, paddingHorizontal: 0 }}
          inputStyle={{ ...Fonts.black14RobotoRegular, marginLeft: 10 }}
          onChangeText={text => updateState({ phoneNumber: text })}
          placeholder='Phone Number '
        maxLength={10}
      />
  </View>
    )
  }

  function emailInfo() {
    return (
      <View style={{marginBottom: Sizes.fixPadding * 0.6 }}>
                <Text style={styles.heading}>Email <Text style={{color:Colors.red}}>*</Text></Text>
                <Input
                    cursorColor={Colors.black}
                    keyboardType='email-address'
                    value={email}
                    inputContainerStyle={styles.inputContainer1}
                    containerStyle={{ height: 50, paddingHorizontal: 0 }}
                    style={{ height: 50, paddingHorizontal: 0 }}
                    inputStyle={{ ...Fonts.black14RobotoRegular, marginLeft: 10 }}
                    onChangeText={text => updateState({ email: text })}
                    placeholder='Email'

                />
            </View>
    )
  }

  function nameInfo() {
    return (
      <View style={{marginBottom: Sizes.fixPadding * 0.6 }}>
                <Text style={styles.heading}>Full Name <Text style={{color:Colors.red}}>*</Text></Text>
                <Input
                    // disabled
                    cursorColor={Colors.black}
                    keyboardType='email-address'
                    // value={route.params?.item?.name}
                    value={name}
                    inputContainerStyle={styles.inputContainer1}
                    containerStyle={{ height: 50, paddingHorizontal: 0 }}
                    style={{ height: 50, paddingHorizontal: 0 }}
                    inputStyle={{ ...Fonts.black14RobotoRegular, marginLeft: 10 }}
                    onChangeText={text => updateState({ name: text })}
                    placeholder='Full Name'

                />
            </View>
     
    )
  }

  function titleInfo() {
    return (
      <Text
        style={{
          ...Fonts.primaryLight15RobotoMedium,
          textAlign: 'center',
          marginBottom: 20,
        }}>
        New Astrologer Registration Form
      </Text>
    )
  }


};

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(null, mapDispatchToProps)(AstrologerSignUp);

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    padding: Sizes.fixPadding * 1.4,
    borderWidth: 1,
    borderRadius: 1000,
    borderColor: colors.black_color5,
    marginBottom: 15,
    ...Fonts.black14InterMedium,
    borderRadius: Sizes.fixPadding,
  },
  heading: {
    backgroundColor: Colors.white,
    zIndex: 99,
    alignSelf: 'flex-start',
    paddingHorizontal: Sizes.fixPadding * 0.8,
    color: '#8B8989',
    bottom: -Sizes.fixPadding * 0.8,
    left: Sizes.fixPadding ,
    ...Fonts.black12RobotoRegular
    
},
  inputContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Sizes.fixPadding,
    borderColor: colors.black_color6,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Colors.grayA,
    fontSize: 16
  },
  checkBoxText: {
    fontSize: 14,
    color: colors.black_color8,
    fontFamily: fonts.medium,
    textDecorationLine: 'none',
  },
  inputContainer1: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#F3F3F3',
    borderRadius: Sizes.fixPadding * 0.5,
    paddingHorizontal: Sizes.fixPadding,
    // marginTop: Sizes.fixPadding * 2,
    borderColor: Colors.grayA,
    backgroundColor: '#FAFAFA'
},

});
