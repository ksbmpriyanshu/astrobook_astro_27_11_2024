import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Sizes, Colors, Fonts } from '../../assets/style';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { secondsToHMS, showNumber } from '../../utils/services';
import { base_url, fonts, getFontSize, img_url } from '../../config/Constants';
import * as HistoryActions from '../../redux/actions/HistoryActions';
import MyHeader from '../../components/MyHeader';

const CallHistory = ({ dispatch, callHistoryData, navigation }) => {
    useEffect(() => {
        dispatch(HistoryActions.getCallHistory());
    }, [dispatch]);

    const renderItem = ({ item }) => {
        const transactionId = item?.transactionId || '';
        const last10Chars = transactionId.slice(-10);

        const durationInSeconds = parseFloat(item?.durationInSeconds) || 0;
        const callPrice = parseFloat(item?.callPrice) || 0;
        const totalCallPrice = parseFloat(item?.totalCallPrice) || 0;
        const commissionPrice = durationInSeconds > 0 ? parseFloat(item?.commissionPrice) || 0 : 0;
        const astroCharges = durationInSeconds > 0 ? totalCallPrice - commissionPrice : 0;

        return (
            <View style={styles.container}>
                <Text style={{ ...Fonts.black11InterMedium, fontSize: 13, marginBottom: Sizes.fixPadding * 0.5, textTransform: 'uppercase' }}>
                    ORDER ID: {last10Chars}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: img_url + (item?.customerDetails?.image || '') }} style={{ width: '100%', height: '100%', borderRadius: 1000 }} />
                    </View>
                    <View style={{ marginLeft: Sizes.fixPadding }}>
                        <Text style={{ ...Fonts.primaryLight14RobotoMedium }}>{item?.customerDetails?.customerName}</Text>
                        <Text style={{ ...Fonts.gray12RobotoMedium }}>{item?.customerDetails?.gender}</Text>
                    </View>
                </View>
                <View style={{ marginTop: Sizes.fixPadding }}>
                    <Text style={{ ...Fonts.gray14RobotoRegular, color: Colors.blackLight }}>
                        Order Time: {moment(item?.createdAt).format('DD MMM YYYY hh:mm A')}
                    </Text>
                    <Text style={{ ...Fonts.gray14RobotoRegular, color: Colors.blackLight }}>
                        Duration: {secondsToHMS(durationInSeconds)}
                    </Text>
                    <Text style={{ ...Fonts.gray14RobotoRegular, color: Colors.blackLight }}>
                        Call Price: {showNumber(callPrice)}/min
                    </Text>
                    <Text style={{ ...Fonts.gray14RobotoRegular, color: Colors.blackLight }}>
                        Total Charge: {showNumber(totalCallPrice )}
                    </Text>
                    <Text style={{ ...Fonts.gray14RobotoRegular, color: Colors.blackLight }}>
                        Commission Price: {showNumber(commissionPrice)}
                    </Text>
                    <Text style={{ ...Fonts.gray14RobotoRegular, color: Colors.blackLight }}>
                        Astro Charges: {showNumber(astroCharges)}
                    </Text>
                    <Text style={{ ...Fonts.gray14RobotoRegular, color: Colors.blackLight }}>
                        Status: {item?.status}
                    </Text>
                </View>
            </View>
        );
    };
    const NoDataFound = () => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',height:SCREEN_HEIGHT * 0.9 }}>
          <Text style={{color:Colors.black,fontSize:getFontSize(1.8)}}>No call history available.</Text>
        </View>
      );
    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteDark }}>
            <MyHeader title={'Call Order History'} navigation={navigation} />
            {callHistoryData && <FlatList data={callHistoryData} renderItem={renderItem} initialNumToRender={5} contentContainerStyle={{ padding: Sizes.fixPadding * 1.5 }} 
            ListEmptyComponent={NoDataFound }
            />}
        </View>
    );
};

const mapStateToProps = state => ({
    callHistoryData: state.history.callHistoryData
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(CallHistory);

const styles = StyleSheet.create({
    container: {
        marginBottom: Sizes.fixPadding * 1.5,
        backgroundColor: Colors.white,
        borderRadius: Sizes.fixPadding * 0.7,
        paddingHorizontal: Sizes.fixPadding * 0.7,
        paddingVertical: Sizes.fixPadding
    },
    imageContainer: {
        width: SCREEN_WIDTH * 0.16,
        height: SCREEN_WIDTH * 0.16,
        borderRadius: 1000,
        overflow: 'hidden'
    }
});
