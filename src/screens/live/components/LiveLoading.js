import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import {Modal} from 'react-native-paper';

const LiveLoading = ({liveLoadingVisible}) => {
  return (
    <Modal visible={!liveLoadingVisible}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'small'} />
      </View>
    </Modal>
  );
};

export default LiveLoading;
