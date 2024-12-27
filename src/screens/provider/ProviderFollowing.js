import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import {
  api_getfollowinglist,
  api_url,
  base_url,
  colors,
  fonts,
  get_following_list_astro,
  getFontSize,
  img_url,
  provider_img_url,
} from '../../config/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useState} from 'react';
import MyLoader from '../../components/MyLoader';
import axios from 'axios';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
const {width, height} = Dimensions.get('screen');
import * as ProviderActions from '../../redux/actions/ProviderActions'
import { Colors } from '../../assets/style';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';

const ProviderFollowing = ({route, navigation, followerListData, dispatch}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {t} = useTranslation();
  console.log(followerListData,'LISTDATA')
  useEffect(() => {
    dispatch(ProviderActions.getFollowers())
    navigation.setOptions({
      title:" Followers",
      headerTintColor: colors.background_theme1,
      headerShown: true,
      headerStyle: {
        backgroundColor: colors.new_color,
      },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{flex: 0}}>
          <AntDesign
            name="arrowleft"
            color={colors.background_theme1}
            size={25}
          />
        </TouchableOpacity>
      ),
      // headerRight: () => (
      //   <TouchableOpacity disabled>
      //     <FontAwesome5
      //       name="user-friends"
      //       color={colors.background_theme1}
      //       size={22}
      //     />
      //   </TouchableOpacity>
      // ),
    });
  }, [dispatch]);


  const renderItem = ({item, index}) => {
    console.log(item,'all daa ')
    return (
      <View
        style={{
          flex: 0,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.background_theme1,
          borderRadius: 5,
          paddingHorizontal: 15,
          paddingVertical: 10,
          marginBottom: 15,
          shadowColor: colors.black_color2,
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.3,
          shadowRadius: 5,
        }}>
        <Image
          source={{uri: img_url + item?.image}}
          style={{
            width: width * 0.12,
            height: width * 0.12,
            borderRadius: 10000,
          }}
        />
        <Text
          style={{
            fontSize: 16,
            color: colors.black_color8,
            fontFamily: fonts.semi_bold,
            marginLeft: 10,
          }}>
          {item.customerName}
        </Text>
      </View>
    );
  };
  const NoDataFound = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',height:SCREEN_HEIGHT * 0.9 ,alignSelf:"center" }}>
      <Text style={{color:colors.black_color,fontSize:20 ,fontWeight:"400"}}>No followers</Text>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: colors.black_color1}}>
      <MyLoader isVisible={isLoading} />
      {/* {followerListData && ( */}
        <FlatList
          data={followerListData}
          renderItem={renderItem}
          contentContainerStyle={{padding: 15}}
          ListEmptyComponent={NoDataFound}
        />
      
      {/* ) */}
      {/* } */}
     
    </View>
  );
  
};

const mapStateToProps = state => ({
  providerData: state.provider.providerData,
  followerListData: state.provider.followerListData,
});

const mapDispatchToProps = dispatch =>({dispatch})

export default connect(mapStateToProps, mapDispatchToProps)(ProviderFollowing);
