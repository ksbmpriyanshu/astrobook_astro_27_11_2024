import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import {
  api_url,
  colors,
  fonts,
  kundli_get_panchang,
  getFontSize
} from '../../config/Constants';
import {StyleSheet} from 'react-native';
import {useState} from 'react';
import axios from 'axios';
import MyLoader from '../../components/MyLoader';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { getBasicPanchang } from '../../config/apiService';

const {width, height} = Dimensions.get('screen');

const KundliPunchangDetailes = props => {
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [panchangData, setPanchangData] = useState(null);
  useEffect(() => {
    props.navigation.setOptions({
      tabBarLabel: t("panchange_details"),
    });
  }, []);


  return (
    <View style={{flex: 1, backgroundColor: colors.black_color1}}>
      <MyLoader isVisible={isLoading} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {panchangData && (
          <View
            style={{
              flex: 0,
              width: '95%',
              alignSelf: 'center',
              backgroundColor: colors.background_theme1,
              marginVertical: 10,
              borderRadius: 15,
              shadowColor: colors.black_color5,
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.3,
              shadowRadius: 5,
            }}>
              <View
              style={{
                ...styles.itmeContainer,
                backgroundColor: colors.background_theme2,
              }}>
              <Text allowFontScaling={false}
                style={{...styles.itemText, color: colors.background_theme1}}>
                {t("day")}
              </Text>
              <Text allowFontScaling={false}
                style={{...styles.itemText, color: colors.background_theme1}}>
                {panchangData.day}
              </Text>
            </View>
            <View style={styles.itmeContainer}>
              <Text allowFontScaling={false} style={styles.itemText}>{t("tithi")}</Text>
              <Text allowFontScaling={false} style={styles.itemText}>{panchangData.tithi}</Text>
            </View>
            <View
              style={{
                ...styles.itmeContainer,
                backgroundColor: colors.background_theme2,
              }}>
              <Text allowFontScaling={false}
                style={{...styles.itemText, color: colors.background_theme1}}>
                {t("karan")}
              </Text>
              <Text allowFontScaling={false}
                style={{...styles.itemText, color: colors.background_theme1}}>
                {panchangData.karan}
              </Text>
            </View>
            <View style={styles.itmeContainer}>
              <Text allowFontScaling={false} style={styles.itemText}>{t("yog")}</Text>
              <Text allowFontScaling={false} style={styles.itemText}>{panchangData.yog}</Text>
            </View>
            <View
              style={{
                ...styles.itmeContainer,
                backgroundColor: colors.background_theme2,
              }}>
              <Text allowFontScaling={false}
                style={{...styles.itemText, color: colors.background_theme1}}>
                {t("nakshtra")}
              </Text>
              <Text allowFontScaling={false}
                style={{...styles.itemText, color: colors.background_theme1}}>
                {panchangData.nakshatra}
              </Text>
            </View>
            <View style={styles.itmeContainer}>
              <Text allowFontScaling={false} style={styles.itemText}>{t("sunrise")}</Text>
              <Text allowFontScaling={false} style={styles.itemText}>
                {' '}
                {moment(panchangData.sunrise, 'hh:mm:ss').format('hh:mm:ss A')}
              </Text>
            </View>
            <View
              style={{
                ...styles.itmeContainer,
                backgroundColor: colors.background_theme2,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
              }}>
              <Text allowFontScaling={false}
                style={{...styles.itemText, color: colors.background_theme1}}>
                {t("sunset")}
              </Text>
              <Text allowFontScaling={false}
                style={{...styles.itemText, color: colors.background_theme1}}>
                {moment(panchangData.sunset, 'hh:mm:ss').format('hh:mm:ss A')}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default KundliPunchangDetailes;
const styles = StyleSheet.create({
  itmeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  itemText: {
    flex: 0.5,
    fontSize: getFontSize(1.5),
    color: colors.black_color8,
    fontFamily: fonts.medium,
  },
});
