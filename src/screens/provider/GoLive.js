import {
    View,
    StatusBar,
    findNodeHandle,
    PermissionsAndroid,
    Platform,
    Modal,
    TouchableOpacity,
    Text,
    BackHandler,
    Alert,
    KeyboardAvoidingView
  } from 'react-native';
  import React, {Component} from 'react';
  import ZegoExpressEngine, {
    ZegoTextureView,
    ZegoMixerTask,
    ZegoAudioConfig,
    ZegoAudioConfigPreset,
    ZegoMixerInputContentType,
    ZegoScenario,
  } from 'zego-express-engine-reactnative';
  import MyStatusBar from '../../components/MyStatusbar';
  import Header from '../../components/Live/Header';
  import Timer from '../../components/Live/Timer';
  import RecievedGifts from '../../components/Live/RecievedGifts';
  import Chats from '../../components/Live/Chats';
  import GiftCall from '../../components/Live/GiftCall';
  import Footer from '../../components/Live/Footer';
  import CallRequests from '../../components/Live/CallRequests';
  import {
    api_url,
    change_status,
    deductWallet_live_astro,
    exit_live,
    exit_live_astro,
    go_live,
    live_streaming_app_id,
    live_streaming_app_sign,
  } from '../../config/Constants';
  import {Sizes, Colors, Fonts} from '../../assets/style';
  import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../config/Screen';
  import AllGifts from '../../components/Live/AllGifts';
  import LinearGradient from 'react-native-linear-gradient';
  import {connect} from 'react-redux';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import axios from 'axios';
  import database from '@react-native-firebase/database';
  import { ApiRequests } from '../../config/requests';
  import moment from 'moment';
  import NewGift from '../../components/Live/NewGift';
  import KeepAwake from 'react-native-keep-awake';
  
  let heartCount = 1;
  let giftInterval;
  
  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  function getRandomColor() {
    // Adjusted RGB values for pinkish tones
    return `rgb(${getRandomNumber(220, 255)}, ${getRandomNumber(
      50,
      100,
    )}, ${getRandomNumber(50, 150)})`;
  } 
  
  const granted =
    Platform.OS == 'android'
      ? PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.RECORD_AUDIO,
        )
      : undefined;
  
  export class GoLive extends Component {
    constructor(props) {
      super(props);
      this.version = '';
      this.state = {
        liveID: this.props.route.params.liveID,
        userID: this.props.route.params.userID,
        userName: this.props.route.params.userName,
        comments: [],
        giftsData: [],
        isAudioHost: false,
        coHostUserData: null,
        viewMode: 0,
        vedioRequests: [],
        waitListData: [],
        orginalWaitListData: null,
        callRequestVisible: false,
        allGiftsVisible: false,
        liveStartVisible: true,
        vedioStartedTime: null,
        totalUser: 0,
        isLoading: false,
        isTimerStart: false,
        timer: 30,
        hearts: [],
        newGiftVisible: false,
        newGiftData: null
      };
  
      this.timer = null;
      this.startLive = this.startLive.bind(this);
      // this.startLiveGo = this.go_live_start(this);
    }
  
    componentDidMount() {
      this.go_live_start();
      let profile = {
        appID: live_streaming_app_id,
        appSign: live_streaming_app_sign,
        scenario: ZegoScenario.General,
      };
  
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  
      ZegoExpressEngine.createEngineWithProfile(profile).then(engine => {
        // 动态获取设备权限（android）
        if (Platform.OS == 'android') {
          granted
            .then(data => {
              console.log(
                'Do you already have camera and microphone permissions?: ' + data,
              );
              if (!data) {
                const permissions = [
                  PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                  PermissionsAndroid.PERMISSIONS.CAMERA,
                ];
                //返回得是对象类型
                PermissionsAndroid.requestMultiple(permissions);
              }
            })
            .catch(err => {
              console.log('check err: ' + err.toString());
            });
        }
  
        engine.getVersion().then(ver => {
          console.log('Express SDK Version: ' + ver);
        });
  
        // if (this.state.liveStartVisible) {
        //   ZegoExpressEngine.instance().startPreview({
        //     reactTag: findNodeHandle(this.refs.zego_preview_view_start),
        //     viewMode: 0,
        //     backgroundColor: 0,
        //   });
        // }
  
        // this.onClickA();
      });
    }
  
    componentDidUpdate(prevProps, prevState) {
         
      if (this.state.coHostUserData) {
        ZegoExpressEngine.instance().startPreview({
          reactTag: findNodeHandle(this.refs.zego_preview_view),
          viewMode: 1,
          backgroundColor: 0,
        });
  
        if (this.state.coHostUserData?.type == 'audio') {
          ZegoExpressEngine.instance().startPlayingStream(
            this.state.coHostUserData?.streamID,
            // {
            //   reactTag: findNodeHandle(this.refs.zego_play_view),
            //   viewMode: 1,
            //   backgroundColor: 0,
            // },
          );
        } else {
          ZegoExpressEngine.instance().startPlayingStream(
            this.state.coHostUserData?.streamID,
            {
              reactTag: findNodeHandle(this.refs.zego_play_view),
              viewMode: 1,
              backgroundColor: 0,
            },
          );
        }
      } else {
        ZegoExpressEngine.instance().startPreview({
          reactTag: findNodeHandle(this.refs.zego_preview_view),
          viewMode: 0,
          backgroundColor: 0,
        });
      }
    }
  
    componentWillUnmount() {
      database().ref(`WaitList/${this.state.astroData?.astro_id}`).off();
      database().ref(`LiveStreaming/${this.state.liveID}`).remove();
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
      if (ZegoExpressEngine.instance()) {
        console.log('[LZP] destroyEngine');
        ZegoExpressEngine.instance().logoutRoom();
        ZegoExpressEngine.destroyEngine();
      }
    }

  
    startLive() {
      ZegoExpressEngine.instance().on(
        'roomOnlineUserCountUpdate',
        (roomID, data) => {
          console.log('ddd==================',data);
          this.updateState({totalUser: data});
        },
      );
  
      ZegoExpressEngine.instance().on(
        'roomStateUpdate',
        (roomID, state, errorCode, extendedData) => {
          console.log(
            'JS onRoomStateUpdate: ' +
              state +
              ' roomID: ' +
              roomID +
              ' err: ' +
              errorCode +
              ' extendData: ' +
              extendedData,
          );
        },
      );
  
      ZegoExpressEngine.instance().on(
        'IMRecvBroadcastMessage',
        (roomID, messageList) => {
          console.log('mess',messageList);
          let new_comments = this.state.comments;
          new_comments.push({
            message: messageList[0].message,
            sendTime: messageList[0].sendTime,
            message_id: messageList[0].messageID,
            fromUser: {
              userID: messageList[0].fromUser.userID,
              userName: messageList[0].fromUser.userName,
            },
          });
          this.setState({comments: new_comments});
        },
      );
  
      ZegoExpressEngine.instance().on(
        'IMRecvBarrageMessage',
        (roomID, messageList) => {
          let new_gifts = this.state.giftsData;
          new_gifts.push({
            message: JSON.parse(messageList[0].message),
            messageID: messageList[0].messageID,
            sendTime: messageList[0].sendTime,
            fromUser: {
              userID: messageList[0].fromUser.userID,
              userName: messageList[0].fromUser.userName,
            },
          });
          clearTimeout(giftInterval);
          this.updateState({
            newGiftVisible: true,
            newGiftData: {imageUrl: JSON.parse(messageList[0].message)?.icon},
          });
          giftInterval = setTimeout(() => {
            this.updateState({newGiftVisible: false, newGiftData: null});
          }, 3000);
          this.updateState({giftsData: new_gifts});
        },
      );
  
      ZegoExpressEngine.instance().on(
        'IMRecvCustomCommand',
        (roomID, fromUser, command) => {
          try {
            let my_command = JSON.parse(command);
            if (my_command?.command == 'start_co_host') {
              this.updateState({
                isTimerStart: true,
                vedioStartedTime: new Date().getTime(),
                timer: my_command?.time,
                coHostUserData: {
                  ...fromUser,
                  streamID: my_command?.streamID,
                  type: my_command?.type,
                },
              });
            } else if (my_command?.command == 'stop_host') {
              ZegoExpressEngine.instance().stopPlayingStream('333');
              this.updateState({
                coHostUserData: null,
                isTimerStart: false,
              });
            } else if (my_command?.command == 'heart') {
              this.addHeart();
            }
          } catch (e) {
            console.log(e);
          }
        },
      );
  
      ZegoExpressEngine.instance().on(
        'publisherStateUpdate',
        (streamID, state, errorCode, extendedData) => {
          console.log(
            'JS onPublisherStateUpdate: ' +
              state +
              ' streamID: ' +
              streamID +
              ' err: ' +
              errorCode +
              ' extendData: ' +
              extendedData,
          );
        },
      );
  
      ZegoExpressEngine.instance().on(
        'playerStateUpdate',
        (streamID, state, errorCode, extendedData) => {
          console.log(
            'JS onPlayerStateUpdate: ' +
              state +
              ' streamID: ' +
              streamID +
              ' err: ' +
              errorCode +
              ' extendData: ' +
              extendedData,
          );
        },
      );
  
      ZegoExpressEngine.instance().on('mixerSoundLevelUpdate', soundLevels => {
        /*soundLevels.array.forEach(element => {
              console.log("JS onMixerSoundLevelUpdate: " + element)
            });*/
        var level = soundLevels[0];
  
        console.log(
          'JS onMixerSoundLevelUpdate: ' +
            soundLevels[0] +
            ' type of: ' +
            typeof level,
        );
      });
  
      ZegoExpressEngine.instance().on(
        'mixerRelayCDNStateUpdate',
        (taskID, infoList) => {
          console.log('JS onMixerRelayCDNStateUpdate: ' + taskID);
          infoList.forEach(item => {
            console.log(
              'item: ' +
                item.url +
                ' ,state: ' +
                item.state +
                ' ,reason: ' +
                item.updateReason,
              ' ,time: ' + item.stateTime,
            );
          });
        },
      );
  
      ZegoExpressEngine.instance().loginRoom(this.state.liveID, {
        userID: this.state.userID,
        userName: this.state.userName,
      });
  
      ZegoExpressEngine.instance().startPreview({
        reactTag: findNodeHandle(this.refs.zego_preview_view),
        viewMode: 0,
        backgroundColor: 0,
      });
  
      ZegoExpressEngine.instance().startPublishingStream(this.state.liveID);
  
      database().ref(`LiveStreaming/${this.state.liveID}`).set({
        streamID: '',
        fromUser: '',
        time: '',
        type: '',
      });
  
      database()
        .ref(`WaitList/${this.state.userID}`)
        .on('value', snapshot => {
          if (snapshot.val()) {
            const myDataObject = snapshot.val();
            if (myDataObject) {
              const myDataArray = Object.keys(myDataObject)
                .sort()
                .map(key => myDataObject[key]);
              this.updateState({
                waitListData: myDataArray,
                orginalWaitListData: snapshot.val(),
              });
            }
          } else {
            this.updateState({waitListData: []});
          }
        });
    }
  
    searchValue(data, search) {
      for (const key in data) {
        if (typeof data[key] === 'object') {
          if (data[key].userID === search) {
            return key;
          } else {
            const result = this.searchValue(data[key], search);
            if (result) {
              return result;
            }
          }
        }
      }
      return null;
    }
  
    stopPublishStream = () => {
      Alert.alert('Alert', 'Are you sure end this Video call?', [
        {text: 'No', style: 'cancel'},
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            this.on_end_call()
          },
        },
      ]);
    };
  
    on_end_call = async()=>{ 
      try{
        const duration = (new Date().getTime() - this.state.vedioStartedTime )/1000
        const response = await ApiRequests.postRequest({
          url: api_url + deductWallet_live_astro,
          data: {
            astro_id: this.props.providerData.id,
            user_id: this.state?.coHostUserData?.userID,
            live_id: this.state.liveID,
            end_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            start_time: moment(this.state.vedioStartedTime).format('YYYY-MM-DD HH:mm:ss'),
            duration: duration,
            type: this.state.coHostUserData?.type == 'vedio' ? '1' : '2' //"The Type ( video = 1 , audio = 2 ) field is required."
          }
        })
  
        if(response?.status == 200){
          ZegoExpressEngine.instance().stopPlayingStream(
            this.state.coHostUserData?.streamID,
          );
          ZegoExpressEngine.instance().sendCustomCommand(
            this.state.liveID,
            JSON.stringify({command: 'stop_host', user_id: this.state?.coHostUserData?.userID}),
          );
          let node = this.searchValue(
            this.state.orginalWaitListData,
            this.state?.coHostUserData?.userID,
          );
          database().ref(`WaitList/${this.state.userID}/${node}`).remove();
          database().ref(`LiveStreaming/${this.state.liveID}`).set({
            streamID: '',
            fromUser: '',
            time: '',
            type: '',
          });
          this.updateState({coHostUserData: null, isTimerStart: false});
        }
  
      }catch(e){
        console.log(e)
      }
    }
  
    acceptHost = (user_id, type) => {
      try {
        let command = {
          command: 'accept_call',
          type: type,
        };
        ZegoExpressEngine.instance().sendCustomCommand(
          this.state.liveID,
          JSON.stringify(command),
          [{userID: user_id}],
        );
        this.updateState({callRequestVisible: false});
      } catch (e) {
        console.log(e);
      }
    };
  
    sendMessage = message => {
      ZegoExpressEngine.instance()
        .sendBroadcastMessage(this.state.liveID, message)
        .then(result => {
          let new_comments = this.state.comments;
          new_comments.push({
            message: message,
            sendTime: new Date().getTime(),
            fromUser: {
              userID: this.state.userID,
              userName: this.state.userName,
            },
          });
          this.setState({comments: new_comments});
        });
    };
  
    handleBackPress = () => {
      Alert.alert('Alert', 'Are you sure to end this streaming?', [
        {text: 'cancel', style: 'cancel'},
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => this.endStreaming(),
        },
      ]);
      return true;
    };

    go_live_start = async() => {
        console.log('afsa');
        await axios({
            method: 'post',
            url: api_url + go_live,
            headers: {
              'content-type': 'multipart/form-data',
            },
            data: {
            astro_id: this.props.providerData.id,
            status: 'live',
            },
          })
            .then(res => {
                this.change_chat_status();
              console.log('sucess=================>',res.data); 
                this.startLive();  
            })
            .catch(err => {
              
              console.log('error===============>',err);
            });

    };

    change_chat_status = async() => {
        
        await axios({
          method: 'post',
          url: api_url + change_status,
          data: {
            id: this.props.providerData.id,
            is_online: 0,
            wait_time: new Date().toString(),
          },
        })
          .then(res => {
            
          })
          .catch(err => {
            
            console.log(err);
          });
      };
  
    endStreaming = async () => {
      await axios({
        method: 'post',
        url: api_url + exit_live,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: {
          astro_id: this.props.providerData.id,
          status: 'exit',
          liveid: this.state.liveID,
        },
      })
        .then(res => {
          if (res.data.status) {
            database().ref(`WaitList/${this.state.userID}`).remove();
            database().ref(`LiveStreaming/${this.state.liveID}`).remove();
            ZegoExpressEngine.instance()
              .sendCustomCommand(
                this.state.liveID,
                JSON.stringify({command: 'end_host'}),
              )
              .then(() => {
                console.log('sended');
                this.props.navigation.navigate('providerHome');  
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    };
  
    addHeart = () => {
      this.setState(
        {
          hearts: [
            ...this.state.hearts,
            {
              id: heartCount,
              right: getRandomNumber(0, 50),
              color: getRandomColor(),
            },
          ],
        },
        () => {
          heartCount++;
        },
      );
    };
  
    removeHeart = id => {
      this.setState({
        hearts: this.state.hearts.filter(heart => heart.id != id),
      });
    };
  
    updateState = data => {
      this.setState(prevData => {
        const newData = {...prevData, ...data};
        return newData;
      });
    };
  
    render() {
      const {liveStartVisible} = this.state;
      const {navigation} = this.props;
      const updateState = this.updateState;
      const startLive = this.startLive;
      const startLiveGo = this.go_live_start;
      const stopPublishStream = this.stopPublishStream;
      const endStreaming = this.endStreaming;
      const coHostUserData = this.state.coHostUserData;
  
      return (
        <View style={{flex: 1}}>
          <MyStatusBar
            backgroundColor={Colors.gray2}
            barStyle={'light-content'}
          />
          <KeepAwake />
          <View style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}>
            {this.state.coHostUserData?.type == 'vedio'
              ? coHostingInfo()
              : liveScreenInfo()}
  
            <View
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
              }}>
              <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                  <Header
                    providerData={this.props.providerData}
                    endStreaming={this.endStreaming}
                    totalUser={this.state.totalUser}
                    coHostUserData={this.state.coHostUserData}
                  />
                  {this.state.isTimerStart && (
                    <Timer time={this.state.timer} liveID={this.state.liveID} onStopCall={this.on_end_call} />
                  )}
  
                  {this.state.coHostUserData && (
                    <TouchableOpacity
                      onPress={() => stopPublishStream()}
                      style={{
                        width: 40,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: Colors.black + '50',
                        borderRadius: 1000,
                      }}>
                      <Ionicons
                        name="close-circle-outline"
                        color={Colors.whiteDark}
                        size={24}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                {this.state.newGiftVisible && <NewGift newGiftData={this.state.newGiftData} />}
                <View style={{flex: 0}}>
                  <View
                    style={{
                      height: SCREEN_HEIGHT * 0.12,
                      marginHorizontal: Sizes.fixPadding,
                      marginBottom: Sizes.fixPadding,
                    }}>
                    {/* <RecievedGifts giftsData={this.state.giftsData} /> */}
                  </View>
                  <View
                    style={{
                      height: SCREEN_HEIGHT * 0.25,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginHorizontal: Sizes.fixPadding,
                    }}>
                      
                    <Chats comments={this.state.comments} />
                 
                    <GiftCall
                      updateState={this.updateState}
                      totalRequests={this.state.waitListData.length}
                      totalGifts={this.state.giftsData.length}
                    />
                  </View>
                </View>
              </View>
              <KeyboardAvoidingView behavior='position' 
              keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 20}
              style={{ marginBottom: 0 }}>
              <Footer
                sendMessage={this.sendMessage}
                addHeart={this.addHeart}
                hearts={this.state.hearts}
                removeHeart={this.removeHeart}
              />
              </KeyboardAvoidingView>
            </View>
          </View>
          <CallRequests
            callRequestVisible={this.state.callRequestVisible}
            updateState={this.updateState}
            vedioRequests={this.state.waitListData}
            acceptHost={this.acceptHost}
            coHostUserData={this.state.coHostUserData}
          />
          <AllGifts
            updateState={this.updateState}
            allGiftsVisible={this.state.allGiftsVisible}
            giftsData={this.state.giftsData}
          />
          {/* {liveStartInfo()} */}
        </View>
      );
  
      function liveStartInfo() {
        return (
          <Modal
            visible={liveStartVisible}
            onRequestClose={() => {
              updateState({liveStartVisible: false});
              endStreaming();
            }}>
            <View style={{height: SCREEN_HEIGHT, width: SCREEN_WIDTH}}>
              <ZegoTextureView
                ref="zego_preview_view_start"
                style={{flex: 1, width: SCREEN_WIDTH * 1.2, alignSelf: 'center'}}
                resizeMode="cover"
              />
              <View
                style={{
                  position: 'absolute',
                  width: '100%',
                  bottom: 0,
                  paddingVertical: Sizes.fixPadding,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    updateState({liveStartVisible: false});
                    startLiveGo();
                    
                  }}>
                  <LinearGradient
                    colors={[Colors.primaryLight, Colors.primaryDark]}
                    style={{
                      paddingVertical: Sizes.fixPadding,
                      width: SCREEN_WIDTH * 0.6,
                      borderRadius: 100,
                    }}>
                    <Text
                      style={{...Fonts.white16RobotoMedium, textAlign: 'center'}}>
                      CLICK TO GO LIVE
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        );
      }
  
      function coHostingInfo() {
        return (
          <>
            <View
              style={{
                height: SCREEN_HEIGHT / 2,
              }}>
              <ZegoTextureView
                ref="zego_play_view"
                style={{
                  flex: 1,
                  width: SCREEN_WIDTH,
                  alignSelf: 'center',
                  zIndex: -1,
                }}
                resizeMode="cover"
              />
            </View>
            <View style={{height: SCREEN_HEIGHT / 2 + StatusBar.currentHeight}}>
              <ZegoTextureView
                ref="zego_preview_view"
                style={{
                  flex: 1,
                  width: SCREEN_WIDTH * 1,
                  alignSelf: 'center',
                }}
                resizeMode="cover"
              />
            </View>
          </>
        );
      }
  
      function liveScreenInfo() {
        return (
          <ZegoTextureView
            ref="zego_preview_view"
            style={{flex: 1, width: SCREEN_WIDTH * 1.2, alignSelf: 'center'}}
            resizeMode="cover"
          />
        );
      }
    }
  }
  
  const mapStateToProps = state => ({
    providerData: state.provider.providerData,
    dashboard: state.provider.dashboard,
  });
  
  export default connect(mapStateToProps, null)(GoLive);
  