import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as HistoryActions from '../../redux/actions/HistoryActions'
import { Colors, Sizes, Fonts } from '../../assets/style'
import MyHeader from '../../components/MyHeader'
import MyStatusBar from '../../components/MyStatusbar'
import moment from 'moment'
import { showNumber } from '../../utils/services'
import { SCREEN_HEIGHT } from '../../config/Screen'
import { colors, getFontSize } from '../../config/Constants'

const WalletHistroy = ({ dispatch, navigation, walletHistory }) => {
    useEffect(() => {
        dispatch(HistoryActions.getWalletHistory())
    }, [])
    return (
        <View
            style={{ flex: 1, backgroundColor: Colors.white }}
        >
            <MyStatusBar backgroundColor={colors.new_color} barStyle={'light-content'} />
            <MyHeader title={'Payment Bill History'} navigation={navigation} />
            <FlatList
                ListHeaderComponent={<>
                    {walletHistory && walletHistoryInfo()}
                </>}
                contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2, paddingHorizontal: Sizes.fixPadding * 1.5 }}
            />
        </View>
    )

    function walletHistoryInfo() {
        const historyFor = (type) =>{
            switch(type){
                case 'CHAT':
                    return 'Credit by chat.'
                case 'CALL':
                    return 'Credit by call.'
                case 'GIFT':
                    return 'Credit by gift.'
                case 'LIVE_VEDIO_CALL':
                    return 'Credit by live streaming call.'
                case 'WALLET_RECHARGE':
                    return 'Balanced added to your wallet'
                default:
                    return title
            }
        }
        const NoDataFound = () => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',height:SCREEN_HEIGHT * 0.9 }}>
              <Text style={{color:Colors.black,fontSize:getFontSize(1.5)}}>No History found</Text>
            </View>
          );
        const renderItem = ({ item, index }) => {
            return (
                <View style={styles.itemContainer}>
                    <View style={styles.invoiceId}>
                        <Text style={{ ...Fonts.black12RobotoRegular }}>{item?.invoiceId}</Text>
                    </View>
                    <Text style={styles.text}>Date: {moment(item?.createdAt).format('DD MMM YYYY')}</Text>
                    <Text style={styles.text}>Time: {moment(item?.createdAt).format('hh:mm A')}</Text>
                    <Text style={styles.text}>{historyFor(item?.type)}</Text>
                    <View style={styles.amountContainer}>
                        <Text style={{ ...Fonts.black16RobotoMedium, fontSize: 18, color: item?.transactionType == 'CREDIT' ? Colors.greenLight : Colors.red }}>{item?.transactionType == 'CREDIT' ? '+' : '-'} {showNumber(item?.amount)}</Text>
                    </View>
                </View>
            )
        }
        return (
            <View>
                <FlatList
                    data={walletHistory}
                    renderItem={renderItem}
                    initialNumToRender={5}
                    ListEmptyComponent={NoDataFound}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    walletHistory: state.history.walletHistory
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(WalletHistroy)

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: Colors.grayLight,
        marginBottom: Sizes.fixPadding * 2,
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding,
    },
    invoiceId: {
        backgroundColor: Colors.white,
        paddingHorizontal: Sizes.fixPadding * 0.5,
        paddingVertical: Sizes.fixPadding * 0.3,
        borderRadius: 1000,
        elevation: 3,
        shadowColor: Colors.blackLight,
        alignSelf: 'flex-start',
        marginBottom: Sizes.fixPadding * 0.8
    },
    text: {
        ...Fonts.black14InterMedium,
        marginBottom: Sizes.fixPadding * 0.3,
        fontSize: 13
    },
    amountContainer: {
        position: 'absolute',
        top: Sizes.fixPadding,
        right: Sizes.fixPadding
    }
})