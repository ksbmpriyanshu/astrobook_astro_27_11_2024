import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Modal} from 'react-native-paper';
import {connect} from 'react-redux';
import * as LiveActions from '../../../redux/actions/LiveActions';
import {Colors, Sizes, Fonts} from '../../../assets/style';

const ExitAlert = ({dispatch, exitAlertVisible}) => {
  return (
    <Modal
      visible={exitAlertVisible}
      onDismiss={() => dispatch(LiveActions.setExitAlertVisible(false))}>
      <View style={styles.container}>
        <Text style={{...Fonts.primaryLight15RobotoMedium, fontSize: 18}}>
          Alert!
        </Text>
        <Text
          style={{...Fonts.black14RobotoRegular, marginTop: Sizes.fixPadding}}>
            Do you want to end this Live  ?
        </Text>
        <View style={styles.buttonContianer}>
          <TouchableOpacity
            hitSlop={{bottom: 5, top: 5}}
            activeOpacity={0.8}
            onPress={()=>dispatch(LiveActions.setExitAlertVisible(false))}
            style={styles.buttons}>
            <Text style={{...Fonts.black14RobotoRegular}}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            hitSlop={{bottom: 5, top: 5}}
            activeOpacity={0.8}
            onPress={()=>dispatch(LiveActions.endLiveCall())}
            style={styles.buttons}>
            <Text style={{...Fonts.primaryLight14RobotoRegular}}>Yes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const mapStateToProps = state => ({
  exitAlertVisible: state.live.exitAlertVisible,
});

const mapDispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, mapDispatchToProps)(ExitAlert);

const styles = StyleSheet.create({
  container: {
    height: 150,
    backgroundColor: Colors.white,
    zIndex: 1,
    width: '90%',
    alignSelf: 'center',
    borderRadius: Sizes.fixPadding,
    padding: Sizes.fixPadding * 2,
  },
  buttonContianer: {
    marginTop: Sizes.fixPadding * 2,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttons: {
    marginHorizontal: Sizes.fixPadding,
  },
});
