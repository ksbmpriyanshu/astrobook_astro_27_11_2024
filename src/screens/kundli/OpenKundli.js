import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
  Alert
} from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import { api2_my_kundali, api_url, delete_kundali, kundali_search, colors, fonts, getFontSize } from '../../config/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';
import MyLoader from '../../components/MyLoader';
import moment from 'moment';
const { width, height } = Dimensions.get('screen');
import { useTranslation } from 'react-i18next';
import { success_toast } from '../../components/MyToastMessage';
import * as KundliActions from '../../redux/actions/KundliActions'

const OpenKundli = ({ navigation, dispatch, kundliListData }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState(search);
  const [masterDataSource, setMasterDataSource] = useState(kundliListData);

  useEffect(() => {
    navigation.setOptions({
      tabBarLabel: t("previous_kundli"),
    });
  }, []);

  useEffect(() => {
    dispatch(KundliActions.getAllKundli())
  }, []);


  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      dispatch(KundliActions.setAllKundli(newData))
      setSearch(text);
    } else {
      dispatch(KundliActions.setAllKundli(masterDataSource))
      setSearch(text);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.black_color1 }}>
      <MyLoader isVisible={isLoading} />
      <View
        style={{
          flex: 0,
          flexDirection: 'row',
          width: '90%',
          alignSelf: 'center',
          marginVertical: 15,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: colors.black_color7,
          padding: 2,
        }}>
        <View style={{ margin: getFontSize(0.5) }}>
          <Ionicons name="search" color={colors.black_color7} size={25} />
        </View>

        <TextInput
          placeholder={t("s_k_b_n")}
          placeholderTextColor={colors.black_color5}
          onChangeText={text => searchFilterFunction(text)}
          style={{
            fontSize: getFontSize(1.5),
            color: colors.black_color7,
            fontFamily: fonts.medium,
            padding: 5,
            flex: 1
          }}
        />



      </View>
      <View style={{ width: '95%', alignSelf: 'center', flex: 1 }}>
        <Text allowFontScaling={false}
          style={{
            fontSize: getFontSize(1.6),
            marginBottom: 10,
            fontFamily: fonts.medium,
            color: colors.black_color7,
          }}>
          {t("recent_kundli")}
        </Text>
        {kundliListData && (
          <FlatList
            data={kundliListData}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('showKundli', { kundliId: item?._id, })}
                activeOpacity={0.6}
                key={index}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: getFontSize(1.2),
                  paddingVertical: getFontSize(1),
                  backgroundColor: colors.background_theme1,
                  marginBottom: 15,
                  borderRadius: 5,
                  shadowColor: colors.black_color4,
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 5,
                }}>
                <View
                  style={{ flex: 0, flexDirection: 'row', alignItems: 'center' }}>
                  <Text allowFontScaling={false} style={{ color: colors.black_color, borderWidth: 2, fontSize: getFontSize(1.6), paddingLeft: 12, paddingRight: 8, padding: 5, borderRadius: width * 0.1, borderColor: 'red' }}>{item.name.charAt(0)}</Text>
                  <View style={{ marginLeft: 10 }}>
                    <Text allowFontScaling={false}
                      style={{
                        fontSize: getFontSize(1.5),
                        color: colors.black_color,
                        fontFamily: fonts.bold,
                        fontWeight: 'bold'
                      }}>
                      {item.name}
                    </Text>
                    <Text allowFontScaling={false}
                      style={{
                        fontSize: getFontSize(1.2),
                        color: colors.black_color7,
                        fontFamily: fonts.medium,
                      }}>
                      {`${moment(item?.dob).format('DD MMM YYYY')} ${moment(item.tob).format("HH:mm A")}`}
                    </Text>
                    <Text allowFontScaling={false}
                      style={{
                        fontSize: getFontSize(1.2),
                        width: width * 0.5,
                        color: colors.black_color7,
                        fontFamily: fonts.medium,
                      }}>
                      {item.place}
                    </Text>
                  </View>
                </View>
                {/* <TouchableOpacity
                  style={{ right: 50, position: 'absolute' }}
                  onPress={() => navigation.navigate('editkundli', { data1: item })}
                >
                  <Entypo
                    name="edit"
                    color={colors.black_color7}
                    size={getFontSize(2.2)}
                  />
                </TouchableOpacity> */}
                <TouchableOpacity
                  style={{ right: 10, position: 'absolute' }}
                  onPress={() => dispatch(KundliActions.deleteKundli(item?._id))}>
                  <MaterialIcons
                    name="delete"
                    color={colors.black_color7}
                    size={getFontSize(2.2)}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  wallet: state.customer.wallet,
  kundliListData: state.kundli.kundliListData
});

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(OpenKundli);
