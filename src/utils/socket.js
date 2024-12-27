import { io } from 'socket.io-client';
import { base_url } from '../config/Constants';
import { resetToScreen } from '../navigations/NavigationServices';
import { showToastMessage } from './services';
import * as ChatActions from '../redux/actions/ChatActions'
// const SOCKET_URL = 'http://localhost:4000/';
const SOCKET_URL = base_url;

class WSService {

  initializeSocket = async (dispatch, userId) => {
    console.log("socket user ID",userId)
    try {
      this.socket = io(SOCKET_URL, {
        transports: ['websocket'],
        query: { userId },
        reconnection: true,                // Enable reconnection
        reconnectionAttempts: Infinity,    // Retry indefinitely
        reconnectionDelay: 1000,           // 1 second delay between reconnections
        reconnectionDelayMax: 5000,        // Max delay of 5 seconds
        timeout: 20000,
      });

      this.socket.on('connect', data => {
        console.log('Socket Connected', data);
      });

      this.socket.on('disconnect', reason => {
        console.log('Socket Disconnected:', reason);
        if (reason === 'io server disconnect') {
          // The disconnection was initiated by the server, you need to reconnect manually
          this.socket.connect();
        }
      });

      this.socket.on('reconnect_attempt', () => {
        console.log('Attempting to reconnect...');
      });

      this.socket.on('reconnect_error', (error) => {
        console.log('Reconnection error:', error);
      });

      this.socket.on('reconnect_failed', () => {
        console.log('Reconnection failed');
        // this.handleReconnectionFailed(dispatch);
      });

      this.socket.on('new_customer_login', data => {
        // dispatch(UserActions.checkCustomerLoginSession(data))
      })

      this.socket.on('new_astrologer_login', data => {
        // dispatch(AstroActions.check_astrologer_login_session(data))
      })

      this.socket.on('onChatReject', data => {
        // dispatch(ChatActions.setCountDownValue(data));
        resetToScreen('providerHome')
        showToastMessage({ message: 'Chat not connected' })
      });


      this.socket.on('updateChatTimer', data => {
        dispatch(ChatActions.setChatTimerCountdown(data));
      });


      this.socket.on('timerStopped', data => {
        dispatch(ChatActions.onCloseChat());
      });

      this.socket.on('chatEnded', data => {
        dispatch(ChatActions.onCloseChat());
      });

      this.socket.on('walletAlert', data => {
        // dispatch(ChatActions.setChatWalletAlert(data))
      })

      this.socket.on('error', data => {
        console.log('Socket Error', data);
      });
    } catch (e) {
      console.log('socket is not initilized', e);
    }
  };

  emit(event, data = {}) {
    console.log(data);
    this.socket.emit(event, data);
  }

  removeListener(listenerName) {
    this.socket.removeAllListeners(listenerName);
  }
}

const socketServices = new WSService();

export default socketServices;
