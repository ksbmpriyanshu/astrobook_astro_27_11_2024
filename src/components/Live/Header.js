import {Image, Text, TouchableOpacity, View, Alert} from 'react-native';
import React, {Component} from 'react';
import {SCREEN_WIDTH} from '../../config/Screen';
import {Colors, Fonts, Sizes} from '../../assets/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {img_url, provider_img_url} from '../../config/Constants';

export class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        style={{
          flex: 0,
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: Sizes.fixPadding,
          marginTop: Sizes.fixPadding,
        }}>
        <View
          style={{
            width: SCREEN_WIDTH * 0.14,
            height: SCREEN_WIDTH * 0.14,
            borderRadius: 1000,
            overflow: 'hidden',
            borderWidth: 2,
            borderColor: Colors.white,
            zIndex: 1,
          }}>
          <Image
            source={{
              uri: img_url + 'vendor/' + this.props.providerData?.img_url,
            }}
            style={{width: '100%', height: '100%'}}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: Colors.gray2,
            paddingHorizontal: Sizes.fixPadding,
            paddingVertical: Sizes.fixPadding * 0.5,
            marginLeft: -Sizes.fixPadding * 1.5,
            borderRadius: Sizes.fixPadding,
            elevation: 5,
          }}>
          <View>
            <Text
              style={{
                ...Fonts.white12RobotoMedium,
                marginLeft: Sizes.fixPadding,
              }}>
              {this.props.providerData?.owner_name}
            </Text>
            {this.props?.coHostUserData && (
              <Text
                style={{
                  ...Fonts.white12RobotoMedium,
                  marginLeft: Sizes.fixPadding,
                }}>
                {`with ${this.props?.coHostUserData?.userName}`}
              </Text>
            )}
          </View>

          <View style={{flex: 0, flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="eye" color={Colors.white} size={18} />
            <Text
              style={{
                ...Fonts.white12RobotoMedium,
                marginHorizontal: Sizes.fixPadding * 0.5,
              }}>
              {this.props.totalUser}
            </Text>
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: Sizes.fixPadding * 0.5,
                backgroundColor: '#FB4A59',
              }}>
              <View
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: 5,
                  backgroundColor: Colors.white,
                  marginRight: Sizes.fixPadding * 0.5,
                }}
              />
              <Text style={{...Fonts.white12RobotoMedium}}>Live</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            Alert.alert('Alert', 'Are you sure to end this streaming?', [
              {text: 'cancel', style: 'cancel'},
              {
                text: 'Yes',
                style: 'destructive',
                onPress: () => this.props.endStreaming(),
              },
            ])
          }
          style={{
            marginLeft: Sizes.fixPadding,
            backgroundColor: '#FB4A59',
            paddingHorizontal: Sizes.fixPadding * 1.5,
            borderRadius: 1000,
            paddingVertical: Sizes.fixPadding * 0.2,
            elevation: 5,
          }}>
          <Text style={{...Fonts.white14RobotoMedium, fontSize: 13}}>End</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Header;
