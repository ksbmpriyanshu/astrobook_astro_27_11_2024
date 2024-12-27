import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import MyStatusBar from '../../components/MyStatusbar'
import { Sizes, Fonts, Colors } from '../../assets/style'
import MyHeader from '../../components/MyHeader'
import { FlatList } from 'react-native'
import Banner from './components/Banner'
import { base_url, colors, img_url } from '../../config/Constants'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
import ImageView from '../../components/ImageView'
import VedioPlayer from './components/VedioPlayer'
import VideoComponent from './components/VideoComponent'
import Fontisto from 'react-native-vector-icons/Fontisto';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign'



const BookedPoojaDetails = ({ route, navigation }) => {
    const poojaData = route?.params?.item
    console.log(poojaData?.poojaId?._id,'pooja data ')
    console.log(poojaData?.status,)

    const [state, setState] = useState({
        imageVisible: false,
        image: null,
        vedioUri: null,
        videoVisible: false,
    })

    const updateState = data => {
        setState(prevState => {
            const newData = { ...prevState, ...data }
            return newData
        })
    }

    const { image, imageVisible, vedioUri, videoVisible } = state

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={Colors.primaryDark} barStyle={'light-content'} />
            <View style={{ flex: 1 }}>
                <MyHeader title={poojaData?.poojaId?.poojaName} navigation={navigation} />
                <FlatList
                    ListHeaderComponent={<>
                        {/* {poojaData && <Banner data={poojaData?.poojaId?.bannerImages} />} */}
                        {/* {productInfo()}
                        {descriptionInfo()}
                        {poojaData?.customerId && customerDetails()}
                        {astroMessageInfo()} */}
                        {topMessageInfo()}
                        {vedioGallaryInfo()}
                        {photoGallaryInfo()}
                    </>}
                />
                {(poojaData?.status !== 'COMPLETED' && poojaData?.status !== 'REJECTED') && submitInfo()}
            </View>
            <ImageView
                updateState={updateState}
                image={image}
                imageVisible={imageVisible}
            />
            <VedioPlayer
                videoVisible={videoVisible}
                updateState={updateState}
                uri={vedioUri}
            />
        </View>
    )

    function astroMessageInfo() {
        return (
            <View
                style={{
                    marginHorizontal: Sizes.fixPadding * 2,
                    marginVertical: Sizes.fixPadding,
                }}>
                <Text
                    style={{ ...Fonts.gray16RobotoMedium, marginBottom: Sizes.fixPadding }}>
                    Message received from Astrologer
                </Text>

                <Text style={{ ...Fonts.gray12RobotoMedium, color: Colors.blackLight }}>
                    {poojaData?.desc?.description}
                </Text>
            </View>
        );
    }

    function vedioGallaryInfo() {
        const renderItem = ({ item, index }) => {
            return <VideoComponent item={item} updateState={updateState} />;
        };
        return (
            <View
                style={{
                    marginHorizontal: Sizes.fixPadding * 2,
                    marginVertical: Sizes.fixPadding,
                }}>
                <Text
                    style={{ ...Fonts.gray16RobotoMedium, marginBottom: Sizes.fixPadding }}>
                    Videos
                </Text>
                <FlatList
                    data={poojaData?.videos}
                    renderItem={renderItem}
                    numColumns={3}
                    columnWrapperStyle={{ justifyContent: 'space-around' }}
                />
            </View>
        );
    }

    function photoGallaryInfo() {
        const renderItem = ({ item, index }) => {
            console.log(base_url + item)
            return (
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                        updateState({
                            image: base_url + item,
                            imageVisible: true,
                        })
                    }
                    style={{ width: '30%', height: 250 }}>
                    <Image
                        source={{uri: base_url + item }}
                        style={{ width: '100%', height: '100%' }}
                    />
                </TouchableOpacity>
            );
        };
        return (
            <View
                style={{
                    marginHorizontal: Sizes.fixPadding * 2,
                    marginVertical: Sizes.fixPadding,
                }}>
                <Text
                    style={{ ...Fonts.gray14RobotoRegular, marginBottom: Sizes.fixPadding }}>
                    Photos
                </Text>
                <FlatList
                    data={poojaData?.images}
                    renderItem={renderItem}
                    numColumns={3}
                    columnWrapperStyle={{ justifyContent: 'space-evenly' }}
                />
            </View>
        );
    }

    function customerDetails() {
        return (
            <View style={{ margin: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.black16RobotoMedium }}>Customer Details</Text>
                <View style={{ marginVertical: Sizes.fixPadding }}>
                    <Image source={{ uri: img_url + poojaData?.customerId?.image }} style={{ width: SCREEN_WIDTH * 0.2, height: SCREEN_WIDTH * 0.2, borderRadius: 1000 }} />
                </View>

                <Text style={{ ...Fonts.black14InterMedium, color: Colors.blackLight }}>Name: {poojaData?.customerId?.customerName}</Text>
                <Text style={{ ...Fonts.black14InterMedium, color: Colors.blackLight }}>Gender: {poojaData?.customerId?.gender}</Text>
                <Text style={{ ...Fonts.black14InterMedium, color: Colors.blackLight }}>Address: {poojaData?.customerId?.address?.birthPlace}</Text>
            </View>
        )
    }

    function submitInfo() {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('poojaUploads', { poojaId: poojaData?.poojaId?._id })} style={{ backgroundColor: colors.background_theme2, paddingVertical: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.black16RobotoMedium, color: Colors.white, textAlign: 'center' }}>Upload Images and Videos</Text>
            </TouchableOpacity>
        )
    }

    function descriptionInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.black14InterMedium, color: Colors.blackLight }}>{poojaData?.poojaId?.description}</Text>
            </View>
        )
    }

    function productInfo() {
        return (
            <View style={{ padding: Sizes.fixPadding, backgroundColor: Colors.whiteDark }}>
                <Text style={{ ...Fonts.black22RobotoMedium }}>{poojaData?.poojaId?.pujaName}</Text>
                <Text style={{ ...Fonts.black16RobotoMedium, color: Colors.primaryDark, textTransform: 'capitalize' }}>{poojaData?.poojaId?.type}</Text>
            </View>
        )
    }
    function topMessageInfo() {
        return (
            <View style={{ backgroundColor: colors.background_theme1, padding: 10, borderRadius: 8, elevation: 2,  }}

            >
                {/* <TouchableOpacity style={{ alignItems: "flex-end" }}>
                    <View style={{ alignItems: "center", backgroundColor:"#238D03", justifyContent: "center", borderRadius: 20, paddingHorizontal: SCREEN_WIDTH * 0.02, paddingVertical: SCREEN_HEIGHT * 0.004 }}>
                        <Text style={{ color: colors.background_theme1, fontSize: 15 }}>Mode-Online</Text>
                    </View>
                </TouchableOpacity> */}
                <View style={{ flexDirection: "row", gap: 10 }}>

                    <View style={{ width: SCREEN_WIDTH * 0.25, height: SCREEN_WIDTH * 0.25, borderRadius: 100,overflow:'hidden' }}>
                        <Image
                            source={poojaData?.poojaId?.image ? { uri: img_url + poojaData?.poojaId?.image } : require('../../assets/images/ganeshpuja.png')}
                            style={{ width: SCREEN_WIDTH * 0.25, height: SCREEN_WIDTH * 0.25, resizeMode: "contain", }}
                        />
                    </View>
                    <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.01, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ color: colors.new_color }}>Puja Name -</Text>
                            <Text style={{ color: 'black' }}>{poojaData.poojaId ? poojaData?.poojaId?.pujaName : 'N/A'}</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                            <Fontisto
                                name="date"
                                color={"black"}
                                size={15}
                            />
                            <Text style={{ color: colors.new_color }}>Date-</Text>
                            <Text style={{ color: colors.black_color9 }}>{poojaData?.pujaCompleteDate? moment(poojaData?.pujaCompleteDate).format('DD MMM YYYY') : 'N/A'}</Text>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                            <AntDesign
                                name="clockcircleo"
                                color={"black"}
                                size={15}
                            />
                            <Text style={{ color: colors.new_color }}>Time-</Text>
                            <Text style={{ color: colors.black_color9 }}>{poojaData?.pujaCompleteDate ? moment(poojaData?.pujaCompleteDate).format('hh:mm A') : 'N/A'}</Text>
                        </View>
                    </View>

                </View>
                <View style={{ backgroundColor: colors.black_color9, alignItems: "center", justifyContent: "center", paddingVertical: SCREEN_HEIGHT * 0.003, marginVertical: SCREEN_HEIGHT * 0.01, }}>
                    <Text style={{ color: colors.background_theme1, fontSize: 17 }}>Description</Text>
                </View>
                <View style={{ borderBottomWidth: 1, borderBlockColor: Colors.gray2, paddingBottom: SCREEN_HEIGHT * 0.02 }}>
                    <Text style={{ textAlign: "justify", color: colors.black_color9, fontSize: 12, fontWeight: "600" }}>
                        {poojaData.poojaId ? poojaData?.poojaId?.description : 'N/A'}
                    </Text>

                </View>


                <View style={{ flexDirection: "row", gap: 10, paddingVertical: SCREEN_HEIGHT * 0.02, borderBottomWidth: 1, borderColor: Colors.gray2 }}>

                    <View style={{ width: SCREEN_WIDTH * 0.25, height: SCREEN_WIDTH * 0.25, borderRadius: 100, backgroundColor: "#FBBC04",overflow:'hidden' }}>
                        <Image
                            source={poojaData?.customer?.image ? { uri: img_url + poojaData?.customer?.image } : require('../../assets/images/cust.png')}
                            style={{ width: SCREEN_WIDTH * 0.25, height: SCREEN_WIDTH * 0.25, resizeMode: "cover", }}
                        />
                    </View>
                    <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.01, paddingVertical: SCREEN_HEIGHT * 0.02, }}>
                        <View style={{ flexDirection: "row", gap: 3 }}>
                            <Text style={{ color: colors.new_color }}>Name -</Text>
                            <Text style={{ color: colors.black_color9 }}>{poojaData.customer ? poojaData?.customer?.customerName : 'N/A'}</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>

                            <Text style={{ color: colors.new_color }}>Email-</Text>
                            <Text style={{ color: colors.black_color9,width:'68%' }}>{poojaData.customer ? poojaData.customer.email : 'N/A'}</Text>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>

                            <Text style={{ color: colors.new_color }}>Phone No -</Text>
                            <Text style={{ color: colors.black_color9 }}>{poojaData?.customer ? poojaData.customer.phoneNumber : 'N/A'}</Text>
                        </View>
                        {/* <View style={{ flexDirection: "row", gap: 3 }}>

                            <Text style={{ color: colors.new_color }}>Address -</Text>
                            <Text style={{ color: colors.black_color9, flex: 1 }}>Electronic City Noida sec 62 Near Hanuman mandir</Text>
                        </View> */}
                    </View>

                </View>
                <View style={{ alignItems: "center", backgroundColor: colors.new_color, borderRadius: 100, paddingVertical: SCREEN_HEIGHT * 0.013, marginHorizontal: SCREEN_WIDTH * 0.2, top: -Sizes.fixPadding * 2.5 }}>
                    <Text style={{ color: colors.background_theme1, fontWeight: "500" }}>Uploaded Video Or Photo</Text>
                </View>

                {/* <View style={{ paddingVertical: SCREEN_HEIGHT * 0.01 }}>
                    <Text style={{ color: colors.black_color9, fontSize: Sizes.fixPadding * 1.2 }}>IMAGE ( Min 1 photo uplaod)</Text>
                </View>
                <View style={{ flexDirection: "row", gap: 10, paddingHorizontal: SCREEN_WIDTH * 0.04, paddingVertical: SCREEN_HEIGHT * 0.009 }}>

                    <TouchableOpacity
                        onPress={handleClick}
                        style={{
                            backgroundColor: Colors.grayLight, height: SCREEN_HEIGHT * 0.15, width: SCREEN_WIDTH * 0.26, alignItems: "center", justifyContent: "center", gap: 3, borderRadius: 10, elevation: 2
                        }}>
                        <Image source={require('../../assets/images/GALLERY.png')}
                            style={{ height: SCREEN_WIDTH * 0.1, width: SCREEN_WIDTH * 0.1 }} />
                        <Image source={require('../../assets/images/CLOUD.png')}
                            style={{ height: SCREEN_WIDTH * 0.04, width: SCREEN_WIDTH * 0.04 }} />
                        <Text style={{ fontSize: 7 }}>Click Uplaod</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={{
                        backgroundColor: Colors.grayLight, height: SCREEN_HEIGHT * 0.15, width: SCREEN_WIDTH * 0.26, alignItems: "center", justifyContent: "center", gap: 3, borderRadius: 10, elevation: 2
                    }}>
                        <Image source={require('../../assets/images/GALLERY.png')}
                            style={{ height: SCREEN_WIDTH * 0.1, width: SCREEN_WIDTH * 0.1 }} />
                        <Image source={require('../../assets/images/CLOUD.png')}
                            style={{ height: SCREEN_WIDTH * 0.04, width: SCREEN_WIDTH * 0.04 }} />
                        <Text style={{ fontSize: 7 }}>Click Uplaod</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        backgroundColor: Colors.grayLight, height: SCREEN_HEIGHT * 0.15, width: SCREEN_WIDTH * 0.26, alignItems: "center", justifyContent: "center", gap: 3, borderRadius: 10, elevation: 2
                    }}>
                        <Image source={{uri:img}}
                            style={{ height: SCREEN_WIDTH * 0.2, width: SCREEN_WIDTH * 0.2 }} />
                        <Image source={require('../../assets/images/CLOUD.png')}
                            style={{ height: SCREEN_WIDTH * 0.04, width: SCREEN_WIDTH * 0.04 }} />
                        <Text style={{ fontSize: 7 }}>Click Uplaod</Text>
                    </TouchableOpacity>

                </View>
                <View style>
                    <Text style={{ paddingVertical: SCREEN_HEIGHT * 0.01, fontSize: Sizes.fixPadding * 1.2, color: colors.black_color9 }}>VIDEO (Min 1 Video uplaod)</Text>
                </View>

                <View style={{ flexDirection: "row", gap: 10, paddingHorizontal: SCREEN_WIDTH * 0.03, }}>
                    <TouchableOpacity style={{
                        backgroundColor: Colors.grayLight, height: SCREEN_HEIGHT * 0.12, width: SCREEN_WIDTH * 0.4, alignItems: "center", justifyContent: "center", gap: 3, borderRadius: 10, elevation: 2
                    }}>
                        <Image source={require('../../assets/images/PLAY.png')}
                            style={{ height: SCREEN_WIDTH * 0.1, width: SCREEN_WIDTH * 0.1 }} />
                        <Image source={require('../../assets/images/CLOUD.png')}
                            style={{ height: SCREEN_WIDTH * 0.04, width: SCREEN_WIDTH * 0.04 }} />
                        <Text style={{ fontSize: 7 }}>Click Uplaod</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: Colors.grayLight, height: SCREEN_HEIGHT * 0.12, width: SCREEN_WIDTH * 0.4, alignItems: "center", justifyContent: "center", gap: 3, borderRadius: 10, elevation: 2
                    }}>
                        <Image source={require('../../assets/images/PLAY.png')}
                            style={{ height: SCREEN_WIDTH * 0.1, width: SCREEN_WIDTH * 0.1 }} />
                        <Image source={require('../../assets/images/CLOUD.png')}
                            style={{ height: SCREEN_WIDTH * 0.04, width: SCREEN_WIDTH * 0.04 }} />
                        <Text style={{ fontSize: 7 }}>Click Uplaod</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ paddingVertical: SCREEN_HEIGHT * 0.1 }}>
                    <TouchableOpacity
                        onPress={UploadImageVideo}
                        style={{ backgroundColor: colors.new_color, alignItems: "center", justifyContent: "center", paddingVertical: SCREEN_HEIGHT * 0.018, marginHorizontal: SCREEN_WIDTH * 0.22, borderRadius: 20 }}>
                        <Text style={{ fontSize: Sizes.fixPadding * 2, fontWeight: "600", color: colors.background_theme1 }}>Submit</Text>
                    </TouchableOpacity>
                </View> */}

            </View>
        );
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(BookedPoojaDetails)