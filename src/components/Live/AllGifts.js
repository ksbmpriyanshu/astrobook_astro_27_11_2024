import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import React,{useEffect} from 'react';
import {Modal} from 'react-native-paper';
import {Colors, Fonts, Sizes} from '../../assets/style';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native';
import {SCREEN_HEIGHT} from '../../config/Screen';
import NetInfo from '@react-native-community/netinfo';

const AllGifts = ({giftsData, allGiftsVisible, updateState}) => {

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
    const conn = state.isConnected; //boolean value whether internet connected or not
    console.log("Connection type", state.type); //gives the connection type
    !conn ? alert("No Internet Connection!",[
      {
        text: 'Ok',
        onPress: () => {
         
          BackHandler.exitApp();
        },
      },
    ],
    { cancelable: false }):null; //alert if internet not connected
    });

    return () => removeNetInfoSubscription();
});
  return (
    <Modal
      visible={allGiftsVisible}
      onDismiss={() => updateState({allGiftsVisible: false})}
      contentContainerStyle={{
        flex: 0,
        paddingVertical: Sizes.fixPadding * 2,
        backgroundColor: Colors.white,
        marginHorizontal: Sizes.fixPadding * 1.5,
        borderRadius: Sizes.fixPadding * 2,
        paddingHorizontal: Sizes.fixPadding,
        elevation: 8,
      }}>
      <Text
        style={{
          ...Fonts.primaryLight18RobotoMedium,
          textAlign: 'center',
          marginBottom: Sizes.fixPadding,
        }}>
        Received Gifts
      </Text>
      {showListInfo()}
    </Modal>
  );

  function showListInfo() {
    const renderItem = ({item, index}) => {
      return (
        <View
          style={[
            styles.row,
            {
              elevation: 5,
              shadowColor: Colors.gray,
              borderWidth: 1,
              borderColor: Colors.grayLight,
              backgroundColor: Colors.white,
              padding: Sizes.fixPadding,
              borderRadius: Sizes.fixPadding,
              marginBottom: Sizes.fixPadding,
            },
          ]}>
          <View
            style={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{uri: item.message?.icon}}
              style={{width: '80%', height: '80%'}}
            />
          </View>
          <Text
            style={{
              ...Fonts.gray14RobotoMedium,
              flex: 1,
              marginLeft: Sizes.fixPadding * 0.5,
            }}>
            Recieved {item.message.title} Gift from {item.fromUser?.userName}
          </Text>
        </View>
      );
    };

    return (
      <View style={{maxHeight: SCREEN_HEIGHT * 0.5}}>
        <FlatList data={giftsData} renderItem={renderItem} />
      </View>
    );
  }
};

export default AllGifts;

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    // flexDirection: 'column',
    // height: '100%'
    alignItems: 'center',
  },
  itemContainer: {
    borderRadius: 1000,
    marginVertical: Sizes.fixPadding,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemCount: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: -2,
    backgroundColor: '#FB4A59',
    borderRadius: 1000,
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 99,
  },
});
