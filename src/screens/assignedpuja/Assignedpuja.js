import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from '../../assets/style'
// import { color } from '@rneui/base'
// import { connect } from 'react-redux';
import { colors } from '../../config/Constants'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen'
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MyStatusBar from '../../components/MyStatusbar'
import MyHeader from '../../components/MyHeader'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { navigate } from '../../NavigationService'
import * as AssignedPujaActions from '../../redux/actions/AssignedPujaActions'
import { connect } from 'react-redux'
import { base_url,img_url } from '../../config/Constants'
import moment from 'moment';
import { api_url, get_assigned_Puja } from '../../config/Constants'

const Assignedpuja = ({ navigation, assignedPuja, dispatch }) => {
    useEffect(() => {
        dispatch(AssignedPujaActions.getAssignedPuja())
    }, [dispatch])
  
console.log(assignedPuja,'assignedsaga')

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={{ backgroundColor: colors.background_theme1, padding: 10, borderRadius: 10, elevation: 2, marginTop: SCREEN_HEIGHT * 0.01 }}
                // onPress={() => navigation.navigate('Assignedpujanext')}
                // onPress={() => navigation.navigate('Assignedpujanext', { item })}
                onPress={() => navigation.navigate('poojaUploads', { item })}

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
                                {item?.pujaDate ? moment(item?.pujaDate).format('DD MMM YYYY') : 'N/A'}
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                            <AntDesign name="clockcircleo" color={"black"} size={15} />
                            <Text style={{ color: colors.new_color }}>Time -</Text>
                            <Text style={{ color: colors.black_color9 }}>
                                {item?.pujaTime ? moment(item?.pujaTime).format('hh:mm A') : 'N/A'}
                            </Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={{ alignItems: "flex-end" }} onPress={() => navigation.navigate('poojaUploads', { item })}>
                    <View style={{ backgroundColor: colors.new_color, alignItems: "center", justifyContent: "center", paddingHorizontal: SCREEN_HEIGHT * 0.04, borderRadius: 10, paddingVertical: SCREEN_HEIGHT * 0.005 }}>
                        <Text style={{ color: "white", fontSize: 20 }}>Assigned</Text>
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };


    return (
        <View style={{ flex: 1 }}>
            <MyStatusBar
                backgroundColor={colors.new_color}
                barStyle="light-content"
            />
            <MyHeader title={'Assigned Puja'} navigation={navigation} />
            <View style={{ flex: 1, backgroundColor: Colors.grayLight, paddingHorizontal: SCREEN_WIDTH * 0.03, paddingVertical: SCREEN_HEIGHT * 0.02 }}>
                {assignedPuja && (
                    <FlatList
                        data={assignedPuja}
                        renderItem={renderItem}
                        keyExtractor={item => item?.id}
                        // keyExtractor={item => item.id.toString()}
                        style={{ padding: 10 }}
                    />
                )}

            </View>
        </View>
    )


}


const mapStateToProps = state => (
    {
    assignedPuja : state.assignedpujaReducer.assignedPuja
}
);

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Assignedpuja);

const styles = StyleSheet.create({})