import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  findNodeHandle,
} from 'react-native';
import React, { Component } from 'react';
import ZegoExpressEngine, {
  ZegoTextureView,
} from 'zego-express-engine-reactnative';
import { connect } from 'react-redux';
import * as LiveActions from '../../redux/actions/LiveActions';
import { SCREEN_HEIGHT } from '../../config/Screen';
import MyStatusBar from '../../components/MyStatusbar';
import { Colors, Sizes, Fonts } from '../../assets/style';
import { colors } from '../../config/Constants';

export class LivePreview extends Component {
  constructor(props) {
    super(props);
    this.version = '';
    this.state = {}; 
  }

  componentDidMount() {
    this.props.dispatch(LiveActions.createLiveProfile(this.onInitialize));
  }

  onInitialize = () => {
    try {
      ZegoExpressEngine.instance().startPreview({
        reactTag: findNodeHandle(this.refs.zego_preview_view),
        viewMode: 1,
        backgroundColor: 0,
      });

      // ZegoExpressEngine.instance().enableVideoObjectSegmentation(true, {
      //   backgroundConfig: {
      //     blurLevel: 0.5,
      //     imageURL:
      //       'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781782496557/be-your-own-astrologer-9781782496557_lg.jpg',
      //   },
      //   objectSegmentationType: 1
      // },
      //   undefined
      // );

    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyStatusBar backgroundColor={colors.new_color} />
        <ZegoTextureView
          ref="zego_preview_view"
          style={{ height: SCREEN_HEIGHT }}
        />
        <TouchableOpacity
          style={styles.goLiveContainer}
          activeOpacity={0.8}
          onPress={() => this.props.dispatch(LiveActions.initiateLiveStreaming())}
        >
          <Text style={{ ...Fonts.white14RobotoMedium }}>Go Live</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(LivePreview);

const styles = StyleSheet.create({
  goLiveContainer: {
    position: 'absolute',
    bottom: Sizes.fixPadding * 2,
    alignSelf: 'center',
    backgroundColor: colors.new_color,
    paddingHorizontal: Sizes.fixPadding * 3,
    paddingVertical: Sizes.fixPadding,
    borderRadius: 1000,
    elevation: 5
  }
})
