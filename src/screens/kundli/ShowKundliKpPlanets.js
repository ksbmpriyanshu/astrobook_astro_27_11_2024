import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';
import MyHeader from '../../components/MyHeader';
import { api_url, colors, fonts, get_KpHoroscope, get_Kpplanets, getFontSize } from '../../config/Constants';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions'

const ShowKundliKpPlanets = ({navigation, kpPlanetData, dispatch}) => {

  const { t } = useTranslation();
  const [dropdownVisibility, setDropdownVisibility] = useState({});

  console.log(kpPlanetData,'asdasdfsd')

  useEffect(()=>{
    dispatch(KundliActions.getKpPlanetData())
  }, [dispatch])

  const toggleDropdown = (item) => {
    setDropdownVisibility({
      ...dropdownVisibility,
      [item]: !dropdownVisibility[item],
    });
  };

  const calculateColor = (value) => {
    // Example: Assign colors based on a range (adjust as needed)
    if (value >= 0 && value <= 0) {
      return '#ffc8dd';
    } else if (value >= 1 && value <= 1) {
      return '#bde0fe';
    } else if (value >= 2 && value <= 2) {
      return '#d6ccc2';
    } else if (value >= 3 && value <= 3) {
      return '#fcf6bd';
    } else if (value >= 4 && value <= 4) {
      return '#c9ada7';
    } else if (value >= 5 && value <= 5) {
      return '#f6bd60';
    } else if (value >= 6 && value <= 6) {
      return '#f7c59f';
    } else if (value >= 7 && value <= 7) {
      return '#ccff33';
    } else if (value >= 8 && value <= 8) {
      return '#d3d3d3';
    } else if (value >= 9 && value <= 9) {
      return '#a8dadc';
    } else if (value >= 10 && value <= 10) {
      return '#ffb3c6';
    } else if (value >= 11 && value <= 11) {
      return '#f07167';
    } else {
      return '#f4e409';
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.black_color1 }}>
      <MyHeader title={'KP Planets'} navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            ...styles.itmeContainer,
            backgroundColor: '#8ecae6',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}>
          <Text allowFontScaling={false} style={{ ...styles.itemText2, color: colors.background_theme1 }}>
            {t("planet")}
          </Text>
          <Text allowFontScaling={false} style={{ ...styles.itemText2, color: colors.background_theme1 }}>
            {t("degree")}
          </Text>

          <Text allowFontScaling={false} style={{ ...styles.itemText3, color: colors.background_theme1 }}>
            {t("sl")}
          </Text>
          <Text allowFontScaling={false} style={{ ...styles.itemText3, color: colors.background_theme1 }}>
            {t("nl")}
          </Text>
          <Text allowFontScaling={false} style={{ ...styles.itemText3, color: colors.background_theme1 }}>
            {t("sb")}
          </Text>
          <Text allowFontScaling={false} style={{ ...styles.itemText3, color: colors.background_theme1 }}>
            {t("ss")}
          </Text>

        </View>
        {kpPlanetData && (
          <View
            style={{
              flex: 0,
              width: '100%',
              alignSelf: 'center',
              backgroundColor: colors.background_theme1,
              borderRadius: 15,
              shadowColor: colors.black_color5,
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.3,
              shadowRadius: 5,
            }}>
            {kpPlanetData.planets.map((item, index) => (
              <View key={index} >
                <TouchableOpacity onPress={() => toggleDropdown(item)} activeOpacity={1}>
                  <View style={[styles.itmeContainer, { backgroundColor: calculateColor(item?.planet_id) }]}>
                    <Text allowFontScaling={false} style={styles.itemText}>
                      {item?.planet_name}
                      {item?.is_retro !== false ? (
                        <Text allowFontScaling={false}>(R)</Text>
                      ) : (null)}
                    </Text>
                    <Text allowFontScaling={false} style={styles.itemText11}>{item?.planet_name.slice(0, 3)}{' '}{`${Math.floor(((Math.floor(item?.norm_degree))))}° ${Math.floor((item?.norm_degree % 1) * 60)}' ${Math.floor(((item?.norm_degree % 1) * 60) % 1 * 60)}"`}
                    </Text>
                    <Text allowFontScaling={false} style={styles.itemText3}>{item?.sign_lord.slice(0, 2)}</Text>
                    <Text allowFontScaling={false} style={styles.itemText3}>{item?.nakshatra_lord.slice(0, 2)}</Text>
                    <Text allowFontScaling={false} style={styles.itemText3}>{item?.sub_lord.slice(0, 2)}</Text>
                    <Text allowFontScaling={false} style={styles.itemText3}>{item?.sub_sub_lord.slice(0, 2)}</Text>


                  </View>
                </TouchableOpacity>


              </View>
            ))}
          </View>
        )}

      </ScrollView>
    </View>
  );
};

const mapStateToProps = state =>({
  kpPlanetData: state.kundli.kpPlanetData,
  isLoading: state.setting.isLoading
})

const mapDispatchToProps = dispatch =>({dispatch})


export default connect(mapStateToProps, mapDispatchToProps)(ShowKundliKpPlanets);

const styles = StyleSheet.create({
  itmeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 18,
    paddingBottom: 18,
    paddingRight: 8,
    paddingLeft: 8

  },
  itemText: {
    flex: 0.24,
    fontSize: getFontSize(1.4),
    color: colors.black_color8,
    fontFamily: fonts.medium,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  itemText11: {
    flex: 0.24,
    fontSize: getFontSize(1.2),
    color: colors.black_color8,
    fontFamily: fonts.medium,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  itemText2: {
    flex: 0.26,
    fontSize: getFontSize(1.6),
    color: colors.black_color8,
    fontFamily: fonts.medium,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  itemText1: {
    flex: 0.24,
    fontSize: getFontSize(1.3),
    color: colors.black_color8,
    fontFamily: fonts.medium,
    textAlign: 'center',
  },
  itemText3: {
    flex: 0.15,
    fontSize: getFontSize(1.4),
    color: colors.black_color8,
    fontFamily: fonts.medium,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  dropdownContent: {
    backgroundColor: 'white',

  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1, // Add a border to the bottom of each row
    borderColor: 'gray', // Set the border color
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1, // Add a border to the right of each cell
    borderColor: 'gray', // Set the border color
  },
  textCenter: {
    textAlign: 'center',
    color: 'black'
  },
});
