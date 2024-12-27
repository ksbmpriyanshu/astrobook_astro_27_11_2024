import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { colors, fonts, img_url } from '../../config/Constants'
import MyStatusBar from '../../components/MyStatusbar'
import MyHeader from '../../components/MyHeader'
import { connect } from 'react-redux'
import * as NotificationsActions from '../../redux/actions/NotificationsActions'
import { SCREEN_WIDTH } from '../../config/Screen'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const {width, height} = Dimensions.get('screen');

const Notifications = ({ navigation, notificationdata, dispatch }) => {

  console.log(notificationdata, 'notificationdata::::::')

  useEffect(() => {
    dispatch(NotificationsActions.getNotifications())
  }, [dispatch])

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
      activeOpacity={0.8}
        // onPress={() =>
        //   navigation.navigate('notificationDetailes', {
        //     notificationData: item,
        //   })
        // }
        style={{
          flex: 0,
          padding: 15,
          backgroundColor:
            item.read == 0
              ? colors.background_theme2
              : colors.background_theme1,
          marginBottom: 15,
          borderRadius: 10,
          shadowColor: colors.black_color8,
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.3,
          //   shadowRadius: 5
        }}>
        <View style={{flex: 0, flexDirection: 'row'}}>
          <Image
            source={item?.image?.length != 0 ? {uri: img_url + item?.image} : require('../../assets/images/newlogo.png')}
            style={{
              width: width * 0.18,
              height: width * 0.18,
              borderRadius: 1000,
            }}
          />
          <View style={{flex: 1, marginLeft: 10}}>
            <Text allowFontScaling={false}
              style={{
                fontSize: 16,
                color:
                  item.read == 0
                    ? colors.background_theme1
                    : colors.black_color7,
                fontFamily: fonts.semi_bold,
                marginBottom: 5,
              }}>
              {item?.title}
            </Text>
            <Text allowFontScaling={false}
              numberOfLines={3}
              style={{
                fontSize: 12,
                color:
                  item.read == 0
                    ? colors.background_theme1
                    : colors.black_color6,
                fontFamily: fonts.medium,
              }}>
              {item?.description}
            </Text>

            <Text
              allowFontScaling={false}
              numberOfLines={3}
              style={{
                fontSize: 12,
                color: item.read == 0 ? colors.background_theme1 : colors.black_color6,
                fontFamily: fonts.medium,
              }}
            >
              {new Date(item?.updatedAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              }) +
                ", " +
                new Date(item?.updatedAt).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
            </Text>


          </View>
        </View>
        {/* <Text allowFontScaling={false}
          style={{
            textAlign: 'right',
            fontSize: 12,
            color:
              item.read == 0 ? colors.background_theme1 : colors.black_color6,
            fontFamily: fonts.medium,
          }}>
          {item.created_date}
        </Text> */}
      </TouchableOpacity>
     
    );
  };
  return (

    <View style={{ flex: 1, backgroundColor: colors.white_color }}>
      <MyStatusBar backgroundColor={colors.background_theme2} barStyle='light-content' />
      <MyHeader title={'Notifications'} navigation={navigation} />
      <View style={{flex: 1, backgroundColor: colors.black_color1}}>
      {notificationdata && (
        <FlatList
          data={notificationdata}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={{padding: 10}}
        />
      )}
    </View>

    </View>
  )

  

}

const mapStateToProps = state => ({
  notificationdata: state.notificationReducer.notificationdata
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);


const styles = StyleSheet.create({})