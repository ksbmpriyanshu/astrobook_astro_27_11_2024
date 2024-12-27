import { View, Text } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import MyHeader from '../../components/MyHeader';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTranslation } from 'react-i18next';
import KundliBirthDetailes from './KundliBirthDetailes';
import KundliPunchangDetailes from './KundliPunchangDetailes';
import { colors } from '../../config/Constants';

const Tab = createMaterialTopTabNavigator();

const ShowKundliBasic = (props) => {
  const { t } = useTranslation();
  useEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
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
  }, []);
  return (
    <Tab.Navigator>
      <Tab.Screen name="kundliBirthDetailes" component={KundliBirthDetailes} />
      <Tab.Screen name="kundliPunchangDetailes" component={KundliPunchangDetailes} />
    </Tab.Navigator>
  )
}

export default ShowKundliBasic

