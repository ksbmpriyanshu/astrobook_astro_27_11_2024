import {
    View,
    Text,
    ScrollView,
    Dimensions,
    Image,
    TouchableOpacity,
  } from 'react-native';
  import React from 'react';
  import {useEffect} from 'react';
  import { colors, getFontSize, fonts } from '../../config/Constants';
  import {StyleSheet} from 'react-native';
  import {useState} from 'react';
  import axios from 'axios';
import MyLoader from '../../components/MyLoader';  
  import moment from 'moment';
  import { useTranslation } from 'react-i18next';
  const {width, height} = Dimensions.get('screen');
  import { connect } from 'react-redux';
  import * as KundliActions from '../../redux/actions/KundliActions';
import MyStatusBar from '../../components/MyStatusbar';
import MyHeader from '../../components/MyHeader';
  
  const AscedentReport = ({dispatch,navigation ,AscedentReport}) => {

    const {t} = useTranslation();
    
    console.log(AscedentReport?.AscedentReport?.asc_report?.ascendant,'jkkasdf')

    useEffect(() => {
        dispatch(KundliActions.getAscedentReport())
      }, [])

    return (
      <View style={{flex: 1, backgroundColor: colors.black_color1}}>
        {/* <MyLoader isVisible={isLoading} /> */}
        <MyHeader title={'Ascedent Report'} navigation={navigation} />
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
              elevation:6
            }}>
                
                <View style={styles.itemContainer}>
                    <Text allowFontScaling={false} style={styles.itemText}>{AscedentReport?.AscedentReport?.asc_report?.ascendant}</Text>
                    <View>
                    <Text allowFontScaling={false} style={{ color: 'black', padding: 10, fontSize: getFontSize(1.8), textAlign: 'justify' }}>
                       {AscedentReport?.AscedentReport?.asc_report?.report}
                    </Text>
                    </View>
                </View>
                         
            
          </View>
          
        </ScrollView>
      </View>
    );
  };

  const mapStateToProps = state => ({
    customerData: state.customer.customerData,
    isLoading: state.setting.isLoading,
    AscedentReport: state?.kundli?.AscedentReport,
    basicDetails: state.kundli.basicDetails
  });
  
  const mapDispatchToProps = dispatch => ({ dispatch })
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(AscedentReport);
  
  const styles = StyleSheet.create({
    itemContainer: {
      flex: 1,
      
      alignItems: 'center',
      padding: 15,
      alignSelf:'center'
    },
    itemText: {
      
      fontSize: getFontSize(1.8),
      color: 'red',
      fontFamily: fonts.medium,
      fontWeight:'bold',
      textAlign:'center'
    },
  });
  