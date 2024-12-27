import { StyleSheet, Text, View ,TouchableOpacity ,Image, FlatList} from 'react-native'
import React, { useEffect } from 'react'
import MyStatusBar from '../../components/MyStatusbar'
import { colors, img_url } from '../../config/Constants'
import MyHeader from '../../components/MyHeader'
import { Colors } from '../../assets/style'
import { SCREEN_WIDTH ,SCREEN_HEIGHT} from '../../config/Screen'
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux'
import * as AssignedPujaActions from '../../redux/actions/AssignedPujaActions'
import moment from 'moment';

const Completepuja = ({navigation,astrologerCompletePooja,dispatch}) => {
    useEffect(() => {
        dispatch(AssignedPujaActions.getAstrologerCompleltePooja())
    }, [dispatch])
  
    console.log(astrologerCompletePooja,'ppdata')
    return (
        <View style={{flex:1}}>
                   <MyStatusBar
        backgroundColor={colors.new_color}
        barStyle="light-content"
        />
            <MyHeader title={'Complete Puja'} navigation={navigation}/>
        <View style={{ flex: 1, backgroundColor: Colors.grayLight ,paddingHorizontal:SCREEN_WIDTH*0.03,paddingVertical:SCREEN_HEIGHT*0.02 }}>
     
            {card1()}
           
        </View>
        </View>
    )
    function card1() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{ backgroundColor: colors.background_theme1, padding: 10, borderRadius: 10, elevation: 2, marginTop: SCREEN_HEIGHT * 0.01 }}
                    // onPress={() => navigation.navigate('Assignedpujanext')}
                    // onPress={() => navigation.navigate('Assignedpujanext', { item })}
                    onPress={() => navigation.navigate('bookedPoojaDetails', { item })}
    
                >
                    <View style={{ flexDirection: "row", gap: 10 }}>
                    
                        <View style={{ width: SCREEN_WIDTH * 0.25, height: SCREEN_WIDTH * 0.25,borderRadius:100,overflow:'hidden',}}>
                            <Image
                                // source={require('../../assets/images/ganeshpuja.png')}
                                source={item?.poojaId?.image ? { uri: img_url + item?.poojaId?.image } : require('../../assets/images/ganeshpuja.png')}
                                style={{ width: SCREEN_WIDTH * 0.25, height: SCREEN_WIDTH * 0.25, resizeMode: "contain", }}
                            />
                        </View>
    
                        <View style={{ paddingHorizontal: SCREEN_WIDTH * 0.01, paddingVertical: SCREEN_HEIGHT * 0.01 }}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ color: colors.new_color }}>Puja Name -</Text>
                                <Text style={{ color: colors.black_color9 }}>
                                    {item.poojaId ? item?.poojaId?.pujaName : 'N/A'}
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                                <Fontisto name="date" color={"black"} size={15} />
                                <Text style={{ color: colors.new_color }}>Date -</Text>
                                <Text style={{ color: colors.black_color9 }}>
                                    {item?.pujaCompleteDate ? moment(item?.pujaDpujaCompleteDateate).format('DD MMM YYYY') : 'N/A'}
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                                <AntDesign name="clockcircleo" color={"black"} size={15} />
                                <Text style={{ color: colors.new_color }}>Time -</Text>
                                <Text style={{ color: colors.black_color9 }}>
                                    {item?.pujaCompleteDate ? moment(item?.pujaCompleteDate).format('hh:mm A') : 'N/A'}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={{ alignItems: "flex-end" }} onPress={() => navigation.navigate('bookedPoojaDetails', { item })}>
                        <View style={{ backgroundColor: 'green', alignItems: "center", justifyContent: "center", paddingHorizontal: SCREEN_HEIGHT * 0.04, borderRadius: 10, paddingVertical: SCREEN_HEIGHT * 0.005 }}>
                            <Text style={{ color: "white", fontSize: 20 }}>{item?.status?.toLowerCase()}</Text>
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>
            );
        };
        return (
            // <TouchableOpacity style={{ backgroundColor: colors.background_theme1, padding:10,borderRadius:10,elevation:2}}
            // onPress={() => navigation.navigate('Completepujanext')}
            // >
            //     {/* <View style={{alignItems:"flex-end"}}>
            //     <View style={{  alignItems:"center",backgroundColor:"#238D03", justifyContent: "center",borderRadius:20 ,paddingHorizontal:SCREEN_WIDTH*0.02 ,paddingVertical:SCREEN_HEIGHT*0.004}}>
            //         <Text style={{ color: colors.background_theme1 ,fontSize:15 }}>Mode - Online</Text>
            //     </View>
            //     </View> */}
            //     <View style={{ flexDirection: "row" ,gap:10}}>

            //         <View style={{ width: SCREEN_WIDTH * 0.25, height: SCREEN_WIDTH * 0.25,borderRadius:100,}}>
            //             <Image source={require('../../assets/images/ganeshpuja.png')}
            //                 style={{ width: SCREEN_WIDTH * 0.25, height: SCREEN_WIDTH * 0.25, resizeMode: "contain", }}
            //             />
            //         </View>
            //         <View style={{  paddingHorizontal:SCREEN_WIDTH*0.01,paddingVertical:SCREEN_HEIGHT*0.01}}>
            //             <View style={{ flexDirection: "row" }}>
            //                 <Text style={{ color: colors.new_color }}>Puja Name -</Text>
            //                 <Text style={{ color: colors.black_color9 }}>Ganesh puja</Text>
            //             </View>
            //             <View style={{flexDirection:"row",alignItems:"center" ,gap:3}}>
            //                 <Fontisto
            //                     name="date"
            //                     color={"black"}
            //                     size={15}
            //                 />
            //                 <Text style={{color:colors.new_color}}>Date-</Text>
            //                 <Text style={{color:colors.black_color9}}>19/9/2024</Text>
            //             </View>

            //             <View style={{flexDirection:"row",alignItems:"center",gap:3}}>
            //                 <AntDesign
            //                     name="clockcircleo"
            //                     color={"black"}
            //                     size={15}
            //                 />
            //                 <Text style={{color:colors.new_color}}>Time-</Text>
            //                 <Text style={{color:colors.black_color9}}>6:00PM</Text>
            //             </View>
            //         </View>

            //     </View>
            //     <TouchableOpacity style={{alignItems:"flex-end"}}
            //      onPress={() => navigation.navigate('Completepujanext')}  >
            //     <View style={{backgroundColor:"#238D03",alignItems:"center",justifyContent:"center",paddingHorizontal:SCREEN_HEIGHT*0.04,borderRadius:10,paddingVertical:SCREEN_HEIGHT*0.005}}>
            //         <Text style={{color:"white",fontSize:20}}>Complete</Text>
            //     </View>
            //     </TouchableOpacity>
            // </TouchableOpacity>
            <View>

            {astrologerCompletePooja && (
                <FlatList
                data={astrologerCompletePooja}
                renderItem={renderItem}
                keyExtractor={item => item?.id}
                // keyExtractor={item => item.id.toString()}
                style={{ padding: 10 }}
                />
            )}
            </View>
        )
    }
}


const mapStateToProps = state => (
    {
        astrologerCompletePooja : state.assignedpujaReducer.astrologerCompletePooja
}
);

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Completepuja);

const styles = StyleSheet.create({})