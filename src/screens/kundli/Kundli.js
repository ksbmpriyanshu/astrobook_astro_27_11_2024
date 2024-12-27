import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AstroCallList from '../customer/AstroCallList';
import AstroChatList from '../customer/AstroChatList';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons'; 

import { useEffect } from 'react';
import { colors, fonts } from '../../config/Constants';
import MyStatusBar from '../../components/MyStatusbar';
import OpenKundli from './OpenKundli';
import NewKundli from './NewKundli';
import MyHeader from '../../components/MyHeader';
import { useTranslation } from 'react-i18next';
import * as SettingActions from '../../redux/actions/SettingActions'
import { connect } from 'react-redux';

const Tab = createMaterialTopTabNavigator();

const Kundli = props => {
  const { t } = useTranslation()
  useEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
      header: () => (
        <MyHeader
          title={t("kundli")}
          navigation={props.navigation}
          statusBar={{
            backgroundColor: colors.background_theme2,
            barStyle: 'light-content',
          }}
        />
      ),
    });
    return () => {
      props.dispatch(SettingActions.setLocationData(null))
    }
  }, []);
  return (
    <Tab.Navigator>
      <Tab.Screen name="openKundli" component={OpenKundli} />
      <Tab.Screen name="newKundli" component={NewKundli} />
    </Tab.Navigator>
  );
};

const mapDispatchToProps = dispatch => ({dispatch})

export default connect(null, mapDispatchToProps)(Kundli);
