import {Text, View, Image, TouchableOpacity, Alert} from 'react-native';
import React, {Component} from 'react';
import {Input} from '@rneui/themed';
import {Colors, Fonts, Sizes} from '../../assets/style';
import AnimatedHeart from './AnimatedHeart';

export class Footer extends Component {
  constructor(props) {
    super(props);
    this.version = '';
    this.state = {
      message: '',
    };
  }

  render() {
    return (
      <View
        style={{
          flex: 0,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: Sizes.fixPadding * 2,
          paddingVertical: Sizes.fixPadding,
          backgroundColor: '#7D7973',
        }}>
        <Input
          value={this.state.message}
          placeholder="Type message here..."
          placeholderTextColor={Colors.white}
          onChangeText={text => this.setState({message: text})}
          containerStyle={{
            height: 45,
            width: '100%',
            backgroundColor: Colors.black + '70',
            borderRadius: 1000,
          }}
          inputContainerStyle={{borderBottomWidth: 0}}
          inputStyle={{...Fonts.white16RobotoMedium}}
          rightIcon={
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                if (this.state.message.trim() !== '') { // Check if message is not empty after trimming whitespace
                  this.setState({ message: '' });
                  this.props.sendMessage(this.state.message);
                } else {
                  Alert.alert('Alert', 'Please Type Message Here...', [
                    
                    {
                      text: 'Ok',
                      style: 'destructive',
                      onPress: () => {
                        console.log('asdfa');
                      },
                    },
                  ]);
                }
              }}>
              <Image
                source={require('../../assets/icon/send.png')}
                style={{width: 25, height: 25}}
              />
            </TouchableOpacity>
          }
        />

        <View style={{flex: 1}}>
          {/* <TouchableOpacity
            style={{
              alignSelf: 'center',
              backgroundColor: Colors.black + '60',
              padding: Sizes.fixPadding,
              borderRadius: 1000,
            }}>
            <Image
              source={require('../../assets/icon/video-camera.png')}
              style={{width: 18, height: 18}}
            />
          </TouchableOpacity> */}
          <AnimatedHeart
            addHeart={this.props.addHeart}
            hearts={this.props.hearts}
            removeHeart={this.props.removeHeart}
          />
        </View>
      </View>
    );
  }
}

export default Footer;
