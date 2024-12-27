import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { Modal } from 'react-native-paper';
import { connect } from 'react-redux';
import * as LiveActions from '../../../redux/actions/LiveActions';
import { Colors, Sizes, Fonts } from '../../../assets/style';
import { SCREEN_HEIGHT } from '../../../config/Screen';
import WaitingTimer from './WaitingTimer';
import { showToastMessage } from '../../../utils/services';
import { colors } from '../../../config/Constants';

const WaitingList = ({ dispatch, waitingListVisible, waitListData, coHostData }) => {
  useEffect(() => { }, [waitingListVisible])
  return (
    <Modal
      visible={waitingListVisible}
      onDismiss={() => dispatch(LiveActions.setWatingListVisible(false))}>
      <View style={styles.container}>
        {titleDescriptionInfo()}
        {waitListData && waitingListInfo()}
      </View>
    </Modal>
  );

  function waitingListInfo() {
    const getCurrentDuration = joingtime => {
      try {
        const date1 = new Date(joingtime).getTime();
        const date2 = new Date().getTime();
        const totalSconds = (date2 - date1) / 1000;
        return parseInt(totalSconds);
      } catch (e) {
        console.log(e);
        return 0;
      }
    };


    const renderItem = ({ item, index }) => {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: Colors.white,
            paddingHorizontal: Sizes.fixPadding * 0.8,
            paddingVertical: Sizes.fixPadding * 0.8,
            borderRadius: 1000,
            marginBottom: Sizes.fixPadding,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.primaryLight,
              }}>
              <Text style={{ ...Fonts.white11InterMedium }}>
                {item?.userName[0]}
              </Text>
            </View>
            <Text
              style={{
                ...Fonts.black11InterMedium,
                fontSize: 13,
                marginLeft: Sizes.fixPadding * 0.5,
                color: Colors.primaryLight,
              }}>
              {item?.userName}
            </Text>
          </View>
          <Text style={{ ...Fonts.gray11RobotoRegular }}>
            {item?.callStarted ? 'On Call' : <>Waiting -{' '}
              <WaitingTimer joingTime={getCurrentDuration(item?.joingTime)} /></>}

          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (item?.callStarted) {
                dispatch(LiveActions.setWatingListVisible(false))
                dispatch(LiveActions.endLiveCall())
              } else {
                dispatch(LiveActions.sendCallRequestToUser(item?.userID))
              }

            }
            }
            style={{
              backgroundColor: item?.callStarted ? Colors.red : !!coHostData ? Colors.gray : Colors.primaryLight,
              paddingHorizontal: Sizes.fixPadding * 1.5,
              paddingVertical: Sizes.fixPadding * 0.5,
              borderRadius: 1000,
            }}>
            <Text style={{ ...Fonts.white12RobotoMedium }}>{item?.callStarted ? 'End' : 'Call'}</Text>
          </TouchableOpacity>
        </View>
      );
    };
    return (
      <View style={{ maxHeight: SCREEN_HEIGHT * 0.3 }}>
        <FlatList
          data={waitListData}
          renderItem={renderItem}
          initialNumToRender={5}
          ListEmptyComponent={() => (
            <View
              style={{
                height: SCREEN_HEIGHT * 0.1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ ...Fonts.white12RobotoRegular }}>
                No one is in waiting list
              </Text>
            </View>
          )}
        />
      </View>
    );
  }

  function titleDescriptionInfo() {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={{ ...Fonts.white11InterMedium, fontSize: 13 }}>
          Waiting List
        </Text>
        <Text
          style={{
            ...Fonts.white11InterMedium,
            textAlign: 'center',
            paddingVertical: Sizes.fixPadding * 0.5,
          }}>
          Customers who missed the call & were marked offline will get priority
          as per the list, if they come online
        </Text>
      </View>
    );
  }
};

const mapStateToProps = state => ({
  waitingListVisible: state.live.waitingListVisible,
  waitListData: state.live.waitListData,
  coHostData: state.live.coHostData
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(WaitingList);

const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: colors.new_color,
    alignSelf: 'center',
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding * 0.6,
    paddingHorizontal: Sizes.fixPadding,
  },
});
