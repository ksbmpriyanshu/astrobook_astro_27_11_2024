import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {Modal} from 'react-native-paper';
import {Colors, Fonts, Sizes} from '../../assets/style';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native';
import {SCREEN_HEIGHT} from '../../config/Screen';

const CallRequests = ({
  callRequestVisible,
  updateState,
  vedioRequests,
  acceptHost,
  coHostUserData,
}) => {
  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return (
      String(minutes).padStart(2, '0') +
      ' min ' +
      String(remainingSeconds).padStart(2, '0') +
      ' s'
    );
  };

  return (
    <Modal
      visible={callRequestVisible}
      onDismiss={() => updateState({callRequestVisible: false})}
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
        }}>
        Call Request
      </Text>
      <Text
        style={{
          ...Fonts.gray12RobotoMedium,
          textAlign: 'center',
          marginBottom: Sizes.fixPadding,
        }}>
        Customers waiting for your response, shown on the top list could be in
        priority list
      </Text>
      {showListInfo()}
    </Modal>
  );

  function showListInfo() {
    const renderItem = ({item, index}) => {
      // console.log('dsafsdfsdf',item);
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
          <LinearGradient
            colors={[Colors.primaryLight, Colors.primaryDark]}
            style={[
              {
                width: 30,
                height: 30,
                borderRadius: 1000,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <Text
              style={{
                ...Fonts.white14RobotoMedium,
              }}>
              {item.userName[0]}
            </Text>
          </LinearGradient>
          <View style={{marginLeft: Sizes.fixPadding}}>
            <Text
              style={{
                ...Fonts.gray12RobotoMedium,
              }}>
              {item.userName}
            </Text>
            <Text
              style={{
                ...Fonts.primaryLight14RobotoMedium,
                fontSize: 11,
              }}>
              <Text style={{color: Colors.greenLight}}>
                on Video call
              </Text>{' '}
              - {formatTime(parseFloat(parseFloat(item?.time)).toFixed(0))}
            </Text>
          </View>

          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={coHostUserData?.userID == item?.userID}
              onPress={() => acceptHost(item.userID, item?.type)}>
              <LinearGradient
                colors={
                  coHostUserData?.userID == item?.userID
                    ? [Colors.gray, Colors.gray]
                    : [Colors.primaryLight, Colors.primaryDark]
                }
                style={[
                  {
                    width: 70,
                    paddingVertical: Sizes.fixPadding * 0.5,
                    borderRadius: 1000,
                  },
                ]}>
                <Text
                  style={{
                    ...Fonts.white14RobotoMedium,
                    textAlign: 'center',
                  }}>
                  Call
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      );
    };

    return (
      <View style={{maxHeight: SCREEN_HEIGHT * 0.5}}>
        <FlatList data={vedioRequests.reverse()} renderItem={renderItem} />
      </View>
    );
  }
};

export default CallRequests;

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
