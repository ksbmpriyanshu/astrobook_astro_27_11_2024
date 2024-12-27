import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Colors, Sizes, Fonts } from '../../assets/style';
import MyStatusBar from '../../components/MyStatusbar';
import LinearGradient from 'react-native-linear-gradient';
import { Input } from '@rneui/themed';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import MyHeader from '../../components/MyHeader';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as AstromallActions from '../../redux/actions/astromallActions'
import { connect } from 'react-redux';
import { showToastMessage } from '../../utils/services';
import { colors } from '../../config/Constants';

const RegisterPooja = ({ navigation, dispatch, route }) => {
    const [state, setState] = useState({
        date: null,
        time: null,
        price: '',
    })

    const updateState = data => {
        setState(prevState => {
            const newData = { ...prevState, ...data }
            return newData
        })
    }

    const { date, time, price } = state;

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyColor }}>
            <MyStatusBar
                backgroundColor={Colors.primaryDark}
                barStyle={'light-content'}
            />
            <View style={{ flex: 1 }}>
                <FlatList
                    ListHeaderComponent={
                        <>
                            {header()}
                            
                            {/* {dateTimeInfo()} 
                            {/* {priceInfo()} */}
                            {/* {imageUploadInfo()} */}
                        </>
                    }
                />
            </View>
            {continueButtonInfo()}
        </View>
    )

    function continueButtonInfo() {
        const priceRegex = /^\d+(\.\d{1,2})?$/
        const onRegister = () => {
            if (!date) {
                showToastMessage({ message: 'Please select a date' })
                return
            } else if (!time) {
                showToastMessage({ message: 'Please select a time' })
                return
            } else if (!price) {
                showToastMessage({ message: 'Please enter a price' })
                return
            }else if(!priceRegex.test(price)){
                showToastMessage({ message: 'Please enter a valid price' })
                return
            }else if(price < 500){
                showToastMessage({ message: 'Minimum amount is Rs. 500' })
                return
            }else {
                const payload = {
                    date,
                    time,
                    price,
                    poojaId: route.params?.poojaId
                }
                dispatch(AstromallActions.registerPooja(payload))
            }
        }
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onRegister}
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

    function priceInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2 }}>
                <View
                    style={[
                        styles.row,
                        { justifyContent: 'space-between', marginTop: Sizes.fixPadding * 2 },
                    ]}>
                    <Text style={{ ...Fonts.black16RobotoRegular }}>Price of Pooja</Text>
                    <Input
                        placeholder="0"
                        placeholderTextColor={Colors.gray}
                        keyboardType="number-pad"
                        onChangeText={text => updateState({ price: text })}
                        rightIcon={<Text style={{ ...Fonts.gray16RobotoMedium }}>/-</Text>}
                        inputStyle={{ ...Fonts.gray14RobotoMedium, textAlign: 'right' }}
                        containerStyle={{ margin: 0, height: 45 }}
                        inputContainerStyle={styles.input}
                        leftIcon={
                            <View style={styles.row}>
                                <Text style={{ ...Fonts.gray18RobotoRegular }}>₹</Text>
                                <View
                                    style={{
                                        width: 1,
                                        height: 20,
                                        backgroundColor: Colors.gray,
                                        marginHorizontal: Sizes.fixPadding * 2,
                                    }}
                                />
                            </View>
                        }
                    />
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[
                            styles.dataTimeContainer,
                            { width: '60%', justifyContent: 'flex-start' },
                        ]}>
                        <Text style={{ ...Fonts.gray18RobotoRegular }}>₹</Text>
                        <View
                            style={{
                                width: 1,
                                height: 20,
                                backgroundColor: Colors.gray,
                                marginHorizontal: Sizes.fixPadding * 2,
                            }}
                        />
                        <Text style={{ ...Fonts.gray16RobotoMedium }}>21199/-</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    function dateTimeInfo() {
        const open_date_picker = () => {
            DateTimePickerAndroid.open({
                value: date == null ? new Date() : date,
                onChange: (event, date) => {
                    if (event.type == 'set') {
                        updateState({ date: date });
                    }
                },
                minimumDate: new Date(),
                mode: 'date',
                display: 'calendar',
            });
        };

        const open_time_picker = () => {
            DateTimePickerAndroid.open({
                value: time == null ? new Date() : time,
                onChange: (event, time) => {
                    if (event.type == 'set') {
                        updateState({ time: time });
                    }
                },
                mode: 'time',
                display: 'clock',
            });
        };

        return (
            <View style={{ margin: Sizes.fixPadding * 2 }}>
                <Text style={{ ...Fonts.black16RobotoRegular }}>
                    Schedule a Date and time
                </Text>
                <View
                    style={[
                        styles.row,
                        { justifyContent: 'space-between', marginTop: Sizes.fixPadding * 2 },
                    ]}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => open_date_picker()}
                        style={styles.dataTimeContainer}>
                        <Text style={{ ...Fonts.gray14RobotoMedium }}>
                            {date == null ? 'Date' : moment(date).format('Do MMM YYYY')}
                        </Text>
                        <Ionicons name="chevron-down" color={Colors.gray} size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => open_time_picker()}
                        style={styles.dataTimeContainer}>
                        <Text style={{ ...Fonts.gray14RobotoMedium }}>
                            {time == null ? 'Time' : moment(time).format('hh:mm A')}
                        </Text>
                        <Ionicons name="chevron-down" color={Colors.gray} size={20} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    function header() {
        return( <MyHeader navigation={navigation} title={'Schedule a Pooja'} />
        
        )
    }
}

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(null, mapDispatchToProps)(RegisterPooja)

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
    dataTimeContainer: {
        width: '45%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: Sizes.fixPadding,
        backgroundColor: Colors.gray4,
        borderRadius: Sizes.fixPadding,
        elevation: 5,
        shadowColor: Colors.blackLight,
    },
    input: {
        borderBottomWidth: 0,
        backgroundColor: 'red',
        height: '100%',
        width: '60%',
        backgroundColor: Colors.gray4,
        borderRadius: Sizes.fixPadding,
        elevation: 5,
        shadowColor: Colors.blackLight,
        paddingHorizontal: Sizes.fixPadding,
    },
});