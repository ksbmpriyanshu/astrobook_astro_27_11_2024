import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  BackHandler
} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import {
  api_astrolist1,
  api_url,
  colors,
  fonts,
  get_panchang,
  getFontSize,
} from '../../config/Constants';
import {StyleSheet} from 'react-native';
import {getAscentReport} from '../../config/apiService';
import {useState,useRef} from 'react';
import axios from 'axios';
import MyLoader from '../../components/MyLoader';
import moment from 'moment';
import {useTranslation} from 'react-i18next';

const {width, height} = Dimensions.get('screen');

const ShowPachang = props => {
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [pachang, setPachang] = useState(null);
  useEffect(() => {
    props.navigation.setOptions({
      tabBarLabel: t("ascendant"),
    });
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colors.black_color1}}>
      <MyLoader isVisible={isLoading} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 0,
            width: '95%',
            alignSelf: 'center',
            backgroundColor: '#fafdf6',
            marginVertical: 10,
            borderRadius: 15,
            shadowColor: colors.black_color5,
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 6,
          }}>
          {pachang && (
            <View style={styles.itemContainer}>
              <Text allowFontScaling={false} style={styles.itemText}>{pachang.ascendant}</Text>
              <View>
                <Text allowFontScaling={false}
                  style={{
                    color: 'black',
                    padding: 10,
                    fontSize: getFontSize(1.7),
                    textAlign: 'justify',
                  }}>
                  {pachang.report}
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ShowPachang;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,

    alignItems: 'center',
    padding: 15,
    alignSelf: 'center',
  },
  itemText: {
    fontSize: getFontSize(2),
    color: 'red',
    fontFamily: fonts.medium,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
