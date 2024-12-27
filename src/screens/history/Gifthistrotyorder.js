import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Colors, Sizes, Fonts } from '../../assets/style';
import { SCREEN_WIDTH } from '../../config/Screen';
import moment from 'moment';
import { secondsToHMS, showNumber } from '../../utils/services';
import { base_url, colors, img_url } from '../../config/Constants';
import MyHeader from '../../components/MyHeader';
import * as HistoryActions from '../../redux/actions/HistoryActions';

// Function to round up seconds to the next whole minute
const roundUpToNextMinute = (seconds) => Math.ceil(seconds / 60);

const Gifthistrotyorder = ({ giftOrderHistoryData, navigation, dispatch }) => {
    useEffect(() => {
        dispatch(HistoryActions.getGiftOrderHistory());
    }, [dispatch]);

    const renderItem = ({ item }) => {
        console.log(base_url + (item?.giftId?.giftIcon),'all')
        // Extract values from item or set default values if not available
        const transactionId = item?.transactionId || '';
        const last10Chars = transactionId.slice(-20);
    
        // Ensure values are positive numbers
        const durationInSeconds = parseFloat(item?.duration) || 0;
        const roundedDurationInMinutes = roundUpToNextMinute(durationInSeconds);
        const chatPrice = parseFloat(item?.chatPrice) || 0;
        
        // Calculate total chat price based on rounded-up duration in minutes
        const totalChatPrice = roundedDurationInMinutes * chatPrice;
        
        // Commission price should be zero if the duration is zero
        const commissionPrice = roundedDurationInMinutes > 0 ? parseFloat(item?.commissionPrice) || 0 : 0;
        const astroCharges = roundedDurationInMinutes > 0 ? Math.max(0, totalChatPrice - commissionPrice) : 0;
    
        return (
            <View style={styles.container}>
                <Text style={{ ...Fonts.black11InterMedium, fontSize: 13, marginBottom: Sizes.fixPadding * 0.5 }}>
                    ORDER ID: {last10Chars}
                </Text>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: img_url + (item?.customerId?.image || '') }}
                            style={{ width: '100%', height: '100%', borderRadius: 1000 }}
                        />
                    </View>
                    <View style={{ marginLeft: Sizes.fixPadding }}>
                        <Text style={{ ...Fonts.primaryLight14RobotoMedium }}>{item?.customerId?.customerName || 'N/A'}</Text>
                        <Text style={{ ...Fonts.gray12RobotoMedium }}>{item?.customerId?.gender || 'N/A'}</Text>
                    </View>
                </View>
                <View style={styles.imageContainer2}>
                        <Image
                            source={{ uri: base_url + (item?.giftId?.giftIcon || '') }}
                            style={{ width: '100%', height: '100%', borderRadius: 1000 }}
                        />
                    
                </View>
                </View>
                <View style={{ marginTop: Sizes.fixPadding }}>
                    <Text style={{ ...Fonts.gray14RobotoRegular, color: Colors.blackLight }}>
                        Order Time: {item?.createdAt ? moment(new Date(item?.createdAt)).format('DD MMM YYYY hh:mm A') : 'N/A'}
                    </Text>
                    {/* <Text style={{ ...Fonts.gray14RobotoRegular, color: Colors.blackLight }}>
                        Duration: {secondsToHMS(durationInSeconds)}
                    </Text> */}
                    <Text style={{ ...Fonts.gray14RobotoRegular, color: Colors.blackLight }}>
                        Gift Name: {item?.giftId?.gift}
                    </Text>
                    <Text style={{ ...Fonts.gray14RobotoRegular, color: Colors.blackLight }}>
                        Total Charges: {showNumber(item?.totalPrice)}
                    </Text>
                    <Text style={{ ...Fonts.gray14RobotoRegular, color: Colors.blackLight }}>
                        Commission Price: {showNumber(item?.partnerPrice)}
                    </Text>
                    <Text style={{ ...Fonts.gray14RobotoRegular, color: Colors.blackLight }}>
                        Astro Charges: {showNumber(item?.adminPrice)}
                    </Text>
                    {/* <Text style={{ ...Fonts.gray14RobotoRegular, color: Colors.blackLight }}>
                        Status: {item?.status || 'N/A'}
                    </Text> */}
                </View>
            </View>
        );
    };
    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteDark }}>
            <MyHeader title={'Gift History'} navigation={navigation} />
            {giftOrderHistoryData && giftOrderHistoryData.length > 0 ? (
                <FlatList data={giftOrderHistoryData} renderItem={renderItem} initialNumToRender={5} contentContainerStyle={{ padding: Sizes.fixPadding * 1.5 }} />
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No chat history available.</Text>
                </View>
            )}
        </View>
    );
};

const mapStateToProps = state => ({
  giftOrderHistoryData: state.history.giftOrderHistoryData
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Gifthistrotyorder);

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
        overflow: 'hidden',
        borderWidth:2,
        borderColor: colors.new_color,
    },
    imageContainer2: {
        width: SCREEN_WIDTH * 0.16,
        height: SCREEN_WIDTH * 0.16,
        borderRadius: 1000,
        overflow: 'hidden',
        
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        ...Fonts.gray14RobotoRegular,
        color: Colors.black,
    }
});
