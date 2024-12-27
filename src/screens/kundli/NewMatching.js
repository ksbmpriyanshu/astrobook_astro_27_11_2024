import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import {
  api2_create_kundali,
  api_url,
  colors,
  fonts,
  match_making,
} from '../../config/Constants';
import MyLoader from '../../components/MyLoader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import moment from 'moment';
import { warnign_toast } from '../../components/MyToastMessage';
import axios from 'axios';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import MyHeader from '../../components/MyHeader';
import * as KundliActions from '../../redux/actions/KundliActions'
import * as SettingActions from '../../redux/actions/SettingActions'

const NewMatching = ({ navigation, route, dispatch, locationData, subLocationData }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [maleName, setMaleName] = useState('');
  const [femaleName, setFemaleName] = useState('');
  const [maleDateVisible, setMaleDateVisible] = useState(false);
  const [maleDate, setMaleDate] = useState(null);
  const [maleTimeVisible, setMaleTimeVisible] = useState(false);
  const [maleTime, setMaleTime] = useState(null);
  const [femaleDateVisible, setFemaleDateVisible] = useState(false);
  const [femaleDate, setFemaleDate] = useState(null);
  const [femaleTimeVisible, setFemaleTimeVisible] = useState(false);
  const [femaleTime, setFemaleTime] = useState(null);

  useEffect(() => {
    return () => {
      dispatch(SettingActions.setLocationData(null))
      dispatch(SettingActions.setSubLocationData(null))
    }
  }, [])

  const validation = () => {
    if ((maleName.length === 0)) {
      warnign_toast('Please enter male name.');
      return false;
    } else if (maleDate === null) {
      warnign_toast('Please select male birth date.');
      return false;
    } else if (maleTime === null) {
      warnign_toast('Please select male birth time.');
      return false;
    } else if (!locationData) {
      warnign_toast('Please select male birth address.');
      return false;
    } else if ((femaleName.length === 0)) {
      warnign_toast('Please enter female name.');
      return false;
    } else if (femaleDate === null) {
      warnign_toast('Please select female birth date.');
      return false;
    } else if (femaleTime === null) {
      warnign_toast('Please select female birth time.');
      return false;
    } else if (!subLocationData) {
      warnign_toast('Please select female birth address.');
      return false;
    } else {
      return true;
    }

  };

  const get_matching = async (mid, fid) => {
    if (validation()) {
      const maleKundliData = {
        name: maleName,
        gender: 'male',
        dob: maleDate,
        tob: maleTime,
        place: locationData?.address,
        lat: locationData?.lat,
        lon: locationData?.lon,
      };

      const femaleKundliData = {
        name: femaleName,
        gender: 'female',
        dob: femaleDate,
        tob: femaleTime,
        place: subLocationData?.address,
        lat: subLocationData?.lat,
        lon: subLocationData?.lon,
      };

      const matchingPayload = {
        m_day: parseInt(moment(maleDate).format('D')),
        m_month: parseInt(moment(maleDate).format('M')),
        m_year: parseInt(moment(maleDate).format('YYYY')),
        m_hour: parseInt(moment(maleTime).format('hh')),
        m_min: parseInt(moment(maleTime).format('mm')),
        m_lat: 19.132,
        m_lon: 72.342,
        m_tzone: 5.5,
        f_day: parseInt(moment(femaleDate).format('D')),
        f_month: parseInt(moment(maleDate).format('M')),
        f_year: parseInt(moment(maleDate).format('YYYY')),
        f_hour: parseInt(moment(maleTime).format('hh')),
        f_min: parseInt(moment(maleTime).format('mm')),
        f_lat: 19.132,
        f_lon: 72.342,
        f_tzone: 5.5,
      }
      dispatch(KundliActions.setFemaleKundliData(femaleKundliData))
      dispatch(KundliActions.setMaleKundliData(maleKundliData))
      dispatch(KundliActions.getKundliMatchingReport(matchingPayload))
    }
  };

  const male_date_handle = (event, selectedDate) => {
    if (event.type == 'set') {
      setMaleDate(selectedDate);
    }
    setMaleDateVisible(false);
  };

  const male_time_handle = (event, selectedTime) => {
    if (event.type == 'set') {
      setMaleTime(selectedTime);
    }
    setMaleTimeVisible(false);
  };

  const female_date_handle = (event, selectedDate) => {
    if (event.type == 'set') {
      setFemaleDate(selectedDate);
    }
    setFemaleDateVisible(false);

  };

  const female_time_handle = (event, selectedTime) => {
    if (event.type == 'set') {
      setFemaleTime(selectedTime)
    }
    setFemaleTimeVisible(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.black_color1 }}>
      <MyLoader isVisible={isLoading} />
      <MyHeader title={'Matching'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 0,
            width: '95%',
            paddingVertical: 15,
            alignSelf: 'center',
          }}>
          <Text allowFontScaling={false} style={styles.heading}>
            {t("boy_details")}
          </Text>
          <View style={styles.containerBox}>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons
                name="account"
                color={colors.black_color8}
                size={25}
              />
              <KeyboardAvoidingView
                behavior={Platform.OS == 'android' ? 'padding' : 'height'}>
                <TextInput
                  placeholder={t("enter_name")}
                  placeholderTextColor={colors.black_color5}
                  onChangeText={setMaleName}
                  value={maleName}
                  style={{
                    flex: 0,
                    marginLeft: 5,
                    color: colors.black_color9,
                    fontWeight: 'normal',
                  }}
                />
              </KeyboardAvoidingView>
            </View>
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => setMaleDateVisible(true)}
                style={{ ...styles.inputContainer, flex: 0.47 }}>
                <MaterialCommunityIcons
                  name="calendar-month-outline"
                  color={colors.black_color8}
                  size={20}
                />
                <Text allowFontScaling={false}
                  style={{
                    flex: 0,
                    marginLeft: 5,
                    color: colors.black_color9,
                    fontWeight: 'normal',
                  }}>
                  {maleDate == null
                    ? 'DD/MM/YYYY'
                    : moment(maleDate).format('Do MMM YYYY')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setMaleTimeVisible(true)}
                style={{ ...styles.inputContainer, flex: 0.47 }}>
                <MaterialCommunityIcons
                  name="clock-outline"
                  color={colors.black_color8}
                  size={20}
                />
                <Text allowFontScaling={false}
                  style={{
                    flex: 0,
                    marginLeft: 5,
                    color: colors.black_color9,
                    fontWeight: 'normal',
                  }}>
                  {maleTime == null
                    ? 'HH:MM AM'
                    : moment(maleTime).format('hh:mm A')}
                </Text>
              </TouchableOpacity>
            </View>
            {maleDateVisible && (
              <DateTimePicker
                testID="dateTimePicker"
                value={maleDate == null ? new Date() : new Date(maleDate)}
                mode={'date'}
                display='spinner'
                is24Hour={false}
                maximumDate={new Date()}
                onChange={male_date_handle}
              />
            )}
            {maleTimeVisible && (
              <DateTimePicker
                testID="dateTimePicker"
                value={maleTime == null ? new Date() : new Date(maleTime)}
                mode={'time'}

                display='spinner'
                is24Hour={false}
                onChange={male_time_handle}
              />
            )}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('placeOfBirth');
              }}
              style={{ ...styles.inputContainer, marginBottom: 5 }}>
              <MaterialCommunityIcons
                name="map-marker"
                color={colors.black_color8}
                size={25}
              />
              <Text allowFontScaling={false}
                style={{
                  fontSize: 14,
                  color: colors.black_color7,
                  fontFamily: fonts.medium,
                }}>
                {locationData ? locationData?.address : t("select_location")}
              </Text>
            </TouchableOpacity>
          </View>
          <Text allowFontScaling={false} style={styles.heading}>
            {t("girl_details")}
          </Text>
          <View style={styles.containerBox}>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons
                name="account"
                color={colors.black_color8}
                size={25}
              />
              <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                <TextInput
                  placeholder={t("enter_name")}
                  placeholderTextColor={colors.black_color5}
                  onChangeText={setFemaleName}
                  style={{
                    flex: 0,
                    marginLeft: 5,
                    color: colors.black_color9,
                    fontWeight: 'normal',
                  }}
                />
              </KeyboardAvoidingView>
            </View>
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => setFemaleDateVisible(true)}
                style={{ ...styles.inputContainer, flex: 0.47 }}>
                <MaterialCommunityIcons
                  name="calendar-month-outline"
                  color={colors.black_color8}
                  size={20}
                />
                <Text allowFontScaling={false}
                  style={{
                    flex: 0,
                    marginLeft: 5,
                    color: colors.black_color9,
                    fontWeight: 'normal',
                  }}>
                  {femaleDate == null
                    ? 'DD/MM/YYYY'
                    : moment(femaleDate).format('Do MMM YYYY')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setFemaleTimeVisible(true)}
                style={{ ...styles.inputContainer, flex: 0.47 }}>
                <MaterialCommunityIcons
                  name="clock-outline"
                  color={colors.black_color8}
                  size={20}
                />
                <Text allowFontScaling={false}
                  style={{
                    flex: 0,
                    marginLeft: 5,
                    color: colors.black_color9,
                    fontWeight: 'normal',
                  }}>
                  {femaleTime == null
                    ? 'HH:MM AM'
                    : moment(femaleTime).format('hh:mm A')}
                </Text>
              </TouchableOpacity>
            </View>
            {femaleDateVisible && (
              <DateTimePicker
                testID="dateTimePicker"
                value={femaleDate == null ? new Date() : new Date(femaleTime)}
                mode={'date'}
                display='spinner'
                is24Hour={false}
                maximumDate={new Date()}
                onChange={female_date_handle}
              />
            )}
            {femaleTimeVisible && (
              <DateTimePicker
                testID="dateTimePicker"
                value={femaleTime == null ? new Date() : new Date(femaleTime)}
                mode={'time'}
                display='spinner'
                is24Hour={false}
                onChange={female_time_handle}
              />
            )}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('placeOfBirth', {
                  type: 'sub'
                });
              }}
              style={{ ...styles.inputContainer, marginBottom: 5 }}>
              <MaterialCommunityIcons
                name="map-marker"
                color={colors.black_color8}
                size={25}
              />
              <Text allowFontScaling={false}
                style={{
                  fontSize: 14,
                  color: colors.black_color7,
                  fontFamily: fonts.medium,
                }}>
                {subLocationData ? subLocationData?.address : t("select_location")}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => get_matching()}
            activeOpacity={0.8}
            style={{
              width: '80%',
              alignSelf: 'center',
              backgroundColor: colors.background_theme2,
              borderRadius: 1000,
              marginTop: 30,
              marginBottom: 10,
              paddingVertical: 8,
            }}>
            <Text allowFontScaling={false}
              style={{
                fontSize: 16,
                color: colors.white_color,
                fontFamily: fonts.medium,
                textAlign: 'center',
              }}>
              {t("show_match")}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}


const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  wallet: state.customer.wallet,
  locationData: state.setting.locationData,
  subLocationData: state.setting.subLocationData,
});

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(NewMatching);

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    color: colors.black_color,
    fontFamily: fonts.semi_bold,
    marginLeft: 10
  },
  containerBox: {
    flex: 0,
    backgroundColor: colors.background_theme1,
    padding: 15,
    borderRadius: 5,
    shadowColor: colors.black_color5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  inputContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderRadius: 10,
    borderColor: colors.black_color6,
    padding: 10,
    marginBottom: 20,
  },
});
