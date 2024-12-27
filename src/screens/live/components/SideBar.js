import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import * as LiveActions from '../../../redux/actions/LiveActions';
import { Colors, Sizes } from '../../../assets/style';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from '../../../config/Constants';

const SideBar = ({ dispatch, totalCallRequsets, isMute }) => {
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {}}
        style={styles.itemContainer}>
        <Image
          source={require('../../../assets/icons/live_send.png')}
          style={{
            width: '60%',
            height: '60%',
            borderRadius: 100,
            resizeMode: 'contain',
          }} 
        />
      </TouchableOpacity> */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => dispatch(LiveActions.onLiveMuteUnmute())}
        style={styles.itemContainer}>
        <Ionicons name={!isMute ? 'mic' : 'mic-off'} color={'white'} size={22} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => dispatch(LiveActions.setWatingListVisible(true))}
        style={styles.itemContainer}>
             <View style={{ position: 'absolute', padding:2, borderRadius: 10, justifyContent: 'center', alignItems: 'center', top: 0, right: 3, backgroundColor: '#D92525' }}><Text style={{ fontSize: 8, color: '#fff'}}>{totalCallRequsets}</Text></View>
        <Image
          source={require('../../../assets/icons/live_phone.png')}
          style={{
            width: '60%',
            height: '60%',
            borderRadius: 100,
            resizeMode: 'contain',
          }}
        />
     
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => ({
  totalCallRequsets: state.live.totalCallRequsets,
  isMute: state.live.isMute
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);

const styles = StyleSheet.create({
  container: {
    flex: 0,
    padding: Sizes.fixPadding * 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    backgroundColor: colors.new_color,
    width: 40,
    height: 40,
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Sizes.fixPadding,
  },
  callPriceContainer: {
    marginTop: Sizes.fixPadding,
  },
  callPriceView: {
    position: 'absolute',
    width: '100%',
    top: 0,
    bottom: 0,
    right: 0,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Sizes.fixPadding * 0.5,
  },
});
