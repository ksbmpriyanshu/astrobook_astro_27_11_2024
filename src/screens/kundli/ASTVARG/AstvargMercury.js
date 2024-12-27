import { View, Text, ScrollView,TouchableOpacity } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'

import { colors } from '../../../config/Constants'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getplanetAshtakImage } from '../../../config/apiService';
import {SvgWithCss } from 'react-native-svg/css';
import { connect } from 'react-redux';
import { SCREEN_WIDTH } from '../../../config/Screen';

const AstvargMercury = ({AshtakvargaReport}) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [Data, setData] = useState(null);
  const [select,setSelect] = useState(1);

  const [chartData, setChartData] = useState(null);

  

  console.log(AshtakvargaReport?.mercurychart,'asdfkjsd')


  
  


  return (
    <ScrollView style={{ backgroundColor: 'white' }}>

      <View style={{ backgroundColor: 'white' }}>

        <View style={{ color: colors.white_color }}>
          <View style={{flexDirection:'row',justifyContent:'space-around',padding:10}}>
              <TouchableOpacity 
              onPress={() => setSelect(1)}
              style={{color:select == 1 ? 'white' : 'black',backgroundColor: select == 1 ? colors.background_theme2 : colors.background_theme1,
              padding:10,borderRadius:10,borderWidth:1,borderColor:colors.background_theme2}}>
                <Text style={{color:select == 1 ? 'white' : 'black'}}>Table</Text>
              </TouchableOpacity>
              <TouchableOpacity 
               onPress={() => setSelect(2)}
               style={{color:'black',backgroundColor: select == 2 ? colors.background_theme2 : colors.background_theme1,
               padding:10,borderRadius:10,borderWidth:1,borderColor:colors.background_theme2}}>
              <Text style={{color:select == 2 ? 'white' : 'black'}}>Chart</Text>
              </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Text style={{color:'black'}}>{t("type")}:-{AshtakvargaReport?.mercuryReports?.ashtak_varga?.type}</Text>
            <Text style={{color:'black'}}>{t("planet")}:-{AshtakvargaReport?.mercuryReports?.ashtak_varga?.planet}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: "space-around", marginTop: 5 }}>
            <Text style={{color:'black'}}>{t("Sign")}:-{AshtakvargaReport?.mercuryReports?.ashtak_varga?.sign}</Text>
            {/* <Text style={{color:'black'}}>{t("signid")}:-{AshtakvargaReport?.mercuryReports?.ashtak_varga?.sign_id}</Text> */}
          </View>
        </View>
        {select == 1 ? (
          <>
          <View style={{ flexDirection: 'row',justifyContent: 'space-around', marginTop: responsiveHeight(1), colors: colors.white_color }}>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2), marginRight: responsiveScreenWidth(5.5) }}>......</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) }}>{t("sun")}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) }}>{t("moon")}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) }}>{t("mars")}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) }}>{t("Mercury")}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) }}>{t("Jupi")}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) }}>{t("Venu")}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) }}>{t("Satu")}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) }}>{t("Ascen")}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) }}>{t("Total")}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: responsiveHeight(1), backgroundColor:colors.background_theme2 }}>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2), marginLeft: 3 }}>{t("Aries")}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.aries?.sun}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.aries?.moon}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.aries?.mars}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.aries?.mercury}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.aries?.jupiter}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.aries?.venus}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.aries?.saturn}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) }}>{AshtakvargaReport?.mercuryReports?.ashtak_points.aries?.ascendant}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2), marginRight: 5 }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.aries?.total}</Text>

        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: responsiveHeight(1), backgroundColor: colors.white_color }}>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2), marginLeft: 3 }}>{t("Taurus")}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,right:6 }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.taurus?.sun}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,right:6}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.taurus?.moon}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,right:5}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.taurus?.mars}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,right:4}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.taurus?.mercury}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2),right:3 }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.taurus?.jupiter}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,right:2}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.taurus?.venus}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,right:1 }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.taurus?.saturn}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.taurus?.ascendant}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2), marginRight: 5 }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.taurus?.total}</Text>

        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: responsiveHeight(1), backgroundColor: colors.background_theme2 }}>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2), marginLeft: 3 }}>{t("Gemini")}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,right:6}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.gemini?.sun}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,right:5}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.gemini?.moon}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,right:4}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.gemini?.mars}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,right:4}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.gemini?.mercury}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,right:3}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.gemini?.jupiter}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,right:2}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.gemini?.venus}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.gemini?.saturn}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.gemini?.ascendant}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2), marginRight: 5 }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.gemini?.total}</Text>

        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: responsiveHeight(1), backgroundColor: colors.white_color }}>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2), marginLeft: 3 }}>{t("Cancer")}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2),right:6 }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.cancer?.sun}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2),right:5 }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.cancer?.moon}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2),right:4 }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.cancer?.mars}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2),right:4 }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.cancer?.mercury}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,right:3}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.cancer?.jupiter}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,right:2}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.cancer?.venus}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.cancer?.saturn}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.cancer?.ascendant}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2), marginRight: 5 }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.cancer?.total}</Text>

        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: responsiveHeight(1), backgroundColor: colors.background_theme2 }}>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2), marginLeft: 3, marginRight: responsiveScreenWidth(2.4) }}>{t("Leo")}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,right:1}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.leo?.sun}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2),right:1 }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.leo?.moon}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.leo?.mars}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,right:1}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.leo?.mercury}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,right:1}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.leo?.jupiter}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.leo?.venus}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,left: 1,}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.leo?.saturn}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,left: 1,}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.leo?.ascendant}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2), marginRight: 5 }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.leo?.total}</Text>

        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: responsiveHeight(1), backgroundColor: colors.white_color }}>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2), marginLeft: 3 }}>{t("virgo")}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,left: 3,}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.virgo?.sun}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2),left: 2, }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.virgo?.moon}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,left: 3,}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.virgo?.mars}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,left: 1,}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.virgo?.mercury}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,left: 1,}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.virgo?.jupiter}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,left: 1,}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.virgo?.venus}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,left: 2,}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.virgo?.saturn}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2),left: 2, }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.virgo?.ascendant}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2), marginRight: 5 }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.virgo?.total}</Text>

        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: responsiveHeight(1), backgroundColor: colors.background_theme2 }}>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2), marginLeft: 3 }}>{t("Libra")}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,left: 2.5,}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.libra?.sun}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2),left: 2, }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.libra?.moon}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2),left: 3, }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.libra?.mars}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,left: 1,}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.libra?.mercury}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,left: 1,}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.libra?.jupiter}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,left: 1,}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.libra?.venus}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,left: 3,}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.libra?.saturn}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,left:3 }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.libra?.ascendant}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2), marginRight: 5 }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.libra?.total}</Text>

        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: responsiveHeight(1), backgroundColor: colors.white_color }}>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2), marginLeft: 3 }}>{t("Sorpio")}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,right:2.5 }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.scorpio?.sun}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2),right:2 }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.scorpio?.moon}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2),right:1.5 }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.scorpio?.mars}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,right:1.5}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.scorpio?.mercury}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,right:1.5}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.scorpio?.jupiter}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.scorpio?.venus}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,left: 1.5,}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.scorpio?.saturn}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,left:3,}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.scorpio?.ascendant}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2), marginRight: 5 }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.scorpio?.total}</Text>

        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: responsiveHeight(1), backgroundColor: colors.background_theme2 }}>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2), marginLeft: 3 }}>{t("Sigitt")}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2),left: 2, }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.sagittarius?.sun}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2),left: 2, }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.sagittarius?.moon}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2),left: 2, }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.sagittarius?.mars}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,left: 0.5,}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.sagittarius?.mercury}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2),left: 1, }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.sagittarius?.jupiter}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2),left: 2, }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.sagittarius?.venus}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2),left: 3,}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.sagittarius?.saturn}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,left: 4,}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.sagittarius?.ascendant}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2), marginRight: 5 }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.sagittarius?.total}</Text>

        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: responsiveHeight(1), backgroundColor: colors.white_color }}>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2), marginLeft: 3 }}>{t("Capric")}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,right:3}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.capricorn?.sun}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,right:2}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.capricorn?.moon}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.capricorn?.mars}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2), right:2}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.capricorn?.mercury}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,right:2}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.capricorn?.jupiter}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.capricorn?.venus}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,left: 2.5,}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.capricorn?.saturn}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2),left: 3.5, }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.capricorn?.ascendant}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2), marginRight: 5 }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.capricorn?.total}</Text>

        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: responsiveHeight(1), backgroundColor: colors.background_theme2 }}>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2), marginLeft: 3 }}>{t("Aquar")}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2),right:1 }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.aquarius?.sun}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,right:0.5}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.aquarius?.moon}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,left: 2,}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.aquarius?.mars}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,right:1}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.aquarius?.mercury}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.aquarius?.jupiter}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,left: 1,}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.aquarius?.venus}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,left: 4,}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.aquarius?.saturn}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2),left: 4, }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.aquarius?.ascendant}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2), marginRight: 5 }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.aquarius?.total}</Text>

        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: responsiveHeight(1), backgroundColor: colors.white_color }}>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2), marginLeft: 3 }}>{t("Pisces")}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,right:3}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.pisces?.sun}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,right:2}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.pisces?.moon}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,left:1,}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.pisces?.mars}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,right:2}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.pisces?.mercury}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2),right:1 }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.pisces?.jupiter}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.pisces?.venus}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2) ,left:3,}}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.pisces?.saturn}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2),left: 4, }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.pisces?.ascendant}</Text>
          <Text style={{ color: colors.black_color, fontSize: responsiveFontSize(1.2), marginRight: 5 }}>{AshtakvargaReport?.mercuryReports?.ashtak_points?.pisces?.total}</Text>

        </View>
        </>
        ) : 
        <View style={{ paddingVertical: 15,alignSelf:'center'}}>
          <SvgWithCss xml={AshtakvargaReport?.mercurychart?.svg} width="330" height="350" />
        </View>
        }
        
      </View>
    </ScrollView>
  )
}
const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  isLoading: state.setting.isLoading,
  AshtakvargaReport: state.kundli.AshtakvargaReport
  
});

const mapDispatchToProps = dispatch => ({ dispatch })


export default connect(mapStateToProps, mapDispatchToProps)(AstvargMercury);