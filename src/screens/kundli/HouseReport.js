import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';
import { colors, fonts, api_url, get_chart_all, getFontSize } from '../../config/Constants';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import SunHouse from '../screens/customer/houseReport/Sun';
// import MoonHouse from '../screens/customer/houseReport/moon';
// import MarsHouse from '../screens/customer/houseReport/mars';
// import MercuryHouse from '../screens/customer/houseReport/mercury';
// import JupiterHouse from '../screens/customer/houseReport/jupiter';
// import VenusHouse from '../screens/customer/houseReport/venus';
// import SaturnHouse from '../screens/customer/houseReport/saturn';
// import RahuHouse from '../screens/customer/houseReport/Rahu';
// import KetuHouse from '../screens/customer/houseReport/Ketu';
import { useTranslation } from 'react-i18next';
import SunHouse from './houseReport/Sun';
import MyHeader from '../../components/MyHeader';
import * as KundliActions from '../../redux/actions/KundliActions'
import { connect } from 'react-redux';
import MoonHouse from './houseReport/moon';
import MarsHouse from './houseReport/mars';
import MercuryHouse from './houseReport/mercury';
import JupiterHouse from './houseReport/jupiter';
import VenusHouse from './houseReport/venus';
import SaturnHouse from './houseReport/saturn';


const { height } = Dimensions.get('screen');
const Tab = createMaterialTopTabNavigator();

const HouseReport = ({ navigation, route, dispatch }) => {
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(KundliActions.getHouseReports())
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <MyHeader title={'House Report'} navigation={navigation} />
      <Tab.Navigator

        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarLabelStyle: { fontSize: getFontSize(1.3), fontFamily: fonts.medium },
          tabBarGap: 0,
          tabBarStyle: { flex: 0 },
          tabBarItemStyle: { flex: 0, paddingHorizontal: 0, margin: 0 },
        }}>

        <Tab.Screen
          name={t("sun2")}
          component={SunHouse}
        />
        <Tab.Screen
          name={t("moon2")}
          component={MoonHouse}

        />
        <Tab.Screen
          name={t("mars2")}
          component={MarsHouse}
        />
        <Tab.Screen
          name={t("mercury2")}
          component={MercuryHouse}
        />
        <Tab.Screen
          name={t("jupiter2")}
          component={JupiterHouse}
        />
        <Tab.Screen
          name={t("venus2")}
          component={VenusHouse}
        />
        <Tab.Screen
          name={t("saturn2")}
          component={SaturnHouse}
        />
        {/* <Tab.Screen
          name={t("rahu2")}
          component={RahuHouse}
        /> */}
        {/* <Tab.Screen
          name={t("ketu2")}
          component={KetuHouse}
        /> */}
      </Tab.Navigator>
    </View>


  );
};

const mapStateToProps = state => ({
  isLoading: state.setting.isLoading
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(HouseReport);

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
});

