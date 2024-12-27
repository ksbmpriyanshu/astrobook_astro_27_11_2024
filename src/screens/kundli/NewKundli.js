import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  api2_create_kundali,
  api_url,
  colors,
  fonts,
  getFontSize
} from '../../config/Constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { success_toast, warnign_toast } from '../../components/MyToastMessage';
import MyLoader from '../../components/MyLoader';
import axios from 'axios';
import { connect } from 'react-redux';
import DatePicker from 'react-native-date-picker'
import { useTranslation } from 'react-i18next';
import * as SettingActions from '../../redux/actions/SettingActions'
import * as KundliActions from '../../redux/actions/KundliActions'

const { width, height } = Dimensions.get('window');
const genderData = [
  { id: 1, title: "male" },
  { id: 2, title: "female" },
];


const NewKundli = ({ navigation, locationData, dispatch, isLoading }) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [dob, setDob] = useState(null);
  const [dobVisible, setDobVisible] = useState(false);
  const [tob, setTob] = useState(null);
  const [tobVisible, setTobVisible] = useState(false);
  const [gender, setGender] = useState("male");

  useEffect(() => {
    navigation.setOptions({
      tabBarLabel: t("new_kundli"),
    });
    return () => {
      dispatch(SettingActions.setLocationData(null))
    }
  }, []);

  const date_handle = (event, selectedDate) => {
    if (event.type == 'set') {
      setDob(selectedDate);
    }
    setDobVisible(false);

  };

  const time_handle = (event, selectedTime) => {
    if (event.type == 'set') {
      setTob(selectedTime);
    }
    setTobVisible(false);
  };


  const create_kundli = async () => {
    if (name.length == 0) {
      warnign_toast('Please enter name.');

    } else if (!locationData) {
      warnign_toast('Please enter birth place.');

    } else if (dob == null) {
      warnign_toast('Please select date of birth.');

    } else if (tob == null) {
      warnign_toast('Please select time of birth.');

    } else {
      const payload = {
        name: name,
        gender: gender,
        dob: dob,
        tob: tob,
        place: locationData?.address,
        lat: locationData?.lat,
        lon: locationData?.lon,
      }
      setName('')
      setDob(null)
      setGender('male')
      setTob(null)
      dispatch(SettingActions.setLocationData(null))
      dispatch(KundliActions.createKundli(payload))

    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.black_color1 }}>
      <MyLoader isVisible={isLoading} />
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="account"
            color={colors.black_color8}
            size={getFontSize(2)}
          />
          <TextInput
            value={name}
            placeholder={t("enter_name")}
            placeholderTextColor={colors.black_color5}
            onChangeText={setName}
            style={{
              flex: 1,
              marginLeft: 5,
              color: colors.black_color9,
              fontSize: getFontSize(1.4),
              padding: 0
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('placeOfBirth',);
          }}
          style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="map-marker"
            color={colors.black_color8}
            size={getFontSize(2)}
          />
          <Text allowFontScaling={false} style={{ fontSize: getFontSize(1.4), color: colors.black_color7 }}>
            {locationData ? locationData?.address : t("place_of_birth")}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 0,
            width: '100%',
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => setDobVisible(true)}
            style={{ ...styles.inputContainer, width: '45%' }}>
            <MaterialCommunityIcons
              name="calendar-month-outline"
              color={colors.black_color8}
              size={getFontSize(2)}
            />
            <Text allowFontScaling={false}
              style={{
                fontSize: getFontSize(1.4),
                color: colors.black_color7,
                fontFamily: fonts.medium,
                marginLeft: 5,
              }}>
              {dob == null ? t("date_of_birth") : moment(dob).format('DD-MM-YYYY')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTobVisible(true)}
            style={{ ...styles.inputContainer, width: '45%' }}>
            <MaterialCommunityIcons
              name="clock-outline"
              color={colors.black_color8}
              size={getFontSize(2)}
            />
            <Text allowFontScaling={false}
              style={{
                fontSize: getFontSize(1.4),
                color: colors.black_color7,
                fontFamily: fonts.medium,
                marginLeft: 5,
              }}>
              {tob == null ? t("time_of_birth") : moment(tob).format('HH:mm A')}
            </Text>
          </TouchableOpacity>
        </View>
        {dobVisible && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dob != null ? dob : new Date()}
            mode={'date'}
            display='spinner'
            maximumDate={new Date()}
            // minimumDate={new Date(1900, 1, 1)}
            onChange={date_handle}
          />
        )}
        {tobVisible && (

          <DateTimePicker
            testID="dateTimePicker"
            value={tob != null ? tob : new Date()}
            mode={'time'}
            display='spinner'
            is24Hour={false}
            timeZoneName={'Asia/Kolkata'}
            onChange={time_handle}
          />
        )}
        <View style={{ flexDirection: 'row' }}>
          <Image source={require('../../assets/images/gender.png')}
            style={{ width: getFontSize(3), height: getFontSize(3), marginTop: getFontSize(2), resizeMode: 'contain' }} />
          <View
            style={{
              flex: 0,
              width: '85%',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: colors.black_color6,
              flexDirection: 'row',
              alignSelf: 'center',
            }}>
            {genderData.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setGender(item.title)}
                style={{
                  flex: 0,
                  flexDirection: 'row',
                  width: '50%',
                  alignSelf: 'center',
                  backgroundColor:
                    item.title == gender
                      ? colors.background_theme2
                      : colors.background_theme1,
                  height: height * 0.07,
                  borderRadius: 10,
                  borderWidth: item.title == gender ? 1 : 0,
                  borderColor: colors.background_theme2,
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>

                <Text allowFontScaling={false}
                  style={{
                    fontSize: getFontSize(1.4),
                    color:
                      item.title != gender
                        ? colors.black_color7
                        : colors.background_theme1,
                    fontFamily: fonts.medium,
                    marginLeft: 5,
                  }}>
                  {(t(item.title))}

                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <TouchableOpacity onPress={create_kundli} style={styles.buttonContainer}>
          <Text allowFontScaling={false} style={styles.buttonText}>{t("get_kundli")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  wallet: state.customer.wallet,
  locationData: state.setting.locationData,
  isLoading: state.setting.isLoading,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(NewKundli);

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginTop: height * 0.03,
    height: height * 0.52,
    backgroundColor: '#fafdf6',
    alignSelf: 'center',
    borderRadius: 15,
    shadowColor: colors.black_color4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    padding: 15,
    elevation: 8,

  },
  buttonContainer: {
    width: '100%',
    height: height * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: colors.background_theme2,
    marginTop: height * 0.04,
  },
  buttonText: {
    fontSize: getFontSize(1.6),
    color: colors.black_color,
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
  inputContainer: {
    flex: 0,
    // height: height * 0.07,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.black_color6,
    padding: 10,
    marginBottom: height * 0.02,
  },
  checkBoxText: {
    fontSize: 14,
    color: colors.black_color8,
    fontFamily: fonts.medium,
    textDecorationLine: 'none',
  },
});
