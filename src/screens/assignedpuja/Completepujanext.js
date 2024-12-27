import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'  
import React from 'react'
import MyStatusBar from '../../components/MyStatusbar'
import { Colors, Sizes } from '../../assets/style'
import { colors } from '../../config/Constants'
import MyHeader from '../../components/MyHeader'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../config/Screen'
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { navigate } from '../../NavigationService'

const Completepujanext = ({navigation}) => {
    return (
        <View style={{ flex: 1 }}>
            <MyStatusBar
                backgroundColor={colors.new_color}
                barStyle="light-content"
            />
            <MyHeader title={'Complete Puja '} navigation={navigation} />
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

                    <View style={{ width: SCREEN_WIDTH * 0.25, height: SCREEN_WIDTH * 0.25, borderRadius: 100, }}>
                        <Image source={require('../../assets/images/ganeshpuja.png')}
                            style={{ width: SCREEN_WIDTH * 0.25, height: SCREEN_WIDTH * 0.25, resizeMode: "contain", }}
                        />
                    </View>
                    <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.01, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ color: colors.new_color }}>Puja Name -</Text>
                            <Text style={{ color: colors.black_color9 }}>Ganesh puja</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                            <Fontisto
                                name="date"
                                color={"black"}
                                size={15}
                            />
                            <Text style={{ color: colors.new_color }}>Date-</Text>
                            <Text style={{ color: colors.black_color9 }}>19/9/2024</Text>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                            <AntDesign
                                name="clockcircleo"
                                color={"black"}
                                size={15}
                            />
                            <Text style={{ color: colors.new_color }}>Time-</Text>
                            <Text style={{ color: colors.black_color9 }}>6:00PM</Text>
                        </View>
                    </View>

                </View>
                <View style={{ backgroundColor: colors.black_color9, alignItems: "center", justifyContent: "center", paddingVertical: SCREEN_HEIGHT * 0.003, marginVertical: SCREEN_HEIGHT * 0.01, }}>
                    <Text style={{ color: colors.background_theme1, fontSize: 17 }}>Description</Text>
                </View>
                <View style={{ borderBottomWidth: 1, borderBlockColor: Colors.gray2, paddingBottom: SCREEN_HEIGHT * 0.02 }}>
                    <Text style={{ textAlign: "justify", color: colors.black_color9, fontSize: 12, fontWeight: "600" }}> book puja for  Divali /Diwali Lakshmi Puja , lakshmi pujan 2022  in india , in Mumbai , lakshmi devi pooja
                       <Text> </Text>
                        <Text style={{ color: colors.new_color, textDecorationLine: "underline", }}>Read more</Text>
                    </Text>
                </View>


                <View style={{ flexDirection: "row", gap: 10, paddingVertical: SCREEN_HEIGHT * 0.02,borderBottomWidth:1,borderColor:Colors.gray2 }}>

                    <View style={{ width: SCREEN_WIDTH * 0.25, height: SCREEN_WIDTH * 0.25, borderRadius: 100, backgroundColor: "#FBBC04" }}>
                        <Image source={require('../../assets/images/cust.png')}
                            style={{ width: SCREEN_WIDTH * 0.25, height: SCREEN_WIDTH * 0.25, resizeMode: "contain", }}
                        />
                    </View>
                    <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.01, paddingVertical: SCREEN_HEIGHT * 0.02, }}>
                        <View style={{ flexDirection: "row", gap: 3 }}>
                            <Text style={{ color: colors.new_color }}>Name -</Text>
                            <Text style={{ color: colors.black_color9 }}>Suresh kumar</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>

                            <Text style={{ color: colors.new_color }}>Email-</Text>
                            <Text style={{ color: colors.black_color9 }}> sureshkumar@gmail.com</Text>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>

                            <Text style={{ color: colors.new_color }}>Phone No -</Text>
                            <Text style={{ color: colors.black_color9 }}>+91-8954565422</Text>
                        </View>
                        {/* <View style={{ flexDirection: "row", gap: 3 }}>

                            <Text style={{ color: colors.new_color }}>Address -</Text>
                            <Text style={{ color: colors.black_color9, flex: 1 }}>Electronic City Noida sec 62 Near Hanuman mandir</Text>
                        </View> */}
                    </View>

                </View>
                <View style={{ alignItems: "center", backgroundColor: colors.new_color, borderRadius: 100, paddingVertical: SCREEN_HEIGHT * 0.013, marginHorizontal: SCREEN_WIDTH * 0.2,top:-Sizes.fixPadding * 2.5 }}>
                    <Text style={{ color: colors.background_theme1, fontWeight: "500" }}>Upload Video Or Photo</Text>
                </View>

                <View style={{ paddingVertical: SCREEN_HEIGHT * 0.01 }}>
                    <Text style={{ color: colors.black_color9, fontSize: Sizes.fixPadding * 1.2 }}>IMAGE ( Min 1 photo uplaod)</Text>
                </View>
                <View style={{ flexDirection: "row", gap: 10, paddingHorizontal: SCREEN_WIDTH * 0.04, paddingVertical: SCREEN_HEIGHT * 0.009 }}>

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

                </View>
                <View style>
                    <Text style={{ paddingVertical: SCREEN_HEIGHT * 0.01, fontSize: Sizes.fixPadding * 1.2, color: colors.black_color9 }}>VIDEO (Min 1 Video uplaod)</Text>
                </View>

                <View style={{ flexDirection:"row",gap:10 ,paddingHorizontal:SCREEN_WIDTH*0.03,}}>
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

                <View style={{paddingVertical:SCREEN_HEIGHT*0.1}}>
                <TouchableOpacity style={{backgroundColor:"#238D03" ,alignItems:"center",justifyContent:"center",paddingVertical:SCREEN_HEIGHT*0.018,marginHorizontal:SCREEN_WIDTH*0.22,borderRadius:20}}>
                    <Text style={{fontSize:Sizes.fixPadding*2,fontWeight:"600",color:colors.background_theme1}}>Complete</Text>
                </TouchableOpacity>
                </View>

            </View>
        )
    }

    



}

export default Completepujanext

const styles = StyleSheet.create({})