import { View, Text, FlatList, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Colors, Sizes, Fonts } from '../../assets/style'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
import LinearGradient from 'react-native-linear-gradient'
import { colors, getFontSize, img_url } from '../../config/Constants'
import MyStatusBar from '../../components/MyStatusbar'
import { connect } from 'react-redux'
import * as AstromallActions from '../../redux/actions/astromallActions'
import MyHeader from '../../components/MyHeader'
import moment from 'moment'
import { showNumber } from '../../utils/services'

const RegisteredPooja = ({ dispatch, registeredPooja, navigation }) => {

    useEffect(() => {
        dispatch(AstromallActions.getRegisteredPooja())
    }, [])
    const NoDataFound = () => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',height:SCREEN_HEIGHT * 0.9 ,alignSelf:"center" }}>
          <Text style={{color:Colors.black,fontSize:getFontSize(2) ,fontWeight:"black"}}>No Data Available</Text>
        </View>
      );
    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteDark }}>
            <MyStatusBar backgroundColor={Colors.primaryDark} barStyle={'light-content'} />
            <MyHeader title={'Scheduled Pooja'} navigation={navigation} />
            <View style={{ flex: 1 }}>
                <FlatList ListHeaderComponent={<>
                    {registeredPooja && categoriesInfo()}
                </>}
                    contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2 }}
                    ListEmptyComponent={NoDataFound}
                />
            </View>
        </View>
    )

    function categoriesInfo() {
        const renderItem = ({ item, index }) => {
            return (
                <TouchableOpacity onPress={() => navigation.navigate('bookedPoojaDetails', { ...item })} activeOpacity={0.8} style={styles.itemContainer}>
                    <ImageBackground
                        style={{ width: '100%', height: '100%' }}
                        source={{ uri: img_url + item?.poojaId?.image }}
                    >
                        <LinearGradient
                            style={{ width: '100%', height: '100%', justifyContent: 'flex-end', padding: Sizes.fixPadding }}
                            colors={['rgba(0, 0, 0, 0.18)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
                        >
                            <Text style={{ ...Fonts.white11InterMedium, fontSize: getFontSize(1.5) }}>{item?.poojaId?.poojaName}</Text>
                            <Text style={{ ...Fonts.white11InterMedium, fontSize: getFontSize(1.5) }}>{moment(item?.poojaDate).format('DD MMM YYYY')} {moment(item?.poojaTime).format('hh:mm A')}</Text>
                            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ ...Fonts.white11InterMedium, fontSize: getFontSize(1.5) }}>{item?.poojaId?.type}</Text>
                                <Text style={{ ...Fonts.white11InterMedium, fontSize: getFontSize(1.5) }}>{showNumber(item?.price)}</Text>
                            </View>

                            <View style={{ position: 'absolute', top: 0, right: 0, backgroundColor: colors.background_theme2, paddingVertical: Sizes.fixPadding * 0.5, paddingHorizontal: Sizes.fixPadding, borderBottomLeftRadius: Sizes.fixPadding }}>
                                <Text style={{ ...Fonts.white12RobotoRegular, textTransform: 'capitalize' }}>{item?.status}</Text>
                            </View>
                        </LinearGradient>
                    </ImageBackground>
                </TouchableOpacity>
            )
        }
        return (
            <FlatList data={registeredPooja} renderItem={renderItem} initialNumToRender={10} />
        )
    }
}

const mapStateToProps = state => ({
    registeredPooja: state.astromall.registeredPooja
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(RegisteredPooja)

const styles = StyleSheet.create({
    itemContainer: {
        width: SCREEN_WIDTH * 0.9,
        height: SCREEN_WIDTH * 0.5,
        borderRadius: Sizes.fixPadding,
        overflow: 'hidden',
        marginBottom: Sizes.fixPadding * 2,
        elevation: 5,
        alignSelf: 'center',
    }
})