import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Alert } from 'react-native'
import React from 'react'
import MyStatusBar from '../../components/MyStatusbar'
import { Colors, Sizes } from '../../assets/style'
import { colors, img_url } from '../../config/Constants'
import MyHeader from '../../components/MyHeader'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../config/Screen'
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { navigate } from '../../NavigationService';
import moment from 'moment';
import RNFetchBlob from 'rn-fetch-blob';
import { useState } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import * as AssignedPujaActions from '../../redux/actions/AssignedPujaActions'
import { connect } from 'react-redux'

const Assignedpujanext = ({ navigation, route, dispatch }) => {
    const [images, setImages] = useState([])
    const [data, setData] = useState([]);
    const [uploadData,setUploadData] = useState([]);
    const [baseSixtyFourData, setbaseSixtyFourData] = useState(null);
    const [img,setImg] = useState(null);
    const [state, setState] = useState({
        seeMore: false

    });
    const { seeMore } = state
    const { item } = route.params || { item: {} };
    console.log("qqqwww", item?.orderId)
    const UploadData ={
        orderId : item?.orderId
    }
    function UploadImageVideo() {
        if (baseSixtyFourData) {
            data.push({
                name: 'image',
                filename: `${item.poojaId._id}.jpg`,
                type: 'jpg/png',
                data: RNFetchBlob.wrap(img),
            });
            // setUploadData(prevData => {...prevData, data});
        }
        console.log("baseSixtyFourData", data)
        dispatch(AssignedPujaActions.getAssignedPujaUpload(UploadData));
        // dispatch(AssignedPujaActions.getAssignedPujaUpload({data,item}));
        // if(images.length !== 0){
        //     dispatch(AssignedPujaActions.getAssignedPujaUpload({images,item}));
        // }else{
        //     Alert.alert("AstroRemedy","Please select photos")
        // }

    }
    function handleClick() {
        Alert.alert(
            'AstroRemedy',
            'Click or Upload Images',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Camera',
                    onPress: () => takePhoto(),
                },
                {
                    text: 'Upload',
                    onPress: () => pickImage(),
                },
            ],
            { cancelable: true }
        );
    }

    function takePhoto() {
        try {
            launchCamera({
                mediaType: 'photo',
                includeBase64: true,
            }, (response) => {
                if (response.didCancel) {
                    Alert.alert('Cancelled', 'Photo capture was cancelled');
                } else if (response.errorCode) {
                    Alert.alert(response.errorCode, 'Photo capture failed');
                } else if (response.assets && response.assets.length > 0) {
                    setbaseSixtyFourData(response.assets[0].base64);
                    setImg(response.assets[0].uri)
                    // const imageUri = response.assets[0].uri;
                    // const image = RNFetchBlob.wrap(imageUri)
                    // setImages(prevImages => [...prevImages, baseSixtyFourData]);

                    // return imageUri
                }
                console.log("response111", response.assets[0].base64)
            })
        } catch (error) {
            console.log("Photo capture", error)
        }
    };

    function pickImage() {
        launchImageLibrary({}, (response) => {
            if (response.assets && response.assets[0].uri) {
                const imageUri = response.assets[0].uri;
                // setImageUri(response.assets[0].uri);
                setImages(prevImages => [...prevImages, imageUri]);
            } else if (response.errorCode) {
                Alert.alert('Error', 'Image selection failed');
            }
            // console.log("image galler",response)
        });
    }



    return (
        <View style={{ flex: 1 }}>
            <MyStatusBar
                backgroundColor={colors.new_color}
                barStyle="light-content"
            />
            <MyHeader title={'Assigned Puja '} navigation={navigation} />
            <View style={{ flex: 1 }}>

                <FlatList
                    ListHeaderComponent={
                        <>
                            <View style={{ flex: 1, backgroundColor: Colors.grayLight, paddingHorizontal: SCREEN_WIDTH * 0.03, paddingVertical: SCREEN_HEIGHT * 0.02 }}>

                                {card1()}
                            </View>
                        </>
                    }
                />
            </View>

        </View>
    )
    function card1() {
        return (
            <View style={{ backgroundColor: colors.background_theme1, padding: 10, borderRadius: 8, elevation: 2, height: "100%" }}

            >
                {/* <TouchableOpacity style={{ alignItems: "flex-end" }}>
                    <View style={{ alignItems: "center", backgroundColor:"#238D03", justifyContent: "center", borderRadius: 20, paddingHorizontal: SCREEN_WIDTH * 0.02, paddingVertical: SCREEN_HEIGHT * 0.004 }}>
                        <Text style={{ color: colors.background_theme1, fontSize: 15 }}>Mode-Online</Text>
                    </View>
                </TouchableOpacity> */}
                <View style={{ flexDirection: "row", gap: 10 }}>

                    <View style={{ width: SCREEN_WIDTH * 0.25, height: SCREEN_WIDTH * 0.25, borderRadius: 100,overflow:'hidden' }}>
                        <Image
                            source={item?.poojaId?.image ? { uri: img_url + item?.poojaId?.image } : require('../../assets/images/ganeshpuja.png')}
                            style={{ width: SCREEN_WIDTH * 0.25, height: SCREEN_WIDTH * 0.25, resizeMode: "contain", }}
                        />
                    </View>
                    <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.01, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ color: colors.new_color }}>Puja Name -</Text>
                            <Text style={{ color: 'black' }}>{item.poojaId ? item?.poojaId?.pujaName : 'N/A'}</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                            <Fontisto
                                name="date"
                                color={"black"}
                                size={15}
                            />
                            <Text style={{ color: colors.new_color }}>Date-</Text>
                            <Text style={{ color: colors.black_color9 }}>{item?.poojaId?.createdAt ? moment(item?.poojaId?.createdAt).format('DD MMM YYYY') : 'N/A'}</Text>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                            <AntDesign
                                name="clockcircleo"
                                color={"black"}
                                size={15}
                            />
                            <Text style={{ color: colors.new_color }}>Time-</Text>
                            <Text style={{ color: colors.black_color9 }}>{item?.poojaId?.createdAt ? moment(item?.poojaId?.createdAt).format('hh:mm A') : 'N/A'}</Text>
                        </View>
                    </View>

                </View>
                <View style={{ backgroundColor: colors.black_color9, alignItems: "center", justifyContent: "center", paddingVertical: SCREEN_HEIGHT * 0.003, marginVertical: SCREEN_HEIGHT * 0.01, }}>
                    <Text style={{ color: colors.background_theme1, fontSize: 17 }}>Description</Text>
                </View>
                <View style={{ borderBottomWidth: 1, borderBlockColor: Colors.gray2, paddingBottom: SCREEN_HEIGHT * 0.02 }}>
                    <Text style={{ textAlign: "justify", color: colors.black_color9, fontSize: 12, fontWeight: "600" }}>
                        {item.poojaId ? item?.poojaId?.description : 'N/A'}
                    </Text>

                </View>


                <View style={{ flexDirection: "row", gap: 10, paddingVertical: SCREEN_HEIGHT * 0.02, borderBottomWidth: 1, borderColor: Colors.gray2 }}>

                    <View style={{ width: SCREEN_WIDTH * 0.25, height: SCREEN_WIDTH * 0.25, borderRadius: 100, backgroundColor: "#FBBC04",overflow:'hidden' }}>
                        <Image
                            source={item?.customer?.image ? { uri: img_url + item?.customer?.image } : require('../../assets/images/cust.png')}
                            style={{ width: SCREEN_WIDTH * 0.25, height: SCREEN_WIDTH * 0.25, resizeMode: "cover", }}
                        />
                    </View>
                    <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.01, paddingVertical: SCREEN_HEIGHT * 0.02, }}>
                        <View style={{ flexDirection: "row", gap: 3 }}>
                            <Text style={{ color: colors.new_color }}>Name -</Text>
                            <Text style={{ color: colors.black_color9 }}>{item.customer ? item?.customer?.customerName : 'N/A'}</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>

                            <Text style={{ color: colors.new_color }}>Email-</Text>
                            <Text style={{ color: colors.black_color9,width:'68%' }}>{item.customer ? item.customer.email : 'N/A'}</Text>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>

                            <Text style={{ color: colors.new_color }}>Phone No -</Text>
                            <Text style={{ color: colors.black_color9 }}>{item?.customer ? item.customer.phoneNumber : 'N/A'}</Text>
                        </View>
                        {/* <View style={{ flexDirection: "row", gap: 3 }}>

                            <Text style={{ color: colors.new_color }}>Address -</Text>
                            <Text style={{ color: colors.black_color9, flex: 1 }}>Electronic City Noida sec 62 Near Hanuman mandir</Text>
                        </View> */}
                    </View>

                </View>
                <View style={{ alignItems: "center", backgroundColor: colors.new_color, borderRadius: 100, paddingVertical: SCREEN_HEIGHT * 0.013, marginHorizontal: SCREEN_WIDTH * 0.2, top: -Sizes.fixPadding * 2.5 }}>
                    <Text style={{ color: colors.background_theme1, fontWeight: "500" }}>Upload Video Or Photo</Text>
                </View>

                <View style={{ paddingVertical: SCREEN_HEIGHT * 0.01 }}>
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
                </View>

            </View>
        )
    }

}

const mapStateToProps = state => ({
    // providerData: state.provider.providerData,
});


const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Assignedpujanext);

const styles = StyleSheet.create({})