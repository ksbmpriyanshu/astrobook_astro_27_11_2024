import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import { colors, fonts } from '../../config/Constants';
import { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import {
  api_url,
  get_sub_vdasha,
  get_sub_sub_vdasha,
  get_sub_sub_sub_vdasha,
  get_sub_sub_sub_sub_vdasha,
  getFontSize,
} from '../../config/Constants';
import MyLoader from '../../components/MyLoader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions';
import MyHeader from '../../components/MyHeader';
import { color } from '@rneui/base';

const ShowDashna = ({
  navigation,
  majorDashaData,
  dispatch,
  subVDashaData,
  dashaVisible,
  dashaPath,
  subSubVDashaData,
  subSubSubVDashaData,
  subSubSubSubVDashaData
}) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    dispatch(KundliActions.getKundliMajorDasha());
  }, [dispatch]);


  const onBack = (visible) => {
    let str = dashaPath;
    let parts = str.split("/");

    // Remove empty string parts if present at the end
    if (parts[parts.length - 1] === "") {
      parts.pop();
    }

    if (parts.length > 0) {
      parts.pop();
    }

    let result = parts.join("/");
    if (result.length > 0) {
      result += "/"; // Ensure the trailing slash is preserved
    }

    dispatch(KundliActions.setKundliDashaVisible(visible));
    dispatch(KundliActions.setKundliDashaPath(result));
  }


  return (
    <View style={{ flex: 1, backgroundColor: colors.black_color1 }}>
      <MyHeader title={'Vimshottari Dasha'} navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <MyLoader isVisible={isLoading} />
        {majorDashaData && (
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
            {majorDashaData ? (
              <>
                <View
                  style={{
                    padding: 20,
                    alignItems: 'flex-start',
                    backgroundColor: colors.new_color,
                  }}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: colors.background_theme1,
                      fontSize: getFontSize(1.8),
                      fontWeight: 'bold',
                    }}>
                    {t('maha_dasha')}
                  </Text>
                </View>

                {dashaVisible == 'MAJOR' &&
                  majorDashaData.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={0.8}
                      onPress={() =>
                        dispatch(KundliActions.getKundliSubVDasha(item?.planet))
                      }
                      style={styles.itemContainer}>
                      <Text allowFontScaling={false} style={styles.itemText}>
                        {item.planet}
                      </Text>
                      <Text
                        allowFontScaling={false}
                        style={styles.itemText1}>{`${moment(
                          item.end,
                          'DD-MM-YYYY HH:mm',
                        ).format('DD-MM-YYYY HH:mm')}`}</Text>
                    </TouchableOpacity>
                  ))}

                {dashaVisible == 'ANTAR' && (
                  <>
                    <View
                      style={{
                        padding: 11,
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingHorizontal:18,

                        justifyContent: 'space-between',
                        backgroundColor: '#f9c87d',
                      }}>
                      <Text
                        allowFontScaling={false}
                        style={{
                          color: 'black',
                          fontSize: getFontSize(1.8),
                          fontWeight: 'bold',
                        }}>
                        {t('antar_dasha')}
                      </Text>
                      <TouchableOpacity
                        style={{
                          padding: 10,
                          borderRadius: 5,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                        onPress={() =>
                          onBack("MAJOR")
                        }>
                        <Ionicons
                          name="arrow-back"
                          color={"black"}
                          size={20}
                        />
                        <Text
                          allowFontScaling={false}
                          style={{
                            color: 'black',
                            fontSize: getFontSize(1.8),
                            fontWeight: 'bold',
                          }}>
                          Back
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {subVDashaData &&
                      subVDashaData.map((item, index) => (
                        <View
                          key={index}
                          style={{ justifyContent: 'space-between' }}>
                          <TouchableOpacity
                            key={index}
                            style={styles.itemContainer}
                            onPress={() =>
                              dispatch(
                                KundliActions.getKundliSubSubVDasha(
                                  item?.planet,
                                ),
                              )
                            }>
                            <Text
                              allowFontScaling={false}
                              style={styles.itemText}>
                              {`${dashaPath}${item.planet}`}
                            </Text>

                            <Text
                              allowFontScaling={false}
                              style={styles.itemText1}>{`${moment(
                                item.end,
                                'DD-MM-YYYY HH:mm',
                              ).format('DD-MM-YYYY HH:mm')}`}</Text>
                          </TouchableOpacity>
                        </View>
                      ))}
                  </>
                )}

                {dashaVisible == 'PRATYANTAR' && (
                  <>
                    <View
                      style={{
                        padding: 10,
                        paddingHorizontal:19,
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: '#f9c87d',
                      }}>
                      <Text
                        allowFontScaling={false}
                        style={{
                          color: 'black',
                          fontSize: getFontSize(1.8),
                          fontWeight: 'bold',
                        }}>
                        {t('p_dasha')}
                      </Text>
                      <TouchableOpacity
                        style={{
                          padding: 10,
                          borderRadius: 5,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                        onPress={() =>
                          onBack('ANTAR')
                        }>
                        <Ionicons
                          name="arrow-back"
                          color={"black"}
                          size={20}
                        />
                        <Text
                          allowFontScaling={false}
                          style={{
                            color: 'black',
                            fontSize: getFontSize(1.8),
                            fontWeight: 'bold',
                          }}>
                          Back
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {subSubVDashaData &&
                      subSubVDashaData.map((item, index) => (
                        <TouchableOpacity
                          key={index}
                          style={styles.itemContainer}
                        // onPress={() =>
                        //   dispatch(KundliActions.getKundliSubSubSubVDasha(item?.planet))
                        // }
                        >
                          <Text
                            allowFontScaling={false}
                            style={styles.itemText}>
                            {`${dashaPath}${item.planet}`}
                          </Text>
                          <Text
                            allowFontScaling={false}
                            style={styles.itemText1}>{`${moment(
                              item.end,
                              'DD-MM-YYYY HH:mm',
                            ).format('DD-MM-YYYY HH:mm')}`}</Text>
                        </TouchableOpacity>
                      ))}
                  </>
                )}

                {/* {
                  dashaVisible == 'SOOKSHMA' && <>
                    <View
                      style={{
                        padding: 10,
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: '#43aa8b',
                      }}>
                      <Text
                        allowFontScaling={false}
                        style={{
                          color: 'black',
                          fontSize: getFontSize(1.8),
                          fontWeight: 'bold',
                        }}>
                        {t('s_dasha')}
                      </Text>
                      <TouchableOpacity
                        style={{
                          padding: 10,
                          borderRadius: 5,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                        onPress={() => back2()}>
                        <Ionicons
                          name="arrow-back"
                          color={colors.white_color}
                          size={20}
                        />
                        <Text
                          allowFontScaling={false}
                          style={{
                            color: 'white',
                            fontSize: getFontSize(1.8),
                            fontWeight: 'bold',
                          }}>
                          Back
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {
                      subSubSubVDashaData && subSubSubVDashaData.map((item, index) => (
                        <TouchableOpacity
                          key={index}
                          style={styles.itemContainer}
                          onPress={() =>
                            dispatch(KundliActions.getKundliSubSubSubSubVDasha(item?.planet))
                          }>
                          <Text
                            allowFontScaling={false}
                            style={styles.itemText}>
                            {`${dashaPath}${item.planet.slice(0, 2)}`}
                          </Text>
                          <Text
                            allowFontScaling={false}
                            style={styles.itemText1}>{`${moment(
                              item.end,
                              'DD-MM-YYYY HH:mm',
                            ).format('DD-MM-YYYY HH:mm')}`}</Text>
                        </TouchableOpacity>
                      ))
                    }
                  </>
                }

                {
                  dashaVisible == 'PARAN' && <>
                    <View
                      style={{
                        padding: 10,
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: '#f94144',
                      }}>
                      <Text
                        allowFontScaling={false}
                        style={{
                          color: 'black',
                          fontSize: getFontSize(1.8),
                          fontWeight: 'bold',
                        }}>
                        {t('par_dasha')}
                      </Text>
                      <TouchableOpacity
                        style={{
                          padding: 10,
                          borderRadius: 5,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                        onPress={() => back4()}>
                        <Ionicons
                          name="arrow-back"
                          color={colors.white_color}
                          size={20}
                        />
                        <Text
                          allowFontScaling={false}
                          style={{
                            color: 'white',
                            fontSize: getFontSize(1.4),
                            fontWeight: 'bold',
                          }}>
                          Back
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {
                      subSubSubSubVDashaData && subSubSubSubVDashaData.map((item, index) => (
                        <TouchableOpacity
                          key={index}
                          style={styles.itemContainer}
                          activeOpacity={1}>
                          <Text
                            allowFontScaling={false}
                            style={styles.itemText}>
                            {`${dashaPath}${item.planet.slice(0, 2)}`}
                          </Text>

                          <Text
                            allowFontScaling={false}
                            style={styles.itemText1}>{`${moment(
                              item.end,
                              'DD-MM-YYYY HH:mm',
                            ).format('DD-MM-YYYY HH:mm')}`}</Text>
                        </TouchableOpacity>
                      ))
                    }
                  </>
                } */}

              </>
            ) : null}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({
  majorDashaData: state.kundli.majorDashaData,
  subVDashaData: state.kundli.subVDashaData,
  subSubVDashaData: state.kundli.subSubVDashaData,
  subSubSubVDashaData: state.kundli.subSubSubVDashaData,
  subSubSubSubVDashaData: state.kundli.subSubSubSubVDashaData,
  dashaVisible: state.kundli.dashaVisible,
  dashaPath: state.kundli.dashaPath,
  isLoading: state.setting.isLoading,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ShowDashna);

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'gray',
    backgroundColor: "#fcefb4",
    paddingTop: 20,
  },
  itemText: {
    flex: 0.5,
    fontSize: getFontSize(1.6),
    color: 'red',
    fontFamily: fonts.medium,
    textAlign: 'left',
    fontWeight: '800',
  },
  itemText1: {
    flex: 0.5,
    fontSize: getFontSize(1.6),
    color: 'red',
    fontFamily: fonts.medium,
    fontWeight: '800',
    textAlign: 'right',
  },
});
