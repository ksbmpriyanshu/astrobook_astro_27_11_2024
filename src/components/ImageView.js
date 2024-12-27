import {View, Text, Modal, ImageBackground} from 'react-native';
import React from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../config/Screen';
import { Colors } from '../assets/style';

const ImageView = ({updateState, image, imageVisible}) => {
  return (
    <Modal
      visible={imageVisible}
      onRequestClose={() => updateState({imageVisible: false})}>
      <ImageBackground
        source={{uri: image}}
        style={{
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          backgroundColor: Colors.black,
        }}
        resizeMode="contain"></ImageBackground>
    </Modal>
  );
};

export default ImageView;
