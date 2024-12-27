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
  import {api_astrolist1, api_url, colors, fonts,get_HouseReport,get_RashiReport,get_panchang,getFontSize} from '../../../config/Constants';
  import {StyleSheet} from 'react-native';
  import {useState} from 'react';
  import axios from 'axios';
  import MyLoader from '../../../components/MyLoader';
  import moment from 'moment';
  import { useTranslation } from 'react-i18next';
  import { connect } from 'react-redux';
  const {width, height} = Dimensions.get('screen');
  import * as KundliAction from '../../../redux/actions/KundliActions'
  import { Portal } from 'react-native-paper';
  
  const Rahu = props => {
    console.log('pppp',props?.route?.params?.data);
    const {t} = useTranslation();
    
  
    const [isLoading, setIsLoading] = useState(false);
    const [pachang, setPachang] = useState(null);
    useEffect(() => {
      props.navigation.setOptions({
        
      });
    }, []);
  
  
    useEffect(() => {
      props.dispatch(KundliAction.getRashiReports(null));
    },[])
    
    console.log(props.kundliRashiReport);
  
    return (
      <View style={{flex: 1, backgroundColor: colors.black_color1}}>
        {/* <MyLoader isVisible={isLoading} /> */}
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
                {props.kundliRashiReport && (
                <View style={styles.itemContainer}>
                    <Text allowFontScaling={false} style={styles.itemText}>{props.kundliRashiReport.RahuReports.planet}</Text>
                    <View>
                    <Text allowFontScaling={false} style={{ color: 'black', padding: 10, fontSize: getFontSize(1.8), textAlign: 'justify' }}>
                        {props.kundliRashiReport.venusReports.rashi_report}
                    </Text>
                    </View>
                </View>
                )}
            
           
            
          </View>
          
        </ScrollView>
      </View>
    );
  };
  
  const mapStateToProps = state => ({
    customerData: state.customer.customerData,
    isLoading: state.setting.isLoading,
    AshtakvargaReport: state.kundli.AshtakvargaReport,
    kundliRashiReport: state.kundli.kundliRashiReport,
    
  });
  
  const mapDispatchToProps = dispatch => ({ dispatch })
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Rahu);
  
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
  