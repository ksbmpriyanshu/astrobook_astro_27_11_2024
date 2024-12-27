import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Colors, Sizes, Fonts } from '../../assets/style';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import moment from 'moment';
import { secondsToHMS, showNumber } from '../../utils/services';
import { base_url, getFontSize, img_url } from '../../config/Constants';
import * as HistoryActions from '../../redux/actions/HistoryActions'
import MyHeader from '../../components/MyHeader';

const VideoHistory = ({ videoCallHistoryData, dispatch, navigation,astroData }) => {
  useEffect(() => {
    dispatch(HistoryActions.getVideoCallHistory())
}, [dispatch])
  const renderItem = ({ item, index }) => {
    console.log(item,'videodata')
    const totalVideoCallPrice = parseFloat(item?.totalPrice) || 0;
    const VideoCall2 = (astroData?.normal_video_call_price + parseFloat(astroData?.commission_normal_video_call_price))
    return (
      <View style={styles.container}>
        <Text
          style={{
            ...Fonts.black11InterMedium,
            fontSize: 13,
            marginBottom: Sizes.fixPadding * 0.5,
            textTransform: 'uppercase'
          }}
          numberOfLines={1}>
          ORDER ID: {item?.transactionId}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: img_url + item?.customerId?.image }}
              style={{ width: '100%', height: '100%', borderRadius: 1000 }}
            />
          </View>
          <View style={{ marginLeft: Sizes.fixPadding }}>
            <Text style={{ ...Fonts.primaryLight14RobotoMedium }}>{item?.customerId?.customerName}</Text>
            <Text style={{ ...Fonts.gray12RobotoMedium }}>{item?.customerId?.gender}</Text>
          </View>
        </View>
        <View style={{ marginTop: Sizes.fixPadding }}>
          <Text
            style={{ ...Fonts.gray14RobotoRegular, color: Colors.blackLight }}>
            Order Time: {moment(item?.createdAt).format('DD MMM YYYY hh:mm A')}
          </Text>
          <Text
            style={{ ...Fonts.gray14RobotoRegular, color: Colors.blackLight }}>
            Duration: {secondsToHMS(item?.duration)}
          </Text>
          <Text
            style={{ ...Fonts.gray14RobotoRegular, color: Colors.blackLight }}>
            Video Call Price: {showNumber(VideoCall2)}/min
          </Text>
          <Text
            style={{ ...Fonts.gray14RobotoRegular, color: Colors.blackLight }}>
            Commision Price: {showNumber(item?.adminPrice)}/min
          </Text>
          <Text
            style={{ ...Fonts.gray14RobotoRegular, color: Colors.blackLight }}>
            Total Charge: {showNumber(totalVideoCallPrice)}
          </Text>
          <Text
            style={{ ...Fonts.gray14RobotoRegular, color: Colors.blackLight }}>
            Astro Charge: {showNumber(item?.partnerPrice)}
          </Text>
          <Text
            style={{ ...Fonts.black14RobotoRegular, color: Colors.blackLight }}>
            Status: Completed
          </Text>
        </View>
      </View>
    );
  };
  const NoDataFound = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',height:SCREEN_HEIGHT * 0.9 }}>
      <Text style={{color:Colors.black,fontSize:getFontSize(1.8)}}>No history available.</Text>
    </View>
  );
  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteDark }}>
        <MyHeader title={'Video Call Order History'} navigation={navigation} />
      {videoCallHistoryData && (
        <FlatList
          data={videoCallHistoryData}
          renderItem={renderItem}
          initialNumToRender={5}
          contentContainerStyle={{ padding: Sizes.fixPadding * 1.5 }}
          ListEmptyComponent={NoDataFound}
        />
      )}
    </View>
  );
};

const mapStateToProps = state => ({
    videoCallHistoryData: state.history.videoCallHistoryData,
    astroData: state.provider.providerData,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(VideoHistory);

const styles = StyleSheet.create({
  container: {
    marginBottom: Sizes.fixPadding * 1.5,
    backgroundColor: Colors.white,
    borderRadius: Sizes.fixPadding * 0.7,
    paddingHorizontal: Sizes.fixPadding * 0.7,
    paddingVertical: Sizes.fixPadding,
  },
  imageContainer: {
    width: SCREEN_WIDTH * 0.16,
    height: SCREEN_WIDTH * 0.16,
    borderRadius: 1000,
    overflow: 'hidden',
  },
});
