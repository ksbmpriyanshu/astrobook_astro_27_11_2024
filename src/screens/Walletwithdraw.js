import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import MyStatusBar from '../components/MyStatusbar'
import { colors, fonts } from '../config/Constants'
import MyHeader from '../components/MyHeader'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen';
import { useEffect, useState } from 'react';

import { Colors, Sizes } from '../assets/style'

import { connect } from 'react-redux'
import { showNumber } from '../utils/services'
import * as WithdrawWallet from '../redux/actions/WithdrawWallet'

const Walletwithdraw = ({ dispatch, navigation, providerData, amountWithdrawdata }) => {
    const [amount, setAmount] = useState('')
    console.log(amountWithdrawdata, 'data')

    useEffect(() => {
        dispatch(WithdrawWallet.amountWithdrawData(amount))
    }, [amount])

    return (
        <View style={{ flex: 1, backgroundColor: colors.new_color, }}>
            <MyStatusBar backgroundColor={colors.background_theme2} barStyle='light-content' />
            <MyHeader title="Wallet" navigation={navigation} />
            {amountshow()}
            {withdrawamount()}
        </View>
    )

    function withdrawamount() {
        const handlepress = () => {
            const payload = {
                astrologerId: providerData?._id,
                amount: amountWithdrawdata

            }
            return (
                dispatch(WithdrawWallet.getWithWithdraw(payload))
            )
        }
        return (

            <View style={{ height: SCREEN_HEIGHT * 0.8, backgroundColor: "white", borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingHorizontal: SCREEN_WIDTH * 0.05, paddingVertical: SCREEN_WIDTH * 0.1 }}>
                <View style={{ borderWidth: 1, borderColor: '#F45F4B', borderRadius: 50, paddingHorizontal: SCREEN_WIDTH * 0.05 }}>
                    <TextInput 
                    placeholderTextColor={colors.black_color8}
                    placeholder='₹ Enter Your Amount' value={amountWithdrawdata} onChangeText={(txt) => {
                        setAmount(txt);
                        console.log(txt, 'show in console')
                    }}
                        keyboardType='number-pad'
                        style={{color:Colors.black}}
                    />
                </View>

                <TouchableOpacity style={{ backgroundColor: colors.new_color, paddingVertical: SCREEN_HEIGHT * 0.02, alignItems: "center", borderRadius: 50, marginTop: Sizes.fixPadding * 2 }}
                    onPress={handlepress}
                >
                    <Text style={{ fontWeight: "bold", color: colors.background_theme1 }}> Request Withdraw</Text>
                </TouchableOpacity>

            </View>
        )
    }

    function amountshow() {
        return (
            <View style={{ alignItems: "center", marginVertical: SCREEN_HEIGHT * 0.05 }}>
                <Text style={{ fontSize: Sizes.fixPadding * 3, fontWeight: "bold", color: colors.white_color }}>

                    {showNumber(providerData?.wallet_balance)}
                </Text>
                <Text style={{ fontWeight: "500", color: colors.white_color }}>Account balance</Text>

            </View>
        )
    }

}
const mapStateToProps = state => ({
    providerData: state.provider.providerData,
    amountWithdrawdata: state.Withdrawwallet.amountWithdrawdata
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Walletwithdraw);

const styles = StyleSheet.create({

});








