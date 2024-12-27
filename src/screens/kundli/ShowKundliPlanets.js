import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';
import MyHeader from '../../components/MyHeader';
import { colors, fonts, getFontSize } from '../../config/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions'

const ShowKundliPlanets = ({ navigation, route, planetData,dispatch }) => {
  const { t } = useTranslation();
  const [dropdownVisibility, setDropdownVisibility] = useState({});
  useEffect(() => {
    dispatch(KundliActions.getPlanetData())
    navigation.setOptions({
      headerShown: false,
      header: () => (
        <MyHeader
          title={t("kundli")}
          navigation={navigation}
          statusBar={{
            backgroundColor: colors.background_theme2,
            barStyle: 'light-content',
          }}
        />
      ),
    });
  }, []);
  const toggleDropdown = (index) => {
    setDropdownVisibility({
      ...dropdownVisibility,
      [index]: !dropdownVisibility[index],
    });

  };

  // console.log('adfa',planetData)

  const calculateColor = (value) => {
    console.log('adf',value)
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
    } else {
      return '#f4e409';
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.black_color1 }}>
      <MyHeader title={'Kundli Planets'} navigation={navigation} />

      <ScrollView showsVerticalScrollIndicator={false} >
        <View
          style={{
            flex: 0,
            width: '95%',
            alignSelf: 'center',
            backgroundColor: colors.background_theme1,
            marginVertical: 10,
            borderRadius: 15,
            shadowColor: colors.black_color5,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
          }}>
          {planetData && planetData.map((item, index) => {
            return (
              <View key={index} style={{ display: index >= 0 && index <= 8 ? 'none' : 'flex' }}>
                <TouchableOpacity onPress={() => toggleDropdown(index)} activeOpacity={1}>
                  <View style={[styles.itmeContainer, { backgroundColor: calculateColor(index) }]}>
                    <Text allowFontScaling={false} style={styles.itemText}>{item?.name}</Text>
                    <Text allowFontScaling={false} style={styles.itemText1}>{`${Math.floor(item?.normDegree)}° ${Math.floor((item?.normDegree % 1) * 60)}' ${Math.floor(((item?.normDegree % 1) * 60) % 1 * 60)}"`}
                    </Text>
                    <Text allowFontScaling={false} style={styles.itemText}>{item?.nakshatra}</Text>
                    <Text allowFontScaling={false} style={styles.itemText3}>{item?.nakshatra_pad}</Text>
                    <Text allowFontScaling={false} style={styles.itemText}>

                      {item?.isRetro == 'true' ? (
                        <View style={{}}>
                          <Text allowFontScaling={false}
                            style={[
                              { color: 'white', backgroundColor: 'blue', borderRadius: 10, padding: 5, fontSize: 10 },
                            ]}>
                            R
                          </Text>
                        </View>
                      ) : (
                        <Text allowFontScaling={false} style={{}}></Text>
                      )}

                    </Text>
                    {dropdownVisibility[index] ? (
                      <AntDesign name="up" color={colors.black_color} size={20} />
                    ) : (
                      <AntDesign name="down" color={colors.black_color} size={20} />
                    )}
                  </View>
                </TouchableOpacity>

                {dropdownVisibility[index] && (
                  <View style={styles.dropdownContent}>
                    <View style={styles.row}>
                      <View style={styles.cell}>
                        <Text allowFontScaling={false} style={styles.textCenter}>{t("sign_lord")}</Text>
                        <Text allowFontScaling={false} style={styles.textCenter}>{item?.signLord}</Text>
                      </View>
                      <View style={styles.cell}>
                        <Text allowFontScaling={false} style={styles.textCenter}>{t("nakshtra")}</Text>
                        <Text allowFontScaling={false} style={styles.textCenter}>{item?.nakshatra}</Text>
                      </View>
                      <View style={styles.cell}>
                        <Text allowFontScaling={false} style={styles.textCenter}>{t("nak_loard")}</Text>
                        <Text allowFontScaling={false} style={styles.textCenter}>{item?.nakshatraLord}</Text>
                      </View>
                    </View>
                    <View style={styles.row}>
                      <View style={styles.cell}>
                        <Text allowFontScaling={false} style={styles.textCenter}>{t("house")}</Text>
                        <Text allowFontScaling={false} style={styles.textCenter}>{item?.house}</Text>
                      </View>
                      <View style={styles.cell}>
                        <Text allowFontScaling={false} style={styles.textCenter}>{t("nak_pad")}</Text>
                        <Text allowFontScaling={false} style={styles.textCenter}>{item?.nakshatra_pad}</Text>
                      </View>
                      <View style={styles.cell}>
                        <Text allowFontScaling={false} style={styles.textCenter}>{t("retroGrade")}</Text>
                        <Text allowFontScaling={false} style={styles.textCenter}>{item?.isRetro}</Text>
                      </View>
                    </View>
                  </View>
                )}

              </View>
            )
          })}
          {planetData && planetData.map((item, index) => (
            <View key={index} style={{ display: index === 9 ? 'none' : 'flex' }}>
              <TouchableOpacity onPress={() => toggleDropdown(index)} activeOpacity={1}>
                <View style={[styles.itmeContainer, { backgroundColor: calculateColor(item) }]}>
                  <Text allowFontScaling={false} style={styles.itemText}>{item?.name}</Text>
                  <Text allowFontScaling={false} style={styles.itemText1}>{`${Math.floor(((Math.floor(item?.normDegree))))}° ${Math.floor((item?.normDegree % 1) * 60)}' ${Math.floor(((item?.normDegree % 1) * 60) % 1 * 60)}"`}
                  </Text>
                  <Text allowFontScaling={false} style={styles.itemText}>{item?.nakshatra}</Text>
                  <Text allowFontScaling={false} style={styles.itemText3}>{item?.nakshatra_pad}</Text>
                  <Text allowFontScaling={false} style={styles.itemText}>

                    {item?.isRetro == 'true' ? (
                      <View style={{}}>
                        <Text allowFontScaling={false}
                          style={[
                            { color: 'white', backgroundColor: 'blue', borderRadius: 10, padding: 5, fontSize: 10 },
                          ]}>
                          R
                        </Text>
                      </View>
                    ) : (
                      <Text allowFontScaling={false} style={{}}></Text>
                    )}

                  </Text>
                  {dropdownVisibility[index] ? (
                    <AntDesign name="up" color={colors.black_color} size={20} />
                  ) : (
                    <AntDesign name="down" color={colors.black_color} size={20} />
                  )}
                </View>
              </TouchableOpacity>

              {dropdownVisibility[index] && (
                <View style={styles.dropdownContent}>
                  <View style={styles.row}>
                    <View style={styles.cell}>
                      <Text allowFontScaling={false} style={styles.textCenter}>{t("sign_lord")}</Text>
                      <Text allowFontScaling={false} style={styles.textCenter}>{item?.signLord}</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text allowFontScaling={false} style={styles.textCenter}>{t("nakshtra")}</Text>
                      <Text allowFontScaling={false} style={styles.textCenter}>{item?.nakshatra}</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text allowFontScaling={false} style={styles.textCenter}>{t("nak_loard")}</Text>
                      <Text allowFontScaling={false} style={styles.textCenter}>{item?.nakshatraLord}</Text>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.cell}>
                      <Text allowFontScaling={false} style={styles.textCenter}>{t("house")}</Text>
                      <Text allowFontScaling={false} style={styles.textCenter}>{item?.house}</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text allowFontScaling={false} style={styles.textCenter}>{t("nak_pad")}</Text>
                      <Text allowFontScaling={false} style={styles.textCenter}>{item?.nakshatra_pad}</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text allowFontScaling={false} style={styles.textCenter}>{t("retroGrade")}</Text>
                      <Text allowFontScaling={false} style={styles.textCenter}>{item?.isRetro}</Text>
                    </View>
                  </View>
                </View>
              )}

            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  function plantsInfo() {
    const renderItem = ({ item, index }) => {
      return (
        <View style={styles.dropdownContent}>
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text allowFontScaling={false} style={styles.textCenter}>{t("sign_lord")}</Text>
              <Text allowFontScaling={false} style={styles.textCenter}>{item?.sign_lord}</Text>
            </View>
            <View style={styles.cell}>
              <Text allowFontScaling={false} style={styles.textCenter}>{t("nakshtra")}</Text>
              <Text allowFontScaling={false} style={styles.textCenter}>{item?.nakshatra}</Text>
            </View>
            <View style={styles.cell}>
              <Text allowFontScaling={false} style={styles.textCenter}>{t("nak_loard")}</Text>
              <Text allowFontScaling={false} style={styles.textCenter}>{item?.nakshatra_lord}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text allowFontScaling={false} style={styles.textCenter}>{t("house")}</Text>
              <Text allowFontScaling={false} style={styles.textCenter}>{item?.house}</Text>
            </View>
            <View style={styles.cell}>
              <Text allowFontScaling={false} style={styles.textCenter}>{t("nak_pad")}</Text>
              <Text allowFontScaling={false} style={styles.textCenter}>{item?.nakshatra_pad}</Text>
            </View>
            <View style={styles.cell}>
              <Text allowFontScaling={false} style={styles.textCenter}>{t("retroGrade")}</Text>
              <Text allowFontScaling={false} style={styles.textCenter}>{item?.isRetro}</Text>
            </View>
          </View>
        </View>
      )
    }
    return (
      <View>
        <FlatList data={planetData} renderItem={renderItem} />
      </View>
    )
  }

};

const mapStateToProps = state => ({
  planetData: state.kundli.planetData,
  isLoading: state.setting.isLoading
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(ShowKundliPlanets);

const styles = StyleSheet.create({
  itmeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
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
  itemText2: {
    flex: 0.26,
    fontSize: getFontSize(1.4),
    color: colors.black_color8,
    fontFamily: fonts.medium,
    textAlign: 'center',
  },
  itemText1: {
    flex: 0.24,
    fontSize: getFontSize(1.4),
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
    color: 'black',
    fontSize: getFontSize(1.4)
  },
});
