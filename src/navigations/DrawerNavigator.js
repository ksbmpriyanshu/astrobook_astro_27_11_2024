import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
  FlatList,
  ScrollView,
} from 'react-native';
import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { showToastMessage } from '../utils/services';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { connect } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommonActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Share from 'react-native-share';
import { openFacebook, openInstagram, openLinkedIn } from '../components/Methods';
import { useEffect } from 'react';
const { width, height } = Dimensions.get('screen');
import * as ProviderActions from '../redux/actions/ProviderActions'

const Drawer = createDrawerNavigator();
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';

import { unRegisterZegoCall } from '../utils/zegoServices';
import ProviderHome from '../screens/home/ProviderHome';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen';
import { base_url, colors, img_url } from '../config/Constants';
import { Fonts, Sizes } from '../assets/style';
import * as AuthActions from '../redux/actions/AuthActions'
import { navigate } from '../NavigationService';

function CustomDrawerContent(props) {



  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: '#FFF6E4', borderRadius: 20 }}>

      <DrawerContentScrollView {...props.props1}>
        {astrologerData()}
        {astrologerdrawerdata()}
        {logoutfunc()}
      </DrawerContentScrollView>
    </View>
  );
  function logoutfunc() {
    return (
      <View style={{ height: SCREEN_HEIGHT * 0.095, backgroundColor: colors.white_color, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Wait', 'Do you want to logout?', [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Yes',
                onPress: () => props.props.dispatch(AuthActions.onLogout()),
              },
            ]);
          }}
          style={{ padding: 5, fontSize: 15, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: colors.black_color9, fontWeight: "500" }}>
            Log Out
          </Text>
          <AntDesign
            name="logout"
            color={colors.new_color}
            size={20}
            style={{ marginLeft: 5 }}
          />

        </TouchableOpacity>

      </View>
    )
  }
  function astrologerdrawerdata() {
    return (
      <View style={{ height: SCREEN_HEIGHT * 0.80, backgroundColor: colors.white_color, paddingHorizontal: SCREEN_WIDTH * 0.05, paddingVertical: SCREEN_HEIGHT * 0.03 }}>
        <Text style={{ ...Fonts.helveticaBoldBlack }}>Manage Profile</Text>
        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', }}
          onPress={() => navigation.navigate('Walletwithdraw')}
        >


          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: SCREEN_HEIGHT * 0.02 }}>
            <Ionicons
              name="wallet-outline"
              color={colors.black_color8}
              size={20}

            />
            <Text style={{ color: "black", fontWeight: "500" }}>Wallet</Text>

          </View>

          <View style={{ flexDirection: "row", alignItems: "center", }}>
            <AntDesign
              name="right"
              color={colors.black_color9}
              size={15}

            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', }}
          onPress={() => navigation.navigate('walletHistory')}
        >

          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: SCREEN_HEIGHT * 0.02 }}>
            <Image
              style={{
                width: SCREEN_WIDTH * 0.06,
                height: SCREEN_WIDTH * 0.06,
                resizeMode: "contain"
              }}
              source={require("../assets/images/kitaab.png")} />
            <Text style={{ color: "black", fontWeight: "500" }}>History</Text>

          </View>

          <View style={{ flexDirection: "row", alignItems: "center", }}>
            <AntDesign
              name="right"
              color={colors.black_color9}
              size={15}

            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', }}
          onPress={() => navigation.navigate('Gifthistrotyorder')}
        >

          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: SCREEN_HEIGHT * 0.02 }}>

            <Image
              style={{
                width: SCREEN_WIDTH * 0.06,
                height: SCREEN_WIDTH * 0.06,
                resizeMode: "contain"
              }}
              source={require("../assets/images/gift.png")} />
            <Text style={{ color: "black", fontWeight: "500" }}>Gifts</Text>

          </View>

          <View style={{ flexDirection: "row", alignItems: "center", }}>
            <AntDesign
              name="right"
              color={colors.black_color9}
              size={15}

            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', }}
          onPress={() => navigation.navigate('supportdata')}
        >

          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: SCREEN_HEIGHT * 0.02 }}>
            <Image
              style={{
                width: SCREEN_WIDTH * 0.06,
                height: SCREEN_WIDTH * 0.06,
                resizeMode: "contain"
              }}
              source={require("../assets/images/helpcustomer.png")} />
            <Text style={{ color: "black", fontWeight: "500" }}>Support</Text>

          </View>

          <View style={{ flexDirection: "row", alignItems: "center", }}>
            <AntDesign
              name="right"
              color={colors.black_color9}
              size={15}

            />
          </View>
        </TouchableOpacity>





        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', }}
          onPress={() => navigation.navigate('announcementdetails')}
        >

          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: SCREEN_HEIGHT * 0.02 }}>

            <Image
              style={{
                width: SCREEN_WIDTH * 0.06,
                height: SCREEN_WIDTH * 0.06,
                resizeMode: "contain"
              }}
              source={require("../assets/images/anuj.png")} />
            <Text style={{ color: "black", fontWeight: "500" }}>Announcement</Text>

          </View>

          <View style={{ flexDirection: "row", alignItems: "center", }}>
            <AntDesign
              name="right"
              color={colors.black_color9}
              size={15}

            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', }}
          //  onPress={() => showToastMessage({ message: 'Feature Coming Soon' })}
          onPress={() => navigation.navigate('Notifications')}
        >

          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: SCREEN_HEIGHT * 0.02 }}>

            <Image
              style={{
                width: SCREEN_WIDTH * 0.06,
                height: SCREEN_WIDTH * 0.06,
                resizeMode: "contain"
              }}
              source={require("../assets/images/ghanta.png")} />
            <Text style={{ color: "black", fontWeight: "500" }}>Notifications</Text>

          </View>

          <View style={{ flexDirection: "row", alignItems: "center", }}>
            <AntDesign
              name="right"
              color={colors.black_color9}
              size={15}

            />
          </View>
        </TouchableOpacity>











        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', }}
          onPress={() => navigation.navigate('Assignedpuja')}
        >

          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: SCREEN_HEIGHT * 0.02 }}>

            <Image
              style={{
                width: SCREEN_WIDTH * 0.06,
                height: SCREEN_WIDTH * 0.05,
                resizeMode: "contain"
              }}
              source={require("../assets/images/Vector.png")} />
            <Text style={{ color: "black", fontWeight: "500" }}>Assigned Puja</Text>

          </View>

          <View style={{ flexDirection: "row", alignItems: "center", }}>
            <AntDesign
              name="right"
              color={colors.black_color9}
              size={15}

            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', }}
          onPress={() => navigation.navigate('Completepuja')}
        >

          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: SCREEN_HEIGHT * 0.02 }}>

            <Image
              style={{
                width: SCREEN_WIDTH * 0.07,
                height: SCREEN_WIDTH * 0.07,
                resizeMode: "contain"
              }}
              source={require("../assets/images/puja.png")} />
            <Text style={{ color: "black", fontWeight: "500" }}>Complete Puja</Text>

          </View>

          <View style={{ flexDirection: "row", alignItems: "center", }}>
            <AntDesign
              name="right"
              color={colors.black_color9}
              size={15}

            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', }}
          onPress={() => navigation.navigate('language')}
        >

          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: SCREEN_HEIGHT * 0.02 }}>

            <Image
              style={{
                width: SCREEN_WIDTH * 0.07,
                height: SCREEN_WIDTH * 0.07,
                resizeMode: "contain"
              }}
              source={require("../assets/images/puja.png")} />
            <Text style={{ color: "black", fontWeight: "500" }}>Language</Text>

          </View>

          <View style={{ flexDirection: "row", alignItems: "center", }}>
            <AntDesign
              name="right"
              color={colors.black_color9}
              size={15}

            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', }}

          // onPress={() => props.props.dispatch(ProviderActions.getDeleteAccount())}
          onPress={() => {
            Alert.alert('Wait', 'Do you want to Delete Account?', [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Yes',
                onPress: () => props.props.dispatch(ProviderActions.getDeleteAccount()),
              },
            ]);
          }}
        >

          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: SCREEN_HEIGHT * 0.02 }}>

            {/* <Image
              style={{
                width: SCREEN_WIDTH * 0.07,
                height: SCREEN_WIDTH * 0.07,
                resizeMode: "contain"
              }}
              source={require("../assets/images/puja.png")} /> */}
            <AntDesign
              name="delete"
              color={colors.black_color9}
              size={18}

            />
            <Text style={{ color: "black", fontWeight: "500" }}>Delete Account</Text>

          </View>

          <View style={{ flexDirection: "row", alignItems: "center", }}>
            <AntDesign
              name="right"
              color={colors.black_color9}
              size={15}

            />
          </View>
        </TouchableOpacity>




      </View>
    )
  }
  function astrologerData() {
    return (
      <View style={{ height: SCREEN_HEIGHT * 0.15, flexDirection: 'row', alignItems: 'center', marginHorizontal: Sizes.fixPadding, justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', gap: Sizes.fixPadding, alignItems: 'center' }}>
          <View style={{ height: SCREEN_WIDTH * 0.25, width: SCREEN_WIDTH * 0.25, overflow: 'hidden', borderRadius: 100 }} >
            <Image source={{ uri: base_url + props.props?.providerData?.profileImage }}
              style={{ height: SCREEN_WIDTH * 0.25, width: SCREEN_WIDTH * 0.25, resizeMode: 'cover' }}
            />
          </View>
          <View>
            <Text style={{ ...Fonts.helveticaBoldBlack }}>{props.props?.providerData?.astrologerName}</Text>
            <Text style={{ ...Fonts.helveticalightBlack }}>{props.props?.providerData?.astrologerName}</Text>
          </View>
        </View>

        <TouchableOpacity style={{ height: 40, width: 40, borderRadius: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', padding: 4 }}>
          <Image source={require('../assets/images/AstroBookShare.png')} style={{ height: '100%', width: '100%' }} resizeMode='contain' />
        </TouchableOpacity>

      </View>
    )
  }
}

const DrawerNavigator = props => {
  return (
    <Drawer.Navigator
      drawerContent={props1 => (
        <CustomDrawerContent props1={props1} props={props} />
      )}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: width * 0.85,
          alignSelf: 'center',
          elevation: 8,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        },
      }}>
      <Drawer.Screen name="providerHome" component={ProviderHome} />
    </Drawer.Navigator>
  );
};

const mapStateToProps = state => ({
  providerData: state.provider.providerData,
});
const mapDispatchToProps = dispatch => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(DrawerNavigator);

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 8,
  },
  buttonImage: {
    width: width * 0.06,
    height: width * 0.06,
    tintColor: '#fff8f0',
  },
  circle: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 10,
  },
  buttonText: {
    // fontSize: getFontSize(1.5),
    // color: colors.black_color,
    // fontFamily: fonts.medium,
    marginLeft: 10,
  },
  socialLogo: {
    width: width * 0.08,
    height: width * 0.08,
  },
  iconimg: {
    width: width * 0.1,
    height: height * 0.1,
    resizeMode: 'contain',
  },
});
