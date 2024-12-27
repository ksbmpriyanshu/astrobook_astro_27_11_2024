import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Image, FlatList } from 'react-native';
import React from 'react';
import MyHeader from '../../components/MyHeader';
import { useEffect } from 'react';
import {
  colors,
  fonts,
  getFontSize
} from '../../config/Constants';
import { useState, useRef } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ShowPachang from './ShowPachang';
import MyLoader from '../../components/MyLoader';
import axios from 'axios';
import { connect } from 'react-redux';
import { warnign_toast } from '../../components/MyToastMessage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
const { config, fs } = RNFetchBlob;
import { useTranslation } from 'react-i18next';
import { getPlanets } from '../../config/apiService';
import { Button, Menu, Divider, PaperProvider } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import { captureRef } from 'react-native-view-shot';
import Share from 'react-native-share';
import ShowKundliBasic from './ShowKundliBasic';
import { SCREEN_WIDTH } from '../../config/Screen';
import ShowKundliPlanets from './ShowKundliPlanets';
import ShowKundliCharts from './ShowKundliCharts';
import * as KundliActions from '../../redux/actions/KundliActions'
import { Colors, Fonts, Sizes } from '../../assets/style';
import moment from 'moment';


const ShowKundli = ({ navigation, route, dispatch, isLoading, basicDetails }) => {
  const { t } = useTranslation();
  const viewRef = useRef(null);

  useEffect(() => {
    dispatch(KundliActions.getKundliData())
    return () => {
      dispatch(KundliActions.resetKundliData())
    }
  }, [dispatch]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background_theme1 }} ref={viewRef}>
      <MyLoader isVisible={isLoading} />
      <MyHeader title={'Kundli'} navigation={navigation} />

      <FlatList
        ListHeaderComponent={<>
          {basicDetails && kundliInfo()}
          {tabsInfo()}
        </>}
        contentContainerStyle={{ padding: Sizes.fixPadding * 1.5 }}
      />
      {/* <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarLabelStyle: { fontSize: getFontSize(1.5), fontFamily: fonts.medium, },
        tabBarGap: 2,
        tabBarStyle: { flex: 0, justifyContent: 'center' },
        tabBarItemStyle: { width: 200 },
        tabBarContentContainerStyle: {}
      }}
    >


      <Tab.Screen name={t("ascendant")} component={ShowPachang} />

      <Tab.Screen name={t("rashi_report")} component={RashiReport} initialParams={{
          navigation: navigation,
          data: route.params.data, planetData: planetData
        }} /> 
      <Tab.Screen name={t("download")} component={DownloadKundali} initialParams={{
          navigation: navigation,
          data: route.params.data, planetData: planetData
        }} />
    </Tab.Navigator> */}

    </View>
  );

  function tabsInfo() {
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: Sizes.fixPadding, justifyContent: 'space-between' }}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('kundliBirthDetailes')} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Birth Details</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('bascipanchang')} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Panchang</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('showKundliCharts')} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Chart</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('showKundliPlanets')} style={styles.buttonContainer}>
          <Text style={styles.buttonText}> Kundli Planets</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('showKundliKpPlanets')} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>KP Planets</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('showKundliKpHouseCusp')} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>KP House Cup</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('showDashna')} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Vimshottari Dasha</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('houseReport')} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>House Report</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('rashiReport')} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Rashi Report</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('astakvarga')} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>AstakVarga</Text>
        </TouchableOpacity>
         <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('sarvastak')} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>SarvAstak</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('ascednt')} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Ascedent Report</Text>
          </TouchableOpacity>
      </View>
    )
  }

  function kundliInfo() {
    return (
      <View
        style={{
          backgroundColor: colors.background_theme1,
          marginVertical: 10,
          borderRadius: 15,
          shadowColor: colors.black_color5,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 6
        }}>
        <View style={styles.itmeContainer}>
          <Text allowFontScaling={false} style={styles.itemText}>{t("name")}</Text>
          <Text allowFontScaling={false} style={styles.itemText}>
            {basicDetails?.name}
          </Text>
        </View>
        <View
          style={{
            ...styles.itmeContainer,
            backgroundColor: '#ffbf69',
          }}>
          <Text allowFontScaling={false} style={{ ...styles.itemText, color: colors.background_theme1 }}>
            {t("date")}
          </Text>
          <Text allowFontScaling={false} style={{ ...styles.itemText, color: colors.background_theme1 }}>
            {moment(basicDetails?.dob).format('DD MMM YYYY')}
          </Text>
        </View>
        <View style={styles.itmeContainer}>
          <Text allowFontScaling={false} style={styles.itemText}>
            {t("time")}
          </Text>
          <Text allowFontScaling={false} style={styles.itemText}>
            {moment(basicDetails?.tob).format('hh:mm A')}
          </Text>
        </View>
        <View
          style={{
            ...styles.itmeContainer,
            backgroundColor: '#ffd000',
          }}>
          <Text allowFontScaling={false} style={{ ...styles.itemText, color: colors.background_theme1 }}>
            {t("place")}
          </Text>
          <Text allowFontScaling={false} style={{ ...styles.itemText, color: colors.background_theme1 }}>
            {basicDetails?.place}
          </Text>
        </View>
        <View style={styles.itmeContainer}>
          <Text allowFontScaling={false} style={styles.itemText}>
            {t("lat")}
          </Text>
          <Text allowFontScaling={false} style={styles.itemText}>
            {basicDetails?.lat}
          </Text>
        </View>
        <View
          style={{
            ...styles.itmeContainer,
            backgroundColor: '#9dd9d2',
          }}>
          <Text allowFontScaling={false} style={{ ...styles.itemText, color: colors.background_theme1 }}>
            {t("long")}
          </Text>
          <Text allowFontScaling={false} style={{ ...styles.itemText, color: colors.background_theme1 }}>
            {basicDetails?.lon}
          </Text>
        </View>
        <View style={styles.itmeContainer1}>
          <Text allowFontScaling={false} style={styles.itemText}>
            {t("time_zone")}
          </Text>
          <Text allowFontScaling={false} style={styles.itemText}>GMT+05:30</Text>
        </View>
      </View>
    )
  }

};

const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  wallet: state.customer.wallet,
  isLoading: state.setting.isLoading,
  basicDetails: state.kundli.basicDetails
});

const mapDispatchToProps = dispatch => ({ dispatch })


export default connect(mapStateToProps, mapDispatchToProps)(ShowKundli);

const styles = StyleSheet.create({
  rowContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background_theme1,
  },
  rowText: {
    flex: 0.5,
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.black_color9,
    textTransform: 'capitalize',
  },
  buttonContainer: {
    width: '48%',
    backgroundColor: colors.new_color,
    borderRadius: Sizes.fixPadding,
    height: SCREEN_WIDTH * 0.3,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: Sizes.fixPadding * 2
  },
  buttonText: {
    ...Fonts.white16RobotoMedium,
    textAlign: 'center'
  },
  itmeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: 'grey'
  },
  itmeContainer1: {
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




