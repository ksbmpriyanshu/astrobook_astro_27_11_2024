import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { colors, getFontSize } from '../../config/Constants';
import MyStatusBar from '../../components/MyStatusbar';
import MyHeader from '../../components/MyHeader';
import { connect } from 'react-redux';
import { Colors, Sizes } from '../../assets/style';
import { SCREEN_HEIGHT } from '../../config/Screen';
import RenderHTML from 'react-native-render-html';
import * as ProviderActions from '../../redux/actions/ProviderActions';

const AnnouncementDetails = ({ navigation, dispatch, anouncementData }) => {
    const [expandedItems, setExpandedItems] = useState({});

    const handleReadMoreToggle = (id) => {
        console.log(id,'id data ')
        console.log("Get the Notifications")
        setExpandedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
       
            // dispatch(ProviderActions.onReadAnouncement(id))
        
         
    };

    console.log(anouncementData, 'anouncementData::anouncementData');

    return (
        <View style={{ flex: 1, backgroundColor: colors.white_color }}>
            <MyStatusBar backgroundColor={colors.background_theme2} barStyle='light-content' />
            <MyHeader title={'Announcements'} navigation={navigation} />
            {announcedata()}
        </View>
    );

    function announcedata() {
        const NoDataFound = () => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: SCREEN_HEIGHT * 0.9 }}>
                <Text style={{ color: Colors.black, fontSize: getFontSize(2) }}>No Data found</Text>
            </View>
        );

        const renderItem = ({ item }) => {
            const renderDescription = () => {
                if (!item?.description) return null;

                const isLong = item.description.length > 100;
                const truncatedDescription = isLong ? item?.description?.slice(0, 100) + '...' : item.description;
                
                return (
                    <RenderHTML
                        contentWidth={Dimensions.get('window').width}
                        source={{ html: expandedItems[item?._id] || !isLong ? item?.description : truncatedDescription }}
                        tagsStyles={{
                            p: {
                                color: Colors.black,
                                marginVertical: 4,
                            },
                        }}
                    />
                );
            };
console.log(item,'announce')
            return (
                <View style={{ padding: Sizes.fixPadding, margin: Sizes.fixPadding, borderRadius: 10, backgroundColor: colors.black_color2 }}>
                    {renderDescription()}
                    {item?.description?.length > 100 && (
                        <TouchableOpacity onPress={() => handleReadMoreToggle(item?._id)}>
                            <Text style={{ color: colors.new_color }}>
                                {expandedItems[item?._id] ? 'Read Less' : 'Read More'}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            );
        };

        return (
            <View style={{ flex: 1 }}>
                <FlatList 
                    data={anouncementData} 
                    renderItem={renderItem} 
                    ListEmptyComponent={NoDataFound} 
                    keyExtractor={(item) => item?._id?.toString()} // Ensure each item has a unique key
                />
            </View>
        );
    }
};

const mapStateToProps = state => ({
    anouncementData: state.provider.anouncementData
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementDetails);

const styles = StyleSheet.create({});
