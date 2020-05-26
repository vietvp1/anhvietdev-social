import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import contact from './contact'
import notification from './notification'
import conversation from './conversation'
import messdrop from './messDrop'
import online from './friendsOnline'
import master_data from './master_data'

export default combineReducers({
  auth,
  master_data,
  contact,
  notification,
  conversation,
  messdrop,
  online,
  alert
});
