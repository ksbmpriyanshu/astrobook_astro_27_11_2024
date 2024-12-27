import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { connect } from 'react-redux'
import MyStatusBar from '../../components/MyStatusbar'
import { Colors, Sizes, Fonts } from '../../assets/style'
import MyHeader from '../../components/MyHeader'
import { FlatList } from 'react-native'
import Banner from './components/Banner'
import { colors } from '../../config/Constants'

const PoojaDetails = ({ navigation, route }) => {
    const poojaData = route?.params
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryDark} barStyle={'light-content'} />
            <View style={{ flex: 1 }}>
                <MyHeader title={'Details'} navigation={navigation} />
                <FlatList
                    ListHeaderComponent={<>
                        {poojaData && <Banner data={poojaData?.bannerImages} />}
                        {productInfo()}
                        {descriptionInfo()}
                    </>}
                />
                {submitInfo()}
            </View>
        </View>
    )

    function submitInfo() {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('registerPooja', {poojaId: poojaData?._id})} style={{ backgroundColor: colors.background_theme2, paddingVertical: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.black16RobotoMedium, color: Colors.white, textAlign: 'center' }}>Register</Text>
            </TouchableOpacity>
        )
    }

    function descriptionInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.black14InterMedium, color: Colors.blackLight }}>{poojaData?.description}</Text>
            </View>
        )
    }

    function productInfo() {
        return (
            <View style={{ padding: Sizes.fixPadding, backgroundColor: Colors.whiteDark }}>
                <Text style={{ ...Fonts.black22RobotoMedium }}>{poojaData?.poojaName}</Text>
                <Text style={{ ...Fonts.black16RobotoMedium, color: Colors.primaryDark, textTransform: 'capitalize' }}>{poojaData?.type}</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(PoojaDetails)