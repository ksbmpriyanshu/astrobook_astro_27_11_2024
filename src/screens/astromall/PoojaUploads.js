import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'react-native-image-picker';
import { Colors, Sizes, Fonts } from '../../assets/style';
import MyHeader from '../../components/MyHeader';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Image } from 'react-native';
import MyStatusBar from '../../components/MyStatusbar';
import { FlatList } from 'react-native';
import VedioPlayer from './components/VedioPlayer';
import { showToastMessage } from '../../utils/services';
import RNFetchBlob from 'rn-fetch-blob';
import { api_url, colors, complete_astrologer_pooja,img_url } from '../../config/Constants';
import * as Progress from 'react-native-progress';
import * as AstromallActions from '../../redux/actions/astromallActions'
import { connect } from 'react-redux';
import Fontisto from 'react-native-vector-icons/Fontisto';
import moment from 'moment';

const PoojaUploads = ({ navigation, route, dispatch }) => {
    const [state, setState] = useState({
        imageData: null,
        vedioData: null,
        description: '',
        videoVisible: false,
        vedioUri: null,
        uploadProgress: 0,
        vedioUploading: false,
        isLoading: false,
    });
    const { item } = route.params || { item: {} };
   
   console.log(item?.orderId)

    const openImageLibrary = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            quality: 1,
            selectionLimit: 10,
        }; // Add any camera options you need

        ImagePicker.launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image library');
            } else if (response.errorCode) {
                console.log(response.errorCode, response.errorMessage, 'asdfghjk');
            } else {
                updateState({ imageData: response.assets });
            }
        });
    };

    const openVedioLibrary = () => {
        const options = {
            mediaType: 'video',
            includeBase64: false,
            quality: 1,
            selectionLimit: 10,
        };

        ImagePicker.launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image library');
            } else if (response.errorCode) {
                console.log(response.errorCode, response.errorMessage, 'asdfghjk');
            } else {
                updateState({ vedioData: response.assets });
            }
        });
    };

    const validation = () => {
        if (imageData == null) {
            showToastMessage({ message: 'Please select images' })
            return false;
        } else if (vedioData == null) {
            showToastMessage({ message: 'Please select vedios' })
            return false;
        // } else if (description.length == 0) {
        //     showToastMessage({ message: 'Please enter description' })
        //     return false;
        } else {
            return true;
        }
    };

    const onSubmit = async () => {
        try {
            if (validation()) {
                updateState({ vedioUploading: true });
    
                const data = [
                    { name: 'orderId', data: item?.orderId },
                    // { name: 'description', data: description },
                ];
    
                imageData.forEach((item, index) => {
                    data.push({
                        name: `images`,
                        filename: `image_${index}.jpg`,
                        type: 'image/jpeg',
                        data: RNFetchBlob.wrap(item?.uri),
                    });
                });
    
                vedioData.forEach((item, index) => {
                    data.push({
                        name: `videos`,
                        filename: `video_${index}.mp4`,
                        type: 'video/mp4',
                        data: RNFetchBlob.wrap(item?.uri),
                    });
                });
    
                await RNFetchBlob.config({
                    trusty: true,
                    timeout: 10000
                }).fetch(
                    'POST',
                    `${api_url}${complete_astrologer_pooja}`,
                    {
                        'Content-Type': 'multipart/form-data',
                    },
                    data
                )
           
                .uploadProgress((written, total) => {
                    const progress = written / total;
                    console.log(progress);
                    updateState({ uploadProgress: progress });
                })
                .then(response => {
                    updateState({ vedioUploading: false });
                    console.log(response.info(),'res')
                    if (response.info().status === 200) {
                        updateState({ uploadProgress: 1 });
                        console.log('Upload successful');
                        dispatch(AstromallActions.getRegisteredPooja());
                        navigation.pop(2);
                        showToastMessage({ message: 'Upload successful' });
                    } else {
                        console.error('Upload failed:', response.data);
                        showToastMessage({ message: 'Failed to upload' });
                    }
                })
                .catch(error => {
                    updateState({ vedioUploading: false });
                    console.error('Error during upload:', error);
                    showToastMessage({ message: 'Error during upload' });
                });
            }
        } catch (e) {
            console.error('Exception caught:', e);
        }
    };
    
    const updateState = data => {
        setState(prevState => {
            const newData = { ...prevState, ...data };
            return newData;
        });
    };

    const {
        imageData,
        vedioData,
        videoVisible,
        vedioUri,
        uploadProgress,
        vedioUploading,
        isLoading,
        description,
    } = state;
    // console.log(imageData,'all i9mageDa')

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <MyStatusBar
                backgroundColor={Colors.primaryDark}
                barStyle={'light-content'}
            />
            {/* <Loader visible={isLoading} /> */}
            <View style={{ flex: 1 }}>
                {header()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            {vedioUploading && vedioUploadProgress()}
                            {topMessageInfo()}
                            {imageUploadInfo()}
                            {vedioUploadInfo()}
                            {/* {discriptionInfo()} */}
                        </>
                    }
                />
            </View>
            {continueButtonInfo()}
            {vedioPlayerInfo()}
        </View>
    );

    function vedioPlayerInfo() {
        return (
            <VedioPlayer
                videoVisible={videoVisible}
                updateState={updateState}
                uri={vedioUri}
            />
        );
    }

    function continueButtonInfo() {
        return (
            <TouchableOpacity
                disabled={vedioUploading}
                activeOpacity={0.8}
                onPress={() => onSubmit()}
                // onPress={() => navigation.navigate('poojaHistory')}
                style={{
                    marginHorizontal: Sizes.fixPadding * 3,
                    marginVertical: Sizes.fixPadding,
                    borderRadius: 1000,
                    overflow: 'hidden',
                }}>
                <LinearGradient
                    colors={[colors.background_theme2, colors.background_theme2]}
                    style={{ paddingVertical: Sizes.fixPadding }}>
                    <Text style={{ ...Fonts.white16RobotoMedium, textAlign: 'center' }}>
                        Submit
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        );
    }

    function discriptionInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2 }}>
                <Text style={{ ...Fonts.black16RobotoMedium }}>Description</Text>
                <TextInput
                    placeholder="Enter here..."
                    placeholderTextColor={Colors.gray}
                    onChangeText={text => updateState({ description: text })}
                    multiline
                    style={[
                        styles.input,
                        {
                            height: SCREEN_HEIGHT * 0.18,
                            textAlignVertical: 'top',
                            marginBottom: Sizes.fixPadding * 2,
                            color:'black'
                        },
                    ]}
                />
            </View>
        );
    }

    function vedioUploadInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.5 }}>
                <Text
                    style={{
                        ...Fonts.black16RobotoRegular,
                    }}>
                    Attachment (Add Videos)
                </Text>
                <View
                    style={[
                        styles.row,
                        {
                            marginBottom: Sizes.fixPadding * 2,
                            alignItems: 'flex-start',
                        },
                    ]}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => openVedioLibrary()}
                        style={{
                            width: SCREEN_WIDTH * 0.3,
                            height: SCREEN_WIDTH * 0.3,
                            ...styles.center,
                            backgroundColor: Colors.white,
                            borderRadius: Sizes.fixPadding,
                            elevation: 5,
                            shadowColor: Colors.gray,
                            marginTop: Sizes.fixPadding,
                        }}>
                        <AntDesign name="plus" color={Colors.gray} size={50} />
                    </TouchableOpacity>
                    <View
                        style={[
                            styles.row,
                            {
                                marginLeft: Sizes.fixPadding,
                                flexWrap: 'wrap',
                                width: SCREEN_WIDTH * 0.6,
                            },
                        ]}>
                        {vedioData &&
                            vedioData.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() =>
                                        updateState({ vedioUri: item.uri, videoVisible: true })
                                    }
                                    style={{
                                        width: SCREEN_WIDTH * 0.15,
                                        height: SCREEN_WIDTH * 0.15,
                                        marginRight: Sizes.fixPadding,
                                        marginBottom: Sizes.fixPadding,
                                    }}>
                                    <Image
                                        source={{ uri: item.uri }}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    />
                                </TouchableOpacity>
                            ))}
                    </View>
                </View>
            </View>
        );
    }

    function imageUploadInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.5 }}>
                <Text
                    style={{
                        ...Fonts.black16RobotoRegular,
                    }}>
                    Attachment (Add Photos)
                </Text>
                <View
                    style={[
                        styles.row,
                        {
                            marginBottom: Sizes.fixPadding * 2,
                            alignItems: 'flex-start',
                        },
                    ]}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => openImageLibrary()}
                        style={{
                            width: SCREEN_WIDTH * 0.3,
                            height: SCREEN_WIDTH * 0.3,
                            ...styles.center,
                            backgroundColor: Colors.white,
                            borderRadius: Sizes.fixPadding,
                            elevation: 5,
                            shadowColor: Colors.gray,
                            marginTop: Sizes.fixPadding,
                        }}>
                        <AntDesign name="plus" color={Colors.gray} size={50} />
                    </TouchableOpacity>
                    <View
                        style={[
                            styles.row,
                            {
                                marginLeft: Sizes.fixPadding,
                                flexWrap: 'wrap',
                                width: SCREEN_WIDTH * 0.6,
                            },
                        ]}>
                        {imageData &&
                            imageData.map((item, index) => (
                                <Image
                                    key={index}
                                    source={{ uri: item.uri }}
                                    style={{
                                        width: SCREEN_WIDTH * 0.15,
                                        height: SCREEN_WIDTH * 0.15,
                                        marginRight: Sizes.fixPadding,
                                        marginBottom: Sizes.fixPadding,
                                    }}
                                />
                            ))}
                    </View>
                </View>
            </View>
        );
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
                            <Text style={{ color: colors.black_color9 }}>{item?.pujaDate? moment(item?.pujaDate).format('DD MMM YYYY') : 'N/A'}</Text>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                            <AntDesign
                                name="clockcircleo"
                                color={"black"}
                                size={15}
                            />
                            <Text style={{ color: colors.new_color }}>Time-</Text>
                            <Text style={{ color: colors.black_color9 }}>{item?.pujaTime ? moment(item?.pujaTime).format('hh:mm A') : 'N/A'}</Text>
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

    function vedioUploadProgress() {
        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: Sizes.fixPadding,
                }}>
                <Progress.Bar progress={uploadProgress} width={SCREEN_WIDTH * 0.9} />
                {/* <Text
              style={{...Fonts.black14InterMedium, marginTop: Sizes.fixPadding}}>
              1/2
            </Text> */}
            </View>
        );
    }

    function header() {
        return <MyHeader navigation={navigation} title={'Assigned Puja'} />;
    }
}

const mapStateToProps = state =>({

})

const mapDispatchToProps = dispatch =>({dispatch})

export default connect(mapStateToProps, mapDispatchToProps)(PoojaUploads)

const styles = StyleSheet.create({
    row: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        backgroundColor: Colors.white,
        elevation: 8,
        marginTop: Sizes.fixPadding,
        padding: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding,
        shadowColor: Colors.gray,
    },
});