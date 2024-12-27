import { combineReducers } from 'redux';
import { CLEAN_STORE } from '../actionTypes/ProviderActionTypes';
import provider from './provider';
import customer from './customer';
import astrologer from './astrologer';
import setting from './setting';
import live from './live';
import chat from './chat';
import history from './history';
import kundli from './kundli';
import astromall from './astromall';
import Withdrawwallet from './Withdrawwallet'
import notificationReducer from './notificationReducer';
import assignedpujaReducer from './assignedpujaReducer';
const rootReducer = combineReducers({
  provider,
  customer,
  astrologer,
  setting,
  live,
  chat,
  history,
  kundli,
  astromall,
  Withdrawwallet,
  notificationReducer,
  assignedpujaReducer
});

const appReducer = (state, action) => {
  // if (action.type == CLEAN_STORE) {
  //   state = undefined;
  // }
  return rootReducer(state, action);
};

export default appReducer;
