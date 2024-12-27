import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Pooja from './Pooja';
import Spell from './Spell';
import MyHeader from '../../components/MyHeader';
import { connect } from 'react-redux';
import * as AstromallActions from '../../redux/actions/astromallActions'

const Tab = createMaterialTopTabNavigator();

const AstromallCategory = ({ navigation, dispatch, isLoading }) => {
    useEffect(() => {
        dispatch(AstromallActions.getAstromallData())
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <MyHeader title={'Astro Pooja'} navigation={navigation} />
            <Tab.Navigator>
                <Tab.Screen name='pooja' component={Pooja} />
                <Tab.Screen name='spell' component={Spell} />
            </Tab.Navigator>
        </View>
    )
}

const mapStateToProps = state =>({
    isLoading: state.setting.isLoading
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(AstromallCategory)