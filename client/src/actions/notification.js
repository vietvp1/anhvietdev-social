import axios from 'axios';
import {
  GET_NOTIFICATIONS,
} from './types';

export const getNotifications = () => async dispatch => {
  const res = await axios.get('/notification/get-notification');
  dispatch({
    type: GET_NOTIFICATIONS,
    payload: res.data
  });
};

export const deleteNotification = (id) => async dispatch => {
  const res = await axios.delete(`/notification/delete-notification/${id}`)
  if (res.data.success) {
    dispatch({
      type: 'DELETE_NOTIFICATIONS',
      payload: id
    });
  }
};
