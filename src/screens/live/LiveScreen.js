import { Alert, AppState, Text, View, findNodeHandle } from 'react-native';
import React, { Component } from 'react';
import MyStatusBar from '../../components/MyStatusbar';
import { Colors } from '../../assets/style';
import { connect } from 'react-redux';
import * as LiveActions from '../../redux/actions/LiveActions';
import { SCREEN_HEIGHT } from '../../config/Screen';
import ZegoExpressEngine, {
  ZegoTextureView,
} from 'zego-express-engine-reactnative';
import LinearGradient from 'react-native-linear-gradient';
import Header from './components/Header';
import Gift from './components/Gift';
import Comments from './components/Comments';
import Footer from './components/Footer';
import AnimatedHeart from './components/AnimatedHeart';
import Gifts from './components/Gifts';
import ExitAlert from './components/ExitAlert';
import WaitingList from './components/WaitingList';
import SideBar from './components/SideBar';
import LiveLoading from './components/LiveLoading';
import KeepAwake from 'react-native-keep-awake';
import { BackHandler } from 'react-native';
import { goBack } from '../../navigations/NavigationServices';

export class LiveScreen extends Component {
  constructor(props) {
    super(props);
    this.version = '';
    this.state = {
      liveID: '9999',
      appState: AppState.currentState,
    };
  }

  componentDidMount() {
    const payload = {
      startPreveiw: this.startPreview,
      dispatch: this.props.dispatch,
    };
    this.props.dispatch(LiveActions.addLiveListener(payload));
    this.appStateListener = AppState.addEventListener('change', this.handleAppStateChange);
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentDidUpdate() {
    if (this.props.layout == 'LIVE') {
      this.startPreview();
    } else if (this.props.layout == 'LIVE_CALL') {
      this.startCall();
    }
  }

  componentWillUnmount() {
    this.props.dispatch(LiveActions.resetLiveState());
    this.backHandler.remove();
    if (ZegoExpressEngine.instance()) {
      console.log('[LZP] destroyEngine');
      ZegoExpressEngine.destroyEngine();
    }

    if (this.appStateListener) {
      this.appStateListener.remove();
    }

  }

  handleBackPress = () => {
    // Handle the back button press
    Alert.alert(
      'Are you sure!',
      'You want to end this session?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => goBack() }
      ],
      { cancelable: false }
    );
    return true; // Return true to prevent the default back button behavior
  }

  handleAppStateChange = (nextAppState) => {
    const { dispatch } = this.props;
    const { appState } = this.state;

    if (appState === 'active' && nextAppState.match(/inactive|background/)) {
      console.log('App has gone to the background!');
      dispatch(LiveActions.onAppStateChangeInLive(true));
    } else if (appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!');
      dispatch(LiveActions.onAppStateChangeInLive(false));
    }
    this.setState({ appState: nextAppState });
  };

  startPreview = () => {
    ZegoExpressEngine.instance().startPreview({
      reactTag: findNodeHandle(this.refs.zego_preview_view),
      viewMode: 1,
      backgroundColor: 0,
    });
  };

  startCall = () => {
    console.log('stream id', this.props.streamID)
    ZegoExpressEngine.instance().startPlayingStream(this.props.streamID, {
      reactTag: findNodeHandle(this.refs.zego_play_view),
      viewMode: 1,
      backgroundColor: 0,
    });

    ZegoExpressEngine.instance().startPreview({
      reactTag: findNodeHandle(this.refs.zego_preview_view),
      viewMode: 1,
      backgroundColor: 0,
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyStatusBar
          backgroundColor={Colors.primaryLight}
          barStyle={'light-content'}
        />
        {this.props.layout === 'LIVE'
          ? fullScreenInfo()
          : vedioCallScreenInfo()}
        {componentsInfo()}
        <AnimatedHeart />
        <ExitAlert />
        <WaitingList />
        <LiveLoading liveLoadingVisible={this.props.isLiveStart} />
        <KeepAwake />
      </View>
    );

    function componentsInfo() {
      return (
        <LinearGradient
          colors={['rgba(255, 255, 255, 0)', 'rgba(0, 0, 0, 0.5)']}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            // zIndex: 1,
          }}>
          <Header />
          {/* <Gift /> */}
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{ flex: 0.7 }}>
              <Gifts />
              <Comments />
            </View>
            <SideBar />
          </View>
          <Footer />
        </LinearGradient>
      );
    }

    function fullScreenInfo() {
      return (
        <View style={{ height: SCREEN_HEIGHT }}>
          <ZegoTextureView
            ref="zego_preview_view"
            style={{ height: SCREEN_HEIGHT }}
          />
        </View>
      );
    }

    function vedioCallScreenInfo() {
      return (
        <View style={{ height: SCREEN_HEIGHT }}>
          <ZegoTextureView
            ref={`zego_play_view`}
            style={{ height: SCREEN_HEIGHT / 2 }}
          />
          <ZegoTextureView
            ref={`zego_preview_view`}
            style={{ height: SCREEN_HEIGHT / 2 }}
          />
        </View>
      );
    }
  }
}

const mapStateToProps = state => ({
  isLiveStart: state.live.isLiveStart,
  layout: state.live.layout,
  streamID: state.live.streamID,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(LiveScreen);
