import {View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import MyHeader from '../../components/MyHeader';
import {api_url, astro_order_history, colors, fonts, order_history} from '../../config/Constants';
import {Rating, AirbnbRating} from 'react-native-ratings';
import MyLoader from '../../components/MyLoader';
import axios from 'axios';
import {connect} from 'react-redux';
import { useTranslation } from 'react-i18next';

const {width, height} = Dimensions.get('screen');

const GiftOrderHistory = props => {
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [orderHistoryData, setOrderHistoryData] = useState(null);
  useEffect(() => {
    props.navigation.setOptions({
      header: () => (
        <MyHeader
          title={t("order_history_gift")}
          socialIcons={false}
          navigation={props.navigation}
          statusBar={{
            backgroundColor: colors.background_theme2,
            barStyle: 'light-content',
          }}
        />
      ),
    });
  }, []);

  useEffect(() => {
    get_order_history();
  }, []);

  const get_order_history = async () => {
    setIsLoading(true);
    await axios({
      method: 'post',
      url: api_url + astro_order_history,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: {
        user_id: props.providerData.id,
      },
    })
      .then(res => {
        setOrderHistoryData(res.data.gift);
        console.log(res.data.gift);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          flex: 0,
          backgroundColor: colors.background_theme1,
          padding: 0,
          marginBottom: 15,
          borderRadius: 10,
          shadowColor: colors.black_color3,
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.3,
          shadowRadius: 5,
          borderWidth:1,
          borderColor:colors.background_theme2
        }}>
        <View style={{backgroundColor:colors.background_theme2,padding:10,flexDirection:'row',borderTopLeftRadius:10,borderTopRightRadius:10}}>
          <Text style={styles.textHeading}>Order Transaction Id: </Text>
          <Text style={styles.textPara}>{item.transid}</Text>
        </View>
        <View
          style={{
            flex: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginTop: 10,
          }}>
          {/* <View
            style={{
              flex: 0,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            {item.img_url !=
            'http://astrobol.in/admin/uploads/vendor/' ? (
              <Image source={{uri: item.img_url}} style={{width: width*0.25, height: width*0.25, borderRadius: 1000,borderWidth:1,borderColor:'black'}} />
            ) : (
              <MaterialIcons
                name="account-circle"
                color={colors.black_color6}
                size={width*0.15}
              />
            )}
          </View> */}
          
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.textHeading}>Astrologer Name:</Text>
          <Text style={styles.textPara}>{item.owner_name}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.textHeading}>Gift Name:</Text>
          <Text style={styles.textPara}>{item.gift_name}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.textHeading}>Gift Icon:</Text>
         <Image source={{uri: item.icon}} style={{width:width * 0.07,height:height * 0.03,borderWidth:1, borderColor:'#ddd',borderRadius:10}} />
        </View>
        
        <View style={styles.rowContainer}>
          <Text style={{...styles.textHeading, fontSize: 16}}>
            Total Charge:
          </Text>
          <Text style={{...styles.textPara, fontSize: 16}}>
          ₹ {' '}
            {item.amount == null
              ? '0'
              : item.amount}
          </Text>
        </View>
        <View style={{...styles.rowContainer, marginTop: 10}}>
          
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.black_color1}}>
      <MyLoader isVisible={isLoading} />
      <View style={{flex: 1, width: '95%', alignSelf: 'center'}}>
        {orderHistoryData && (
          <FlatList
            data={orderHistoryData}
            renderItem={renderItem}
            keyExtractor={item => item.call_log_id}
            style={{paddingTop: 15}}
            ListEmptyComponent={_EmptyCommponent}
          />
        )}
      </View>
    </View>
  );
};

const _EmptyCommponent = () => {
  return(
    <View style={{alignSelf:'center'}}>
      <Text style={{color:'red'}}>Your have Gift Order History's No data Yet</Text>
    </View>
  )
}

const mapStateToProps = state => ({
  providerData: state.provider.providerData,
});

export default connect(mapStateToProps, null)(GiftOrderHistory);

const styles = StyleSheet.create({
  textHeading: {
    fontSize: 13,
    color: colors.black_color6,
    fontFamily: fonts.semi_bold,
  },
  textPara: {
    fontSize: 12,
    color: colors.black_color6,
    fontFamily: fonts.medium,
  },
  rowContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    padding:5
  },
  childRowContainer: {},
});
