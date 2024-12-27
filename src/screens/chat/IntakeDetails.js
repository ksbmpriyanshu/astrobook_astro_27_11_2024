import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as ChatActions from '../../redux/actions/ChatActions';
import { Colors, Sizes, Fonts } from '../../assets/style';
import MyHeader from '../../components/MyHeader';
import moment from 'moment';
import * as KundliActions from '../../redux/actions/KundliActions'
import { colors } from '../../config/Constants';

const IntakeDetails = ({ profileData, dispatch, navigation }) => {
    console.log(profileData)
    useEffect(() => {
        dispatch(ChatActions.getIntakeDetails());
    }, [dispatch]);
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyHeader title={'Intake Details'} navigation={navigation} />
            <FlatList ListHeaderComponent={<>{profileData && detailsInfo()}</>} />
        </View>
    );

    function detailsInfo() {
        return (
            <View style={styles.container}>

                <View style={styles.itemContainer}>
                    <View style={styles.col1}>
                        <Text style={{ ...Fonts.black16RobotoMedium }}>Name</Text>
                    </View>
                    <View style={styles.col2}>
                        <Text style={{ ...Fonts.black16RobotoRegular }}>
                            {profileData?.firstName}

                            {profileData?.lastName}
                        </Text>
                    </View>
                </View>
                <View style={styles.itemContainer}>
                    <View style={styles.col1}>
                        <Text style={{ ...Fonts.black16RobotoMedium }}>Gender</Text>
                    </View>
                    <View style={styles.col2}>
                        <Text style={{ ...Fonts.black16RobotoRegular, textTransform: 'capitalize' }}>
                            {profileData?.gender}
                        </Text>
                    </View>
                </View>
                <View style={styles.itemContainer}>
                    <View style={styles.col1}>
                        <Text style={{ ...Fonts.black16RobotoMedium }}>Date Of Birth</Text>
                    </View>
                    <View style={styles.col2}>
                        <Text style={{ ...Fonts.black16RobotoRegular }}>
                            {moment(profileData?.dateOfBirth).format('DD MMM YYYY')}
                        </Text>
                    </View>
                </View>
                <View style={styles.itemContainer}>
                    <View style={styles.col1}>
                        <Text style={{ ...Fonts.black16RobotoMedium }}>Time Of Birth</Text>
                    </View>
                    <View style={styles.col2}>
                        <Text style={{ ...Fonts.black16RobotoRegular }}>
                            {moment(profileData?.timeOfBirth).format('hh:mm A')}
                        </Text>
                    </View>
                </View>
                <View style={styles.itemContainer}>
                    <View style={styles.col1}>
                        <Text style={{ ...Fonts.black16RobotoMedium }}>Birth Place</Text>
                    </View>
                    <View style={styles.col2}>
                        <Text style={{ ...Fonts.black16RobotoRegular }}>
                            {profileData?.placeOfBirth}
                        </Text>
                    </View>
                </View>
                <View style={styles.itemContainer}>
                    <View style={styles.col1}>
                        <Text style={{ ...Fonts.black16RobotoMedium }}>Occupation</Text>
                    </View>
                    <View style={styles.col2}>
                        <Text style={{ ...Fonts.black16RobotoRegular }}>
                            {profileData?.topic_of_concern}
                        </Text>
                    </View>
                </View>
                <View style={styles.itemContainer}>
                    <View style={styles.col1}>
                        <Text style={{ ...Fonts.black16RobotoMedium }}>Marital Status</Text>
                    </View>
                    <View style={styles.col2}>
                        <Text style={{ ...Fonts.black16RobotoRegular }}>
                            {profileData?.maritalStatus}
                        </Text>
                    </View>
                </View>
                {profileData?.description && <View style={styles.itemContainer}>
                    <View style={styles.col1}>
                        <Text style={{ ...Fonts.black16RobotoMedium }}>Description</Text>
                    </View>
                    <View style={styles.col2}>
                        <Text style={{ ...Fonts.black16RobotoRegular }}>
                            {profileData?.description}
                        </Text>
                    </View>
                </View>}

                <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('showKundli')} style={{ backgroundColor: colors.new_color, alignSelf: 'center', width: '40%', paddingVertical: Sizes.fixPadding * 0.8, borderRadius: 1000, marginTop: Sizes.fixPadding * 2 }}>
                    <Text style={{ ...Fonts.white16RobotoMedium, textAlign: 'center' }}>View Kundli</Text>
                </TouchableOpacity>

            </View>
        );
    }
};

const mapStateToProps = state => ({
    profileData: state.chat.profileData,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(IntakeDetails);

const styles = StyleSheet.create({
    container: { margin: Sizes.fixPadding * 3 },
    itemContainer: { flexDirection: 'row', marginBottom: Sizes.fixPadding },
    col1: { flex: 0.4 },
    col2: { flex: 0.6 },
});
